import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router';

import { ROUTES } from '@/routes';
import { useAuth } from '@/store/auth';
import { UserType } from '@/api/registration/types';

export type UserTypeGuardProps = {
  children: ReactNode;
  userTypes?: UserType[];
};

export const UserTypeGuard: FC<UserTypeGuardProps> = (props) => {
  const { children, userTypes } = props;
  const { userType } = useAuth();

  const hasRestrictions = userTypes && userTypes.length > 0;

  const isAllowed =
    !hasRestrictions || (userType && userTypes.includes(userType));

  if (!isAllowed) {
    return <Navigate to={ROUTES.index.path} replace />;
  }

  return children;
};
