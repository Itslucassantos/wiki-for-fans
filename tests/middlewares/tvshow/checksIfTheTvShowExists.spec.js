"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../src/prisma"));
const checksIfTheTvShowExists_1 = require("../../../src/middlewares/tvShow/checksIfTheTvShowExists");
jest.mock("../../../src/prisma", () => ({
  tvShow: {
    findUnique: jest.fn(),
  },
}));
describe("checksIfTheTvShowExists middleware", () => {
  const mockFindUnique = prisma_1.default.tvShow.findUnique;
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("calls next() when tv show exists", async () => {
    mockFindUnique.mockResolvedValue({ id: 1, name: "Breaking Bad" });
    const req = {
      query: { id: "1" },
      body: {},
    };
    const res = {};
    const next = jest.fn();
    await (0, checksIfTheTvShowExists_1.checksIfTheTvShowExists)(req, res, next);
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(next).toHaveBeenCalledTimes(1);
  });
  it("returns 404 when tv show does not exist", async () => {
    mockFindUnique.mockResolvedValue(null);
    const status = jest.fn().mockReturnThis();
    const json = jest.fn();
    const req = {
      query: { id: "999" },
      body: {},
    };
    const res = {
      status,
      json,
    };
    const next = jest.fn();
    await (0, checksIfTheTvShowExists_1.checksIfTheTvShowExists)(req, res, next);
    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({
      error: "Tv Show not found",
    });
    expect(next).not.toHaveBeenCalled();
  });
  it("uses id from body when query id is missing", async () => {
    mockFindUnique.mockResolvedValue({ id: 2 });
    const req = {
      query: {},
      body: { id: 2 },
    };
    const res = {};
    const next = jest.fn();
    await (0, checksIfTheTvShowExists_1.checksIfTheTvShowExists)(req, res, next);
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { id: 2 },
    });
    expect(next).toHaveBeenCalled();
  });
});
//# sourceMappingURL=checksIfTheTvShowExists.spec.js.map
