import prismaClient from "../../../src/prisma";
import { SearchAllFavoriteTvShowsService } from "../../../src/services/internal/tvShow/SearchAllFavoriteTvShowsService";

jest.mock("../../../src/prisma");

describe("SearchAllFavoriteTvShowsService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns all favorite TV shows", async () => {
    const tvShows = [{ name: "suits" }, { name: "breaking bad" }];
    (prismaClient.tvShow.findMany as jest.Mock).mockResolvedValue(tvShows);

    const service = new SearchAllFavoriteTvShowsService();
    const results = await service.execute();

    expect(results).toEqual(tvShows);
    expect(prismaClient.tvShow.findMany).toHaveBeenCalledWith({
      where: {
        favorite: true,
      },
    });
    expect(prismaClient.tvShow.findMany).toHaveBeenCalledTimes(1);
  });

  it("returns an empty array when there are no favorite TV shows", async () => {
    (prismaClient.tvShow.findMany as jest.Mock).mockResolvedValue([]);

    const service = new SearchAllFavoriteTvShowsService();
    const results = await service.execute();

    expect(results).toEqual([]);
  });
});
