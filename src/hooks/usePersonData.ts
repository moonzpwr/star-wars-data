import { useParams } from "react-router-dom";
import { getPerson } from "../helpers/api/getPerson";
import { useQuery } from "react-query";
import { getFilms } from "../helpers/api/getFilms";
import { getStarships } from "../helpers/api/getStarships";
import { Person } from "../interfaces/Person";

interface ReturnValue {
  data?: Person;
  isLoading: boolean;
  isError: boolean;
}

export const usePersonData = (): ReturnValue => {
  const { personId } = useParams();
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
