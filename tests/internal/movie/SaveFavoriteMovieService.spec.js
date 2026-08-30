"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../src/prisma"));
const SaveFavoriteMovieService_1 = require("../../../src/services/internal/movie/SaveFavoriteMovieService");
jest.mock("../../../src/prisma");
describe("SaveFavoriteMovieService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("Saves a favorite movie and returns it", async () => {
    const movie = {
      id: 1,
      title: "bloodsport",
      favorite: true,
    };
    prisma_1.default.movie.update.mockResolvedValue(movie);
    const service = new SaveFavoriteMovieService_1.SaveFavoriteMovieService();
    const result = await service.execute({ id: 1, favorite: true });
    expect(prisma_1.default.movie.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { favorite: true },
    });
    expect(prisma_1.default.movie.update).toHaveBeenCalledTimes(1);
    expect(result).toEqual(movie);
  });
});
//# sourceMappingURL=SaveFavoriteMovieService.spec.js.map
