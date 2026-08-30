"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../src/prisma"));
const SearchAllTvShowsService_1 = require("../../../src/services/internal/tvShow/SearchAllTvShowsService");
jest.mock("../../../src/prisma");
describe("SearchAllTvShowsService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("returns all TV shows", async () => {
    const tvShows = [{ name: "suits" }, { name: "breaking bad" }];
    prisma_1.default.tvShow.findMany.mockResolvedValue(tvShows);
    const service = new SearchAllTvShowsService_1.SearchAllTvShowsService();
    const results = await service.execute();
    expect(results).toEqual(tvShows);
    expect(prisma_1.default.tvShow.findMany).toHaveBeenCalledWith();
    expect(prisma_1.default.tvShow.findMany).toHaveBeenCalledTimes(1);
  });
  it("returns an empty array when there are no TV shows", async () => {
    prisma_1.default.tvShow.findMany.mockResolvedValue([]);
    const service = new SearchAllTvShowsService_1.SearchAllTvShowsService();
    const results = await service.execute();
    expect(results).toEqual([]);
    expect(prisma_1.default.tvShow.findMany).toHaveBeenCalledWith();
  });
});
//# sourceMappingURL=SearchAllTvShowsService.spec.js.map
