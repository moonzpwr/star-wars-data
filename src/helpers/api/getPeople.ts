import { Person } from "../../interfaces/Person";
import { PersonResponseData } from "../../interfaces/PersonResponseData";
import httpCliet from "./api";

export const getPeople = (page: number): Promise<Person[]> =>
  httpCliet
    .get<{ results: PersonResponseData[] }>(`people/?page=${page}`)
    .then(({ data }) =>
      data.results.map((person) => {
        const { hair_color, skin_color, eye_color, birth_year } = person;
        return {
          ...person,
          hairColor: hair_color,
          skinColor: skin_color,
          eyeColor: eye_color,
          birthYear: birth_year,
        };
      })
    );
