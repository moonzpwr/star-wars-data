import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Person } from "../interfaces/Person";
import { getFilms, getPerson, getStarships } from "../helpers/api";

interface ReturnValue {
  data?: Person;
  isLoading: boolean;
  isError: boolean;
}

export const usePersonData = (): ReturnValue => {
  const { personId } = useParams(); //person id from url

  //a chain of fetches to collect all information about a person
  const { data, isLoading, isError } = useQuery("personData", () =>
    getPerson(Number(personId)).then((personResponse) =>
      getFilms(personResponse.films).then((filmResponse) =>
        getStarships(personResponse.starships).then((starshipsResponse) => ({
          ...personResponse,
          films: filmResponse,
          starships: starshipsResponse,
        }))
      )
    )
  );

  return { data, isLoading, isError };
};
