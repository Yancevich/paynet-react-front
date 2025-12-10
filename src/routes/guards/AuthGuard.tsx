import { FC, ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';

import { ROUTES } from '@/routes';
import { use2fa } from '@/store/2fa';
import { useAuth } from '@/store/auth';
import { useTokenStorage } from '@/contexts';
import { FullScreenLoader } from '@/common/components/FullScreenLoader';
import { SignupStep, useSignup } from '@/store/signUp';
import { useSignin } from '@/store/signIn';

export type AuthGuardProps = {
  children: ReactNode;
};

export const AuthGuard: FC<AuthGuardProps> = (props) => {
  const { children } = props;
  const location = useLocation();

  const { loading, initialized, userInfo, sync } = useAuth();
  const { getAccessToken, hasValidAccessToken } = useTokenStorage();
  const { isOtpAuthenticatorEnabled } = use2fa();
  const { setStep, setShowBack } = useSignup();
  const { mfaToken } = useSignin();

  const isSignUpPage = location.pathname === ROUTES.signUp.path;
  const is2faSetupPage = location.pathname === ROUTES.twoFactorSetup.path;
  const is2faEnterPage = location.pathname === ROUTES.twoFactorEnter.path;

  const isNotValidPhone =
    userInfo && (!userInfo?.phone || userInfo.phone.trim() === '');

  const token = getAccessToken();
  const isValidToken = hasValidAccessToken();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userInfo) {
        await sync();
      }
    };

    void fetchUserInfo();
  }, [sync, userInfo]);

  if ((token && !initialized) || loading) {
    return <FullScreenLoader />;
  }

  if (!isValidToken && is2faSetupPage) {
    return <Navigate to={ROUTES.signIn.path} replace />;
  }

  if (is2faEnterPage && !mfaToken) {
    return <Navigate to={ROUTES.signIn.path} replace />;
  }

  if (isValidToken && isNotValidPhone && !isSignUpPage) {
    setStep(SignupStep.Phone);
    setShowBack(false);
    return <Navigate to={ROUTES.signUp.path} replace />;
  }

  if (
    isValidToken &&
    !isNotValidPhone &&
    !isOtpAuthenticatorEnabled &&
    !is2faSetupPage
  ) {
    return <Navigate to={ROUTES.twoFactorSetup.path} replace />;
  }

  if (isValidToken && isOtpAuthenticatorEnabled && !isNotValidPhone) {
    return <Navigate to={ROUTES.index.path} replace />;
  }

  return children;
};
