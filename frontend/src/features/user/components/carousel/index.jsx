import { useCallback } from 'react';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { Card, Chip, Typography, Box, Button, IconButton } from '@mui/material';
import { LuShoppingBasket, LuHeart } from 'react-icons/lu';
import './carousel.css';
import './base.css';

import Brush from '../../../../assets/images/brush.svg';
const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick,
  );

  return (
    <Card
      className="embla"
      elevation={0}
      sx={{ boxShadow: 'none', padding: '0px', margin: '0px' }}
      variant="outlined"
    >
      <section className="product">
        <div className="product_header">
          <Chip label="New Product" variant="outlined" />
          <div className="embla__controls">
            <div className="embla__dots">
              {scrollSnaps.map((_, product) => (
                <DotButton
                  key={product}
                  onClick={() => onDotButtonClick(product)}
                  className={'embla__dot'.concat(
                    product === selectedIndex ? ' embla__dot--selected' : '',
                  )}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="product_descrtiption">
          <Typography fontSize={24} color={'text.primary'}>
            One Good Brush - Biodegradable Toothbrush
          </Typography>
          <Box>
            <img src={Brush} alt="" />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Button variant="outlined" sx={{ borderRadius: 6, px: 3, py: 0.5 }}>
              <Typography fontSize={14} color="text.primary">
                Details
              </Typography>
            </Button>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <IconButton
                size="small"
                sx={{
                  borderRadius: '50%',
                  border: '1px solid #2e7d32',
                  p: 1,
                }}
              >
                <LuHeart fontSize={20} strokeWidth={1.5} />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  borderRadius: '50%',
                  backgroundColor: 'primary.main',
                  p: 1,
                  ':hover': {
                    backgroundColor: 'primary.main',
                  },
                }}
              >
                <LuShoppingBasket
                  color="white"
                  fontSize={20}
                  strokeWidth={1.5}
                />
              </IconButton>
            </Box>
          </Box>
        </div>
      </section>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide) => (
            <div className="embla__slide" key={slide}>
              <img className="slide_image" src={slide} alt="Slide" />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default EmblaCarousel;
