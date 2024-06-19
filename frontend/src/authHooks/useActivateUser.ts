import { useMutation } from '@tanstack/react-query';
import { useHandleNotification } from '@core/hooks/notification';
import { activateUser } from '@core/features/auth/api/activateUser';
import { useTranslate } from '@core/hooks/i18n';
import { ActivateUser200 } from '@core/features/auth/types';
import { HttpError, Response } from '@core/types';

export const useActivateUser = (resourceName: string) => {
  const handleNotification = useHandleNotification();
  const { translate } = useTranslate();
  const queryResponse = useMutation<
    Response<ActivateUser200>,
    HttpError,
    { accountid: string; userid: number },
    unknown
  >(['useActivateUser'], activateUser, {
    onSuccess: () => {
      // show notifications
      handleNotification({
        message: translate('notifications.activateSuccess', { resourceName }),
        key: 'activate-success',
        type: 'success',
      });
    },
    onError: (error) => {
      const errResp = error.response?.data;
      if (errResp) {
        handleNotification({
          key: 'activate-error',
          message: errResp.message,
          type: 'error',
        });
      }
    },
  });

  return queryResponse;
};
