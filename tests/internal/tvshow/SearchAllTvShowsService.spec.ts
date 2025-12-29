import prismaClient from "../../../src/prisma";
import { SearchAllTvShowsService } from "../../../src/services/internal/tvShow/SearchAllTvShowsService";

jest.mock("../../../src/prisma");

describe("SearchAllTvShowsService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns all TV shows", async () => {
    const tvShows = [{ name: "suits" }, { name: "breaking bad" }];
    (prismaClient.tvShow.findMany as jest.Mock).mockResolvedValue(tvShows);

    const service = new SearchAllTvShowsService();
    const results = await service.execute();

    expect(results).toEqual(tvShows);
    expect(prismaClient.tvShow.findMany).toHaveBeenCalledWith();
    expect(prismaClient.tvShow.findMany).toHaveBeenCalledTimes(1);
  });

  it("returns an empty array when there are no TV shows", async () => {
    (prismaClient.tvShow.findMany as jest.Mock).mockResolvedValue([]);

    const service = new SearchAllTvShowsService();
    const results = await service.execute();

    expect(results).toEqual([]);
    expect(prismaClient.tvShow.findMany).toHaveBeenCalledWith();
  });
});
