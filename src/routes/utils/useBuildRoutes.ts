import { useRoutes } from 'react-router';

import { routesConfig } from '@/routes/routesConfig';
import { mapRoutes } from '@/routes/utils/mapRoutes';

export const useBuildRoutes = () => {
  return useRoutes(mapRoutes(routesConfig));
};
