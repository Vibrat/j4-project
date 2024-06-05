import { isLocalStorageAvailable } from "@/lib/utils";
import { intialAuthState } from "./slice";

export function validateAuth() {
  const auth = isLocalStorageAvailable() ? localStorage.getItem("auth") : JSON.stringify(intialAuthState);
  if (!auth) return intialAuthState;
  return auth ? JSON.parse(auth) : intialAuthState;
}