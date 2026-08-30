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
const SearchCharactersTmdbService_1 = require("../../src/services/tmdb/SearchCharactersTmdbService");
describe("SearchCharactersTmdbService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.TMDB_API_KEY = "test-api-key";
  });
  it("fetches characters from TMDB using movie type", async () => {
    const cast = [
      { id: 1, name: "Actor 1" },
      { id: 2, name: "Actor 2" },
    ];
    api_1.default.get.mockResolvedValue({
      data: {
        cast,
      },
    });
    const service = new SearchCharactersTmdbService_1.SearchCharactersTmdbService();
    const result = await service.execute({
      id: 123,
      type: "movie",
    });
    expect(api_1.default.get).toHaveBeenCalledWith("/movie/123/credits", {
      params: {
        api_key: "test-api-key",
        language: "en-US",
      },
    });
    expect(result).toEqual(cast);
  });
  it("fetches characters from TMDB using tv type", async () => {
    const cast = [{ id: 10, name: "Actor TV" }];
    api_1.default.get.mockResolvedValue({
      data: { cast },
    });
    const service = new SearchCharactersTmdbService_1.SearchCharactersTmdbService();
    const result = await service.execute({
      id: 99,
      type: "tv",
    });
    expect(api_1.default.get).toHaveBeenCalledWith("/tv/99/credits", expect.any(Object));
    expect(result).toEqual(cast);
  });
  it("throws if TMDB request fails", async () => {
    api_1.default.get.mockRejectedValue(new Error("TMDB error"));
    const service = new SearchCharactersTmdbService_1.SearchCharactersTmdbService();
    await expect(service.execute({ id: 1, type: "movie" })).rejects.toThrow("TMDB error");
  });
});
//# sourceMappingURL=SearchCharactersTmdbService.spec.js.map
