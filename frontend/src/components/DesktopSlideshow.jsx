import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSlideshowContext } from '../context/SlideshowContext';
import { Home, Car, ShoppingCart, Shield, Phone, Info } from 'lucide-react';

const DesktopSlideshow = ({ children }) => {
  const { currentSlide, setCurrentSlide, setIsDesktopSlideshow } = useSlideshowContext();
  const [isDesktop, setIsDesktop] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextSlide, setNextSlide] = useState(null);
  const [direction, setDirection] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [canTransition, setCanTransition] = useState(true);
  const [lastTransitionTime, setLastTransitionTime] = useState(0);
  const containerRef = useRef(null);
  const isScrolling = useRef(false);

  // 🔥 BRUTALNO OPTIMIZOVANE Animation Variants - SA DUŠOM!
  const getBrutalVariants = useMemo(() => (slideIndex) => {
    const animations = [
      // 0. Hero - COSMIC BIRTH 🌌💥
      {
        enter: { 
          scale: 0.1, 
          rotate: -360,
          opacity: 0,
          filter: "blur(20px) brightness(3) contrast(2)",
          clipPath: "circle(0% at 50% 50%)"
        },
        center: { 
          scale: 1, 
          rotate: 0,
          opacity: 1,
          filter: "blur(0px) brightness(1) contrast(1)",
          clipPath: "circle(100% at 50% 50%)"
        },
        exit: { 
          scale: 0.3, 
          rotate: 180,
          opacity: 0,
          filter: "blur(15px) brightness(0.2) contrast(0.5)",
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
        }
      },
      // 1. Cars - DIGITAL MATERIALIZATION 🚗⚡
      {
        enter: { 
          scaleX: 0.2,
          scaleY: 3,
          opacity: 0,
          filter: "hue-rotate(90deg) saturate(2) brightness(2)",
          clipPath: "inset(0% 100% 0% 0%)"
        },
        center: { 
          scaleX: 1,
          scaleY: 1,
          opacity: 1,
          filter: "hue-rotate(0deg) saturate(1) brightness(1)",
          clipPath: "inset(0% 0% 0% 0%)"
        },
        exit: { 
          scaleX: 3,
          scaleY: 0.2,
          opacity: 0,
          filter: "hue-rotate(-90deg) saturate(0) brightness(0.3)",
          clipPath: "inset(0% 0% 0% 100%)"
        }
      },
      // 2. BuyCar - LIQUID MORPHING �✨
      {
        enter: { 
          rotate: 45,
          scale: 0.5,
          opacity: 0,
          filter: "blur(10px) hue-rotate(180deg)",
          clipPath: "ellipse(0% 50% at 50% 50%)"
        },
        center: { 
          rotate: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px) hue-rotate(0deg)",
          clipPath: "ellipse(100% 100% at 50% 50%)"
        },
        exit: { 
          rotate: -45,
          scale: 0.8,
          opacity: 0,
          filter: "blur(8px) hue-rotate(-180deg)",
          clipPath: "ellipse(0% 0% at 50% 50%)"
        }
      },
      // 3. WhyChooseUs - ENERGY WAVE 🌟⚡
      {
        enter: { 
          scale: 0.7,
          rotate: 10,
          opacity: 0,
          filter: "brightness(2) saturate(2) blur(5px)",
          clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)"
        },
        center: { 
          scale: 1,
          rotate: 0,
          opacity: 1,
          filter: "brightness(1) saturate(1) blur(0px)",
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
        },
        exit: { 
          scale: 1.3,
          rotate: -10,
          opacity: 0,
          filter: "brightness(0.3) saturate(0) blur(12px)",
          clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)"
        }
      },
      // 4. Contact - GLITCH DISSOLVE �💫
      {
        enter: { 
          scaleX: 0.3,
          scaleY: 1.5,
          opacity: 0,
          filter: "contrast(3) brightness(1.5) saturate(2)",
          clipPath: "polygon(25% 0%, 75% 0%, 75% 100%, 25% 100%)"
        },
        center: { 
          scaleX: 1,
          scaleY: 1,
          opacity: 1,
          filter: "contrast(1) brightness(1) saturate(1)",
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
        },
        exit: { 
          scaleX: 1.8,
          scaleY: 0.4,
          opacity: 0,
          filter: "contrast(0.5) brightness(0.5) saturate(0)",
          clipPath: "polygon(0% 25%, 100% 25%, 100% 75%, 0% 75%)"
        }
      },
      // 5. Footer - Simple Fade (no special animation)
      {
        enter: { 
          opacity: 0,
          y: 30
        },
        center: { 
          opacity: 1,
          y: 0
        },
        exit: { 
          opacity: 0,
          y: -30
        }
      }
    ];
    
    return animations[slideIndex % animations.length];
  }, []);

  const getTransition = useMemo(() => (slideIndex) => ({
    type: "tween",
    ease: slideIndex === 0 ? "easeOut" : slideIndex === 1 ? "easeInOut" : slideIndex === 2 ? "backOut" : "circOut",
    duration: slideIndex === 4 ? 1.2 : slideIndex === 2 ? 1.0 : 0.8, // Contact traje duže, BuyCar medium
  }), []);

  // Check if device is desktop
  useEffect(() => {
    const checkIsDesktop = () => {
      const isDesktopSize = window.innerWidth >= 1024;
      setIsDesktop(isDesktopSize);
      setIsDesktopSlideshow(isDesktopSize);
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, [setIsDesktopSlideshow]);

  // 🚀 THROTTLED Handle slide change - MUST WAIT FOR SECTION TO LOAD!
  const handleSlideChange = useCallback((targetSlide) => {
    const now = Date.now();
    const MIN_TRANSITION_DELAY = 1500; // Minimum 1.5s between transitions
    
    // PROTECTION: Ne može prelazak dok se sekcija ne učita + throttling
    if (isAnimating || targetSlide === currentSlide || !canTransition) return;
    if (now - lastTransitionTime < MIN_TRANSITION_DELAY) {
      console.log('⏳ Čekanje... sekcija se još učitava');
      return;
    }

    setCanTransition(false);
    setIsAnimating(true);
    setDirection(targetSlide > currentSlide ? 1 : -1);
    setLastTransitionTime(now);
    
    // Immediate transition 
    setCurrentSlide(targetSlide);
    setIsLoaded(true);
    
    // Longer timeout za cleanup - mora da se sekcija učita
    setTimeout(() => {
      setIsAnimating(false);
      setCanTransition(true);
    }, 1200); // Longer duration to ensure section loads
  }, [isAnimating, currentSlide, canTransition, lastTransitionTime, setCurrentSlide]);

  // Wheel event handler with throttling
  useEffect(() => {
    if (!isDesktop) return;
    
    const slides = React.Children.toArray(children);
    
    const handleWheel = (e) => {
      if (isScrolling.current) return;
      
      e.preventDefault();
      
      const delta = e.deltaY;
      let targetSlide = currentSlide;
      
      if (delta > 0 && currentSlide < slides.length - 1) {
        targetSlide = currentSlide + 1;
      } else if (delta < 0 && currentSlide > 0) {
        targetSlide = currentSlide - 1;
      }
      
      if (targetSlide !== currentSlide) {
        isScrolling.current = true;
        handleSlideChange(targetSlide);
        
        setTimeout(() => {
          isScrolling.current = false;
        }, 1000); // Throttle scroll events
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, [isDesktop, children, currentSlide, isAnimating, handleSlideChange]);

  // If not desktop, render normally (mobile layout)
  if (!isDesktop) {
    return <div className="min-h-screen bg-neutral-900 text-white">{children}</div>;
  }

  // Desktop slideshow layout
  const slides = React.Children.toArray(children);

  return (
    <div 
      ref={containerRef}
      className="h-screen overflow-hidden bg-neutral-900 text-white relative slideshow-container"
      style={{ height: '100vh' }}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={getBrutalVariants(currentSlide)}
          initial="enter"
          animate="center"
          exit="exit"
          transition={getTransition(currentSlide)}
          className="absolute inset-0 w-full h-full brutal-content"
          style={{ 
            minHeight: '100vh',
            height: '100vh',
            transformStyle: 'preserve-3d',
            perspective: 1000
          }}
          onAnimationComplete={() => setIsLoaded(true)}
        >
          {/* 🌟 BRUTALNI Background sa PARTICLES */}
          <motion.div 
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Dynamic gradient background */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  currentSlide === 0 
                    ? 'radial-gradient(circle at 20% 30%, rgba(239, 68, 68, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(245, 158, 11, 0.2) 0%, transparent 50%), linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(17, 17, 17, 1) 100%)'
                    : currentSlide === 1 
                    ? 'radial-gradient(ellipse at 60% 20%, rgba(34, 197, 94, 0.25) 0%, transparent 50%), radial-gradient(ellipse at 40% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), linear-gradient(45deg, rgba(0, 0, 0, 0.95) 0%, rgba(17, 17, 17, 1) 100%)'
                    : currentSlide === 2
                    ? 'conic-gradient(from 45deg at 50% 30%, rgba(220, 38, 127, 0.2) 0%, transparent 25%, rgba(239, 68, 68, 0.15) 50%, transparent 75%), linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(17, 17, 17, 1) 100%)'
                    : currentSlide === 3
                    ? 'radial-gradient(ellipse 150% 100% at 30% 50%, rgba(34, 197, 94, 0.2) 0%, transparent 60%), radial-gradient(ellipse 120% 80% at 70% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%), linear-gradient(225deg, rgba(0, 0, 0, 0.95) 0%, rgba(17, 17, 17, 1) 100%)'
                    : currentSlide === 4
                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.15) 50%, transparent 100%), radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.1) 0%, transparent 50%), linear-gradient(270deg, rgba(0, 0, 0, 0.95) 0%, rgba(17, 17, 17, 1) 100%)'
                    : 'linear-gradient(315deg, rgba(75, 85, 99, 0.15) 0%, rgba(55, 65, 81, 0.1) 50%, rgba(0, 0, 0, 1) 100%)'
                ]
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* Floating particles for materijalizacija */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={`particle-${currentSlide}-${i}`}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: currentSlide === 0 ? '#ef4444' : currentSlide === 1 ? '#22c55e' : currentSlide === 2 ? '#f59e0b' : currentSlide === 3 ? '#8b5cf6' : '#3b82f6',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  scale: [0, 1.5, 0.8, 1.2, 0],
                  opacity: [0, 1, 0.7, 1, 0],
                  y: [0, -100, -200, -300, -400],
                  x: [0, Math.random() * 50 - 25, Math.random() * 100 - 50]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 1,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            ))}

            {/* Energy waves */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: `conic-gradient(from ${Date.now() / 100}deg, transparent 70%, rgba(239, 68, 68, 0.1) 80%, transparent 90%)`
              }}
              transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
              style={{
                opacity: isAnimating ? 0.3 : 0,
                mixBlendMode: 'screen'
              }}
            />
          </motion.div>
          
          {/* Loading indicator */}
          {!canTransition && (
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            </motion.div>
          )}
          
          {/* Main content wrapper */}
          <motion.div 
            className="relative h-full w-full flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ ...getTransition(currentSlide), delay: 0.1 }}
          >
            {slides[currentSlide]}
          </motion.div>
        </motion.div>
      </AnimatePresence>
      
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-black/20 z-40">
        <motion.div 
          className="h-full bg-gradient-to-r from-red-500 to-red-600"
          animate={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* Vertical Navigation */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30 space-y-4">
        {slides.map((_, index) => {
          const icons = [Home, Car, ShoppingCart, Shield, Phone, Info];
          const IconComponent = icons[index] || Info;
          
          return (
            <motion.button
              key={index}
              onClick={() => handleSlideChange(index)}
              disabled={!canTransition}
              className={`
                w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                ${index === currentSlide 
                  ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/50' 
                  : 'bg-transparent border-white/30 text-white/70 hover:border-red-500/50 hover:text-red-500'
                }
                ${!canTransition ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}
              `}
              whileHover={canTransition ? { scale: 1.1 } : {}}
              whileTap={canTransition ? { scale: 0.95 } : {}}
            >
              <IconComponent size={20} />
            </motion.button>
          );
        })}
      </div>
      
      {/* BRUTAL Performance Optimizations */}
      <style jsx>{`
        .slideshow-container {
          will-change: transform, opacity, filter;
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
          -webkit-transform: translate3d(0,0,0);
          transform-style: preserve-3d;
          perspective: 2000px;
          contain: layout style paint;
        }
        
        .brutal-content {
          will-change: transform;
          transform: translate3d(0,0,0);
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default DesktopSlideshow;