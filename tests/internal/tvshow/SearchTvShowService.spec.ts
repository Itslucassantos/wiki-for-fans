import prismaClient from "../../../src/prisma";
import { SearchTvShowService } from "../../../src/services/internal/tvShow/SearchTvShowService";

jest.mock("../../../src/prisma");

describe("SearchTvShowService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns null when TV show is not found", async () => {
    (prismaClient.tvShow.findFirst as jest.Mock).mockResolvedValue(null);

    const service = new SearchTvShowService();
    const result = await service.execute({ name: "Not exists" });

    expect(result).toBeNull();
    expect(prismaClient.tvShow.findFirst).toHaveBeenCalledWith({
      where: {
        name: "Not exists",
      },
      include: {
        characters: true,
      },
    });
    expect(prismaClient.tvShow.findFirst).toHaveBeenCalledTimes(1);
  });

  it("returns the TV show when found", async () => {
    (prismaClient.tvShow.findFirst as jest.Mock).mockResolvedValue({
      id: 1,
      name: "suits",
      originalTitle: "Suits",
      genres: [],
    });

    const service = new SearchTvShowService();
    const result = await service.execute({ name: "suits" });

    expect(result).not.toBeNull();
    expect(result).toMatchObject({
      id: 1,
      name: "suits",
      originalTitle: "Suits",
    });
    expect(prismaClient.tvShow.findFirst).toHaveBeenCalledTimes(1);
  });
});
