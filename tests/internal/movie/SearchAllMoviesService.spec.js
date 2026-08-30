"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../src/prisma"));
const SearchAllMoviesService_1 = require("../../../src/services/internal/movie/SearchAllMoviesService");
jest.mock("../../../src/prisma");
describe("SearchAllMoviesService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("returns all movies", async () => {
    const movies = [{ title: "bloodsport" }, { title: "rocky balboa 1" }];
    prisma_1.default.movie.findMany.mockResolvedValue(movies);
    const service = new SearchAllMoviesService_1.SearchAllMoviesService();
    const results = await service.execute();
    expect(results).toEqual(movies);
    expect(prisma_1.default.movie.findMany).toHaveBeenCalledWith();
    expect(prisma_1.default.movie.findMany).toHaveBeenCalledTimes(1);
  });
  it("returns an empty array when there are no movies", async () => {
    prisma_1.default.movie.findMany.mockResolvedValue([]);
    const service = new SearchAllMoviesService_1.SearchAllMoviesService();
    const results = await service.execute();
    expect(results).toEqual([]);
    expect(prisma_1.default.movie.findMany).toHaveBeenCalledWith();
  });
});
//# sourceMappingURL=SearchAllMoviesService.spec.js.map
