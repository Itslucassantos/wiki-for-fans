import prismaClient from "../../../prisma";
import { MovieProps } from "../../../types/movie.types";

class SaveMovieService {
  async execute(movieReq: MovieProps) {
    const savedMovie = await prismaClient.movie.create({
      data: {
        ...movieReq,
        title: movieReq.title.toLowerCase(),
      },
    });

    return savedMovie;
  }
}

export { SaveMovieService };
