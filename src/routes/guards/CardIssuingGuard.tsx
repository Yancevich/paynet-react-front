import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router';

import { ROUTES } from '@/routes';
import { useCreateCard, CreateCardStep } from '@/store/cards';

export type CardIssuingGuardProps = {
  children: ReactNode;
};

export const CardIssuingGuard: FC<CardIssuingGuardProps> = (props) => {
  const { children } = props;

  const { step, isStartCardIssuing, cardOffersWithDesigns } = useCreateCard();

  const hasCardOffers = cardOffersWithDesigns.length > 0;
  const isCardOptionsStep = step === CreateCardStep.CardOptions;

  if (!hasCardOffers) {
    return <Navigate to={ROUTES.cards.path} replace />;
  }

  if (isCardOptionsStep && !isStartCardIssuing) {
    return <Navigate to={ROUTES.cards.path} replace />;
  }

  return children;
};
