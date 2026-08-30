"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../src/prisma"));
const SearchAllFavoriteTvShowsService_1 = require("../../../src/services/internal/tvShow/SearchAllFavoriteTvShowsService");
jest.mock("../../../src/prisma");
describe("SearchAllFavoriteTvShowsService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("returns all favorite TV shows", async () => {
    const tvShows = [{ name: "suits" }, { name: "breaking bad" }];
    prisma_1.default.tvShow.findMany.mockResolvedValue(tvShows);
    const service = new SearchAllFavoriteTvShowsService_1.SearchAllFavoriteTvShowsService();
    const results = await service.execute();
    expect(results).toEqual(tvShows);
    expect(prisma_1.default.tvShow.findMany).toHaveBeenCalledWith({
      where: {
        favorite: true,
      },
    });
    expect(prisma_1.default.tvShow.findMany).toHaveBeenCalledTimes(1);
  });
  it("returns an empty array when there are no favorite TV shows", async () => {
    prisma_1.default.tvShow.findMany.mockResolvedValue([]);
    const service = new SearchAllFavoriteTvShowsService_1.SearchAllFavoriteTvShowsService();
    const results = await service.execute();
    expect(results).toEqual([]);
  });
});
//# sourceMappingURL=SearchAllFavoriteTvShowsService.spec.js.map
