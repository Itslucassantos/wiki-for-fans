"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SearchMovieByIdService_1 = require("../../../src/services/internal/movie/SearchMovieByIdService");
const checksIfTheMovieExists_1 = require("../../../src/middlewares/movie/checksIfTheMovieExists");
jest.mock("../../../src/services/internal/movie/SearchMovieByIdService");
describe("checksIfTheMovieExists middleware", () => {
  const mockExecute = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    SearchMovieByIdService_1.SearchMovieByIdService.mockImplementation(() => {
      return {
        execute: mockExecute,
      };
    });
  });
  it("calls next() when movie exists", async () => {
    mockExecute.mockResolvedValue({ id: 1, title: "Inception" });
    const req = {
      query: { id: "1" },
      body: {},
    };
    const res = {};
    const next = jest.fn();
    await (0, checksIfTheMovieExists_1.checksIfTheMovieExists)(req, res, next);
    expect(mockExecute).toHaveBeenCalledWith({ id: 1 });
    expect(next).toHaveBeenCalledTimes(1);
  });
  it("returns 404 when movie does not exist", async () => {
    mockExecute.mockResolvedValue(null);
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
    await (0, checksIfTheMovieExists_1.checksIfTheMovieExists)(req, res, next);
    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({ error: "Movie not found" });
    expect(next).not.toHaveBeenCalled();
  });
  it("uses id from body when query id is missing", async () => {
    mockExecute.mockResolvedValue({ id: 2 });
    const req = {
      query: {},
      body: { id: 2 },
    };
    const res = {};
    const next = jest.fn();
    await (0, checksIfTheMovieExists_1.checksIfTheMovieExists)(req, res, next);
    expect(mockExecute).toHaveBeenCalledWith({ id: 2 });
    expect(next).toHaveBeenCalled();
  });
});
//# sourceMappingURL=checksIfTheMovieExists.spec.js.map
