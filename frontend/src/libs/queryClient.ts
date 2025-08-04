import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,

      gcTime: 5 * 60 * 1000, // garbage collection removing cache data after 5 min

      retry: 1,

      refetchOnWindowFocus: false,

      refetchOnReconnect: false,
    },
  },
});
