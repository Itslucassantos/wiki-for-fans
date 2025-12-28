import prismaClient from "../../../src/prisma";
import { SaveCharacterService } from "../../../src/services/internal/character/SaveCharacterService";
import { CharacterProps } from "../../../src/types/character.types";

jest.mock("../../../src/prisma");

describe("SaveCharacterService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("saves a character linked to a movie", async () => {
    const characterReq = {
      characterName: "Frank Dux",
      actorName: "Jean-Claude Van Damme",
    } as CharacterProps;

    const savedCharacter = {
      id: 1,
      characterName: "Frank Dux",
      actorName: "Jean-Claude Van Damme",
      movieId: 1,
      tvShowId: null,
    };

    (prismaClient.character.create as jest.Mock).mockResolvedValue(
      savedCharacter
    );

    const service = new SaveCharacterService();
    const result = await service.execute(characterReq, undefined, 1);

    expect(prismaClient.character.create).toHaveBeenCalledWith({
      data: {
        ...characterReq,
        tvShowId: undefined,
        movieId: 1,
      },
    });
    expect(prismaClient.character.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual(savedCharacter);
  });

  it("saves a character linked to a tvshow", async () => {
    const characterReq = {
      characterName: "Harvey Specter",
      actorName: "Gabriel Macht",
    } as CharacterProps;

    const savedCharacter = {
      id: 1,
      characterName: "Harvey Specter",
      actorName: "Gabriel Macht",
      movieId: null,
      tvShowId: 1,
    };

    (prismaClient.character.create as jest.Mock).mockResolvedValue(
      savedCharacter
    );

    const service = new SaveCharacterService();
    const result = await service.execute(characterReq, 1, undefined);

    expect(prismaClient.character.create).toHaveBeenCalledWith({
      data: {
        ...characterReq,
        tvShowId: 1,
        movieId: undefined,
      },
    });
    expect(prismaClient.character.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual(savedCharacter);
  });
});
