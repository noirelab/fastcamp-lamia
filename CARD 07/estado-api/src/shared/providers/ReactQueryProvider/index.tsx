"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useUserStore } from "@/data/states/zustand/user";

export const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        // posts da API mudam raramente; evita refetch a cada foco ou remontagem
        defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } },
      }),
  );

  // qualquer logout (botão Sair ou 401 no interceptor) descarta o cache do usuário anterior
  useEffect(
    () =>
      useUserStore.subscribe((state, previous) => {
        if (previous.user && !state.user) queryClient.clear();
      }),
    [queryClient],
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
