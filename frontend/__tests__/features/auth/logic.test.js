const { validateAuth } = require("@/features/auth/logic");
const { isLocalStorageAvailable } = require("@/lib/utils");
const { intialAuthState } = require("@/features/auth/slice");

jest.mock("@/lib/utils", () => ({
  isLocalStorageAvailable: jest.fn(),
}));

describe("validateAuth", () => {
  beforeEach(() => {
    localStorage.clear()
  })
  
  it("Should return initialAuth when isLocalStorageAvailable is false", () => {
    isLocalStorageAvailable.mockReturnValue(false);
    expect(validateAuth()).toEqual(intialAuthState);
    expect(isLocalStorageAvailable).toBeCalledTimes(1);
  });

  it("Should return value from localStorage when isLocalStorageAvailable is true", () => {
    const testAuth = {
      authenticated: true,
      email: "test",
      token: "ABC",
    };
    isLocalStorageAvailable.mockReturnValue(true);
    localStorage.setItem("auth", JSON.stringify(testAuth));
    expect(validateAuth()).toEqual(testAuth);
    expect(isLocalStorageAvailable).toBeCalledTimes(1);
  });
});
