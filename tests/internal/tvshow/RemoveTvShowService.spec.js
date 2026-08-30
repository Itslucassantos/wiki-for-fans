"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../src/prisma"));
const RemoveTvShowService_1 = require("../../../src/services/internal/tvShow/RemoveTvShowService");
jest.mock("../../../src/prisma");
describe("RemoveTvShowService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("removes a tvshow by id and returns it", async () => {
    const deleteTvShow = {
      id: 1,
      name: "suits",
    };
    prisma_1.default.tvShow.delete.mockResolvedValue(deleteTvShow);
    const service = new RemoveTvShowService_1.RemoveTvShowService();
    const result = await service.execute({ id: 1 });
    expect(prisma_1.default.tvShow.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(prisma_1.default.tvShow.delete).toHaveBeenCalledTimes(1);
    expect(result).toEqual(deleteTvShow);
  });
});
//# sourceMappingURL=RemoveTvShowService.spec.js.map
