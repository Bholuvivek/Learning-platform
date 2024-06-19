import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getUser } from '@core/features/auth/api';
import { GetMe200, GetUserProfile } from '@core/features/auth/types';
import { useHandleNotification } from '@core/hooks/notification';
import { HttpError, Response } from '@core/types';

export const useGetUser = <TData = Awaited<ReturnType<typeof getUser>>, TError = HttpError>({
  queryOptions,
}: {
  queryOptions?: UseQueryOptions<GetMe200, TError, TData, QueryKey> | undefined;
}) => {
  const handleNotification = useHandleNotification();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queryResponse = useQuery<Response<GetUserProfile>, HttpError, GetMe200, any>(
    ['useGetUser'],
    getUser,
    {
      enabled: !!getUser,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      retry: false,
      ...queryOptions,
      onError: (error) => {
        if (error.response?.data) {
          const errResp = error.response?.data;
          if (errResp) {
            handleNotification({
              key: 'getuser-error',
              message: errResp.message,
              type: 'error',
            });
            return;
          }
        }
        handleNotification({
          key: 'getuser-error',
          message: error.message,
          type: 'error',
        });
      },
    }
  );

  return queryResponse;
};
