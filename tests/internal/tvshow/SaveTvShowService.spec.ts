import prismaClient from "../../../src/prisma";
import {
  SaveTvShowService,
  TvShowReq,
} from "../../../src/services/internal/tvShow/SaveTvShowService";

jest.mock("../../../src/prisma");

describe("SaveTvShowService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("saves a tv show with lowercase name and returns it", async () => {
    const tvShowReq = {
      name: "Suits",
    } as TvShowReq;

    const savedTvShow = {
      id: 1,
      name: "suits",
    };

    (prismaClient.tvShow.create as jest.Mock).mockResolvedValue(savedTvShow);

    const service = new SaveTvShowService();
    const result = await service.execute(tvShowReq);

    expect(prismaClient.tvShow.create).toHaveBeenCalledWith({
      data: {
        ...tvShowReq,
        name: "suits",
      },
    });
    expect(prismaClient.tvShow.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual(savedTvShow);
  });
});
