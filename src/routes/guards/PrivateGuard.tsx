import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router';

import { ROUTES } from '@/routes';
import { useTokenStorage } from '@/contexts';
import { useAuth } from '@/store/auth';
import { use2fa } from '@/store/2fa';
import { SignupStep, useSignup } from '@/store/signUp';

export type PrivateGuardProps = {
  children: ReactNode;
};

export const PrivateGuard: FC<PrivateGuardProps> = (props) => {
  const { children } = props;
  const { getAccessToken } = useTokenStorage();
  const { isOtpAuthenticatorEnabled } = use2fa();
  const { setStep, setShowBack } = useSignup();
  const { userInfo } = useAuth();

  const token = getAccessToken();
  const isNotValidPhone =
    userInfo && (!userInfo?.phone || userInfo.phone.trim() === '');

  if (!token) {
    return <Navigate to={ROUTES.signIn.path} replace />;
  }

  if (isNotValidPhone) {
    setStep(SignupStep.Phone);
    setShowBack(false);
    return <Navigate to={ROUTES.signUp.path} replace />;
  }

  if (!isOtpAuthenticatorEnabled) {
    return <Navigate to={ROUTES.twoFactorSetup.path} replace />;
  }

  return children;
};
