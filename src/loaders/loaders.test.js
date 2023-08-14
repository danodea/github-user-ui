import { vi, describe, it, expect, beforeEach } from "vitest";
import { FrontPageLoader, UserDetailsLoader } from "./loaders";
import MOCK_DATA from "../../data/MOCK_DATA.json";

function createFetchResponse(data) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

describe("FrontPageLoader", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("makes a request to the correct URL", async () => {
    const mockResponse = MOCK_DATA;

    fetch.mockResponseOnce(JSON.stringify(mockResponse));

    const usersResponse = await FrontPageLoader();

    expect(usersResponse).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith("https://api.github.com/users");
  });

  it("handles fetch errors", async () => {
    fetch.mockRejectOnce(new Error("Network error"));
    const consoleMock = vi.spyOn(console, "error");

    const usersResponse = await FrontPageLoader();
    expect(consoleMock).toHaveBeenCalled();
    expect(usersResponse).toBeNull();
  });
});

describe("UserDetailsLoader", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  const mockParams = {
    params: {
      user: "danodea",
    },
  };

  it("makes a request to the correct URLs", async () => {
    await UserDetailsLoader(mockParams);

    expect(fetch).toHaveBeenCalledWith(
      "https://api.github.com/users/danodea/followers"
    );
    expect(fetch).toHaveBeenCalledWith(
      "https://api.github.com/users/danodea/repos"
    );
    expect(fetch).toHaveBeenCalledWith(
      "https://api.github.com/users/danodea/orgs"
    );
  });

  it("handles fetch errors", async () => {
    fetch.mockRejectOnce(new Error("Network error"));
    const consoleMock = vi.spyOn(console, "error");

    const expectedResponse = {
      followerData: {},
      orgData: {},
      repoData: {},
    };

    const detailsResponse = await UserDetailsLoader(mockParams);
    expect(consoleMock).toHaveBeenCalledWith(
      "A network error occured while loading the user data"
    );
    expect(detailsResponse).toEqual(expectedResponse);
  });
});
