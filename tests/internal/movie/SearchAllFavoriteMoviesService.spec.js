"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../src/prisma"));
const SearchAllFavoriteMoviesService_1 = require("../../../src/services/internal/movie/SearchAllFavoriteMoviesService");
jest.mock("../../../src/prisma");
describe("SearchAllFavoriteMoviesService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("returns all favorite movies", async () => {
    const movies = [{ title: "bloodsport" }, { title: "rocky balboa 1" }];
    prisma_1.default.movie.findMany.mockResolvedValue(movies);
    const service = new SearchAllFavoriteMoviesService_1.SearchAllFavoriteMoviesService();
    const results = await service.execute();
    expect(results).toEqual(movies);
    expect(prisma_1.default.movie.findMany).toHaveBeenCalledWith({
      where: {
        favorite: true,
      },
    });
    expect(prisma_1.default.movie.findMany).toHaveBeenCalledTimes(1);
  });
  it("returns an empty array when there are no favorite movies", async () => {
    prisma_1.default.movie.findMany.mockResolvedValue([]);
    const service = new SearchAllFavoriteMoviesService_1.SearchAllFavoriteMoviesService();
    const results = await service.execute();
    expect(results).toEqual([]);
  });
});
//# sourceMappingURL=SearchAllFavoriteMoviesService.spec.js.map
