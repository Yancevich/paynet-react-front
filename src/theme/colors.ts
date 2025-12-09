import { colorsTuple } from '@mantine/core';

const generateVariableFromArrayOfKeys = (colors: string[]) => {
  return colors.map((color) => `var(${color})`);
};

export const colors = {
  'regular-content': colorsTuple(
    generateVariableFromArrayOfKeys([
      '--regular-primary-content',
      '--regular-secondary-content',
      '--regular-tetriary-content',
      '--regular-hover-content',
      '--regular-disabled-content',
      '--regular-permanent-content',
    ])
  ),
  'white-content': colorsTuple(
    generateVariableFromArrayOfKeys([
      '--white-content-default',
      '--white-content-secondary',
    ])
  ),
  'link-content': colorsTuple(
    generateVariableFromArrayOfKeys([
      '--regular-link-default-content',
      '--regular-link-hover-content',
      '--regular-link-disabled-content',
    ])
  ),
  'inversion-content': colorsTuple(
    generateVariableFromArrayOfKeys([
      '--inversion-primary-content',
      '--inversion-secondary-content',
      '--inversion-tetriary-content',
      '--inversion-disabled-content',
    ])
  ),
  'accent-content': colorsTuple(
    generateVariableFromArrayOfKeys([
      '--accent-default-content',
      '--accent-hover-content',
      '--accent-disabled-content',
    ])
  ),
  'negative-content': colorsTuple(
    generateVariableFromArrayOfKeys([
      '--negative-default-content',
      '--negative-hover-content',
      '--negative-disabled-content',
    ])
  ),
  'extra-content': colorsTuple(
    generateVariableFromArrayOfKeys([
      '--extra-default-content',
      '--extra-hover-content',
      '--extra-disabled-content',
    ])
  ),
  'positive-content': colorsTuple(
    generateVariableFromArrayOfKeys([
      '--positive-default-content',
      '--positive-hover-content',
      '--positive-disabled-content',
    ])
  ),
  'warning-content': colorsTuple(
    generateVariableFromArrayOfKeys([
      '--warning-default-content',
      '--warning-hover-content',
      '--warning-disabled-content',
    ])
  ),
  'information-content': colorsTuple(
    generateVariableFromArrayOfKeys([
      '--information-default-content',
      '--information-hover-content',
      '--information-disabled-content',
    ])
  ),

  //   Backgrounds
  'base-background': colorsTuple(
    generateVariableFromArrayOfKeys([
      '--page-bg',
      '--elevated-bg-1',
      '--elevated-bg-2',
    ])
  ),
  'regular-background': colorsTuple(
    generateVariableFromArrayOfKeys([
      '--regular-page-bg',
      '--regular-bg-0',
      '--regular-bg-1',
      '--regular-bg-2',
      '--regular-bg-3',
      '--regular-bg-4',
    ])
  ),
  'accent-background': colorsTuple(
    generateVariableFromArrayOfKeys([
      '--accent-bg1',
      '--accent-bg2',
      '--accent-bg3',
      '--accent-bg4',
    ])
  ),
  'extra-background': colorsTuple(
    generateVariableFromArrayOfKeys([
      '--extra-bg1',
      '--extra-bg2',
      '--extra-bg3',
      '--extra-bg4',
    ])
  ),
  'positive-background': colorsTuple(
    generateVariableFromArrayOfKeys([
      '--positive-bg1',
      '--positive-bg2',
      '--positive-bg3',
      '--positive-bg4',
    ])
  ),
  'negative-background': colorsTuple(
    generateVariableFromArrayOfKeys([
      '--negative-bg1',
      '--negative-bg2',
      '--negative-bg3',
      '--negative-bg4',
    ])
  ),
  'warning-background': colorsTuple(
    generateVariableFromArrayOfKeys([
      '--warning-bg1',
      '--warning-bg2',
      '--warning-bg3',
      '--warning-bg4',
    ])
  ),
  'info-background': colorsTuple(
    generateVariableFromArrayOfKeys([
      '--info-bg1',
      '--info-bg2',
      '--info-bg3',
      '--info-bg4',
    ])
  ),

  'alpha-background': colorsTuple(
    generateVariableFromArrayOfKeys([
      '--alpha-bg-1',
      '--alpha-bg-2',
      '--alpha-bg-3',
      '--alpha-bg-4',
    ])
  ),
  darkwall: colorsTuple(generateVariableFromArrayOfKeys(['--darkwall-bg'])),

  'regular-borders': colorsTuple(
    generateVariableFromArrayOfKeys([
      '--regular-border-0',
      '--regular-border-1',
      '--regular-border-2',
      '--regular-border-3',
      '--regular-border-4',
      '--regular-border-5',
      '--regular-border-permanent',
    ])
  ),
  'accent-borders': colorsTuple(
    generateVariableFromArrayOfKeys([
      '--accent-border-1',
      '--accent-border-2',
      '--accent-border-3',
      '--accent-border-4',
      '--accent-border-5',
      '--accent-border-6',
    ])
  ),
  'extra-borders': colorsTuple(
    generateVariableFromArrayOfKeys([
      '--extra-border-1',
      '--extra-border-2',
      '--extra-border-3',
      '--extra-border-4',
      '--extra-border-5',
    ])
  ),
  'positive-borders': colorsTuple(
    generateVariableFromArrayOfKeys([
      '--positive-border-1',
      '--positive-border-2',
      '--positive-border-3',
      '--positive-border-4',
      '--positive-border-5',
    ])
  ),
  'negative-borders': colorsTuple(
    generateVariableFromArrayOfKeys([
      '--negative-border-1',
      '--negative-border-2',
      '--negative-border-3',
      '--negative-border-4',
      '--negative-border-5',
    ])
  ),
  'warning-borders': colorsTuple(
    generateVariableFromArrayOfKeys([
      '--warning-border-1',
      '--warning-border-2',
      '--warning-border-3',
      '--warning-border-4',
      '--warning-border-5',
    ])
  ),
  'information-borders': colorsTuple(
    generateVariableFromArrayOfKeys([
      '--information-border-1',
      '--information-border-2',
      '--information-border-3',
      '--information-border-4',
      '--information-border-5',
    ])
  ),
};
