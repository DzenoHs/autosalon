import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
                AUTOLUX
              </span>
            </h3>
            <p className="text-gray-400">
              Premium auto kuća sa najboljom ponudom luksuznih vozila.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">BRZI LINKOVI</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#hero" className="hover:text-red-500 transition">Početna</a></li>
              <li><a href="#about" className="hover:text-red-500 transition">O nama</a></li>
              <li><a href="#cars" className="hover:text-red-500 transition">Vozila</a></li>
              <li><a href="#services" className="hover:text-red-500 transition">Usluge</a></li>
              <li><a href="#contact" className="hover:text-red-500 transition">Kontakt</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">USLUGE</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Finansiranje</li>
              <li>Registracija</li>
              <li>Servis</li>
              <li>Garancija</li>
              <li>Uvoz vozila</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">KONTAKT</h4>
            <div className="space-y-2 text-gray-400">
              <p>📞 +387 61 123 456</p>
              <p>✉️ info@autolux.com</p>
              <p>📍 Sarajevo, BiH</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>&copy; 2025 AUTOLUX. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  );
}
