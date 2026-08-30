[LICENSE__BADGE]: https://img.shields.io/github/license/Fernanda-Kipper/Readme-Templates?style=for-the-badge
[JAVASCRIPT__BADGE]: https://img.shields.io/badge/Javascript-000?style=for-the-badge&logo=javascript
[TYPESCRIPT__BADGE]: https://img.shields.io/badge/typescript-D4FAFF?style=for-the-badge&logo=typescript
[EXPRESS__BADGE]: https://img.shields.io/badge/express-005CFE?style=for-the-badge&logo=express
[POSTGRES__BADGE]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[NODEJS__BADGE]: https://img.shields.io/badge/node.js-24.4.1-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[PRISMA_BADGE]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[DOCKER_BADGE]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[GIT_BADGE]: https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white

<h1 align="center" style="font-weight: bold;">Wiki for fans 💻</h1>

![license][LICENSE__BADGE]
![nodejs][NODEJS__BADGE]
![express][EXPRESS__BADGE]
![typescript][TYPESCRIPT__BADGE]
![javascript][JAVASCRIPT__BADGE]
![prisma][PRISMA_BADGE]
![postgres][POSTGRES__BADGE]
![docker][DOCKER_BADGE]
![git][GIT_BADGE]

<details open="open">
<summary>Table of Contents</summary>

