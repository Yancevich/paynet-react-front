import { Stack } from '@mantine/core';

import { SelectCardListItem } from '@/common/widgets/SelectCardModal/components/SelectCardListItem';
import { CardDtoExtended } from '@/store/paymentMethods';

interface SelectCardListProps {
  paymentMethods: CardDtoExtended[];
  selectedPaymentMethodId?: string | null;
  onSelectForDelete?: (card: CardDtoExtended) => void;
  onSelect: (cardId: string) => void;
}

export const SelectCardList = ({
  paymentMethods,
  onSelect,
  selectedPaymentMethodId,
  onSelectForDelete,
}: SelectCardListProps) => {
  return (
    <Stack gap={12}>
      {paymentMethods.map((paymentMethod) => (
        <SelectCardListItem
          key={paymentMethod.id}
          paymentMethod={paymentMethod}
          onSelect={onSelect}
          selected={paymentMethod.id === selectedPaymentMethodId}
          selectForDelete={onSelectForDelete}
        />
      ))}
    </Stack>
  );
};
