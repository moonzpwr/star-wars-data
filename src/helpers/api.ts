import { RawPerson } from "../interfaces/Person";
import { Film } from "../interfaces/Film";
import { Starship } from "../interfaces/Starship";

const baseURL = "https://sw-api.starnavi.io/";
const throwError = () => {
  throw new Error("Network response was not ok");
};

//all api calls
export const getPeople = (page: number): Promise<{ results: RawPerson[] }> =>
  fetch(`${baseURL}people/?page=${page}`).then((response) => {
    if (!response.ok) {
      throwError();
    }
    return response.json();
  });

export const getPerson = (personId: number): Promise<RawPerson> =>
  fetch(`${baseURL}people/${personId}`).then((response) => {
    if (!response.ok) {
      throwError();
    }
    return response.json();
  });

export const getFilms = (ids: number[]): Promise<{ results: Film[] }> =>
  fetch(`${baseURL}films/?id__in=${ids.join(",")}`).then((response) => {
    if (!response.ok) {
      throwError();
    }
    return response.json();
  });

export const getStarships = (ids: number[]): Promise<{ results: Starship[] }> =>
  fetch(`${baseURL}starships/?id__in=${ids.join(",")}`).then((response) => {
    if (!response.ok) {
      throwError();
    }
    return response.json();
  });
