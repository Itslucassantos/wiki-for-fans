import prismaClient from "../../../prisma";

interface TvShowReq {
  id: number;
  name: string;
  originalName: string;
  overview: string;
  posterImage: string | null;
  backdropImage: string | null;
  firstAirDate: string;
  voteAverage: number;
  voteCount: number;
  numberOfSeasons: number;
  numberOfEpisodes: number;
  status: string;
  genres: Array<{ id: number; name: string }>;
}

class SaveTvShowService {
  async execute(tvShowReq: TvShowReq) {
    const tvShowSaved = await prismaClient.tvShow.create({
      data: {
        ...tvShowReq,
        name: tvShowReq.name.toLowerCase(),
      },
    });

    return tvShowSaved;
  }
}

export { SaveTvShowService };
