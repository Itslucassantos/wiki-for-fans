"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
jest.mock("../../src/http/api", () => ({
  get: jest.fn(),
}));
const api_1 = __importDefault(require("../../src/http/api"));
const SearchMovieTmdbService_1 = require("../../src/services/tmdb/SearchMovieTmdbService");
describe("SearchMovieTmdbService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.TMDB_API_KEY = "test-api-key";
  });
  it("returns the first movie result from TMDB search", async () => {
    const results = [
      { id: 1, title: "Inception" },
      { id: 2, title: "Inception 2" },
    ];
    api_1.default.get.mockResolvedValue({
      data: {
        results,
      },
    });
    const service = new SearchMovieTmdbService_1.SearchMovieTmdbService();
    const result = await service.execute({ name: "Inception" });
    expect(api_1.default.get).toHaveBeenCalledWith("/search/movie", {
      params: {
        api_key: "test-api-key",
        query: "Inception",
        language: "en-US",
      },
    });
    expect(result).toEqual(results[0]);
  });
  it("returns null when TMDB returns no results", async () => {
    api_1.default.get.mockResolvedValue({
      data: {
        results: [],
      },
    });
    const service = new SearchMovieTmdbService_1.SearchMovieTmdbService();
    const result = await service.execute({ name: "Unknown Movie" });
    expect(result).toBeNull();
  });
  it("throws if TMDB request fails", async () => {
    api_1.default.get.mockRejectedValue(new Error("TMDB error"));
    const service = new SearchMovieTmdbService_1.SearchMovieTmdbService();
    await expect(service.execute({ name: "Any Movie" })).rejects.toThrow("TMDB error");
  });
});
//# sourceMappingURL=SearchMovieTmdbService.spec.js.map
