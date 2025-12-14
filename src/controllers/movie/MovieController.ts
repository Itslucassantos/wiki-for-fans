import { Request, Response } from "express";
import { MovieService } from "../../services/movie/MovieService";

class MovieController {
  async handle(req: Request, res: Response) {
    const nameReq = req.body.nameReq as string;

    const name = nameReq.toLowerCase();

    const movieService = new MovieService();

    const movie = await movieService.execute({ name });

    return res.json(movie);
  }
}

export { MovieController };
