jest.mock("../../src/http/api", () => ({
  get: jest.fn(),
}));

import api from "../../src/http/api";
import { SearchCharactersTmdbService } from "../../src/services/tmdb/SearchCharactersTmdbService";

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

    (api.get as jest.Mock).mockResolvedValue({
      data: {
        cast,
      },
    });

    const service = new SearchCharactersTmdbService();

    const result = await service.execute({
      id: 123,
      type: "movie",
    });

    expect(api.get).toHaveBeenCalledWith("/movie/123/credits", {
      params: {
        api_key: "test-api-key",
        language: "en-US",
      },
    });

    expect(result).toEqual(cast);
  });

  it("fetches characters from TMDB using tv type", async () => {
    const cast = [{ id: 10, name: "Actor TV" }];

    (api.get as jest.Mock).mockResolvedValue({
      data: { cast },
    });

    const service = new SearchCharactersTmdbService();

    const result = await service.execute({
      id: 99,
      type: "tv",
    });

    expect(api.get).toHaveBeenCalledWith("/tv/99/credits", expect.any(Object));

    expect(result).toEqual(cast);
  });

  it("throws if TMDB request fails", async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error("TMDB error"));

    const service = new SearchCharactersTmdbService();

    await expect(service.execute({ id: 1, type: "movie" })).rejects.toThrow("TMDB error");
  });
});
