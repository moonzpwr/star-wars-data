import { getEdges } from "../getEdges";

describe("getEdges", () => {
  const mockNodes = [
    {
      id: "root-node",
      data: { label: "John Doe" },
      position: { x: 650, y: 50 },
    },
    {
      id: "film-2",
      data: { label: "Matrix" },
      position: { x: 540, y: 350 },
    },
    {
      id: "film-3",
      data: { label: "Matrix 2" },
      position: { x: 780, y: 350 },
    },
    {
      id: "starship-4",
      data: { label: "Ship" },
      position: { x: 540, y: 800 },
    },
    {
      id: "starship-5",
      data: { label: "Ship 2" },
      position: { x: 780, y: 800 },
    },
  ];

  it("Function must generate correct number of edges", () => {
    const edges = getEdges(mockNodes);
    expect(edges.length === 6).toBeTruthy();
  });

  it("Function must geherate correct id for each edge", () => {
    const edges = getEdges(mockNodes);
    const arrayForIdCheck = edges.map((edge) => {
      if (edge.id === `${edge.source}-${edge.target}`) {
        return true;
      }
      return false;
    });
    expect(arrayForIdCheck.every((element) => element)).toBeTruthy();
  });
});
