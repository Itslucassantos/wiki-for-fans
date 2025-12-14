import api from "../../http/api";
import { IdMovieOrTvShow } from "../../types/tvShowAndMovie.types";
import { ImageUrlBuilder } from "../../utils/ImageUrlBuilder";

interface TvShowResult {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  number_of_seasons: number;
  number_of_episodes: number;
  status: string;
  genres: Array<{ id: number; name: string }>;
}

class SearchTvShowDetailsTmdbService {
  private readonly tmdbApiKey = process.env.TMDB_API_KEY;

  async execute({ id }: IdMovieOrTvShow) {
    const searchTvShowDetails = await api.get<TvShowResult>(`/tv/${id}`, {
      params: { api_key: this.tmdbApiKey, language: "en-US" },
    });

    const tv = searchTvShowDetails.data;

    return {
      id: tv.id,
      name: tv.name,
      originalName: tv.original_name,
      overview: tv.overview,
      posterImage: ImageUrlBuilder.build(tv.poster_path) ?? null,
      backdropImage: ImageUrlBuilder.build(tv.backdrop_path) ?? null,
      firstAirDate: tv.first_air_date,
      voteAverage: tv.vote_average,
      voteCount: tv.vote_count,
      numberOfSeasons: tv.number_of_seasons,
      numberOfEpisodes: tv.number_of_episodes,
      status: tv.status,
      genres: tv.genres.map((g) => ({
        id: g.id,
        name: g.name,
      })),
    };
  }
}

export { SearchTvShowDetailsTmdbService };
