import { Person } from "../interfaces/Person";
import { type Node } from "@xyflow/react";

const LAYOUT_CENTER = 650;
const NODES_GAP = 100;

export const getNodes = ({ name, starships, films }: Person): Node[] => {
  const nodes = [];

  const getNodeXPosition = (
    i: number,
    arrayLenght: number
  ): number | string => {
    const isArrayLenghtEven = !Boolean(arrayLenght % 2);
    const isIndexEven = !Boolean(i % 2);

    if (arrayLenght === 1) {
      return LAYOUT_CENTER;
    } else if (isArrayLenghtEven) {
      if (isIndexEven) {
        return LAYOUT_CENTER - 50 - (i + 0.5) * NODES_GAP;
      } else {
        return LAYOUT_CENTER - 50 + (i + 0.5) * NODES_GAP;
      }
    } else {
      if (i === 0) {
        return LAYOUT_CENTER;
      } else if (isIndexEven) {
        return LAYOUT_CENTER - i * NODES_GAP;
      } else {
        return LAYOUT_CENTER + (i + 1) * NODES_GAP;
      }
    }
  };

  //create a main node with person name
  nodes.push({
    id: "root-node",
    data: { label: name },
    style: { border: "1px solid #777", padding: 10 },
    position: { x: 650, y: 50 },
  });

  //create films nodes
  films.map((film, i) => {
    nodes.push({
      id: `film-${film.id}`,
      data: { label: film.title },
      style: { border: "1px solid #777", padding: 10, cursor: "auto" },
      position: { x: getNodeXPosition(i, films.length), y: 150 },
    });
    return film;
  });

  //create starships nodes
  starships.map((starship, i) => {
    nodes.push({
      id: `starship-${starship.id}`,
      data: { label: starship.name },
      style: { border: "1px solid #777", padding: 10, cursor: "auto" },
      position: { x: getNodeXPosition(i, starships.length), y: 400 },
    });
    return starship;
  });

  return nodes;
};
