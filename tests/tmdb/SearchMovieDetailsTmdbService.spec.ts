jest.mock("../../src/http/api", () => ({
  get: jest.fn(),
}));

jest.mock("../../src/utils/ImageUrlBuilder", () => ({
  ImageUrlBuilder: {
    build: jest.fn(),
  },
}));

import api from "../../src/http/api";
import { SearchMovieDetailsTmdbService } from "../../src/services/tmdb/SearchMovieDetailsTmdbService";
import { ImageUrlBuilder } from "../../src/utils/ImageUrlBuilder";

describe("SearchMovieDetailsTmdbService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.TMDB_API_KEY = "test-api-key";
  });

  it("fetches movie details from TMDB and maps response correctly", async () => {
    const tmdbResponse = {
      id: 550,
      imdb_id: "0137523",
      backdrop_path: "/backdrop.jpg",
      poster_path: "/poster.jpg",
      origin_country: ["US"],
      original_language: "en",
      original_title: "Fight Club",
      overview: "Some overview",
      popularity: 90,
      release_date: "1999-10-15",
      revenue: 100000000,
      status: "Released",
      tagline: "Mischief. Mayhem. Soap.",
      title: "Fight Club",
      vote_average: 8.4,
      vote_count: 30000,
      genres: [
        { id: 18, name: "Drama" },
        { id: 53, name: "Thriller" },
      ],
      production_companies: [
        {
          id: 1,
          logo_path: "/logo.png",
          name: "Fox 2000",
          origin_country: "US",
        },
      ],
      production_countries: [{ iso_3166_1: "US", name: "United States of America" }],
      spoken_languages: [
        {
          english_name: "English",
          iso_639_1: "en",
          name: "English",
        },
      ],
    };

    (api.get as jest.Mock).mockResolvedValue({ data: tmdbResponse });

    (ImageUrlBuilder.build as jest.Mock).mockImplementation((path: string | null) =>
      path ? `https://image.tmdb.org/t/p${path}` : null,
    );

    const service = new SearchMovieDetailsTmdbService();
    const result = await service.execute({ id: 550 });

    expect(api.get).toHaveBeenCalledWith("/movie/550", {
      params: {
        api_key: "test-api-key",
        language: "en-US",
      },
    });

    expect(ImageUrlBuilder.build).toHaveBeenCalledWith("/backdrop.jpg");
    expect(ImageUrlBuilder.build).toHaveBeenCalledWith("/poster.jpg");
    expect(ImageUrlBuilder.build).toHaveBeenCalledWith("/logo.png");

    expect(result).toEqual({
      id: 550,
      imdbId: 137523,
      backdropPath: "https://image.tmdb.org/t/p/backdrop.jpg",
      posterPath: "https://image.tmdb.org/t/p/poster.jpg",
      originCountry: ["US"],
      originalLanguage: "en",
      originalTitle: "Fight Club",
      overview: "Some overview",
      popularity: 90,
      releaseDate: "1999-10-15",
      revenue: 100000000,
      status: "Released",
      tagline: "Mischief. Mayhem. Soap.",
      title: "Fight Club",
      voteAverage: 8.4,
      voteCount: 30000,
      genres: [
        { id: 18, name: "Drama" },
        { id: 53, name: "Thriller" },
      ],
      productionCompanies: [
        {
          id: 1,
          logo_path: "https://image.tmdb.org/t/p/logo.png",
          name: "Fox 2000",
          origin_country: "US",
        },
      ],
      productionCountries: [
        {
          iso_3166_1: "US",
          name: "United States of America",
        },
      ],
      spokenLanguages: [
        {
          english_name: "English",
          iso_639_1: "en",
          name: "English",
        },
      ],
    });
  });

  it("throws if TMDB request fails", async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error("TMDB error"));

    const service = new SearchMovieDetailsTmdbService();

    await expect(service.execute({ id: 1 })).rejects.toThrow("TMDB error");
  });
});
