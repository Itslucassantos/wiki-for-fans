"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../src/prisma"));
const SaveMovieService_1 = require("../../../src/services/internal/movie/SaveMovieService");
jest.mock("../../../src/prisma");
describe("SaveMovieService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("saves a movie with lowercase title and returns it", async () => {
    const movieReq = {
      title: "Bloodsport",
    };
    const savedMovie = {
      id: 1,
      title: "bloodsport",
    };
    prisma_1.default.movie.create.mockResolvedValue(savedMovie);
    const service = new SaveMovieService_1.SaveMovieService();
    const result = await service.execute(movieReq);
    expect(prisma_1.default.movie.create).toHaveBeenCalledWith({
      data: {
        ...movieReq,
        title: "bloodsport",
      },
    });
    expect(prisma_1.default.movie.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual(savedMovie);
  });
});
//# sourceMappingURL=SaveMovieService.spec.js.map
