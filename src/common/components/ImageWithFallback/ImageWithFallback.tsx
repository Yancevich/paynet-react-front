import { useState } from 'react';
import { Image, Avatar } from '@mantine/core';

import classes from './imageWithFallback.module.css';

type ImageWithFallbackProps = {
  src?: string;
  fallbackContent: string;
  w: number;
  h: number;
};

export const ImageWithFallback = ({
  w,
  h,
  src,
  fallbackContent,
}: ImageWithFallbackProps) => {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <Avatar size="sm" w={w} h={h} radius="xl" classNames={classes}>
        {fallbackContent}
      </Avatar>
    );
  }

  return (
    <Image w={w} h={h} radius="xl" src={src} onError={() => setError(true)} />
  );
};
