import { screen, render, fireEvent, act } from "@testing-library/react";
import { DetailPage } from "./DetailPage";
import { BrowserRouter, useNavigate } from "react-router-dom";

global.fetch = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Detail Page", () => {
  const personMockResponse = {
    id: 1,
    name: "John Dou",
    films: [1, 2, 3],
    starships: [4, 5, 6],
  };

  const starshipsMockResponse = {
    results: [
      {
        id: 59,
        name: "Trade Federation cruiser",
      },
      {
        id: 64,
        name: "Naboo star skiff",
      },
      {
        id: 65,
        name: "Jedi Interceptor",
      },
      {
        id: 48,
        name: "Jedi starfighter",
      },
      {
        id: 74,
        name: "Belbullab-22 starfighter",
      },
    ],
  };

  const filmsMockResponse = {
    results: [
      {
        id: 1,
        title: "A New Hope",
      },
      {
        id: 2,
        title: "The Empire Strikes Back",
      },
      {
        id: 3,
        title: "Return of the Jedi",
      },
      {
        id: 4,
        title: "The Phantom Menace",
      },
      {
        id: 5,
        title: "Attack of the Clones",
      },
      {
        id: 6,
        title: "Revenge of the Sith",
      },
    ],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and displays person, films, and starships data successfully", async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => personMockResponse })
      .mockResolvedValueOnce({ ok: true, json: async () => filmsMockResponse })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => starshipsMockResponse,
      });
    await act(async () => {
      render(<DetailPage />, { wrapper: BrowserRouter });
    });

    expect(await screen.findByTestId("rf__node-root-node")).toBeInTheDocument();
    expect(await screen.findByTestId("rf__node-film-1")).toBeInTheDocument();
    expect(await screen.findByTestId("rf__node-film-2")).toBeInTheDocument();
    expect(
      await screen.findByTestId("rf__node-starship-59")
    ).toBeInTheDocument();
    expect(
      await screen.findByTestId("rf__node-starship-64")
    ).toBeInTheDocument();
  });

  it("handles API error gracefully", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await act(async () => {
      render(<DetailPage />, { wrapper: BrowserRouter });
    });

    expect(
      await screen.findByText(/Something gone wrong/i)
    ).toBeInTheDocument();
  });

  it("back button should redirect to home page", async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => personMockResponse })
      .mockResolvedValueOnce({ ok: true, json: async () => filmsMockResponse })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => starshipsMockResponse,
      });
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    await act(async () => {
      render(<DetailPage />, { wrapper: BrowserRouter });
    });

    const backButton = screen.getByTestId("back-button");
    fireEvent.click(backButton);
    expect(navigate).toHaveBeenCalledWith("/star-wars-data");
  });
});
