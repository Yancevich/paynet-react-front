import type { LocaleCode } from '@/shared/state/uiAtoms'

export type PaymentFlowMessageKey =
  | 'title'
  | 'back'
  | 'close'
  | 'parentService'
  | 'childService'
  | 'chooseService'
  | 'noChildOptions'
  | 'selectValue'
  | 'requiredError'
  | 'numberError'
  | 'maxLengthError'
  | 'loadServicesError'
  | 'detailsButton'
  | 'detailsFailed'
  | 'detailsSuccess'
  | 'processing'
  | 'confirm'
  | 'amountLabel'
  | 'amountPlaceholder'
  | 'chooseCoin'
  | 'balance'
  | 'fee'
  | 'totalAmount'
  | 'operation'
  | 'statusSuccess'
  | 'statusFailed'
  | 'statusPending'
  | 'statusClose'
  | 'statusBack'
  | 'statusRetry'
  | 'statusSave'
  | 'statusSaving'
  | 'noDetails'

export const paymentFlowMessages: Record<LocaleCode, Record<PaymentFlowMessageKey, string>> =
  {
    en: {
      title: 'Top-up',
      back: 'Back',
      close: 'Close',
      parentService: 'Service',
      childService: 'Option',
      chooseService: 'Choose service',
      noChildOptions: 'No extra options',
      selectValue: 'Select value',
      requiredError: 'Required field',
      numberError: 'Numbers only',
      maxLengthError: 'Max length {max}',
      loadServicesError: 'Failed to load services. Please try again.',
      detailsButton: 'Details',
      detailsFailed: 'Failed to fetch details',
      detailsSuccess: 'Details received',
      processing: 'Processing...',
      confirm: 'Confirm',
      amountLabel: 'Amount',
      amountPlaceholder: 'Enter amount',
      chooseCoin: 'Choose a coin for payment',
      balance: 'Balance',
      fee: 'Fee',
      totalAmount: 'Total {coin} amount',
      operation: 'Operation',
      statusSuccess: 'Top-up successful',
      statusFailed: 'Payment failed',
      statusPending: 'Transaction is processing',
      statusClose: 'Close',
      statusBack: 'Back to services',
      statusRetry: 'Try again',
      statusSave: 'Save as template',
      statusSaving: 'Saving…',
      noDetails: 'No details available',
    },
    ru: {
      title: 'Оплата',
      back: 'Назад',
      close: 'Закрыть',
      parentService: 'Сервис',
      childService: 'Опция',
      chooseService: 'Выберите сервис',
      noChildOptions: 'Дополнительных опций нет',
      selectValue: 'Выберите значение',
      requiredError: 'Обязательное поле',
      numberError: 'Только цифры',
      maxLengthError: 'Макс. длина {max}',
      loadServicesError: 'Не удалось загрузить сервисы. Попробуйте ещё раз.',
      detailsButton: 'Детали',
      detailsFailed: 'Не удалось получить детали',
      detailsSuccess: 'Детали получены',
      processing: 'Обработка...',
      confirm: 'Подтвердить',
      amountLabel: 'Сумма',
      amountPlaceholder: 'Введите сумму',
      chooseCoin: 'Выберите токен для оплаты',
      balance: 'Баланс',
      fee: 'Комиссия',
      totalAmount: 'Итого {coin}',
      operation: 'Операция',
      statusSuccess: 'Платёж выполнен',
      statusFailed: 'Ошибка платежа',
      statusPending: 'Транзакция обрабатывается',
      statusClose: 'Закрыть',
      statusBack: 'Назад к сервисам',
      statusRetry: 'Повторить',
      statusSave: 'Сохранить как шаблон',
      statusSaving: 'Сохраняем…',
      noDetails: 'Деталей нет',
    },
    uz: {
      title: "To'lov",
      back: 'Ortga',
      close: 'Yopish',
      parentService: 'Xizmat',
      childService: 'Opsiya',
      chooseService: 'Xizmatni tanlang',
      noChildOptions: "Qo'shimcha opsiya yo'q",
      selectValue: 'Qiymatni tanlang',
      requiredError: "Majburiy maydon",
      numberError: 'Faqat raqamlar',
      maxLengthError: 'Maks. uzunlik {max}',
      loadServicesError: 'Xizmatlarni yuklab bo‘lmadi. Qayta urinib ko‘ring.',
      detailsButton: 'Tafsilotlar',
      detailsFailed: 'Tafsilotlarni olish imkonsiz',
      detailsSuccess: 'Tafsilotlar olindi',
      processing: 'Qayta ishlanmoqda...',
      confirm: 'Tasdiqlash',
      amountLabel: 'Miqdor',
      amountPlaceholder: 'Summani kiriting',
      chooseCoin: "To'lov uchun tokenni tanlang",
      balance: 'Balans',
      fee: 'Komissiya',
      totalAmount: 'Jami {coin}',
      operation: 'Operatsiya',
      statusSuccess: "To'lov muvaffaqiyatli",
      statusFailed: "To'lovda xato",
      statusPending: 'Tranzaksiya bajarilmoqda',
      statusClose: 'Yopish',
      statusBack: 'Xizmatlarga qaytish',
      statusRetry: 'Qayta urinib ko‘ring',
      statusSave: 'Shablon sifatida saqlash',
      statusSaving: 'Saqlanmoqda…',
      noDetails: 'Tafsilotlar mavjud emas',
    },
  }

export const getPaymentFlowMessage = (
  locale: LocaleCode,
  key: PaymentFlowMessageKey,
  params?: Record<string, string | number>
) => {
  const dict = paymentFlowMessages[locale] || paymentFlowMessages.en
  let template = dict[key] || paymentFlowMessages.en[key]

  if (!params) return template

  Object.entries(params).forEach(([paramKey, value]) => {
    template = template.replace(`{${paramKey}}`, String(value))
  })

  return template
}
