import React from 'react';
import { FaInstagram, FaTiktok, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
                Autohaus MIFTARI
              </span>
            </h3>
            <p className="text-gray-400">
              Autohaus MIFTARI – Premium-Autohaus für Service und Verkauf aller Fahrzeugmarken.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">DIENSTLEISTUNGEN</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Finanzierung</li>
              <li>Zulassung</li>
              <li>Service</li>
              <li>Garantie</li>
          
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">SOCIAL MEDIA</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a 
                  href="https://www.instagram.com/autohaus.miftari/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-500 transition flex items-center gap-2"
                  title="Instagram"
                >
                  <FaInstagram className="text-lg" />
                  Instagram
                </a>
              </li>
              <li>
                <a 
                  href="https://www.tiktok.com/@autohausmiftari" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-500 transition flex items-center gap-2"
                  title="TikTok"suppressContentEditableWarning
                >
                  <FaTiktok className="text-lg" />
                  TikTok
                </a>
              </li>
              <li>
                <a 
                  href="https://www.facebook.com/share/1ErPznw2xR/?mibextid=wwXIfr" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-500 transition flex items-center gap-2"
                  title="Facebook"
                >
                  <FaFacebook className="text-lg" />
                  Facebook
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">KONTAKT</h4>
            <div className="space-y-2 text-gray-400">
              <p>
                📞 <a href="tel:+491747692697" className="hover:text-red-400 underline">+49 174 7692697</a>
              </p>
              <p>
                ✉️ <a href="mailto:info@autohausmiftari.de" className="hover:text-red-400 underline">info@autohausmiftari.de</a>
              </p>
              <p>📍 Niestetalstraße 11, 34266 Niestetal, Germany</p>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm">
          <a href="/datenschutzerklarung" className="hover:text-red-500 transition underline mx-2">Datenschutzerklärung</a>
          |
          <a href="/impressum" className="hover:text-red-500 transition underline mx-2">Impressum</a>
          |
          <a href="/cookie-policy" className="hover:text-red-500 transition underline mx-2">Cookie-Richtlinie</a>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>&copy; 2025 Autohaus MIFTARI. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
