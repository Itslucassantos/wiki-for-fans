jest.mock("../../src/http/api", () => ({
  get: jest.fn(),
}));

import api from "../../src/http/api";
import { SearchTvShowTmdbService } from "../../src/services/tmdb/SearchTvShowTmdbService";

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

    (api.get as jest.Mock).mockResolvedValue({
      data: tmdbResponse,
    });

    const service = new SearchTvShowTmdbService();
    const result = await service.execute({ name: "Breaking Bad" });

    expect(api.get).toHaveBeenCalledWith("/search/tv", {
      params: {
        api_key: "test-api-key",
        query: "Breaking Bad",
        language: "en-US",
      },
    });

    expect(result).toEqual(tmdbResponse.results[0]);
  });

  it("returns null when no TV shows are found", async () => {
    (api.get as jest.Mock).mockResolvedValue({
      data: { results: [] },
    });

    const service = new SearchTvShowTmdbService();
    const result = await service.execute({ name: "Unknown Show" });

    expect(result).toBeNull();
  });

  it("throws if TMDB request fails", async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error("TMDB error"));

    const service = new SearchTvShowTmdbService();

    await expect(service.execute({ name: "Breaking Bad" })).rejects.toThrow("TMDB error");
  });
});
