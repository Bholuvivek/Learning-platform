import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useHandleNotification } from '@core/hooks/notification';
import { forgotPassword } from '@core/features/auth/api';
import { ForgotPassword200, ResetPasswordRequest } from '@core/features/auth/types';
import { HttpError, Response } from '@core/types';

export const useForgotPassword = () => {
  const handleNotification = useHandleNotification();
  const navigate = useNavigate();
  const queryResponse = useMutation<
    Response<ForgotPassword200>,
    HttpError,
    { data: ResetPasswordRequest },
    unknown
  >(['useForgotPassword'], forgotPassword, {
    onSuccess: (res) => {
      const data = res.data?.data;
      if (data !== undefined) {
        if (data) {
          navigate(data);
        }
      }
      handleNotification({
        type: 'success',
        key: 'forgot-password-success',
        message: res.message as string,
      });
    },
    onError: (error) => {
      const errResp = error.response?.data;
      if (errResp) {
        handleNotification({
          key: 'forgot-password-error',
          message: errResp.message,
          type: 'error',
        });
      }
    },
  });

  return queryResponse;
};
