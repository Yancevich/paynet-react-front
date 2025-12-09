import { useDisclosure } from '@mantine/hooks';
import {
  Accordion,
  Button,
  CloseButton,
  ScrollArea,
  Stack,
  Title,
  Grid,
} from '@mantine/core';
import { useIntl } from 'react-intl';

import { Icon } from '@/common/components/Icon';
import { ModalDrawer } from '@/common/components/ModalDrawer';
import { useUi } from '@/contexts';
import styles from '@/theme/styles/components/modal.module.css';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import { groceries } from './config.ts';

export const Faq = () => {
  const [opened, { open, close }] = useDisclosure();
  const { isMobile } = useUi();
  const { rcc, rbgc } = useThemeColors();
  const { formatMessage } = useIntl();

  return (
    <>
      <Button
        size={isMobile ? 'sm' : 'md'}
        variant="secondary"
        bg={rbgc('base-background.elevated-bg-1')}
        fullWidth
        onClick={open}
        leftSection={<Icon name="message-circle-question" />}
      >
        FAQ
      </Button>
      <ModalDrawer
        drawerSize="lg"
        opened={opened}
        close={close}
        withCloseButton={false}
      >
        <Stack gap={16} w="100%">
          <Grid align="center" mt={isMobile ? 30 : 0}>
            <Grid.Col span={2} />
            <Grid.Col span={8}>
              <Title size="2xl" c={rcc('regular-content.primary')} ta="center">
                FAQ
              </Title>
            </Grid.Col>
            <Grid.Col
              span={2}
              style={{ display: 'flex', justifyContent: 'end' }}
            >
              <CloseButton size="xl" onClick={close} className={styles.close} />
            </Grid.Col>
          </Grid>

          <ScrollArea type="scroll" mt={16} h={430} scrollbars="y">
            <Accordion
              defaultValue="Apples"
              chevron={<Icon name="plus" size={20} />}
            >
              <Stack gap={12}>
                {groceries.map((item) => (
                  <Accordion.Item key={item.value} value={item.value}>
                    <Accordion.Control>
                      {formatMessage({
                        id: item.value,
                        defaultMessage: item.defaultValue,
                      })}
                    </Accordion.Control>
                    <Accordion.Panel>
                      {formatMessage({
                        id: item.description,
                        defaultMessage: item.defaultDescription,
                      })}
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Stack>
            </Accordion>
          </ScrollArea>
          <Button fullWidth onClick={close} mt={16}>
            {formatMessage({ id: 'common.close', defaultMessage: 'Close' })}
          </Button>
        </Stack>
      </ModalDrawer>
    </>
  );
};
