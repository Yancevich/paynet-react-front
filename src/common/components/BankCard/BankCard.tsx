import { Flex, Paper, Stack, Text } from '@mantine/core';
import { useAtom, useAtomValue } from 'jotai';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

import { Card, CardDetails, CardStatus, CardType } from '@/api/cardHolder';
import { CardStatusBadge } from '@/common/components/CardStatusBadge';
import { FormattedAmount } from '@/common/components/FormattedAmount';
import { useUi } from '@/contexts';
import { ROUTES } from '@/routes';
import { accountBalanceByIdAtom } from '@/store/balances';
import { baseCurrencyAtom } from '@/store/currencies';

import classes from './bankCard.module.css';

type BankCardProps = {
  card: Card;
  details: CardDetails | undefined;
  cardId: string;
};

const UNCLICKABLE_CARD_STATUSES = [
  CardStatus.INIT,
  CardStatus.ISSUED,
  CardStatus.PENDING,
  CardStatus.REJECTED,
  CardStatus.FAILED,
];

export const BankCard = ({ card, details, cardId }: BankCardProps) => {
  const { isMobile, isTablet, isBankAccountBalanceHidden } = useUi();
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const [baseCurrency] = useAtom(baseCurrencyAtom);
  const accountBalance = useAtomValue(accountBalanceByIdAtom(card.accountId));

  const isDisabledForNavigation =
    card?.status && UNCLICKABLE_CARD_STATUSES.includes(card.status);

  const handleCardClick = () => {
    if (isDisabledForNavigation || !cardId) {
      return;
    }
    navigate(ROUTES.card.getFullPath(cardId));
  };

  return (
    <Paper
      onClick={handleCardClick}
      classNames={{ root: classes.root }}
      mih={isTablet ? 76 : 112}
      data-card-type={card.status}
      data-card-disabled={isDisabledForNavigation}
    >
      <Stack h="100%" gap={isMobile ? 6 : 12} justify="space-between">
        <Flex justify="space-between">
          <Text size="xl" classNames={{ root: classes.balance }}>
            {!isBankAccountBalanceHidden ? (
              <FormattedAmount
                amount={accountBalance?.totalBalance ?? '0'}
                slug={baseCurrency?.slug ?? ''}
              />
            ) : (
              '***'
            )}
          </Text>

          <CardStatusBadge status={card.status} classNames={classes.badge} />
        </Flex>

        <Flex justify="space-between" wrap="wrap">
          <Stack>
            <Text size="lg" classNames={{ root: classes.title }} mb={-10}>
              {details?.cardName && details.cardName.length > 16
                ? details.cardName.substring(0, 16) + '…'
                : details?.cardName}
            </Text>

            <Text size="md">
              <span style={{ color: 'var(--neutral-600)' }}>
                {card?.cardType === CardType.PHYSICAL
                  ? formatMessage({
                      id: 'widget.bank_card.plastic',
                      defaultMessage: 'Plastic',
                    })
                  : formatMessage({
                      id: 'widget.bank_card.virtual',
                      defaultMessage: 'Virtual',
                    })}
              </span>
            </Text>
          </Stack>
        </Flex>
      </Stack>
    </Paper>
  );
};
