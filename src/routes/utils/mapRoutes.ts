import { RouteObject } from 'react-router';

import { wrapWithGuards } from '@/routes/utils/wrapWithGuards.tsx';
import { EnhancedRouteObject } from '@/routes/routesConfig';

export const mapRoutes = (routes: EnhancedRouteObject[]): RouteObject[] => {
  return routes.map((route) => {
    const { element, guards, guardsProps, children, ...rest } = route;

    return {
      ...rest,
      element: element
        ? wrapWithGuards(element, guards, guardsProps)
        : undefined,
      children: children ? mapRoutes(children) : undefined,
    };
  }) as RouteObject[];
};
