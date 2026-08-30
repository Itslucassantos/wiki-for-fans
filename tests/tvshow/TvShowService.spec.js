"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.mock("../../src/services/internal/tvShow/SearchTvShowService");
jest.mock("../../src/services/tmdb/SearchTvShowTmdbService");
jest.mock("../../src/services/tmdb/SearchTvShowDetailsTmdbService");
jest.mock("../../src/services/tmdb/SearchCharactersTmdbService");
jest.mock("../../src/services/tmdb/CharacterDetailsTmdbService");
jest.mock("../../src/services/internal/tvShow/SaveTvShowService");
jest.mock("../../src/services/internal/character/SaveCharacterService");
const SaveCharacterService_1 = require("../../src/services/internal/character/SaveCharacterService");
const SaveTvShowService_1 = require("../../src/services/internal/tvShow/SaveTvShowService");
const SearchTvShowService_1 = require("../../src/services/internal/tvShow/SearchTvShowService");
const CharacterDetailsTmdbService_1 = require("../../src/services/tmdb/CharacterDetailsTmdbService");
const SearchCharactersTmdbService_1 = require("../../src/services/tmdb/SearchCharactersTmdbService");
const SearchTvShowDetailsTmdbService_1 = require("../../src/services/tmdb/SearchTvShowDetailsTmdbService");
const SearchTvShowTmdbService_1 = require("../../src/services/tmdb/SearchTvShowTmdbService");
const TvShowService_1 = require("../../src/services/tvshow/TvShowService");
const mockSearchTvShowService = SearchTvShowService_1.SearchTvShowService;
const mockSearchTvShowTmdbService = SearchTvShowTmdbService_1.SearchTvShowTmdbService;
const mockSearchTvShowDetailsTmdbService =
  SearchTvShowDetailsTmdbService_1.SearchTvShowDetailsTmdbService;
const mockSearchCharactersTmdbService = SearchCharactersTmdbService_1.SearchCharactersTmdbService;
const mockCharacterDetailsTmdbService = CharacterDetailsTmdbService_1.CharacterDetailsTmdbService;
const mockSaveTvShowService = SaveTvShowService_1.SaveTvShowService;
const mockSaveCharacterService = SaveCharacterService_1.SaveCharacterService;
describe("TvShowService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("returns TV show from internal DB if it exists", async () => {
    const tvShowFromDb = { id: 1, name: "Breaking Bad" };
    mockSearchTvShowService.prototype.execute.mockResolvedValue(tvShowFromDb);
    const service = new TvShowService_1.TvShowService();
    const result = await service.execute({ name: "Breaking Bad" });
    expect(result).toEqual(tvShowFromDb);
    expect(mockSearchTvShowTmdbService.prototype.execute).not.toHaveBeenCalled();
  });
  it("fetches TV show from TMDB, saves TV show and characters, and returns full response", async () => {
    mockSearchTvShowService.prototype.execute.mockResolvedValue(null);
    mockSearchTvShowTmdbService.prototype.execute.mockResolvedValue({
      id: 10,
      name: "Breaking Bad",
    });
    mockSearchTvShowDetailsTmdbService.prototype.execute.mockResolvedValue({
      id: 10,
      name: "Breaking Bad",
    });
    mockSearchCharactersTmdbService.prototype.execute.mockResolvedValue([{ id: 1 }, { id: 2 }]);
    mockCharacterDetailsTmdbService.prototype.execute
      .mockResolvedValueOnce({ id: 1, name: "Walter White" })
      .mockResolvedValueOnce({ id: 2, name: "Jesse Pinkman" });
    mockSaveTvShowService.prototype.execute.mockResolvedValue({
      id: 99,
    });
    mockSaveCharacterService.prototype.execute.mockResolvedValue(undefined);
    const service = new TvShowService_1.TvShowService();
    const result = await service.execute({ name: "Breaking Bad" });
    expect(result).toEqual({
      id: 10,
      name: "Breaking Bad",
      characters: [
        { id: 1, name: "Walter White" },
        { id: 2, name: "Jesse Pinkman" },
      ],
    });
    expect(mockSaveTvShowService.prototype.execute).toHaveBeenCalled();
    expect(mockSaveCharacterService.prototype.execute).toHaveBeenCalledTimes(2);
  });
  it("throws error if TV show is not found on TMDB", async () => {
    mockSearchTvShowService.prototype.execute.mockResolvedValue(null);
    mockSearchTvShowTmdbService.prototype.execute.mockResolvedValue(null);
    const service = new TvShowService_1.TvShowService();
    await expect(service.execute({ name: "Unknown Show" })).rejects.toThrow(
      'Failed to fetch TV show: TV show "Unknown Show" not found on TMDB',
    );
  });
  it("throws wrapped error if any dependency fails", async () => {
    mockSearchTvShowService.prototype.execute.mockRejectedValue(new Error("DB error"));
    const service = new TvShowService_1.TvShowService();
    await expect(service.execute({ name: "Any Show" })).rejects.toThrow(
      "Failed to fetch TV show: DB error",
    );
  });
});
//# sourceMappingURL=TvShowService.spec.js.map
