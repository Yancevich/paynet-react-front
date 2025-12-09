import {
  Button,
  Drawer,
  Flex,
  Group,
  Image,
  Menu,
  Radio,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useIntl } from 'react-intl';

import { useLanguage } from '@/store/language';
import { Language } from '@/types';
import { Icon } from '@/common/components/Icon';
import { useUi } from '@/contexts';

import images from './images';
import classes from './LanguagePicker.module.scss';

const languageData: Language[] = [
  { text: 'English', image: images.english, id: 'en' },
  { text: 'Русский', image: images.russian, id: 'ru' },
  { text: 'O‘zbek', image: images.uzbek, id: 'uz' },
  { text: '汉语', image: images.china, id: 'zh' },
  { text: '한국어', image: images.southKorea, id: 'kr' }
];

interface LanguagePickerProps {
  onChangeLanguage: (newLanguage: Language) => void;
  currentLanguage: Language;
  flagOnly?: boolean;
}

export function LanguagePicker({
  onChangeLanguage,
  currentLanguage,
  flagOnly = false,
}: LanguagePickerProps) {
  const { availableLanguages } = useLanguage();
  const [opened, { toggle }] = useDisclosure();
  const { formatMessage } = useIntl();
  const { isMobile } = useUi();

  const getLanguageData = (id: string) =>
    languageData.find((lang) => lang.id === id) || languageData[0];

  const currentLanguageData = getLanguageData(currentLanguage.id);

  return isMobile ? (
    <>
      <UnstyledButton className={classes.control} onClick={toggle}>
        <Group gap="xs">
          <Image src={currentLanguageData.image} width={22} height={22} />
          {!flagOnly && (
            <span className={classes.label}>{currentLanguageData.text}</span>
          )}
        </Group>
        {!flagOnly && <Icon name="chevron-down" className={classes.icon} />}
      </UnstyledButton>

      <Drawer opened={opened} onClose={toggle} size="sm" position="bottom">
        <Stack mt={32} gap={24}>
          <Title size="lg" ta="center">
            {formatMessage({
              id: 'settings.language.title',
              defaultMessage: 'Language',
            })}
          </Title>

          <Radio.Group
            value={currentLanguage.id}
            onChange={(value) =>
              onChangeLanguage(
                availableLanguages.find((lang) => lang.id === value)!
              )
            }
          >
            <Stack gap={20}>
              {availableLanguages.map((lang) => {
                const languageItem = getLanguageData(lang.id);

                return (
                  <Flex key={lang.id} align="center" justify="space-between">
                    <UnstyledButton
                      className={classes.dropdown__item}
                      onClick={() => onChangeLanguage(lang)}
                    >
                      <Group gap="xs">
                        <Image
                          src={languageItem.image}
                          width={18}
                          height={18}
                        />
                        <Text>{languageItem.text}</Text>
                      </Group>
                    </UnstyledButton>
                    <Radio value={lang.id} />
                  </Flex>
                );
              })}
            </Stack>
          </Radio.Group>

          <Button fullWidth onClick={toggle}>
            {formatMessage({
              id: 'settings.language.close',
              defaultMessage: 'Close',
            })}
          </Button>
        </Stack>
      </Drawer>
    </>
  ) : (
    <Menu radius="md" width={!flagOnly ? 'target' : 'lg'} withinPortal>
      <Menu.Target>
        <UnstyledButton className={classes.control}>
          <Group gap="md">
            <Image src={currentLanguageData.image} width={22} height={22} />
            {!flagOnly && (
              <span className={classes.label}>{currentLanguageData.text}</span>
            )}
          </Group>
          {!flagOnly && <Icon name="chevron-down" className={classes.icon} />}
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown className={classes.dropdown}>
        {availableLanguages.map((lang) => {
          const languageItem = getLanguageData(lang.id);

          return (
            <Menu.Item
              key={lang.id}
              onClick={() => onChangeLanguage(lang)}
              styles={{ item: { paddingLeft: 8, paddingRight: 8 } }}
              className={classes.dropdown__item}
            >
              <Flex gap={8} align="center" justify="flex-start">
                <Image
                  className={classes.image}
                  src={languageItem.image}
                  width={18}
                  height={18}
                />
                <span className={classes.dropdown__item__text}>
                  {languageItem.text}
                </span>
              </Flex>
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
}
