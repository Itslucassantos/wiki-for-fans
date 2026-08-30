"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../src/prisma"));
const RemoveMovieService_1 = require("../../../src/services/internal/movie/RemoveMovieService");
jest.mock("../../../src/prisma");
describe("RemoveMovieService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("removes a movie by id and returns it", async () => {
    const deleteMovie = {
      id: 1,
      title: "bloodsport",
    };
    prisma_1.default.movie.delete.mockResolvedValue(deleteMovie);
    const service = new RemoveMovieService_1.RemoveMovieService();
    const result = await service.execute({ id: 1 });
    expect(prisma_1.default.movie.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(prisma_1.default.movie.delete).toHaveBeenCalledTimes(1);
    expect(result).toEqual(deleteMovie);
  });
});
//# sourceMappingURL=RemoveMovieService.spec.js.map
