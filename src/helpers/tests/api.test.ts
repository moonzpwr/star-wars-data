import { getFilms, getPeople, getPerson, getStarships } from "../api";

const mockResponse = {
  data: {
    results: [{ name: "Foo" }],
  },
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

describe("api calls", () => {
  afterEach(() => {
    global.fetch = original;
  });

  it("getPeople successfully get", async () => {
    global.fetch = fetchMock.mockResolvedValue(mockRequest(200, mockResponse));
    const peopleData = await getPeople(1);
    expect(mockResponse).toEqual(peopleData);
  });

  it("getPeople return error when fail", async () => {
    global.fetch = fetchMock.mockResolvedValue(
      mockRequest(500, "Iternal server error")
    );
    await expect(getPeople(1)).rejects.toThrow("Network response was not ok");
  });

  it("getPerson successfully get", async () => {
    global.fetch = fetchMock.mockResolvedValue(mockRequest(200, mockResponse));
    const personData = await getPerson(1);
    expect(mockResponse).toEqual(personData);
  });

  it("getPerson return error when fail", async () => {
    global.fetch = fetchMock.mockResolvedValue(
      mockRequest(500, "Iternal server error")
    );
    await expect(getPerson(1)).rejects.toThrow("Network response was not ok");
  });

  it("getFilms successfully get", async () => {
    global.fetch = fetchMock.mockResolvedValue(mockRequest(200, mockResponse));
    const filmData = await getFilms([1, 2, 3]);
    expect(mockResponse).toEqual(filmData);
  });

  it("getFilms return error when fail", async () => {
    global.fetch = fetchMock.mockResolvedValue(
      mockRequest(500, "Iternal server error")
    );
    await expect(getFilms([1, 2, 3])).rejects.toThrow(
      "Network response was not ok"
    );
  });

  it("getStarships successfully get", async () => {
    global.fetch = fetchMock.mockResolvedValue(mockRequest(200, mockResponse));
    const starshipsData = await getStarships([1, 2, 3]);
    expect(mockResponse).toEqual(starshipsData);
  });

  it("getStarships return error when fail", async () => {
    global.fetch = fetchMock.mockResolvedValue(
      mockRequest(500, "Iternal server error")
    );
    await expect(getStarships([1, 2, 3])).rejects.toThrow(
      "Network response was not ok"
    );
  });
});
