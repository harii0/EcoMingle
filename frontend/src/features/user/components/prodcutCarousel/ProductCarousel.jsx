import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Box } from '@mui/material';
import './productCarousel.css';

const ProductCarousel = ({ product }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainViewportRef, emblaMainApi] = useEmblaCarousel();
  const [thumbViewportRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on('select', onSelect);
    return () => emblaMainApi.off('select', onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <Box>
      <Box className="embla_main" sx={{ overflow: 'hidden' }}>
        <Box className="embla__main__viewport" ref={mainViewportRef}>
          <Box className="embla__main__container" sx={{ display: 'flex' }}>
            {product.ProductImage.map((image, index) => (
              <Box
                key={index}
                className="embla__main__slide"
                sx={{
                  flex: '0 0 100%',
                  minWidth: 0,
                  position: 'relative',
                }}
              >
                <Box
                  component="img"
                  src={image}
                  alt={`${product.productName} - View ${index + 1}`}
                  sx={{
                    display: 'block',
                    height: '360px',
                    width: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        className="embla-thumbs"
        sx={{
          marginTop: 2,
          overflow: 'hidden',
        }}
      >
        <Box className="embla-thumbs__viewport" ref={thumbViewportRef}>
          <Box
            className="embla-thumbs__container"
            sx={{
              display: 'flex',
              gap: '10px',
            }}
          >
            {product.ProductImage.map((image, index) => (
              <Box
                key={index}
                onClick={() => onThumbClick(index)}
                sx={{
                  position: 'relative',
                  cursor: 'pointer',
                  margin: '0 4px',
                  opacity: index === selectedIndex ? 1 : 0.5,
                  transition: 'opacity 0.2s',
                }}
              >
                <Box
                  component="img"
                  src={image}
                  alt={`${product.productName} - Thumbnail ${index + 1}`}
                  sx={{
                    display: 'block',
                    height: 60,
                    width: 60,
                    objectFit: 'cover',
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCarousel;
