import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useHandleNotification } from '@core/hooks/notification';
import { resetPassword } from '@core/features/auth/api';
import { useTranslate } from '@core/hooks/i18n';
import { HttpError, Response } from '@core/types';
import { ResetPasswordPayload } from '@core/features/auth/types';

export const useResetPassword = () => {
  const navigate = useNavigate();
  const handleNotification = useHandleNotification();
  const { translate } = useTranslate();
  const queryResponse = useMutation<Response<string>, HttpError, ResetPasswordPayload, unknown>(
    ['useResetPassword'],
    resetPassword,
    {
      onSuccess: () => {
        handleNotification({
          type: 'success',
          key: 'reset-password-success',
          message: translate('notifications.resetPasswordSuccess'),
        });
        navigate('/login');
      },
      onError: (error) => {
        const errResp = error.response?.data;
        if (errResp) {
          handleNotification({
            key: 'reset-password-error',
            message: errResp.message,
            type: 'error',
          });
        }
      },
    }
  );

  return queryResponse;
};
