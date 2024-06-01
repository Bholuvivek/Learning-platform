import {
  UseQueryOptions,
  UseQueryResult,
  QueryKey,
  QueryFunction,
  useQuery,
} from '@tanstack/react-query';
import { getUserSetup } from '@core/features/auth/api/getUserSetup';
import { useHandleNotification } from '@core/hooks/notification';
import { HttpError } from '@core/types';

export const getGetUserSetupQueryKey = (token: string) => [`/setup/${token}`];

export const useGetUserSetup = <TData = Awaited<ReturnType<typeof getUserSetup>>>(
  token: string,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUserSetup>>, HttpError, TData>;
  }
): UseQueryResult<TData> & { queryKey: QueryKey } => {
  const handleNotification = useHandleNotification();
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetUserSetupQueryKey(token);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getUserSetup>>> = () =>
    getUserSetup({ token });

  const query = useQuery<Awaited<ReturnType<typeof getUserSetup>>, HttpError, TData>(
    queryKey,
    queryFn,
    {
      enabled: !!token,
      ...queryOptions,
      onError: (error) => {
        const errResp = error.response?.data;
        if (errResp) {
          handleNotification({
            key: 'getuser-setup-error',
            message: errResp.message,
            type: 'error',
          });
        }
      },
    }
  );

  return {
    queryKey,
    ...query,
  };
};
