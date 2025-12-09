import { useEffect, useRef } from 'react';
import { useAtomValue } from 'jotai';
import BigNumber from 'bignumber.js';
import {
  AreaSeries,
  createChart,
  CrosshairMode,
  LineType,
  Time,
} from 'lightweight-charts';
import { Box, Paper, Title, useMantineColorScheme } from '@mantine/core';
import { useIntl } from 'react-intl';

import { balanceHistoryAtom } from '@/store/balanceHistory';
import { useUi } from '@/contexts';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import classes from './balanceHistoryChart.module.css';

export const BalanceHistoryChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const history = useAtomValue(balanceHistoryAtom);
  const { colorScheme } = useMantineColorScheme();
  const { isAccountBalanceHidden } = useUi();
  const { formatMessage } = useIntl();
  const { rcc } = useThemeColors();

  const isLight = colorScheme === 'light';

  useEffect(() => {
    if (!chartContainerRef.current || !history?.data) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: 'transparent' },
        attributionLogo: false,
        textColor: '#94A3B8',
      },
      width: chartContainerRef.current.clientWidth,
      height: 240,

      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.1)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      crosshair: {
        mode: CrosshairMode.Magnet,
      },

      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chart.applyOptions({
      localization: {
        priceFormatter: (price: string) =>
          `$${new BigNumber(price).toFixed(2)}`,
      },
    });

    const series = chart.addSeries(AreaSeries, {
      topColor: isLight ? '#E2E6EF' : '#2F2F2F',
      bottomColor: isLight ? '#E2E6EF' : '#2F2F2F',
      lineColor: isLight ? '#B7BECD' : '#d9fe43',
      lineType: LineType.Curved,
      lineWidth: 2,
    });

    const data = history.data
      .filter((d) => d.timestamp && d.balance)
      .map((d) => ({
        time: Math.floor((d.timestamp as number) / 1000) as Time,
        value: parseFloat(d.balance!),
      }));

    series.setData(data);

    const firstTime = data[0]?.time;
    const lastTime = data[data.length - 1]?.time;

    chart.timeScale().setVisibleRange({
      from: firstTime,
      to: lastTime,
    });

    chart.applyOptions({
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: false,
      },
      timeScale: {
        rightOffset: 0,
        barSpacing: 6,
        fixLeftEdge: true,
        fixRightEdge: true,
        minBarSpacing: 1,
      },
    });

    const resizeObserver = new ResizeObserver(() => {
      chart.applyOptions({
        width: chartContainerRef.current!.clientWidth,
      });
    });

    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [history, isAccountBalanceHidden]);

  if (!history?.data || history.data.length === 0) {
    return null;
  }

  if (isAccountBalanceHidden) {
    return null;
  }

  return (
    <Paper className={classes.container}>
      <Box mb={8}>
        <Title size="lg" c={rcc('regular-content.primary')}>
          {formatMessage({
            id: 'widgets.balance_history_chart.title',
            defaultMessage: 'Balance chart',
          })}
        </Title>
      </Box>
      <div ref={chartContainerRef} />
    </Paper>
  );
};
