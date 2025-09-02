import React, { useState, useEffect } from "react";

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
          <h1 className="text-2xl font-bold text-white">AUTO LUX</h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-white font-medium">
          <li>
            <button
              onClick={() => scrollToSection("hero")}
              className="hover:text-red-500 transition duration-300"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("cars")}
              className="hover:text-red-500 transition duration-300"
            >
              Cars
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-red-500 transition duration-300"
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-red-500 transition duration-300"
            >
              Contact
            </button>
          </li>
        </ul>

        <button className="hidden md:block bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition">
          Book Test Drive
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
          <ul className="flex flex-col gap-4 p-6 text-white">
            <li>
              <button
                onClick={() => scrollToSection("hero")}
                className="hover:text-red-500 transition"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("cars")}
                className="hover:text-red-500 transition"
              >
                Cars
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("about")}
                className="hover:text-red-500 transition"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("contact")}
                className="hover:text-red-500 transition"
              >
                Contact
              </button>
            </li>
            <li>
              <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full font-bold mt-4">
                Book Test Drive
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
