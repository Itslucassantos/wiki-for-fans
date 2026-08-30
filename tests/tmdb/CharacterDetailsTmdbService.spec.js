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
const CharacterDetailsTmdbService_1 = require("../../src/services/tmdb/CharacterDetailsTmdbService");
const ImageUrlBuilder_1 = require("../../src/utils/ImageUrlBuilder");
describe("CharacterDetailsTmdbService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.TMDB_API_KEY = "test-api-key";
  });
  it("fetches actor details from TMDB and maps response correctly", async () => {
    const tmdbResponse = {
      id: 100,
      name: "Bryan Cranston",
      biography: "Some biography",
      birthday: "1956-03-07",
      deathday: null,
      place_of_birth: "Hollywood, USA",
      profile_path: "/bryan.jpg",
      popularity: 50,
      gender: 2,
      known_for_department: "Acting",
      also_known_as: ["Bryan Lee Cranston"],
      homepage: "https://example.com",
      imdb_id: "nm0186505",
    };
    api_1.default.get.mockResolvedValue({
      data: tmdbResponse,
    });
    ImageUrlBuilder_1.ImageUrlBuilder.build.mockReturnValue("https://image.tmdb.org/t/p/bryan.jpg");
    const service = new CharacterDetailsTmdbService_1.CharacterDetailsTmdbService();
    const result = await service.execute({
      id: 100,
      character: "Walter White",
    });
    expect(api_1.default.get).toHaveBeenCalledWith("/person/100", {
      params: {
        api_key: "test-api-key",
        language: "en-US",
      },
    });
    expect(ImageUrlBuilder_1.ImageUrlBuilder.build).toHaveBeenCalledWith("/bryan.jpg");
    expect(result).toEqual({
      id: 100,
      characterName: "Walter White",
      actorId: 100,
      actorName: "Bryan Cranston",
      actorBiography: "Some biography",
      actorBirthday: "1956-03-07",
      actorDeathday: null,
      actorAge: expect.any(Number),
      actorPlaceOfBirth: "Hollywood, USA",
      actorProfileImage: "https://image.tmdb.org/t/p/bryan.jpg",
      actorPopularity: 50,
      actorGender: "Male",
      actorKnownFor: "Acting",
      actorAlsoKnownAs: ["Bryan Lee Cranston"],
      actorHomepage: "https://example.com",
      actorImdbId: "nm0186505",
    });
  });
  it("returns null age when birthday is null", async () => {
    api_1.default.get.mockResolvedValue({
      data: {
        id: 1,
        name: "Actor",
        biography: "",
        birthday: null,
        deathday: null,
        place_of_birth: null,
        profile_path: null,
        popularity: 10,
        gender: 0,
        known_for_department: "Acting",
        also_known_as: [],
        homepage: null,
        imdb_id: "id",
      },
    });
    ImageUrlBuilder_1.ImageUrlBuilder.build.mockReturnValue(null);
    const service = new CharacterDetailsTmdbService_1.CharacterDetailsTmdbService();
    const result = await service.execute({ id: 1, character: "Test" });
    expect(result.actorAge).toBeNull();
    expect(result.actorGender).toBe("Unknown");
  });
  it("throws if TMDB request fails", async () => {
    api_1.default.get.mockRejectedValue(new Error("TMDB error"));
    const service = new CharacterDetailsTmdbService_1.CharacterDetailsTmdbService();
    await expect(service.execute({ id: 1, character: "Test" })).rejects.toThrow("TMDB error");
  });
  it("calculates age correctly when actor is deceased and maps gender variants", async () => {
    api_1.default.get.mockResolvedValue({
      data: {
        id: 10,
        name: "Actor",
        biography: "",
        birthday: "1980-01-10",
        deathday: "2020-01-01",
        place_of_birth: null,
        profile_path: null,
        popularity: 1,
        gender: 1,
        known_for_department: "Acting",
        also_known_as: [],
        homepage: null,
        imdb_id: "x",
      },
    });
    ImageUrlBuilder_1.ImageUrlBuilder.build.mockReturnValue(null);
    const service = new CharacterDetailsTmdbService_1.CharacterDetailsTmdbService();
    const result = await service.execute({ id: 10, character: "Test" });
    expect(result.actorAge).toBe(39);
    expect(result.actorGender).toBe("Female");
  });
  it.each([
    { gender: 3, expected: "Non-binary" },
    { gender: 99, expected: "Unknown" },
  ])("maps gender code $gender to $expected", async ({ gender, expected }) => {
    api_1.default.get.mockResolvedValue({
      data: {
        id: 20,
        name: "Actor",
        biography: "",
        birthday: "1990-01-01",
        deathday: null,
        place_of_birth: null,
        profile_path: null,
        popularity: 1,
        gender,
        known_for_department: "Acting",
        also_known_as: [],
        homepage: null,
        imdb_id: "x",
      },
    });
    ImageUrlBuilder_1.ImageUrlBuilder.build.mockReturnValue(null);
    const service = new CharacterDetailsTmdbService_1.CharacterDetailsTmdbService();
    const result = await service.execute({ id: 20, character: "Test" });
    expect(result.actorGender).toBe(expected);
  });
  it("decrements age when birthday has not occurred yet in the current year", async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-01-05"));
    api_1.default.get.mockResolvedValue({
      data: {
        id: 30,
        name: "Actor",
        biography: "",
        birthday: "1990-01-10",
        deathday: null,
        place_of_birth: null,
        profile_path: null,
        popularity: 1,
        gender: 2,
        known_for_department: "Acting",
        also_known_as: [],
        homepage: null,
        imdb_id: "x",
      },
    });
    ImageUrlBuilder_1.ImageUrlBuilder.build.mockReturnValue(null);
    const service = new CharacterDetailsTmdbService_1.CharacterDetailsTmdbService();
    const result = await service.execute({ id: 30, character: "Test" });
    expect(result.actorAge).toBe(33);
    jest.useRealTimers();
  });
});
//# sourceMappingURL=CharacterDetailsTmdbService.spec.js.map
