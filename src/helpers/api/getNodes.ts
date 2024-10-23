import { Person } from "../../interfaces/Person";
import { v4 as uuidv4 } from "uuid";

export const getNodes = ({ name, starships, films }: Person) => {
  const nodes = [];

  //create a main node with person name
  nodes.push({
    id: uuidv4(),
    // type: "selectorNode",
    data: { label: name },
    style: { border: "1px solid #777", padding: 10 },
    position: { x: 0, y: 0 },
  });

  //create films node
  films.map((film) =>
    nodes.push({
      id: uuidv4(),
      // type: "selectorNode",
      data: { label: film },
      style: { border: "1px solid #777", padding: 10 },
      position: { x: 0, y: 0 },
    })
  );

  return nodes;
};
