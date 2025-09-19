import React, { useState, useEffect } from "react";
import { useSlideshowContext } from '../context/SlideshowContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { navigateToSlide, isDesktopSlideshow } = useSlideshowContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const sectionMap = {
      'hero': 0,
      'cars': 1,
      'buycar': 2,
      'why-choose-us': 3,
      'contact': 4
    };

    if (isDesktopSlideshow && sectionMap.hasOwnProperty(sectionId)) {
      navigateToSlide(sectionMap[sectionId]);
    } else {
      // Fallback to normal scroll for mobile or other pages
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-lg border-b border-neutral-800"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-white">Autohouse</span>
            <span className="text-red-500 ml-1">Miftari</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-white font-medium">
          <li>
            <button
              onClick={() => scrollToSection("hero")}
              className="hover:text-red-500 transition duration-300"
            >
              Startseite
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("cars")}
              className="hover:text-red-500 transition duration-300"
            >
              Fahrzeuge
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("buycar")}
              className="hover:text-red-500 transition duration-300"
            >
              Kaufprozess
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("why-choose-us")}
              className="hover:text-red-500 transition duration-300"
            >
              Über uns
            </button>
          </li>
        </ul>

        {/* CTA Button - OSTAJE */}
        <button 
          onClick={() => scrollToSection("contact")}
          className="hidden md:block bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition"
        >
          Kontakt
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white text-2xl"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-neutral-800">
          <ul className="flex flex-col gap-4 p-6 text-white text-center">
            <li>
              <button
                onClick={() => scrollToSection("hero")}
                className="hover:text-red-500 transition w-full"
              >
                Startseite
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("cars")}
                className="hover:text-red-500 transition w-full"
              >
                Fahrzeuge
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("buycar")}
                className="hover:text-red-500 transition w-full"
              >
                Kaufprozess
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("about")}
                className="hover:text-red-500 transition w-full"
              >
                Über uns
              </button>
            </li>
            <li className="flex justify-center">
              <button 
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full font-bold mt-4"
              >
                Kontakt
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
