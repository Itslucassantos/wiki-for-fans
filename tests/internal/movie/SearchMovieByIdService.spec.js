"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../src/prisma"));
const SearchMovieByIdService_1 = require("../../../src/services/internal/movie/SearchMovieByIdService");
jest.mock("../../../src/prisma");
describe("SearchMovieByIdService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("returns a movie by id including characters", async () => {
    const movie = {
      id: 1,
      title: "bloodsport",
    };
    prisma_1.default.movie.findUnique.mockResolvedValue(movie);
    const service = new SearchMovieByIdService_1.SearchMovieByIdService();
    const result = await service.execute({ id: 1 });
    expect(prisma_1.default.movie.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: {
        characters: true,
      },
    });
    expect(prisma_1.default.movie.findUnique).toHaveBeenCalledTimes(1);
    expect(result).toEqual(movie);
  });
  it("returns null when movie is not found", async () => {
    prisma_1.default.movie.findUnique.mockResolvedValue(null);
    const service = new SearchMovieByIdService_1.SearchMovieByIdService();
    const result = await service.execute({ id: 2 });
    expect(result).toBeNull();
    expect(prisma_1.default.movie.findUnique).toHaveBeenCalledTimes(1);
  });
});
//# sourceMappingURL=SearchMovieByIdService.spec.js.map
