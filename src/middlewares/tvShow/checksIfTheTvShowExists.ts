import { NextFunction, Request, Response } from "express";
import prismaClient from "../../prisma";

export async function checksIfTheTvShowExists(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.query.id || req.body.id);

  const tvShow = await prismaClient.tvShow.findUnique({
    where: { id },
  });

  if (!tvShow) {
    return res.status(404).json({ error: "Tv Show not found" });
  }

  return next();
}
