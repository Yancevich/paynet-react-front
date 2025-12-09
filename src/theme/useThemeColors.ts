import { useMantineTheme } from '@mantine/core';

import {
  backgroundColorAliases,
  borderColorAliases,
  contentColorAliases,
} from '@/theme/color-alliases.ts';
import type {
  AvailableBackgroundColorPaths,
  AvailableBorderColorPaths,
  AvailableContentColorPaths,
} from '@/theme/color-alliases.ts';

export const useThemeColors = () => {
  const theme = useMantineTheme();

  const rcc = (path: AvailableContentColorPaths): string => {
    const [group, alias] = path.split('.') as [
      keyof typeof contentColorAliases,
      string,
    ];
    const index = contentColorAliases[group][
      alias as keyof (typeof contentColorAliases)[typeof group]
    ] as number;
    return theme.colors[group][index];
  };

  const rbgc = (path: AvailableBackgroundColorPaths): string => {
    const [group, alias] = path.split('.') as [
      keyof typeof backgroundColorAliases,
      string,
    ];
    const index = backgroundColorAliases[group][
      alias as keyof (typeof backgroundColorAliases)[typeof group]
    ] as number;
    return theme.colors[group][index];
  };

  const rbdc = (path: AvailableBorderColorPaths) => {
    const [group, alias] = path.split('.') as [
      keyof typeof borderColorAliases,
      string,
    ];
    const index =
      borderColorAliases[group][
        alias as keyof (typeof borderColorAliases)[typeof group]
      ];
    return theme.colors[group][index];
  };

  return { rcc, rbgc, rbdc };
};
