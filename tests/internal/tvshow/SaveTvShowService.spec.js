"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../src/prisma"));
const SaveTvShowService_1 = require("../../../src/services/internal/tvShow/SaveTvShowService");
jest.mock("../../../src/prisma");
describe("SaveTvShowService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("saves a tv show with lowercase name and returns it", async () => {
    const tvShowReq = {
      name: "Suits",
    };
    const savedTvShow = {
      id: 1,
      name: "suits",
    };
    prisma_1.default.tvShow.create.mockResolvedValue(savedTvShow);
    const service = new SaveTvShowService_1.SaveTvShowService();
    const result = await service.execute(tvShowReq);
    expect(prisma_1.default.tvShow.create).toHaveBeenCalledWith({
      data: {
        ...tvShowReq,
        name: "suits",
      },
    });
    expect(prisma_1.default.tvShow.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual(savedTvShow);
  });
});
//# sourceMappingURL=SaveTvShowService.spec.js.map
