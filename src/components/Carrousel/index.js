import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

import 'slick-carousel/slick/slick-theme.css';

import { CarrouselHeader, Title, Buttons, Button } from './styles';

const settings = {
  variableWidth: true,
  infinite: false,
  arrows: false,
  className: 'slides',
  dots: false,
  slidesToShow: 5,
  slidesToScroll: 5,
  speed: 500,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
        dots: false,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 540,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        dots: false,
      },
    },
  ],
};

export default function Carrousel({ totalItems, carrouselName, children }) {
  const sliderRef = useRef();
  const { t } = useTranslation();

  function next() {
    sliderRef.current.slickNext();
  }

  function prev() {
    sliderRef.current.slickPrev();
  }

  return (
    <>
      <CarrouselHeader>
        <Title>{carrouselName}</Title>
        {totalItems > 5 && (
          <Buttons>
            <Button type="button" onClick={prev}>
              {t('carrousel.arrow_prev')}
            </Button>
            <Button type="button" onClick={next}>
              {t('carrousel.arrow_next')}
            </Button>
          </Buttons>
        )}
      </CarrouselHeader>
      <Slider ref={sliderRef} {...settings}>
        {children}
      </Slider>
    </>
  );
}
