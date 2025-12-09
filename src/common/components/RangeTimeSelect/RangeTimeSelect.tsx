import { Menu, UnstyledButton } from '@mantine/core';

import { Icon } from '@/common/components/Icon';

import classes from './rangeTimeSelect.module.css';

export type RangeItem = { label: string; daysAgo: number };

const dateRanges = [
  { label: 'Last 7 days', daysAgo: 7 },
  { label: 'Last 30 days', daysAgo: 30 },
  { label: 'Last 90 days', daysAgo: 90 },
  { label: 'Last 180 days', daysAgo: 180 },
  { label: 'Last year', daysAgo: 365 },
];

interface RangeTimeSelectProps {
  timesList?: RangeItem[];
  selected: RangeItem;
  selectRange?: (value: RangeItem) => void;
}

export const RangeTimeSelect = ({
  timesList = dateRanges,
  selected,
  selectRange,
}: RangeTimeSelectProps) => {
  return (
    <Menu>
      <Menu.Target>
        <UnstyledButton classNames={{ root: classes.button }}>
          {selected.label}
          <Icon name="chevron-down" />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        {timesList.map((date) => (
          <Menu.Item
            key={date.label}
            onClick={() => selectRange && selectRange(date)}
          >
            {date.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
