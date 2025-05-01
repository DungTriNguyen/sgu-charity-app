import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
// import { handleErrorMessage } from './errors';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false
    }
  },
  queryCache: new QueryCache({
    onError: (error) => {
      console.error(error);
      throw error;
    }
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.options.onError) return;

      // const errorMessage = handleErrorMessage(error);
    }
  })
});
