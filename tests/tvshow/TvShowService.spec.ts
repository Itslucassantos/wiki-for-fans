jest.mock("../../src/services/internal/tvShow/SearchTvShowService");
jest.mock("../../src/services/tmdb/SearchTvShowTmdbService");
jest.mock("../../src/services/tmdb/SearchTvShowDetailsTmdbService");
jest.mock("../../src/services/tmdb/SearchCharactersTmdbService");
jest.mock("../../src/services/tmdb/CharacterDetailsTmdbService");
jest.mock("../../src/services/internal/tvShow/SaveTvShowService");
jest.mock("../../src/services/internal/character/SaveCharacterService");

import { SaveCharacterService } from "../../src/services/internal/character/SaveCharacterService";
import { SaveTvShowService } from "../../src/services/internal/tvShow/SaveTvShowService";
import { SearchTvShowService } from "../../src/services/internal/tvShow/SearchTvShowService";
import { CharacterDetailsTmdbService } from "../../src/services/tmdb/CharacterDetailsTmdbService";
import { SearchCharactersTmdbService } from "../../src/services/tmdb/SearchCharactersTmdbService";
import { SearchTvShowDetailsTmdbService } from "../../src/services/tmdb/SearchTvShowDetailsTmdbService";
import { SearchTvShowTmdbService } from "../../src/services/tmdb/SearchTvShowTmdbService";
import { TvShowService } from "../../src/services/tvshow/TvShowService";

const mockSearchTvShowService = SearchTvShowService as jest.MockedClass<typeof SearchTvShowService>;

const mockSearchTvShowTmdbService = SearchTvShowTmdbService as jest.MockedClass<
  typeof SearchTvShowTmdbService
>;

const mockSearchTvShowDetailsTmdbService = SearchTvShowDetailsTmdbService as jest.MockedClass<
  typeof SearchTvShowDetailsTmdbService
>;

const mockSearchCharactersTmdbService = SearchCharactersTmdbService as jest.MockedClass<
  typeof SearchCharactersTmdbService
>;

const mockCharacterDetailsTmdbService = CharacterDetailsTmdbService as jest.MockedClass<
  typeof CharacterDetailsTmdbService
>;

const mockSaveTvShowService = SaveTvShowService as jest.MockedClass<typeof SaveTvShowService>;

const mockSaveCharacterService = SaveCharacterService as jest.MockedClass<
  typeof SaveCharacterService
>;

describe("TvShowService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns TV show from internal DB if it exists", async () => {
    const tvShowFromDb = { id: 1, name: "Breaking Bad" } as any;

    mockSearchTvShowService.prototype.execute.mockResolvedValue(tvShowFromDb);

    const service = new TvShowService();
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
    } as any);

    mockSearchCharactersTmdbService.prototype.execute.mockResolvedValue([{ id: 1 }, { id: 2 }]);

    mockCharacterDetailsTmdbService.prototype.execute
      .mockResolvedValueOnce({ id: 1, name: "Walter White" } as any)
      .mockResolvedValueOnce({ id: 2, name: "Jesse Pinkman" } as any);

    mockSaveTvShowService.prototype.execute.mockResolvedValue({
      id: 99,
    } as any);

    mockSaveCharacterService.prototype.execute.mockResolvedValue(undefined);

    const service = new TvShowService();
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

    const service = new TvShowService();

    await expect(service.execute({ name: "Unknown Show" })).rejects.toThrow(
      'Failed to fetch TV show: TV show "Unknown Show" not found on TMDB',
    );
  });

  it("throws wrapped error if any dependency fails", async () => {
    mockSearchTvShowService.prototype.execute.mockRejectedValue(new Error("DB error"));

    const service = new TvShowService();

    await expect(service.execute({ name: "Any Show" })).rejects.toThrow(
      "Failed to fetch TV show: DB error",
    );
  });
});
