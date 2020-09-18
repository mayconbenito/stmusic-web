import { useKeenSlider } from 'keen-slider/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdPlayArrow } from 'react-icons/md';

import 'keen-slider/keen-slider.min.css';

import {
  CarouselHeader,
  Title,
  CarouselPlayButton,
  Buttons,
  Button,
  CarouselTitleContainer,
} from './styles';

function Carousel({ totalItems, carouselName, children, onPlay }) {
  const { t } = useTranslation();

  const [sliderRef, slider] = useKeenSlider({
    spacing: 10,
    slidesPerView: 3,
    centered: false,
    loop: false,
    duration: 300,
    mode: 'snap',
    breakpoints: {
      '(min-width: 540px)': {
        slidesPerView: 3,
        mode: 'snap',
      },
      '(min-width: 700px)': {
        slidesPerView: 4,
        mode: 'snap',
      },
      '(min-width: 1024px)': {
        slidesPerView: 7,
        mode: 'snap',
      },
    },
    controls: true,
  });

  function next() {
    slider.next();
  }

  function prev() {
    slider.prev();
  }

  return (
    <>
      <CarouselHeader>
        <CarouselTitleContainer>
          <Title>{carouselName}</Title>
          {onPlay && (
            <CarouselPlayButton onClick={onPlay}>
              <MdPlayArrow size={24} color="#d99207" />
            </CarouselPlayButton>
          )}
        </CarouselTitleContainer>
        {totalItems > 5 && (
          <Buttons>
            <Button type="button" onClick={prev}>
              {t('carousel.arrow_prev')}
            </Button>
            <Button type="button" onClick={next}>
              {t('carousel.arrow_next')}
            </Button>
          </Buttons>
        )}
      </CarouselHeader>
      <div ref={sliderRef} className="keen-slider">
        {children.map((child) => (
          <div key={child.key} className="keen-slider__slide">
            {child}
          </div>
        ))}
      </div>
    </>
  );
}

export default Carousel;
