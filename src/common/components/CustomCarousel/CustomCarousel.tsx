import { ReactNode, useState } from 'react';
import { Carousel, CarouselProps } from '@mantine/carousel';

import { Icon } from '@/common/components/Icon';

import customCarouselClasses from './customCarousel.module.css';

type CustomCarouselProps = {
  items: ReactNode[];
  height?: number;
  withIndicators?: boolean;
} & CarouselProps;

export const CustomCarousel = ({
  items,
  height,
  withIndicators,
  ...props
}: CustomCarouselProps) => {
  // const [currentSlide, setCurrentSlide] = useState(0);
  const [, setCurrentSlide] = useState(0);

  return (
    <div className={customCarouselClasses.wrapper}>
      <Carousel
        classNames={{ control: customCarouselClasses.control }}
        height={height}
        withIndicators={withIndicators}
        controlSize={20}
        align="end"
        nextControlIcon={<Icon name="chevron-right" />}
        previousControlIcon={<Icon name="chevron-left" />}
        onSlideChange={(i) => setCurrentSlide(i)}
        {...props}
      >
        {items.map((item, index) => (
          <Carousel.Slide key={index}>{item}</Carousel.Slide>
        ))}
      </Carousel>
      {/* TODO: temporary hide for octa designs */}
      {/*{currentSlide !== 0 ? (*/}
      {/*  <div className={customCarouselClasses.leftOverlay}></div>*/}
      {/*) : null}*/}
      {/*{currentSlide !== items.length - 1 ? (*/}
      {/*  <div className={customCarouselClasses.rightOverlay}></div>*/}
      {/*) : null}*/}
    </div>
  );
};
