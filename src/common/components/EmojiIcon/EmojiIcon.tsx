import { useEffect, useRef } from 'react';
import twemoji from 'twemoji';

type Props = {
  children: string;
  size?: number;
};

export function EmojiIcon({ children, size = 16 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = children;

      twemoji.parse(ref.current, {
        folder: 'svg',
        ext: '.svg',
      });
    }
  }, [children]);

  return (
    <span
      ref={ref}
      style={{
        display: 'inline-flex',
        alignSelf: 'center',
        width: size,
        height: size,
        lineHeight: 1,
      }}
    />
  );
}
