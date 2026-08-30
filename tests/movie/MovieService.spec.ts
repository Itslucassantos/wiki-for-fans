jest.mock("../../src/services/internal/movie/SearchMovieService");
jest.mock("../../src/services/tmdb/SearchMovieTmdbService");
jest.mock("../../src/services/tmdb/SearchMovieDetailsTmdbService");
jest.mock("../../src/services/tmdb/SearchCharactersTmdbService");
jest.mock("../../src/services/tmdb/CharacterDetailsTmdbService");
jest.mock("../../src/services/internal/movie/SaveMovieService");
jest.mock("../../src/services/internal/character/SaveCharacterService");

import { SaveCharacterService } from "../../src/services/internal/character/SaveCharacterService";
import { SaveMovieService } from "../../src/services/internal/movie/SaveMovieService";
import { SearchMovieService } from "../../src/services/internal/movie/SearchMovieService";
import { MovieService } from "../../src/services/movie/MovieService";
import { CharacterDetailsTmdbService } from "../../src/services/tmdb/CharacterDetailsTmdbService";
import { SearchCharactersTmdbService } from "../../src/services/tmdb/SearchCharactersTmdbService";
import { SearchMovieDetailsTmdbService } from "../../src/services/tmdb/SearchMovieDetailsTmdbService";
import { SearchMovieTmdbService } from "../../src/services/tmdb/SearchMovieTmdbService";
import { MovieProps } from "../../src/types/movie.types";

const mockSearchMovieService = SearchMovieService as jest.MockedClass<typeof SearchMovieService>;

const mockSearchMovieTmdbService = SearchMovieTmdbService as jest.MockedClass<
  typeof SearchMovieTmdbService
>;

const mockSearchMovieDetailsTmdbService = SearchMovieDetailsTmdbService as jest.MockedClass<
  typeof SearchMovieDetailsTmdbService
>;

const mockSearchCharactersTmdbService = SearchCharactersTmdbService as jest.MockedClass<
  typeof SearchCharactersTmdbService
>;

const mockCharacterDetailsTmdbService = CharacterDetailsTmdbService as jest.MockedClass<
  typeof CharacterDetailsTmdbService
>;

const mockSaveMovieService = SaveMovieService as jest.MockedClass<typeof SaveMovieService>;

const mockSaveCharacterService = SaveCharacterService as jest.MockedClass<
  typeof SaveCharacterService
>;

describe("MovieService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns movie from internal DB if it exists", async () => {
    const movieFromDb = { id: 1, title: "inception" } as any;

    mockSearchMovieService.prototype.execute.mockResolvedValue(movieFromDb);

    const service = new MovieService();
    const result = await service.execute({ name: "inception" });

    expect(result).toEqual(movieFromDb);
    expect(mockSearchMovieTmdbService.prototype.execute).not.toHaveBeenCalled();
  });

  it("fetches movie from TMDB, saves movie and characters, and returns full response", async () => {
    mockSearchMovieService.prototype.execute.mockResolvedValue(null);

    mockSearchMovieTmdbService.prototype.execute.mockResolvedValue({
      id: 10,
      title: "Interstellar",
    });

    mockSearchMovieDetailsTmdbService.prototype.execute.mockResolvedValue({
      id: 10,
      title: "Interstellar",
    } as MovieProps);

    mockSearchCharactersTmdbService.prototype.execute.mockResolvedValue([{ id: 1 }, { id: 2 }]);

    mockCharacterDetailsTmdbService.prototype.execute
      .mockResolvedValueOnce({ id: 1, name: "Cooper" } as any)
      .mockResolvedValueOnce({ id: 2, name: "Brand" } as any);

    mockSaveMovieService.prototype.execute.mockResolvedValue({ id: 99 } as any);

    mockSaveCharacterService.prototype.execute.mockResolvedValue(undefined);

    const service = new MovieService();
    const result = await service.execute({ name: "Interstellar" });

    expect(result).toEqual({
      id: 10,
      title: "Interstellar",
      characters: [
        { id: 1, name: "Cooper" },
        { id: 2, name: "Brand" },
      ],
    });

    expect(mockSaveMovieService.prototype.execute).toHaveBeenCalled();
    expect(mockSaveCharacterService.prototype.execute).toHaveBeenCalledTimes(2);
  });

  it("throws error if movie is not found on TMDB", async () => {
    mockSearchMovieService.prototype.execute.mockResolvedValue(null);
    mockSearchMovieTmdbService.prototype.execute.mockResolvedValue(null);

    const service = new MovieService();

    await expect(service.execute({ name: "Unknown Movie" })).rejects.toThrow(
      'Failed to fetch movie: Movie "Unknown Movie" not found on TMDB',
    );
  });

  it("throws wrapped error if any dependency fails", async () => {
    mockSearchMovieService.prototype.execute.mockRejectedValue(new Error("DB down"));

    const service = new MovieService();

    await expect(service.execute({ name: "Any Movie" })).rejects.toThrow(
      "Failed to fetch movie: DB down",
    );
  });
});
