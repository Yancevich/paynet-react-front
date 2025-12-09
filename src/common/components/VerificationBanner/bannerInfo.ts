import { IntlShape } from 'react-intl';

import { VerificationStatus, VerificationType } from '@/api/registration/types';

export enum VerificationLevelShorted {
  L1 = 'L1',
  L2 = 'L2',
}

export type AllowedVerificationTypes =
  | VerificationType.SUMSUB
  | VerificationType.KYB_MANUAL;

export type AllowedVerificationStatus =
  | VerificationStatus.INIT
  | VerificationStatus.RETRY
  | VerificationStatus.PENDING
  | VerificationStatus.REJECT
  | VerificationStatus.PENDINGL2F;

type MessageEntry = {
  title: { id: string; defaultMessage: string };
  description: { id: string; defaultMessage: string };
  button?: { id: string; defaultMessage: string };
};

type BannerInfoWithLevel = Record<
  VerificationLevelShorted,
  Partial<Record<AllowedVerificationStatus, MessageEntry>>
>;

type BannerInfo = {
  [VerificationType.SUMSUB]: BannerInfoWithLevel;
  [VerificationType.KYB_MANUAL]: Partial<
    Record<AllowedVerificationStatus, MessageEntry>
  >;
};

export const bannerInfo: BannerInfo = {
  [VerificationType.SUMSUB]: {
    [VerificationLevelShorted.L1]: {
      [VerificationStatus.INIT]: {
        title: {
          id: 'widgets.verification.sumsub.l1.not_verified_title',
          defaultMessage: 'Account not verified',
        },
        description: {
          id: 'widgets.verification.sumsub.l1.not_verified_description',
          defaultMessage:
            'Complete your identity verification to access all services',
        },
        button: {
          id: 'widgets.verification.sumsub.l1.not_verified_button',
          defaultMessage: 'Verify',
        },
      },
      [VerificationStatus.RETRY]: {
        title: {
          id: 'widgets.verification.sumsub.l1.additional_info_title',
          defaultMessage: 'Additional information required',
        },
        description: {
          id: 'widgets.verification.sumsub.l1.additional_info_description',
          defaultMessage:
            'Learn which details are missing for your verification',
        },
        button: {
          id: 'widgets.verification.sumsub.l1.additional_info_button',
          defaultMessage: 'Learn more',
        },
      },
      [VerificationStatus.PENDING]: {
        title: {
          id: 'widgets.verification.sumsub.l1.in_progress_title',
          defaultMessage: 'Verification in progress',
        },
        description: {
          id: 'widgets.verification.sumsub.l1.in_progress_description',
          defaultMessage:
            'All documents are uploaded. Please wait for the decision',
        },
      },
      [VerificationStatus.PENDINGL2F]: {
        title: {
          id: 'widgets.verification.sumsub.l1.pending_kyb_title',
          defaultMessage: 'Your application is under review',
        },
        description: {
          id: 'widgets.verification.sumsub.l1.pending_kyb_description',
          defaultMessage:
            'Your form is currently being reviewed. Our managers will contact you if any questions arise.',
        },
      },
      [VerificationStatus.REJECT]: {
        title: {
          id: 'widgets.verification.sumsub.l1.denied_title',
          defaultMessage: 'Denied',
        },
        description: {
          id: 'widgets.verification.sumsub.l1.denied_description',
          defaultMessage: 'Your verification has been denied.',
        },
      },
    },
    [VerificationLevelShorted.L2]: {
      [VerificationStatus.INIT]: {
        title: {
          id: 'widgets.verification.sumsub.l2.not_verified_title',
          defaultMessage: 'Verification is not completed',
        },
        description: {
          id: 'widgets.verification.sumsub.l2.not_verified_description',
          defaultMessage:
            'Complete your identity verification to access all services',
        },
        button: {
          id: 'widgets.verification.sumsub.l2.not_verified_button',
          defaultMessage: 'Complete verification',
        },
      },
      [VerificationStatus.REJECT]: {
        title: {
          id: 'widgets.verification.sumsub.l1.denied_title',
          defaultMessage: 'Denied',
        },
        description: {
          id: 'widgets.verification.sumsub.l1.denied_description',
          defaultMessage: 'Your verification has been denied.',
        },
      },
      [VerificationStatus.PENDING]: {
        title: {
          id: 'widgets.verification.sumsub.l1.in_progress_title',
          defaultMessage: 'Verification in progress',
        },
        description: {
          id: 'widgets.verification.sumsub.l1.in_progress_description',
          defaultMessage:
            'All documents are uploaded. Please wait for the decision',
        },
      },
      [VerificationStatus.RETRY]: {
        title: {
          id: 'widgets.verification.sumsub.l1.additional_info_title',
          defaultMessage: 'Additional information required',
        },
        description: {
          id: 'widgets.verification.sumsub.l1.additional_info_description',
          defaultMessage:
            'Learn which details are missing for your verification',
        },
        button: {
          id: 'widgets.verification.sumsub.l1.additional_info_button',
          defaultMessage: 'Learn more',
        },
      },
      [VerificationStatus.PENDINGL2F]: {
        title: {
          id: 'widgets.verification.sumsub.l1.pending_kyb_title',
          defaultMessage: 'Your application is under review',
        },
        description: {
          id: 'widgets.verification.sumsub.l1.pending_kyb_description',
          defaultMessage:
            'Your form is currently being reviewed. Our managers will contact you if any questions arise.',
        },
      },
    },
  },
  [VerificationType.KYB_MANUAL]: {
    [VerificationStatus.INIT]: {
      title: {
        id: 'widgets.verification.not_verified_title',
        defaultMessage: 'Account not verified',
      },
      description: {
        id: 'widgets.verification.not_verified_description',
        defaultMessage:
          'Complete your identity verification to access all services',
      },
      button: {
        id: 'widgets.verification.not_verified_button',
        defaultMessage: 'Verify',
      },
    },
    [VerificationStatus.RETRY]: {
      title: {
        id: 'widgets.verification.additional_info_title',
        defaultMessage: 'Additional information required',
      },
      description: {
        id: 'widgets.verification.additional_info_description',
        defaultMessage: 'Learn which details are missing for your verification',
      },
      button: {
        id: 'widgets.verification.additional_info_button',
        defaultMessage: 'Try again',
      },
    },
    [VerificationStatus.PENDING]: {
      title: {
        id: 'widgets.verification.pending_kyb_title',
        defaultMessage: 'Your application is under review',
      },
      description: {
        id: 'widgets.verification.pending_kyb_description',
        defaultMessage:
          'Your form is currently being reviewed. Our managers will contact you if any questions arise.',
      },
    },
    [VerificationStatus.PENDINGL2F]: {
      title: {
        id: 'widgets.verification.pending_kyb_title',
        defaultMessage: 'Your application is under review',
      },
      description: {
        id: 'widgets.verification.pending_kyb_description',
        defaultMessage:
          'Your form is currently being reviewed. Our managers will contact you if any questions arise.',
      },
    },
    [VerificationStatus.REJECT]: {
      title: {
        id: 'widgets.verification.denied_title',
        defaultMessage: 'Denied',
      },
      description: {
        id: 'widgets.verification.denied_description',
        defaultMessage: 'Your verification has been denied.',
      },
    },
  },
};

