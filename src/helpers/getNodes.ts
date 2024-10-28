import { NodeIds } from "../enums/NodeIds";
import { Person } from "../interfaces/Person";
import { type Node } from "@xyflow/react";

const ROOT_NODE_POSITION = 650;
const NODES_GAP = 120;

//function to calculate the correct value of the position of each node along the x-axis
const getNodeXPosition = (i: number, arrayLenght: number): number | string => {
  const isArrayLenghtEven = !Boolean(arrayLenght % 2);
  const isIndexEven = !Boolean(i % 2);

  if (arrayLenght === 1) {
    return ROOT_NODE_POSITION;
  } else if (isArrayLenghtEven) {
    if (isIndexEven) {
      return ROOT_NODE_POSITION - 50 - (i + 0.5) * NODES_GAP;
    } else {
      return ROOT_NODE_POSITION - 50 + (i + 0.5) * NODES_GAP;
    }
  } else {
    if (i === 0) {
      return ROOT_NODE_POSITION;
    } else if (isIndexEven) {
      return ROOT_NODE_POSITION - i * NODES_GAP;
    } else {
      return ROOT_NODE_POSITION + (i + 1) * NODES_GAP;
    }
  }
};

const defaultStyles = {
  border: "1px solid rgba(255, 238, 88, 1)",
  height: "205px",
  width: "150px",
  padding: 10,
  color: "rgba(255, 238, 88, 1)",
};

//nodes generation based on films and starships
export const getNodes = ({ name, starships, films, id }: Person): Node[] => {
  const nodes = [];

  //create a root node with person name
  nodes.push({
    id: NodeIds.rootNode,
    data: {
      label: name,
    },
    style: {
      ...defaultStyles,
      background: `url("https://starwars-visualguide.com/assets/img/characters/${id}.jpg") 0% 0% / 100% no-repeat rgba(144, 202, 249, 0.3)`,
    },
    position: { x: ROOT_NODE_POSITION, y: 50 },
  });

  //create films nodes
  films.map((film, i) => {
    nodes.push({
      id: `${NodeIds.film}-${film.id}`,
      data: { label: film.title },
      style: {
        ...defaultStyles,
        background: `url("https://starwars-visualguide.com/assets/img/films/${film.id}.jpg") 0% 0% / 100% no-repeat rgba(144, 202, 249, 0.3)`,
      },
      position: { x: getNodeXPosition(i, films.length), y: 350 },
    });
    return film;
  });

  //create starships nodes
  starships.map((starship, i) => {
    nodes.push({
      id: `${NodeIds.starship}-${starship.id}`,
      data: { label: starship.name },
      style: {
        ...defaultStyles,
        height: "135px",
        width: "205px",
        background: `url("https://starwars-visualguide.com/assets/img/starships/${starship.id}.jpg") 0% 0% / 100% no-repeat rgba(144, 202, 249, 0.3)`,
      },
      position: { x: getNodeXPosition(i, starships.length), y: 800 },
    });
    return starship;
  });

  return nodes;
};
