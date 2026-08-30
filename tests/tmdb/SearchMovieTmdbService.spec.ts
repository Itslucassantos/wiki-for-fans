jest.mock("../../src/http/api", () => ({
  get: jest.fn(),
}));

import api from "../../src/http/api";
import { SearchMovieTmdbService } from "../../src/services/tmdb/SearchMovieTmdbService";

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

    (api.get as jest.Mock).mockResolvedValue({
      data: {
        results,
      },
    });

    const service = new SearchMovieTmdbService();
    const result = await service.execute({ name: "Inception" });

    expect(api.get).toHaveBeenCalledWith("/search/movie", {
      params: {
        api_key: "test-api-key",
        query: "Inception",
        language: "en-US",
      },
    });

    expect(result).toEqual(results[0]);
  });

  it("returns null when TMDB returns no results", async () => {
    (api.get as jest.Mock).mockResolvedValue({
      data: {
        results: [],
      },
    });

    const service = new SearchMovieTmdbService();
    const result = await service.execute({ name: "Unknown Movie" });

    expect(result).toBeNull();
  });

  it("throws if TMDB request fails", async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error("TMDB error"));

    const service = new SearchMovieTmdbService();

    await expect(service.execute({ name: "Any Movie" })).rejects.toThrow("TMDB error");
  });
});
