import { ReactNode } from 'react';

export interface ColumnConfig<T> {
  key: string;
  render: (data: T) => ReactNode;
}
