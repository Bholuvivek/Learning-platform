import { useMutation } from '@tanstack/react-query';
import { register } from '@core/features/auth/api';
import { RegisterCredentials } from '@core/features/auth/types';
import { useTranslate } from '@core/hooks/i18n';
import { useHandleNotification } from '@core/hooks/notification';
import { useRedirectFromUrl } from '@core/hooks/router/useRedirectFromUrl';
import { HttpError, Response } from '@core/types';

export const useRegistration = (redirectURL = '/registration-success') => {
  const handleNotification = useHandleNotification();
  const { translate } = useTranslate();
  const redirectTo = useRedirectFromUrl(redirectURL);

  const queryResponse = useMutation<
    Response<RegisterCredentials>,
    HttpError,
    RegisterCredentials,
    unknown
  >(['useRegistration'], register, {
    onSuccess: () => {
      handleNotification({
        type: 'success',
        key: 'user-setup-success',
        message: translate('notifications.registerSuccess'),
      });
      // redirect to login page
      redirectTo();
    },
    onError: (error) => {
      if (error.response?.data) {
        const errResp = error.response?.data;
        if (errResp) {
          handleNotification({
            key: 'register-error',
            message: errResp.message,
            type: 'error',
          });
        }
      }
    },
  });

  return queryResponse;
};
