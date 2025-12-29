import prismaClient from "../../../src/prisma";
import { SearchTvShowByIdService } from "../../../src/services/internal/tvShow/SearchTvShowByIdService";

jest.mock("../../../src/prisma");

describe("SearchTvShowByIdService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns a TV show by id including characters", async () => {
    const tvShow = {
      id: 1,
      name: "suits",
    };
    (prismaClient.tvShow.findUnique as jest.Mock).mockResolvedValue(tvShow);

    const service = new SearchTvShowByIdService();
    const result = await service.execute({ id: 1 });

    expect(prismaClient.tvShow.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: {
        characters: true,
      },
    });
    expect(prismaClient.tvShow.findUnique).toHaveBeenCalledTimes(1);
    expect(result).toEqual(tvShow);
  });

  it("returns null when TV show is not found", async () => {
    (prismaClient.tvShow.findUnique as jest.Mock).mockResolvedValue(null);

    const service = new SearchTvShowByIdService();
    const result = await service.execute({ id: 2 });

    expect(result).toBeNull();
    expect(prismaClient.tvShow.findUnique).toHaveBeenCalledTimes(1);
  });
});
