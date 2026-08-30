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
jest.mock("../../src/utils/ImageUrlBuilder", () => ({
  ImageUrlBuilder: {
    build: jest.fn(),
  },
}));
const api_1 = __importDefault(require("../../src/http/api"));
const SearchTvShowDetailsTmdbService_1 = require("../../src/services/tmdb/SearchTvShowDetailsTmdbService");
const ImageUrlBuilder_1 = require("../../src/utils/ImageUrlBuilder");
describe("SearchTvShowDetailsTmdbService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.TMDB_API_KEY = "test-api-key";
  });
  it("fetches TV show details from TMDB and maps response correctly", async () => {
    const tmdbResponse = {
      id: 1396,
      name: "Breaking Bad",
      original_name: "Breaking Bad",
      overview: "A high school chemistry teacher turned meth producer.",
      poster_path: "/poster.jpg",
      backdrop_path: "/backdrop.jpg",
      first_air_date: "2008-01-20",
      vote_average: 9.5,
      vote_count: 15000,
      number_of_seasons: 5,
      number_of_episodes: 62,
      status: "Ended",
      genres: [
        { id: 18, name: "Drama" },
        { id: 80, name: "Crime" },
      ],
    };
    api_1.default.get.mockResolvedValue({
      data: tmdbResponse,
    });
    ImageUrlBuilder_1.ImageUrlBuilder.build.mockImplementation((path) =>
      path ? `https://image.tmdb.org/t/p${path}` : null,
    );
    const service = new SearchTvShowDetailsTmdbService_1.SearchTvShowDetailsTmdbService();
    const result = await service.execute({ id: 1396 });
    expect(api_1.default.get).toHaveBeenCalledWith("/tv/1396", {
      params: {
        api_key: "test-api-key",
        language: "en-US",
      },
    });
    expect(ImageUrlBuilder_1.ImageUrlBuilder.build).toHaveBeenCalledWith("/poster.jpg");
    expect(ImageUrlBuilder_1.ImageUrlBuilder.build).toHaveBeenCalledWith("/backdrop.jpg");
    expect(result).toEqual({
      id: 1396,
      name: "Breaking Bad",
      originalName: "Breaking Bad",
      overview: "A high school chemistry teacher turned meth producer.",
      posterImage: "https://image.tmdb.org/t/p/poster.jpg",
      backdropImage: "https://image.tmdb.org/t/p/backdrop.jpg",
      firstAirDate: "2008-01-20",
      voteAverage: 9.5,
      voteCount: 15000,
      numberOfSeasons: 5,
      numberOfEpisodes: 62,
      status: "Ended",
      genres: [
        { id: 18, name: "Drama" },
        { id: 80, name: "Crime" },
      ],
    });
  });
  it("returns null images when poster or backdrop is null", async () => {
    api_1.default.get.mockResolvedValue({
      data: {
        id: 1,
        name: "Test",
        original_name: "Test",
        overview: "",
        poster_path: null,
        backdrop_path: null,
        first_air_date: "2020-01-01",
        vote_average: 5,
        vote_count: 10,
        number_of_seasons: 1,
        number_of_episodes: 10,
        status: "Running",
        genres: [],
      },
    });
    ImageUrlBuilder_1.ImageUrlBuilder.build.mockReturnValue(null);
    const service = new SearchTvShowDetailsTmdbService_1.SearchTvShowDetailsTmdbService();
    const result = await service.execute({ id: 1 });
    expect(result.posterImage).toBeNull();
    expect(result.backdropImage).toBeNull();
  });
  it("throws if TMDB request fails", async () => {
    api_1.default.get.mockRejectedValue(new Error("TMDB error"));
    const service = new SearchTvShowDetailsTmdbService_1.SearchTvShowDetailsTmdbService();
    await expect(service.execute({ id: 1 })).rejects.toThrow("TMDB error");
  });
});
//# sourceMappingURL=SearchTvShowDetailsTmdbService.spec.js.map
