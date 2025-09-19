import React, { createContext, useContext, useState } from 'react';

const SlideshowContext = createContext();

export const useSlideshowContext = () => {
  const context = useContext(SlideshowContext);
  if (!context) {
    throw new Error('useSlideshowContext must be used within a SlideshowProvider');
  }
  return context;
};

export const SlideshowProvider = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDesktopSlideshow, setIsDesktopSlideshow] = useState(false);

  const navigateToSlide = (slideIndex) => {
    if (isDesktopSlideshow) {
      setCurrentSlide(slideIndex);
    } else {
      // Fallback to normal scroll behavior for mobile
      const sections = ['hero', 'cars', 'buycar', 'why-choose-us', 'contact'];
      const element = document.getElementById(sections[slideIndex]);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const value = {
    currentSlide,
    setCurrentSlide,
    isDesktopSlideshow,
    setIsDesktopSlideshow,
    navigateToSlide
  };

  return (
    <SlideshowContext.Provider value={value}>
      {children}
    </SlideshowContext.Provider>
  );
};