- [🚀 Getting started](#started)
  - [Prerequisites](#prerequisites)
  - [Cloning](#cloning)
  - [Environment Variables](#environment-variables)
  - [Starting](#starting)
- [📍 API Endpoints](#routes)
- [🤝 Collaborators](#colab)

</details>

<p align="center">
  <b>This project is a fan wiki. You can search for a movie or TV series and quickly see all its details, including the characters that belong to it, as well as information about both the characters and the movie. You can favorite a movie to watch later, view a list of all the movies you have already searched for, delete previously searched movies, and more.</b>
</p>

<h2 id="started">🚀 Getting started</h2>

1. Clone the project and open CMD in the project folder.

2. Change the name of the .env.example file to .env

3. Create an account on the [TMDB API](https://developer.themoviedb.org/docs/getting-started) and log in.

4. After logging into the TMDB API, click on settings and then on API. Then simply generate your key.

5. After that, simply add your key to the .env file in the variable called **TMDB_API_KEY**

6. Run the following command to start the Docker container with the project:

```bash
  docker compose up -d --build
```

7. Run the following command to run the migrations:

```bash
  docker compose exec api npx prisma migrate dev
```

Once this is done, the project is configured and running.

<h3 id="prerequisites">Prerequisites</h3>

- NodeJS 24
- Git
- Docker

<h3 id="cloning">Cloning</h3>

```bash
git clone https://github.com/Itslucassantos/wiki-for-fans.git
```

<h3 id="environment-variables">Environment Variables</h3>

Use the `.env.example` as reference to create your configuration file `.env` with your TMDB_API_KEY

```yaml
TMDB_API_KEY=your_tmdb_api_key_here

DATABASE_URL="postgresql://postgres:postgres@postgres:5432/wiki_for_fans?schema=public"
```

<h3 id="starting">Starting</h3>

**After completing the steps to run the project with Docker: [Getting started](#started), the project is already running; you just need to open Postman to execute the endpoints**

<h4>To run the unit tests:</h4>

```bash
npm i
npm run test
```

OBS: If you are on Linux and encounter a permission error, run this command first:

```bash
sudo chown -R $USER:$USER path to the project folder

example: sudo chown -R $USER:$USER /home/itslucassantos/Downloads/test/wiki-for-fans
```

<h2 id="routes">📍 API Endpoints</h2>

<h3>Tv show</h3>
​

| route                                           | description                                                                                                                              |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| <kbd>POST /tvshow</kbd>                         | It searches for a tv show and saves it to the internal database the first time, and then returns it [request details](#post-tvshow-save) |
| <kbd>POST /tvshow/favorite</kbd>                | Favorite a tv show [request details](#post-tvshow-favorite)                                                                              |
| <kbd>GET /tvshow/searchTvShowById?id=1399</kbd> | Search for a TV show by ID [response details](#get-tvshow-by-id)                                                                         |
| <kbd>GET /tvshow/searchAllTvShows</kbd>         | Search for all TV shows [response details](#get-all-tvshows)                                                                             |
| <kbd>GET /tvshow/searchAllFavorites</kbd>       | Search for all your favorite TV shows [response details](#get-all-favorite-tvshow)                                                       |
| <kbd>DELETE /tvshow/remove?id=1399</kbd>        | Remove a TV show by ID [response details](#delete-tvshow)                                                                                |

<h3>Movie</h3>
​

| route                                          | description                                                                                                                           |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| <kbd>POST /movie</kbd>                         | It searches for a movie and saves it to the internal database the first time, and then returns it [request details](#post-movie-save) |
| <kbd>POST /movie/favorite</kbd>                | Favorite a movie [request details](#post-favorite-movie)                                                                              |
| <kbd>GET /movie/searchMovieById?id=11690</kbd> | Search for a movie by ID [response details](#get-movie-by-id)                                                                         |
| <kbd>GET /movie/searchAllMovies</kbd>          | Search for all movies [response details](#get-all-movies)                                                                             |
| <kbd>GET /movie/searchAllFavorites</kbd>       | Search for all your favorite movies [response details](#get-all-favorite-movies)                                                      |
| <kbd>DELETE /movie/remove?id=11690</kbd>       | Remove a movie by ID [response details](#remove-movie-by-id)                                                                          |

<h4>Main URL:</h4>

```bash
  http://localhost:3333
```

<h2>TvShow</h2>

<h3 id="post-tvshow-save">POST /tvshow</h3>

**REQUEST**

```json
{
  "nameReq": "Game of Thrones"
}
```

**RESPONSE**

```json
{
  "id": 1399,
  "name": "Game of Thrones",
  "originalName": "Game of Thrones",
  "overview": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
  "posterImage": "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
  "backdropImage": "https://image.tmdb.org/t/p/w500/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg",
  "firstAirDate": "2011-04-17",
  "voteAverage": 8.459,
  "voteCount": 26029,
  "numberOfSeasons": 8,
  "numberOfEpisodes": 73,
  "status": "Ended",
  "genres": [{"..."}],
  "characters": [{"..."}]
}
```

<h3 id="post-tvshow-favorite">POST /tvshow/favorite</h3>

**REQUEST**

```json
{
  "id": 1399,
  "favorite": true
}
```

**RESPONSE**

```json
{
  "id": 1399,
  "name": "Game of Thrones",
  "originalName": "Game of Thrones",
  "overview": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
  "posterImage": "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
  "backdropImage": "https://image.tmdb.org/t/p/w500/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg",
  "firstAirDate": "2011-04-17",
  "voteAverage": 8.459,
  "voteCount": 26029,
  "numberOfSeasons": 8,
  "numberOfEpisodes": 73,
  "status": "Ended",
  "genres": [{"..."}],
  "favorite": true
}
```

<h3 id="get-tvshow-by-id">GET /tvshow/searchTvShowById?id=1399</h3>

**RESPONSE**

```json
{
  "id": 1399,
  "name": "Game of Thrones",
  "originalName": "Game of Thrones",
  "overview": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
  "posterImage": "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
  "backdropImage": "https://image.tmdb.org/t/p/w500/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg",
  "firstAirDate": "2011-04-17",
  "voteAverage": 8.459,
  "voteCount": 26029,
  "numberOfSeasons": 8,
  "numberOfEpisodes": 73,
  "status": "Ended",
  "genres": [{"..."}],
  "favorite": true,
  "characters": [{"..."}]
}
```

<h3 id="get-all-tvshows">GET /tvshow/searchAllTvShows</h3>

**RESPONSE**

```json
[
  {
    "id": 1399,
    "name": "Game of Thrones",
    "originalName": "Game of Thrones",
    "overview": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
    "posterImage": "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
    "backdropImage": "https://image.tmdb.org/t/p/w500/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg",
    "firstAirDate": "2011-04-17",
    "voteAverage": 8.459,
    "voteCount": 26029,
    "numberOfSeasons": 8,
    "numberOfEpisodes": 73,
    "status": "Ended",
    "genres": [{"..."}],
    "favorite": true
  }
]
```

<h3 id="get-all-favorite-tvshow">GET /tvshow/searchAllFavorites</h3>

**RESPONSE**

```json
[
  {
    "id": 1399,
    "name": "Game of Thrones",
    "originalName": "Game of Thrones",
    "overview": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
    "posterImage": "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
    "backdropImage": "https://image.tmdb.org/t/p/w500/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg",
    "firstAirDate": "2011-04-17",
    "voteAverage": 8.459,
    "voteCount": 26029,
    "numberOfSeasons": 8,
    "numberOfEpisodes": 73,
    "status": "Ended",
    "genres": [{"..."}],
    "favorite": true
  }
]
```

<h3 id="delete-tvshow">DELETE /tvshow/remove?id=1399</h3>

**RESPONSE**

```json
{
  "id": 1399,
  "name": "Game of Thrones",
  "originalName": "Game of Thrones",
  "overview": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
  "posterImage": "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
  "backdropImage": "https://image.tmdb.org/t/p/w500/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg",
  "firstAirDate": "2011-04-17",
  "voteAverage": 8.459,
  "voteCount": 26029,
  "numberOfSeasons": 8,
  "numberOfEpisodes": 73,
  "status": "Ended",
  "genres": [{"..."}],
  "favorite": true
}
```

<h2>Movie</h2>

<h3 id="post-movie-save">POST /movie</h3>

**REQUEST**

```json
{
  "nameReq": "Bloodsport"
}
```

**RESPONSE**

```json
{
  "id": 11690,
  "imdbId": null,
  "backdropPath": "https://image.tmdb.org/t/p/w500/aSA7RuKmCQBnYKn70GYPi6ckgoY.jpg",
  "posterPath": "https://image.tmdb.org/t/p/w500/kndxR9TRK0kJ5hxzDprRSS80F2W.jpg",
  "originCountry": [
      "US"
  ],
  "originalLanguage": "en",
  "originalTitle": "Bloodsport",
  "overview": "An American Army Major goes AWOL to Hong Kong for an outlawed martial arts contest called the Kumite.",
  "popularity": 5.376,
  "releaseDate": "1988-02-26",
  "revenue": 63500000,
  "status": "Released",
  "tagline": "The true story of an American ninja.",
  "title": "bloodsport",
  "voteAverage": 7,
  "voteCount": 2038,
  "genres": [{"..."}],
  "productionCompanies": [{"..."}],
  "productionCountries": [{"..."}],
  "spokenLanguages": [{"..."}],
  "favorite": false,
  "characters": [{"..."}]
}
```

<h3 id="post-favorite-movie">POST /movie/favorite</h3>

**REQUEST**

```json
{
  "id": 11690,
  "favorite": true
}
```

**RESPONSE**

```json
{
  "id": 11690,
  "imdbId": null,
  "backdropPath": "https://image.tmdb.org/t/p/w500/aSA7RuKmCQBnYKn70GYPi6ckgoY.jpg",
  "posterPath": "https://image.tmdb.org/t/p/w500/kndxR9TRK0kJ5hxzDprRSS80F2W.jpg",
  "originCountry": [
      "US"
  ],
  "originalLanguage": "en",
  "originalTitle": "Bloodsport",
  "overview": "An American Army Major goes AWOL to Hong Kong for an outlawed martial arts contest called the Kumite.",
  "popularity": 5.376,
  "releaseDate": "1988-02-26",
  "revenue": 63500000,
  "status": "Released",
  "tagline": "The true story of an American ninja.",
  "title": "bloodsport",
  "voteAverage": 7,
  "voteCount": 2038,
  "genres": [{"..."}],
  "productionCompanies": [{"..."}],
  "productionCountries": [{"..."}],
  "spokenLanguages": [{"..."}],
  "characters": [{"..."}],
  "favorite": false
}
```

<h3 id="get-movie-by-id">GET /movie/searchMovieById?id=11690</h3>

**RESPONSE**

```json
{
  "id": 11690,
  "imdbId": null,
  "backdropPath": "https://image.tmdb.org/t/p/w500/aSA7RuKmCQBnYKn70GYPi6ckgoY.jpg",
  "posterPath": "https://image.tmdb.org/t/p/w500/kndxR9TRK0kJ5hxzDprRSS80F2W.jpg",
  "originCountry": [
      "US"
  ],
  "originalLanguage": "en",
  "originalTitle": "Bloodsport",
  "overview": "An American Army Major goes AWOL to Hong Kong for an outlawed martial arts contest called the Kumite.",
  "popularity": 5.376,
  "releaseDate": "1988-02-26",
  "revenue": 63500000,
  "status": "Released",
  "tagline": "The true story of an American ninja.",
  "title": "bloodsport",
  "voteAverage": 7,
  "voteCount": 2038,
  "genres": [{"..."}],
  "productionCompanies": [{"..."}],
  "productionCountries": [{"..."}],
  "spokenLanguages": [{"..."}],
  "favorite": true,
  "characters": [{"..."}]
}
```

<h3 id="get-all-movies">GET /movie/searchAllMovies</h3>

**RESPONSE**

```json
[
  {
    "id": 11690,
    "imdbId": null,
    "backdropPath": "https://image.tmdb.org/t/p/w500/aSA7RuKmCQBnYKn70GYPi6ckgoY.jpg",
    "posterPath": "https://image.tmdb.org/t/p/w500/kndxR9TRK0kJ5hxzDprRSS80F2W.jpg",
    "originCountry": [
        "US"
    ],
    "originalLanguage": "en",
    "originalTitle": "Bloodsport",
    "overview": "An American Army Major goes AWOL to Hong Kong for an outlawed martial arts contest called the Kumite.",
    "popularity": 5.376,
    "releaseDate": "1988-02-26",
    "revenue": 63500000,
    "status": "Released",
    "tagline": "The true story of an American ninja.",
    "title": "bloodsport",
    "voteAverage": 7,
    "voteCount": 2038,
    "genres": [{"..."}],
    "productionCompanies": [{"..."}],
    "productionCountries": [{"..."}],
    "spokenLanguages": [{"..."}],
    "favorite": true,
    "characters": [{"..."}]
  }
]
```

<h3 id="get-all-favorite-movies">GET /movie/searchAllFavorites</h3>

**RESPONSE**

```json
[
  {
    "id": 11690,
    "imdbId": null,
    "backdropPath": "https://image.tmdb.org/t/p/w500/aSA7RuKmCQBnYKn70GYPi6ckgoY.jpg",
    "posterPath": "https://image.tmdb.org/t/p/w500/kndxR9TRK0kJ5hxzDprRSS80F2W.jpg",
    "originCountry": [
        "US"
    ],
    "originalLanguage": "en",
    "originalTitle": "Bloodsport",
    "overview": "An American Army Major goes AWOL to Hong Kong for an outlawed martial arts contest called the Kumite.",
    "popularity": 5.376,
    "releaseDate": "1988-02-26",
    "revenue": 63500000,
    "status": "Released",
    "tagline": "The true story of an American ninja.",
    "title": "bloodsport",
    "voteAverage": 7,
    "voteCount": 2038,
    "genres": [{"..."}],
    "productionCompanies": [{"..."}],
    "productionCountries": [{"..."}],
    "spokenLanguages": [{"..."}],
    "favorite": true,
    "characters": [{"..."}]
  }
]
```

<h3 id="remove-movie-by-id">GET /movie/remove?id=11690</h3>

**RESPONSE**

```json
{
  "id": 11690,
  "imdbId": null,
  "backdropPath": "https://image.tmdb.org/t/p/w500/aSA7RuKmCQBnYKn70GYPi6ckgoY.jpg",
  "posterPath": "https://image.tmdb.org/t/p/w500/kndxR9TRK0kJ5hxzDprRSS80F2W.jpg",
  "originCountry": [
      "US"
  ],
  "originalLanguage": "en",
  "originalTitle": "Bloodsport",
  "overview": "An American Army Major goes AWOL to Hong Kong for an outlawed martial arts contest called the Kumite.",
  "popularity": 5.376,
  "releaseDate": "1988-02-26",
  "revenue": 63500000,
  "status": "Released",
  "tagline": "The true story of an American ninja.",
  "title": "bloodsport",
  "voteAverage": 7,
  "voteCount": 2038,
  "genres": [{"..."}],
  "productionCompanies": [{"..."}],
  "productionCountries": [{"..."}],
  "spokenLanguages": [{"..."}],
  "favorite": true
}
```

<h2 id="colab">🤝 Collaborators</h2>

Special thank you for all people that contributed for this project.

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/101645311?v=4" width="100px;" alt="Lucas Santos Profile Picture"/><br>
        <sub>
          <b>Lucas Santos</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
