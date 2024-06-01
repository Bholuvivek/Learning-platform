import { useMutation } from '@tanstack/react-query';
import { useHandleNotification } from '@core/hooks/notification';
import { deactivateUser } from '@core/features/auth/api/deactivateUser';
import { useTranslate } from '@core/hooks/i18n';
import { HttpError, Response } from '@core/types';
import { DeactivateUser200 } from '@core/features/auth/types';

export const useDeactivateUser = (resourceName: string) => {
  const handleNotification = useHandleNotification();
  const { translate } = useTranslate();
  const queryResponse = useMutation<
    Response<DeactivateUser200>,
    HttpError,
    { accountid: string; userid: number },
    unknown
  >(['useDeactivateUser'], deactivateUser, {
    onSuccess: () => {
      // show notifications
      handleNotification({
        message: translate('notifications.deactivateSuccess', { resourceName }),
        key: 'deactivate-success',
        type: 'success',
      });
    },
    onError: (error) => {
      if (error.response?.data) {
        const errResp = error.response?.data;
        if (errResp) {
          handleNotification({
            key: 'deactivate-error',
            message: errResp.message,
            type: 'error',
          });
          return;
        }
      }
      handleNotification({
        key: 'deactivate-error',
        message: error.message,
        type: 'error',
      });
    },
  });

  return queryResponse;
};
