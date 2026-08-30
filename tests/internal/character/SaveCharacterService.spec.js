"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../src/prisma"));
const SaveCharacterService_1 = require("../../../src/services/internal/character/SaveCharacterService");
jest.mock("../../../src/prisma");
describe("SaveCharacterService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("saves a character linked to a movie", async () => {
    const characterReq = {
      characterName: "Frank Dux",
      actorName: "Jean-Claude Van Damme",
    };
    const savedCharacter = {
      id: 1,
      characterName: "Frank Dux",
      actorName: "Jean-Claude Van Damme",
      movieId: 1,
      tvShowId: null,
    };
    prisma_1.default.character.create.mockResolvedValue(savedCharacter);
    const service = new SaveCharacterService_1.SaveCharacterService();
    const result = await service.execute(characterReq, undefined, 1);
    expect(prisma_1.default.character.create).toHaveBeenCalledWith({
      data: {
        ...characterReq,
        tvShowId: undefined,
        movieId: 1,
      },
    });
    expect(prisma_1.default.character.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual(savedCharacter);
  });
  it("saves a character linked to a tvshow", async () => {
    const characterReq = {
      characterName: "Harvey Specter",
      actorName: "Gabriel Macht",
    };
    const savedCharacter = {
      id: 1,
      characterName: "Harvey Specter",
      actorName: "Gabriel Macht",
      movieId: null,
      tvShowId: 1,
    };
    prisma_1.default.character.create.mockResolvedValue(savedCharacter);
    const service = new SaveCharacterService_1.SaveCharacterService();
    const result = await service.execute(characterReq, 1, undefined);
    expect(prisma_1.default.character.create).toHaveBeenCalledWith({
      data: {
        ...characterReq,
        tvShowId: 1,
        movieId: undefined,
      },
    });
    expect(prisma_1.default.character.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual(savedCharacter);
  });
});
//# sourceMappingURL=SaveCharacterService.spec.js.map
