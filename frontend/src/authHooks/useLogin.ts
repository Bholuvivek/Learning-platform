import { useMutation } from '@tanstack/react-query';
import { login } from '@core/features/auth/api';
import { useHandleNotification } from '@core/hooks/notification';
import { useRedirectFromUrl } from '@core/hooks/router/useRedirectFromUrl';
import { actions } from '@core/store';
import { useTranslate } from '@core/hooks/i18n';
import { HttpError, Response } from '@core/types';
import { LoginCredentials, Tokens } from '@core/features/auth/types';

export const useLogin = (redirectionUrl = '/') => {
  const handleNotification = useHandleNotification();
  const { translate } = useTranslate();
  const redirectTo = useRedirectFromUrl(redirectionUrl);

  const queryResponse = useMutation<
    Response<Tokens>,
    HttpError,
    { data: LoginCredentials },
    unknown
  >(['useLogin'], login, {
    onSuccess: (res) => {
      // set tokens to store
      const tokens = res.data;
      if (tokens) {
        if (tokens.access && tokens.refresh) {
          actions.auth.setTokens(tokens.access, tokens.refresh);
        } else {
          throw new Error('access token not found.');
        }
        // show notifications
        handleNotification({
          message: translate('notifications.loginSuccess'),
          key: 'login-success',
          type: 'success',
        });
        // redirect to home page
        redirectTo();
      }
    },
    onError: (error) => {
      const errResp = error.response?.data;
      if (errResp) {
        handleNotification({
          key: 'login-error',
          message: errResp.message,
          type: 'error',
        });
      }
    },
  });

  return queryResponse;
};
