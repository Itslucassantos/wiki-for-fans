import { Request, Response, NextFunction } from "express";
import prismaClient from "../../../src/prisma";
import { checksIfTheTvShowExists } from "../../../src/middlewares/tvShow/checksIfTheTvShowExists";

jest.mock("../../../src/prisma", () => ({
  tvShow: {
    findUnique: jest.fn(),
  },
}));

describe("checksIfTheTvShowExists middleware", () => {
  const mockFindUnique = prismaClient.tvShow.findUnique as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls next() when tv show exists", async () => {
    mockFindUnique.mockResolvedValue({ id: 1, name: "Breaking Bad" });

    const req = {
      query: { id: "1" },
      body: {},
    } as unknown as Request;

    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    await checksIfTheTvShowExists(req, res, next);

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
    } as unknown as Request;

    const res = {
      status,
      json,
    } as unknown as Response;

    const next = jest.fn();

    await checksIfTheTvShowExists(req, res, next);

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
    } as unknown as Request;

    const res = {} as Response;
    const next = jest.fn();

    await checksIfTheTvShowExists(req, res, next);

    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { id: 2 },
    });
    expect(next).toHaveBeenCalled();
  });
});
