import prismaClient from "../../../src/prisma";
import { SaveFavoriteTvShowService } from "../../../src/services/internal/tvShow/SaveFavoriteTvShowService";

jest.mock("../../../src/prisma");

describe("SaveFavoriteTvShowService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Saves a favorite tv show and returns it", async () => {
    const tvShow = {
      id: 1,
      name: "suits",
      favorite: true,
    };
    (prismaClient.tvShow.update as jest.Mock).mockResolvedValue(tvShow);

    const service = new SaveFavoriteTvShowService();
    const result = await service.execute({ id: 1, favorite: true });

    expect(prismaClient.tvShow.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { favorite: true },
    });
    expect(prismaClient.tvShow.update).toHaveBeenCalledTimes(1);
    expect(result).toEqual(tvShow);
  });
});
