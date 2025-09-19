import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative w-full h-full bg-black text-white flex items-center justify-center py-8 px-6" style={{minHeight: '100vh'}}>
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <h3 className="text-lg font-bold mb-3">
              <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
                Autohausmiftari
              </span>
            </h3>
            <p className="text-gray-400 text-sm">
              Premium-Autohaus für Service und Verkauf aller Fahrzeugmarken.
            </p>
          </div>
          
          <div>
            <h4 className="text-base font-bold mb-3">SCHNELLE LINKS</h4>
            <ul className="space-y-1 text-gray-400 text-sm">
              <li><a href="#hero" className="hover:text-red-500 transition">Startseite</a></li>
              <li><a href="#about" className="hover:text-red-500 transition">Über uns</a></li>
              <li><a href="#cars" className="hover:text-red-500 transition">Fahrzeuge</a></li>
              <li><a href="#services" className="hover:text-red-500 transition">Dienstleistungen</a></li>
              <li><a href="#contact" className="hover:text-red-500 transition">Kontakt</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">DIENSTLEISTUNGEN</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Finanzierung</li>
              <li>Zulassung</li>
              <li>Service</li>
              <li>Garantie</li>
              <li>Fahrzeugimport</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">KONTAKT</h4>
            <div className="space-y-2 text-gray-400">
              <p>📞 +49 174 7692697</p>
              <p>✉️ info@autohausmiftari.com</p>
              <p>📍 Niestetalstraße 11, 34266 Niestetal, Germany</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8">
          {/* Legal Links */}
          <div className="flex justify-center space-x-8 mb-4">
            <Link 
              to="/impressum" 
              className="text-gray-400 hover:text-red-500 transition-colors duration-200 text-sm font-medium"
            >
              Impressum
            </Link>
            <Link 
              to="/datenschutz" 
              className="text-gray-400 hover:text-red-500 transition-colors duration-200 text-sm font-medium"
            >
              Datenschutzerklärung
            </Link>
          </div>
          
          <div className="text-center text-gray-400">
            <p>&copy; 2025 Autohausmiftari. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
