import { useMutation } from '@tanstack/react-query';
import { useHandleNotification } from '@core/hooks/notification';
import { setupUser } from '@core/features/auth/api/setupUser';
import { useRedirectFromUrl } from '@core/hooks/router/useRedirectFromUrl';
import { useTranslate } from '@core/hooks/i18n';
import { HttpError, Response } from '@core/types';
import { SetupUser200, UserSetUpParams } from '@core/features/auth/types';

export const useSetupUser = (redirectURL = '/login') => {
  const handleNotification = useHandleNotification();
  const { translate } = useTranslate();
  const redirectTo = useRedirectFromUrl(redirectURL);
  const queryResponse = useMutation<
    Response<SetupUser200>,
    HttpError,
    {
      token: string;
      userSetupParam: UserSetUpParams;
    },
    unknown
  >(['useSetupUser'], setupUser, {
    onSuccess: () => {
      handleNotification({
        type: 'success',
        key: 'user-setup-success',
        message: translate('notifications.userSetupSuccess'),
      });
      // redirect to login page
      redirectTo();
    },
    onError: (error) => {
      if (error.response?.data) {
        const errResp = error.response?.data;
        if (errResp) {
          handleNotification({
            key: 'user-setup-error',
            message: errResp.message,
            type: 'error',
          });
        }
      }
    },
  });

  return queryResponse;
};
