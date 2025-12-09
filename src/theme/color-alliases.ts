type ContentColorAliases = typeof contentColorAliases;

export type AvailableContentColorPaths = {
  [Group in keyof ContentColorAliases]: {
    [Alias in keyof ContentColorAliases[Group]]: `${Group & string}.${Alias & string}`;
  }[keyof ContentColorAliases[Group]];
}[keyof ContentColorAliases];

export const contentColorAliases = {
  'regular-content': {
    primary: 0,
    secondary: 1,
    tetriary: 2,
    hover: 3,
    disabled: 4,
    permanent: 5,
  },
  'white-content': {
    default: 0,
    secondary: 1,
  },
  'link-content': {
    primary: 0,
    hover: 1,
    disabled: 2,
  },
  'inversion-content': {
    primary: 0,
    secondary: 1,
    tetriary: 2,
    disabled: 3,
  },
  'accent-content': {
    primary: 0,
    hover: 1,
    disabled: 2,
  },
  'negative-content': {
    primary: 0,
    hover: 1,
    disabled: 2,
  },
  'extra-content': {
    primary: 0,
    hover: 1,
    disabled: 2,
  },
  'positive-content': {
    primary: 0,
    hover: 1,
    disabled: 2,
  },
  'warning-content': {
    primary: 0,
    hover: 1,
    disabled: 2,
  },
  'information-content': {
    primary: 0,
    hover: 1,
    disabled: 2,
  },
} as const;

type BackgroundColorAliases = typeof backgroundColorAliases;

export type AvailableBackgroundColorPaths = {
  [Group in keyof BackgroundColorAliases]: {
    [Alias in keyof BackgroundColorAliases[Group]]: `${Group & string}.${Alias & string}`;
  }[keyof BackgroundColorAliases[Group]];
}[keyof BackgroundColorAliases];

export const backgroundColorAliases = {
  'base-background': {
    'page-bg': 0,
    'elevated-bg-1': 1,
    'elevated-bg-2': 2,
  },

  'regular-background': {
    page: 0,
    'bg-0': 1,
    'bg-1': 2,
    'bg-2': 3,
    'bg-3': 4,
    'bg-4': 5,
  },
  'accent-background': {
    'bg-1': 0,
    'bg-2': 1,
    'bg-3': 2,
    'bg-4': 3,
  },
  'extra-background': {
    'bg-1': 0,
    'bg-2': 1,
    'bg-3': 2,
    'bg-4': 3,
  },
  'positive-background': {
    'bg-1': 0,
    'bg-2': 1,
    'bg-3': 2,
    'bg-4': 3,
  },
  'negative-background': {
    'bg-1': 0,
    'bg-2': 1,
    'bg-3': 2,
    'bg-4': 3,
  },
  'warning-background': {
    'bg-1': 0,
    'bg-2': 1,
    'bg-3': 2,
    'bg-4': 3,
  },
  'info-background': {
    'bg-1': 0,
    'bg-2': 1,
    'bg-3': 2,
    'bg-4': 3,
  },
  'alpha-background': {
    'bg-1': 0,
    'bg-2': 1,
    'bg-3': 2,
    'bg-4': 3,
  },
  darkwall: {
    darkwall: 0,
  },
} as const;

type BorderColorAliases = typeof borderColorAliases;

export type AvailableBorderColorPaths = {
  [Group in keyof BorderColorAliases]: {
    [Alias in keyof BorderColorAliases[Group]]: `${Group & string}.${Alias & string}`;
  }[keyof BorderColorAliases[Group]];
}[keyof BorderColorAliases];

export const borderColorAliases = {
  'regular-borders': {
    'border-0': 0,
    'border-1': 1,
    'border-2': 2,
    'border-3': 3,
    'border-4': 4,
    'border-5': 5,
    'border-permanent': 6,
  },
  'accent-borders': {
    'border-1': 0,
    'border-2': 1,
    'border-3': 2,
    'border-4': 3,
    'border-5': 4,
    'border-6': 5,
  },
  'extra-borders': {
    'border-1': 0,
    'border-2': 1,
    'border-3': 2,
    'border-4': 3,
    'border-5': 4,
  },
  'positive-borders': {
    'border-1': 0,
    'border-2': 1,
    'border-3': 2,
    'border-4': 3,
    'border-5': 4,
  },
  'negative-borders': {
    'border-1': 0,
    'border-2': 1,
    'border-3': 2,
    'border-4': 3,
    'border-5': 4,
  },
  'warning-borders': {
    'border-1': 0,
    'border-2': 1,
    'border-3': 2,
    'border-4': 3,
    'border-5': 4,
  },
  'information-borders': {
    'border-1': 0,
    'border-2': 1,
    'border-3': 2,
    'border-4': 3,
    'border-5': 4,
  },
};
