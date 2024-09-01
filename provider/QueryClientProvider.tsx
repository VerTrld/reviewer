"use client";

import {
  QueryClient,
  QueryClientProvider as QueryClientProv,
} from "@tanstack/react-query";
import { ReactNode } from "react";

const QueryClientProvider = ({ children }: { children: ReactNode }) => {
  const queryCLient = new QueryClient();
  return <QueryClientProv client={queryCLient}>{children}</QueryClientProv>;
};

export default QueryClientProvider;
