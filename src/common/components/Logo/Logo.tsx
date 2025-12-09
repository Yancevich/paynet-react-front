import React from 'react';
import { Link } from 'react-router';
import cn from 'classnames';
import { Box, Center, useMantineColorScheme } from '@mantine/core';

import LogoIcon from '@/assets/images/logo-icon.svg';
import LogoText from '@/assets/images/logo-text.svg';
import LogoIconLight from '@/assets/images/logo-icon-light.svg';
import LogoTextLight from '@/assets/images/logo-text-light.svg';
import { ROUTES } from '@/routes';

import styles from './Logo.module.scss';

interface LogoProps {
  className?: string;
  textHidden?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, textHidden }) => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Link className={cn(styles.logo, className)} to={ROUTES.index.path}>
      {textHidden ? (
        colorScheme === 'dark' ? (
          <Center>
            <Box w={44} h={44}>
              <LogoIcon />
            </Box>
          </Center>
        ) : (
          <Center>
            <Box w={44} h={44}>
              <LogoIconLight />
            </Box>
          </Center>
        )
      ) : null}

      {!textHidden ? (
        colorScheme === 'light' ? (
          <LogoTextLight />
        ) : (
          <LogoText />
        )
      ) : null}
    </Link>
  );
};
