import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslate } from '@core/hooks/i18n';
import { useHandleNotification } from '@core/hooks/notification';
import { useRedirectFromUrl } from '@core/hooks/router/useRedirectFromUrl';
import { actions } from '@core/store';
import { HttpError, Response } from '@core/types';
import { logout } from '../api';

export const useLogout = (redirectionUrl = '/login') => {
  const handleNotification = useHandleNotification();
  const { translate } = useTranslate();
  const redirectTo = useRedirectFromUrl(redirectionUrl);
  const queryClient = useQueryClient();

  const queryResponse = useMutation<Response<string>, HttpError, unknown, unknown>(
    ['useLogout'],
    logout,
    {
      onSuccess: () => {
        // set tokens to store
        actions.auth.removeTokens();
        // show notifications
        handleNotification({
          message: translate('notifications.logoutSuccess'),
          key: 'logout-success',
          type: 'success',
        });
        // redirect to home page
        redirectTo();
        queryClient.clear();
      },
      onError: (error) => {
        const errResp = error.response?.data;
        if (errResp) {
          handleNotification({
            key: 'logout-error',
            message: errResp.message,
            type: 'error',
          });
        }
      },
    }
  );

  return queryResponse;
};
