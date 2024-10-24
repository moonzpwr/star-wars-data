import { Node } from "../interfaces/Node";

interface Edge {
  id: string;
  source: string;
  target: string;
}

export const getEdges = (nodes: Node[]): Edge[] => {
  const result: Edge[] = [];
  const filmNodes = nodes.filter((node) => node.id.includes("film"));
  const starshipNodes = nodes.filter((node) => node.id.includes("starship"));
  const rootNode = nodes.find((node) => node.id === "root-node");
  if (rootNode) {
    filmNodes.map((filmNode) => {
      result.push({
        id: `${rootNode.id}-${filmNode.id}`,
        source: rootNode.id,
        target: filmNode.id,
      });
      starshipNodes.map((starshipNode) =>
        result.push({
          id: `${filmNode.id}-${starshipNode.id}`,
          source: filmNode.id,
          target: starshipNode.id,
        })
      );
      return null;
    });
  }

  // const initialEdges = [
  //   { id: 'hidden-e1-2', source: 'hidden-1', target: 'hidden-2' },
  //   { id: 'hidden-e1-3', source: 'hidden-1', target: 'hidden-3' },
  //   { id: 'hidden-e3-4', source: 'hidden-3', target: 'hidden-4' },
  // ];

  return result;
};
