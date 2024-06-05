"use client";
import { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { AppStore, appStore } from "../lib/store";
import { validateAuth } from "@/features/auth/logic";
import { login, logout } from "@/features/auth/slice";
import LoadingScreen from "./loading";

type StoreProviderProps = {
  children: React.ReactNode;
  store?: AppStore;
};

export default function StoreProvider({ children, store }: StoreProviderProps) {
  
  const auth = validateAuth();
  const storeRef = useRef<AppStore>();
  const [shouldRender, setShouldRender] = useState(false);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store ?? appStore();
  }
  useEffect(() => {
    storeRef?.current?.dispatch(auth ? login(auth) : logout(auth));
    setShouldRender(true);
  });
  return (
    <Provider store={storeRef.current}>
      {shouldRender ? children : <LoadingScreen />}
    </Provider>
  );
}
