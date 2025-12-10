import { Flex } from '@mantine/core';
import { useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';

import { turnstileIdAtom, turnstileTokenAtom } from '@/store/turstileToken';
import { TURNSTILE_SITE_KEY } from '@/config.ts';

export const TurnstileWidget = () => {
  const { locale } = useIntl();
  const widgetRef = useRef<HTMLDivElement>(null);
  const setToken = useSetAtom(turnstileTokenAtom);
  const setId = useSetAtom(turnstileIdAtom);

  useEffect(() => {
    if (!document.getElementById('cf-turnstile-script')) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      script.id = 'cf-turnstile-script';
      document.body.appendChild(script);
    }

    const render = () => {
      if (window.turnstile && widgetRef.current) {
        const widget = window.turnstile.render(widgetRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          language: locale,
          callback: (token: string) => {
            setToken(token);
          },
        });

        setId(widget);
      }
    };

    const interval = setInterval(() => {
      if (window.turnstile) {
        clearInterval(interval);
        render();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [locale, setId, setToken]);

  return (
    <Flex align="center" w="100%" direction="column">
      <div ref={widgetRef} />
    </Flex>
  );
};
