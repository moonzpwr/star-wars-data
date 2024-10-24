import { Starship, StarshipResponseData } from "../../interfaces/Starship";
import httpCliet from "./api";

export const getStarships = (ids: number[]): Promise<Starship[]> =>
  httpCliet
    .get<{ results: StarshipResponseData[] }>(
      `starships/?id__in=${ids.join(",")}`
    )
    .then(({ data }) =>
      data.results.map((starship) => {
        const { starship_class } = starship;
        return {
          ...starship,
          starshipClass: starship_class,
        };
      })
    );
