import { render, fireEvent, act } from "@testing-library/react";
import ShareForm from "@/features/share/ui";
import StoreProvider from "@/app/storeProvider";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { API_BASE_URL } from "@/services/config";
import { appStore } from "@/lib/store";
import { login } from "@/features/auth/slice";

jest.mock("next/navigation", () => ({
  useRouter: () => jest.fn(),
}));

export const handlers = [
  http.post(`${API_BASE_URL}/videos`, async () => {
    return HttpResponse.json({});
  }),
];

const server = setupServer(...handlers);

describe("ShareUI", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render correctly", () => {
    const { container } = render(
      <StoreProvider>
        <ShareForm />
      </StoreProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it("should not trigger onSubmit when unauthenticated", async () => {
    const afterSubmitCallBack = jest.fn();
    const { getByRole, getByPlaceholderText } = render(
      <StoreProvider>
        <ShareForm onSubmitCallBack={afterSubmitCallBack} />
      </StoreProvider>
    );
    const submitButton = getByRole("button");
    const youtubeField = getByPlaceholderText("https://youtube.com/xsyqgsa");
    await act(() => {
      fireEvent.change(youtubeField, {
        target: { value: "https://youtube.com/abcd" },
      });
      fireEvent.click(submitButton);
    });
    expect(afterSubmitCallBack).toBeCalledTimes(0);
  });

  it("should trigger onSubmit when authenticated", async () => {
    const store = appStore();
    const afterSubmitCallBack = jest.fn();
    
    // perform login
    store.dispatch(login({ authenticated: true, email: "test@gmail.come",token: "ABC",}));
    
    // build component
    const { getByRole, getByPlaceholderText } = render(
      <StoreProvider store={store}>
        <ShareForm onSubmitCallBack={afterSubmitCallBack} />
      </StoreProvider>
    );

    // fire submission
    const submitButton = getByRole("button");
    const youtubeField = getByPlaceholderText("https://youtube.com/xsyqgsa");
    await act( async () => {
      fireEvent.change(youtubeField, {
        target: { value: "https://youtube.com/abcd" },
      });
      fireEvent.click(submitButton);
    });

    // test if it's called only one
    expect(afterSubmitCallBack).toBeCalledTimes(1);
  });
});
