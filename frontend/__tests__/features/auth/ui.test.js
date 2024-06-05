import { render, screen, fireEvent, act } from "@testing-library/react";
import AuthForm from "@/features/auth/ui";
import StoreProvider from "@/app/storeProvider";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { API_BASE_URL } from "@/services/config";

export const handlers = [
  http.post(`${API_BASE_URL}/auth/login`, async () => {
    return HttpResponse.json({
      authenticated: true,
      email: "test@gmail.com",
      token: "ABC",
    });
  }),
];

const server = setupServer(...handlers);

describe("Auth Components", () => {
  beforeAll(() => server.listen());
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render", async () => {
    const submitFunction = jest.fn();
    act(() => {
      render(
        <StoreProvider>
          <AuthForm onSubmit={submitFunction} />
        </StoreProvider>
      );
    });
    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText("password");
    const submitButton = screen.getByRole("button");
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
      fireEvent.change(passwordInput, { target: { value: "123123" } });
      fireEvent.click(submitButton);
    });
    expect(submitFunction).toHaveBeenCalledWith({
      authenticated: true,
      email: "test@gmail.com",
      token: "ABC",
    });
  });
});
