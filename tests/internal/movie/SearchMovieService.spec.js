"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../src/prisma"));
const SearchMovieService_1 = require("../../../src/services/internal/movie/SearchMovieService");
jest.mock("../../../src/prisma");
describe("SearchMovieService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("returns null when movie is not found", async () => {
    prisma_1.default.movie.findFirst.mockResolvedValue(null);
    const service = new SearchMovieService_1.SearchMovieService();
    const result = await service.execute({ name: "Not exists" });
    expect(result).toBeNull();
    expect(prisma_1.default.movie.findFirst).toHaveBeenCalledWith({
      where: {
        title: "Not exists",
      },
      include: {
        characters: true,
      },
    });
    expect(prisma_1.default.movie.findFirst).toHaveBeenCalledTimes(1);
  });
  it("returns the movie when found", async () => {
    prisma_1.default.movie.findFirst.mockResolvedValue({
      id: 1,
      title: "bloodsport",
      originalTitle: "Bloodsport",
      genres: [],
      productionCompanies: [],
      productionCountries: [],
      characters: [],
    });
    const service = new SearchMovieService_1.SearchMovieService();
    const result = await service.execute({ name: "Bloodsport" });
    expect(result).not.toBeNull();
    expect(result).toMatchObject({
      id: 1,
      title: "bloodsport",
      originalTitle: "Bloodsport",
    });
    expect(prisma_1.default.movie.findFirst).toHaveBeenCalledTimes(1);
  });
});
//# sourceMappingURL=SearchMovieService.spec.js.map