const allowedStatuses: AllowedVerificationStatus[] = [
  VerificationStatus.INIT,
  VerificationStatus.RETRY,
  VerificationStatus.PENDING,
  VerificationStatus.REJECT,
  VerificationStatus.PENDINGL2F,
];

function isAllowedVerificationStatus(
  status: VerificationStatus
): status is AllowedVerificationStatus {
  return allowedStatuses.includes(status as AllowedVerificationStatus);
}

function isAllowedVerificationType(
  type: string
): type is AllowedVerificationTypes {
  return Object.values(VerificationType).includes(type as VerificationType);
}

export const getBannerData = (
  verificationType: VerificationType | undefined,
  status: VerificationStatus | undefined,
  intl: IntlShape,
  level?: VerificationLevelShorted
): { title: string; description: string; button?: string } | null => {
  if (
    !verificationType ||
    !status ||
    !isAllowedVerificationType(verificationType) ||
    !isAllowedVerificationStatus(status)
  ) {
    console.warn('Unsupported verification status or type', {
      verificationType,
      status,
      level,
    });
    return null;
  }

  let entry: MessageEntry | undefined;

  if (verificationType === VerificationType.SUMSUB && level) {
    entry = bannerInfo[VerificationType.SUMSUB]?.[level]?.[status];
  } else if (verificationType === VerificationType.KYB_MANUAL) {
    entry = bannerInfo[VerificationType.KYB_MANUAL]?.[status];
  }

  if (!entry) {
    console.warn('Missing banner entry for:', {
      verificationType,
      status,
      level,
    });
    return null;
  }

  const { title, description, button } = entry;

  if (!title?.id || !description?.id) {
    console.warn('Missing i18n ID in banner entry', { entry });
    return null;
  }

  return {
    title: intl.formatMessage(title),
    description: intl.formatMessage(description),
    ...(button?.id ? { button: intl.formatMessage(button) } : {}),
  };
};
