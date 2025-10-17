import React, { useState, useEffect } from "react";
import { FaInstagram, FaTiktok, FaFacebook } from 'react-icons/fa';
import logo from '../../assets/Miftari Logo 04 (PNG).png';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
          <img 
            src={logo} 
            alt="Autohaus MIFTARI" 
            className="h-10 w-32 object-contain"
          />
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
              onClick={() => scrollToSection("about")}
              className="hover:text-red-500 transition duration-300"
            >
              Über uns
            </button>
          </li>
        </ul>

        {/* Social Media Icons & Contact */}
        <div className="hidden md:flex items-center gap-4">
          {/* Social Media Icons */}
          <div className="flex items-center gap-3">
            <a 
              href="https://www.instagram.com/autohaus.miftari/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-500 transition duration-300 text-xl"
              title="Instagram"
            >
              <FaInstagram />
            </a>
            <a 
              href="https://www.tiktok.com/@autohausmiftari" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-500 transition duration-300 text-xl"
              title="TikTok"
            >
              <FaTiktok />
            </a>
            <a 
              href="https://www.facebook.com/share/1ErPznw2xR/?mibextid=wwXIfr" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-500 transition duration-300 text-xl"
              title="Facebook"
            >
              <FaFacebook />
            </a>
          </div>

          {/* CTA Button */}
          <button 
            onClick={() => scrollToSection("contact")}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition"
          >
            Kontakt
          </button>
        </div>

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
            
            {/* Mobile Social Media */}
            <li className="pt-4 border-t border-neutral-700 mt-4">
              <div className="flex justify-center gap-6">
                <a 
                  href="https://www.instagram.com/autohaus.miftari/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-red-500 transition duration-300 text-2xl"
                  title="Instagram"
                >
                  <FaInstagram />
                </a>
                <a 
                  href="https://www.tiktok.com/@autohausmiftari" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-red-500 transition duration-300 text-2xl"
                  title="TikTok"
                >
                  <FaTiktok />
                </a>
                <a 
                  href="https://www.facebook.com/share/1ErPznw2xR/?mibextid=wwXIfr" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-red-500 transition duration-300 text-2xl"
                  title="Facebook"
                >
                  <FaFacebook />
                </a>
              </div>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
