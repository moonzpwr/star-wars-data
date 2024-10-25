import { type Node, type Edge } from "@xyflow/react";

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

  return result;
};
