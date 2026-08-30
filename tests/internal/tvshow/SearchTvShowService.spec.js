"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../src/prisma"));
const SearchTvShowService_1 = require("../../../src/services/internal/tvShow/SearchTvShowService");
jest.mock("../../../src/prisma");
describe("SearchTvShowService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("returns null when TV show is not found", async () => {
    prisma_1.default.tvShow.findFirst.mockResolvedValue(null);
    const service = new SearchTvShowService_1.SearchTvShowService();
    const result = await service.execute({ name: "Not exists" });
    expect(result).toBeNull();
    expect(prisma_1.default.tvShow.findFirst).toHaveBeenCalledWith({
      where: {
        name: "Not exists",
      },
      include: {
        characters: true,
      },
    });
    expect(prisma_1.default.tvShow.findFirst).toHaveBeenCalledTimes(1);
  });
  it("returns the TV show when found", async () => {
    prisma_1.default.tvShow.findFirst.mockResolvedValue({
      id: 1,
      name: "suits",
      originalTitle: "Suits",
      genres: [],
    });
    const service = new SearchTvShowService_1.SearchTvShowService();
    const result = await service.execute({ name: "suits" });
    expect(result).not.toBeNull();
    expect(result).toMatchObject({
      id: 1,
      name: "suits",
      originalTitle: "Suits",
    });
    expect(prisma_1.default.tvShow.findFirst).toHaveBeenCalledTimes(1);
  });
});
//# sourceMappingURL=SearchTvShowService.spec.js.map
