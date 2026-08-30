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
const SearchTvShowTmdbService_1 = require("../../src/services/tmdb/SearchTvShowTmdbService");
describe("SearchTvShowTmdbService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.TMDB_API_KEY = "test-api-key";
  });
  it("searches TV shows on TMDB and returns the first result", async () => {
    const tmdbResponse = {
      results: [
        {
          id: 1396,
          name: "Breaking Bad",
          original_name: "Breaking Bad",
        },
        {
          id: 2,
          name: "Another Show",
        },
      ],
    };
    api_1.default.get.mockResolvedValue({
      data: tmdbResponse,
    });
    const service = new SearchTvShowTmdbService_1.SearchTvShowTmdbService();
    const result = await service.execute({ name: "Breaking Bad" });
    expect(api_1.default.get).toHaveBeenCalledWith("/search/tv", {
      params: {
        api_key: "test-api-key",
        query: "Breaking Bad",
        language: "en-US",
      },
    });
    expect(result).toEqual(tmdbResponse.results[0]);
  });
  it("returns null when no TV shows are found", async () => {
    api_1.default.get.mockResolvedValue({
      data: { results: [] },
    });
    const service = new SearchTvShowTmdbService_1.SearchTvShowTmdbService();
    const result = await service.execute({ name: "Unknown Show" });
    expect(result).toBeNull();
  });
  it("throws if TMDB request fails", async () => {
    api_1.default.get.mockRejectedValue(new Error("TMDB error"));
    const service = new SearchTvShowTmdbService_1.SearchTvShowTmdbService();
    await expect(service.execute({ name: "Breaking Bad" })).rejects.toThrow("TMDB error");
  });
});
//# sourceMappingURL=SearchTvShowTmdbService.spec.js.map
