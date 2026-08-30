"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../src/prisma"));
const SaveFavoriteTvShowService_1 = require("../../../src/services/internal/tvShow/SaveFavoriteTvShowService");
jest.mock("../../../src/prisma");
describe("SaveFavoriteTvShowService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("Saves a favorite tv show and returns it", async () => {
    const tvShow = {
      id: 1,
      name: "suits",
      favorite: true,
    };
    prisma_1.default.tvShow.update.mockResolvedValue(tvShow);
    const service = new SaveFavoriteTvShowService_1.SaveFavoriteTvShowService();
    const result = await service.execute({ id: 1, favorite: true });
    expect(prisma_1.default.tvShow.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { favorite: true },
    });
    expect(prisma_1.default.tvShow.update).toHaveBeenCalledTimes(1);
    expect(result).toEqual(tvShow);
  });
});
//# sourceMappingURL=SaveFavoriteTvShowService.spec.js.map
