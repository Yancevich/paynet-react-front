import { FC } from 'react';
import { Center, Loader } from '@mantine/core';

export const FullScreenLoader: FC = () => {
  return (
    <Center w="100vw" h="100vh">
      <Loader />
    </Center>
  );
};
