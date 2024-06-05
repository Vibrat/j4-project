import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import { login, logout } from "./slice"
import { isLocalStorageAvailable } from "@/lib/utils"

const localStorageMiddleware = createListenerMiddleware()
localStorageMiddleware.startListening({
  matcher: isAnyOf(login, logout),
  effect: async (action, listenerApi) => {
    switch (action.type) {
      case "auth/login":
        isLocalStorageAvailable() && localStorage.setItem('auth', JSON.stringify(action.payload))
        break
      case "auth/logout":
        isLocalStorageAvailable() && localStorage.removeItem('auth')
    }
  }
})

export default localStorageMiddleware