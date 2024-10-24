import { Film, FilmResponseData } from "../../interfaces/Film";
import httpCliet from "./api";

export const getFilms = (ids: number[]): Promise<Film[]> =>
  httpCliet
    .get<{ results: FilmResponseData[] }>(`films/?id__in=${ids.join(",")}`)
    .then(({ data }) =>
      data.results.map((film) => {
        const { opening_crawl, release_date } = film;
        return {
          ...film,
          openingCrawl: opening_crawl,
          releaseDate: release_date,
        };
      })
    );
