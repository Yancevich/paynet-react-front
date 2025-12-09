import { Paper } from '@mantine/core';

import { AddNewPaymentMethod } from '@/common/components/AddNewPaymentMethod';
import { CurrentPaymentMethod } from '@/common/components/CurrentPaymentMethod';
import { CardDtoExtended } from '@/store/paymentMethods';

import classes from './paymentMethodSelect.module.css';

interface PaymentMethodSelectProps {
  paymentMethods: CardDtoExtended[];
}

export const PaymentMethodSelect = ({
  paymentMethods,
}: PaymentMethodSelectProps) => {
  const renderContent = () => {
    const selectedPaymentMethod = paymentMethods.find(
      (paymentMethod) => paymentMethod.preferred
    );

    if (paymentMethods.length === 0 || !selectedPaymentMethod) {
      return <AddNewPaymentMethod />;
    }

    return <CurrentPaymentMethod paymentMethod={selectedPaymentMethod} />;
  };

  return <Paper className={classes.container}>{renderContent()}</Paper>;
};
