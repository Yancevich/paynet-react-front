import { ReactNode } from 'react';

import { Guard, guardsMap, GuardsProps } from '@/routes/routesConfig';

export const wrapWithGuards = (
  element: ReactNode,
  guards?: Guard[],
  guardsProps?: GuardsProps
): ReactNode => {
  if (!guards || guards.length === 0) return element;

  return guards.reduceRight((acc, guardName) => {
    const Guard = guardsMap[guardName];
    const props = guardsProps?.[guardName] || {};

    return <Guard {...props}>{acc}</Guard>;
  }, element);
};
