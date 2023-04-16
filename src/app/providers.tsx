"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

import { store } from "@src/state/store";
import { Provider } from "react-redux";

export function Providers({ children }: PropsWithChildren) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <Provider store={store}>{children}</Provider>
      </ChakraProvider>
    </CacheProvider>
  );
}
