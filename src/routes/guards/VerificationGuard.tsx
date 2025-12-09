import { FC, ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';

import {
  UserType,
  VerificationStatus,
  VerificationType,
} from '@/api/registration/types';
import { ROUTES } from '@/routes';
import { useAuth } from '@/store/auth';
import { useVerification } from '@/store/verification';
import { FullScreenLoader } from '@/common/components/FullScreenLoader';

const KYB_ENABLED_STATUSES = [
  VerificationStatus.INIT,
  VerificationStatus.RETRY,
];

const ALLOWED_PATHS_FOR_UNVERIFIED: string[] = [
  ROUTES.index.path,
  ROUTES.settings.path,
  ROUTES.settings.nested.security.fullPath,
];

export type VerificationGuardProps = {
  children: ReactNode;
};

export const VerificationGuard: FC<VerificationGuardProps> = (props) => {
  const { children } = props;
  const location = useLocation();
  const { sync, userInfo, userType, loading: userLoading } = useAuth();
  const {
    isUiAllowed,
    verificationStatus,
    fetchVerificationStatus,
    loading: verificationLoading,
  } = useVerification();

  const isLoading = !verificationStatus || userLoading || verificationLoading;
  const isKybManual = verificationStatus?.type === VerificationType.KYB_MANUAL;
  const kybStatus = verificationStatus?.status;

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userInfo) {
        await sync();
      }
    };

    void fetchUserInfo();
  }, []);

  useEffect(() => {
    if (verificationStatus) return;

    const fetchStatus = async () => {
      if (!userInfo) {
        return;
      }

      if (userType === UserType.BUSINESS) {
        await fetchVerificationStatus(VerificationType.KYB_MANUAL);
      } else if (userType === UserType.CUSTOMER) {
        await fetchVerificationStatus(VerificationType.SUMSUB);
      }
    };

    void fetchStatus();
  }, [userType, verificationStatus]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  const hasIncompleteKyb =
    isKybManual && kybStatus && KYB_ENABLED_STATUSES.includes(kybStatus);

  const isRestricted =
    !isUiAllowed && !ALLOWED_PATHS_FOR_UNVERIFIED.includes(location.pathname);

  if (hasIncompleteKyb) {
    return <Navigate to={ROUTES.kyb.path} replace />;
  }

  if (isRestricted) {
    return <Navigate to={ROUTES.index.path} replace />;
  }

  return children;
};
