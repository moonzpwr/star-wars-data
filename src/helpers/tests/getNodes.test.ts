import { getNodes } from "../getNodes";

describe("getNodes", () => {
  const mockPerson = {
    id: 1,
    name: "John Doe",
    films: [
      { id: 2, title: "Matrix" },
      { id: 3, title: "Matrix 2" },
    ],
    starships: [
      { id: 4, name: "Ship" },
      { id: 5, name: "Ship 2" },
    ],
  };
  it("Function should generate root node", () => {
    const nodes = getNodes(mockPerson);
    expect(nodes.some((node) => node.id === "root-node")).toBeTruthy();
  });

  it("Function should generate films nodes", () => {
    const nodes = getNodes(mockPerson);
    expect(
      nodes.filter((node) => node.id.includes("film")).length === 2
    ).toBeTruthy();
  });

  it("Function should generate starships nodes", () => {
    const nodes = getNodes(mockPerson);
    expect(
      nodes.filter((node) => node.id.includes("starship")).length === 2
    ).toBeTruthy();
  });
});
