import { type Node, type Edge } from "@xyflow/react";
import { NodeIds } from "../enums/NodeIds";

const defaultStyles = {
  stroke: "rgba(255, 238, 88, 1)",
};

//edges generation based on films and starships
export const getEdges = (nodes: Node[]): Edge[] => {
  const edges: Edge[] = [];
  const filmNodes = nodes.filter((node) => node.id.includes(NodeIds.film));
  const starshipNodes = nodes.filter((node) =>
    node.id.includes(NodeIds.starship)
  );
  const rootNode = nodes.find((node) => node.id === NodeIds.rootNode);

  if (rootNode) {
    //map films and create edge between root node and each film node
    filmNodes.map((filmNode) => {
      edges.push({
        id: `${rootNode.id}-${filmNode.id}`,
        source: rootNode.id,
        target: filmNode.id,
        style: defaultStyles,
      });

      //map starships and create edge between each film node and each starship node
      starshipNodes.map((starshipNode) =>
        edges.push({
          id: `${filmNode.id}-${starshipNode.id}`,
          source: filmNode.id,
          target: starshipNode.id,
          style: defaultStyles,
        })
      );

      return null;
    });
  }

  return edges;
};
