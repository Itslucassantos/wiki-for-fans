import { NextFunction, Request, Response } from "express";
import { SearchMovieByIdService } from "../../services/internal/movie/SearchMovieByIdService";

export async function checksIfTheMovieExists(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.query.id || req.body.id);

  const searchMovieByIdService = new SearchMovieByIdService();

  const movie = await searchMovieByIdService.execute({ id });

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  return next();
}
