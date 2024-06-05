import fetchMock from 'jest-fetch-mock'
import reducer, { intialAuthState, login, logout} from '@/features/auth/slice'
import { appStore } from '@/lib/store'

const store = appStore()
fetchMock.enableMocks()

describe("AuthSlice", () => {
  it("Should return initial state when call reducer", () => {
    expect(reducer(undefined, {})).toEqual(intialAuthState)
  })
  it("Should return updated state after login", () => {
    const testAuthState = {
      authenticated: true,
      email: "test",
      token: "ABC",
    }
    store.dispatch(login(testAuthState))
    const reducerState = store.getState().auth
    expect(reducerState).toEqual(testAuthState)
  })
  it("Should return initial state after logout", () => {
    store.dispatch(logout())
    const reducerState = store.getState().auth
    expect(reducerState).toEqual(intialAuthState)
  })
  it("Should save to localStorage after login", () => {
    const testAuthState = {
      authenticated: true,
      email: "test",
      token: "ABC",
    }
    store.dispatch(login(testAuthState))
    expect(localStorage.getItem("auth")).toEqual(JSON.stringify(testAuthState))
  })
  it("Should remove auth from localStorage after logout", () => {
    const testAuthState = {
      authenticated: true,
      email: "test",
      token: "ABC",
    }
    store.dispatch(login(testAuthState))
    store.dispatch(logout())
    expect(localStorage.getItem("auth")).toBeNull()
  })
})