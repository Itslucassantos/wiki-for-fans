"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../src/prisma"));
const SearchTvShowByIdService_1 = require("../../../src/services/internal/tvShow/SearchTvShowByIdService");
jest.mock("../../../src/prisma");
describe("SearchTvShowByIdService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("returns a TV show by id including characters", async () => {
    const tvShow = {
      id: 1,
      name: "suits",
    };
    prisma_1.default.tvShow.findUnique.mockResolvedValue(tvShow);
    const service = new SearchTvShowByIdService_1.SearchTvShowByIdService();
    const result = await service.execute({ id: 1 });
    expect(prisma_1.default.tvShow.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: {
        characters: true,
      },
    });
    expect(prisma_1.default.tvShow.findUnique).toHaveBeenCalledTimes(1);
    expect(result).toEqual(tvShow);
  });
  it("returns null when TV show is not found", async () => {
    prisma_1.default.tvShow.findUnique.mockResolvedValue(null);
    const service = new SearchTvShowByIdService_1.SearchTvShowByIdService();
    const result = await service.execute({ id: 2 });
    expect(result).toBeNull();
    expect(prisma_1.default.tvShow.findUnique).toHaveBeenCalledTimes(1);
  });
});
//# sourceMappingURL=SearchTvShowByIdService.spec.js.map
