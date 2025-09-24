import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
                Autohausmiftari
              </span>
            </h3>
            <p className="text-gray-400">
              Autohausmiftari – Premium-Autohaus für Service und Verkauf aller Fahrzeugmarken.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">SCHNELLE LINKS</h4>
            <ul className="space-y-2 text-gray-400">
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
              <p>✉️ info@autohaus-miftari.de</p>
              <p>📍 Niestetalstraße 11, 34266 Niestetal, Germany</p>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm">
          <a href="/datenschutzerklarung" className="hover:text-red-500 transition underline mx-2">Datenschutzerklärung</a>
          |
          <a href="/impressum" className="hover:text-red-500 transition underline mx-2">Impressum</a>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>&copy; 2025 Autohausmiftari. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
