import { FC } from 'react';
import { Anchor, Breadcrumbs as BreadcrumbsMantine, Text } from '@mantine/core';
import { useNavigate } from 'react-router';
import cn from 'classnames';

import styles from './style.module.css';

interface BreadcrumbsItems {
  path: string;
  title: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbsItems[];
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => {
  const navigate = useNavigate();

  const handleClick = (href: string) => {
    navigate(href);
  };

  return (
    <BreadcrumbsMantine>
      {items.map((item) =>
        item.path === '#' ? (
          <Text
            key={item.title}
            size="md"
            className={cn(styles.breadcrumb, styles.active)}
          >
            {item.title}
          </Text>
        ) : (
          <Anchor
            key={item.title}
            className={cn(styles.breadcrumb)}
            size="md"
            onClick={() => handleClick(item.path)}
          >
            {item.title}
          </Anchor>
        )
      )}
    </BreadcrumbsMantine>
  );
};
