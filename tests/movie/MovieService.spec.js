"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.mock("../../src/services/internal/movie/SearchMovieService");
jest.mock("../../src/services/tmdb/SearchMovieTmdbService");
jest.mock("../../src/services/tmdb/SearchMovieDetailsTmdbService");
jest.mock("../../src/services/tmdb/SearchCharactersTmdbService");
jest.mock("../../src/services/tmdb/CharacterDetailsTmdbService");
jest.mock("../../src/services/internal/movie/SaveMovieService");
jest.mock("../../src/services/internal/character/SaveCharacterService");
const SaveCharacterService_1 = require("../../src/services/internal/character/SaveCharacterService");
const SaveMovieService_1 = require("../../src/services/internal/movie/SaveMovieService");
const SearchMovieService_1 = require("../../src/services/internal/movie/SearchMovieService");
const MovieService_1 = require("../../src/services/movie/MovieService");
const CharacterDetailsTmdbService_1 = require("../../src/services/tmdb/CharacterDetailsTmdbService");
const SearchCharactersTmdbService_1 = require("../../src/services/tmdb/SearchCharactersTmdbService");
const SearchMovieDetailsTmdbService_1 = require("../../src/services/tmdb/SearchMovieDetailsTmdbService");
const SearchMovieTmdbService_1 = require("../../src/services/tmdb/SearchMovieTmdbService");
const mockSearchMovieService = SearchMovieService_1.SearchMovieService;
const mockSearchMovieTmdbService = SearchMovieTmdbService_1.SearchMovieTmdbService;
const mockSearchMovieDetailsTmdbService =
  SearchMovieDetailsTmdbService_1.SearchMovieDetailsTmdbService;
const mockSearchCharactersTmdbService = SearchCharactersTmdbService_1.SearchCharactersTmdbService;
const mockCharacterDetailsTmdbService = CharacterDetailsTmdbService_1.CharacterDetailsTmdbService;
const mockSaveMovieService = SaveMovieService_1.SaveMovieService;
const mockSaveCharacterService = SaveCharacterService_1.SaveCharacterService;
describe("MovieService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("returns movie from internal DB if it exists", async () => {
    const movieFromDb = { id: 1, title: "inception" };
    mockSearchMovieService.prototype.execute.mockResolvedValue(movieFromDb);
    const service = new MovieService_1.MovieService();
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
    });
    mockSearchCharactersTmdbService.prototype.execute.mockResolvedValue([{ id: 1 }, { id: 2 }]);
    mockCharacterDetailsTmdbService.prototype.execute
      .mockResolvedValueOnce({ id: 1, name: "Cooper" })
      .mockResolvedValueOnce({ id: 2, name: "Brand" });
    mockSaveMovieService.prototype.execute.mockResolvedValue({ id: 99 });
    mockSaveCharacterService.prototype.execute.mockResolvedValue(undefined);
    const service = new MovieService_1.MovieService();
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
    const service = new MovieService_1.MovieService();
    await expect(service.execute({ name: "Unknown Movie" })).rejects.toThrow(
      'Failed to fetch movie: Movie "Unknown Movie" not found on TMDB',
    );
  });
  it("throws wrapped error if any dependency fails", async () => {
    mockSearchMovieService.prototype.execute.mockRejectedValue(new Error("DB down"));
    const service = new MovieService_1.MovieService();
    await expect(service.execute({ name: "Any Movie" })).rejects.toThrow(
      "Failed to fetch movie: DB down",
    );
  });
});
//# sourceMappingURL=MovieService.spec.js.map
