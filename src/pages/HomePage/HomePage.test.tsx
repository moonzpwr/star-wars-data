import {
  screen,
  render,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import { HomePage } from "./HomePage";
import { BrowserRouter, useNavigate } from "react-router-dom";

const mockResponse = {
  results: [
    { id: 1, name: "Foo" },
    { id: 2, name: "Foo2" },
    { id: 3, name: "Foo3" },
    { id: 4, name: "Foo4" },
    { id: 5, name: "Foo5" },
    { id: 6, name: "Foo6" },
    { id: 7, name: "Foo7" },
    { id: 8, name: "Foo8" },
    { id: 9, name: "Foo9" },
    { id: 10, name: "Foo10" },
    { id: 11, name: "Foo11" },
  ],
};
const fetchMock = jest.fn();
const mockRequest = (status: number, data: any) => {
  return Promise.resolve({
    status,
    ok: status === 200,
    json: () => Promise.resolve(data),
  });
};
const original = global.fetch;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Home Page", () => {
  afterEach(() => {
    global.fetch = original;
  });

  it("home page renders", async () => {
    global.fetch = fetchMock.mockResolvedValue(mockRequest(200, mockResponse));
    await act(async () => {
      render(<HomePage />, { wrapper: BrowserRouter });
    });
    const logoImageElement = screen.getByAltText("star wars logo");
    expect(logoImageElement).toBeInTheDocument();
  });

  it("renders a list of people", async () => {
    global.fetch = fetchMock.mockResolvedValue(mockRequest(200, mockResponse));
    render(<HomePage />, { wrapper: BrowserRouter });
    const personItemElement = await screen.findByText("Foo");
    await waitFor(() => {
      expect(personItemElement).toBeInTheDocument();
    });
  });

  it("renders error", async () => {
    global.fetch = fetchMock.mockResolvedValue(mockRequest(404, mockResponse));
    render(<HomePage />, { wrapper: BrowserRouter });
    const errorElement = await screen.findByText("Something gone wrong...");
    await waitFor(() => {
      expect(errorElement).toBeInTheDocument();
    });
  });

  it("renders loading state", async () => {
    global.fetch = fetchMock.mockResolvedValue(mockRequest(200, mockResponse));
    render(<HomePage />, { wrapper: BrowserRouter });
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByTestId("skeleton")).not.toBeInTheDocument();
    });
  });

  it("increase page number", async () => {
    global.fetch = fetchMock.mockResolvedValue(mockRequest(200, mockResponse));
    render(<HomePage />, { wrapper: BrowserRouter });
    const pageCountElement = await screen.findByTestId("page-count");
    await waitFor(() => {
      expect(pageCountElement).toHaveTextContent("1");
    });
    const increasePageElement = await screen.findByTestId("next-page");
    fireEvent.click(increasePageElement);
    await waitFor(() => {
      expect(pageCountElement).toHaveTextContent("2");
    });
  });

  it("decrease page number", async () => {
    global.fetch = fetchMock.mockResolvedValue(mockRequest(200, mockResponse));
    render(<HomePage />, { wrapper: BrowserRouter });
    const pageCountElement = await screen.findByTestId("page-count");
    await waitFor(() => {
      expect(pageCountElement).toHaveTextContent("1");
    });
    const increasePageElement = await screen.findByTestId("next-page");
    fireEvent.click(increasePageElement);
    const decreasePageElement = await screen.findByTestId("previous-page");
    expect(pageCountElement).toHaveTextContent("2");
    expect(decreasePageElement).toBeInTheDocument();
    fireEvent.click(decreasePageElement);
    expect(pageCountElement).toHaveTextContent("1");
    expect(decreasePageElement).not.toBeInTheDocument();
  });

  it("click on person button should redirect on DetailPage", async () => {
    global.fetch = fetchMock.mockResolvedValue(mockRequest(200, mockResponse));
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    render(<HomePage />, { wrapper: BrowserRouter });
    const button = await screen.findByTestId(`redirect-button-Foo`);
    fireEvent.click(button);
    expect(navigate).toHaveBeenCalledWith("/star-wars-data/person/1");
  });
});
