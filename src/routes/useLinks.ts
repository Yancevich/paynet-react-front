import { useMemo } from 'react';

import { useAuth } from '@/store/auth';
import { routerLinks } from '@/routes/routerLinks';

export const useLinks = () => {
  const { userType, checkScopes } = useAuth();

  const linksWithCommonFiltration = useMemo(() => {
    if (!userType) return [];

    return routerLinks.filter(
      (link) => link.roles.includes(userType) && checkScopes(link.scopes)
    );
  }, [checkScopes, userType]);

  const mobileAppLinks = useMemo(() => {
    return linksWithCommonFiltration.filter((link) => link.showInMobileMenu);
  }, [linksWithCommonFiltration]);

  return {
    appLinks: linksWithCommonFiltration,
    mobileAppLinks,
  };
};
