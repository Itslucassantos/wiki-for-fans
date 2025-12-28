import prismaClient from "../../../src/prisma";
import { RemoveTvShowService } from "../../../src/services/internal/tvShow/RemoveTvShowService";

jest.mock("../../../src/prisma");

describe("RemoveTvShowService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("removes a tvshow by id and returns it", async () => {
    const deleteTvShow = {
      id: 1,
      name: "suits",
    };
    (prismaClient.tvShow.delete as jest.Mock).mockResolvedValue(deleteTvShow);

    const service = new RemoveTvShowService();
    const result = await service.execute({ id: 1 });

    expect(prismaClient.tvShow.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(prismaClient.tvShow.delete).toHaveBeenCalledTimes(1);
    expect(result).toEqual(deleteTvShow);
  });
});
