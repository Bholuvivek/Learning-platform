import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useHandleNotification } from '@core/hooks/notification';
import { inviteUser } from '@core/features/auth/api/inviteUser';
import { useTranslate } from '@core/hooks/i18n';
import { HttpError, Response } from '@core/types';
import { InviteUser200 } from '@core/features/auth/types';

export const useInviteUser = () => {
  const handleNotification = useHandleNotification();
  const { translate } = useTranslate();
  const navigate = useNavigate();
  const queryResponse = useMutation<
    Response<InviteUser200>,
    HttpError,
    { accountid: string; userid: number },
    unknown
  >(['useInviteUser'], inviteUser, {
    onSuccess: (res) => {
      const data = res.data?.data;
      if (data !== undefined) {
        if (data) {
          navigate(data);
        }
      }
      handleNotification({
        type: 'success',
        key: 'user-invite-success',
        message: translate('notifications.inviteUserSuccess'),
      });
    },
    onError: (error) => {
      const errResp = error.response?.data;
      if (errResp) {
        handleNotification({
          key: 'user-invite-error',
          message: errResp.message,
          type: 'error',
        });
      }
    },
  });

  return queryResponse;
};
