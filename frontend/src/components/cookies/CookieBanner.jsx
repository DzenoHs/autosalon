/**
 * GDPR-Compliant Cookie Banner Component
 * Displays cookie consent banner with German text
 */

import React, { useState } from 'react';
import { X, Settings, Cookie, Shield, BarChart3, Megaphone } from 'lucide-react';
import { useCookieConsent } from '../../hooks/useCookieConsent.jsx';
import CookieSettings from './CookieSettings';

export default function CookieBanner() {
  const { 
    consent, 
    showBanner, 
    acceptAll, 
    acceptEssential, 
    setShowBanner,
    categories 
  } = useCookieConsent();
  
  const [showSettings, setShowSettings] = useState(false);

  // Don't render if banner should not be shown
  if (!showBanner) return null;

  const handleAcceptAll = () => {
    acceptAll();
    setShowBanner(false);
  };

  const handleAcceptEssential = () => {
    acceptEssential();
    setShowBanner(false);
  };

  const handleShowSettings = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm text-white p-4 z-50 border-t-2 border-red-600 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Cookie className="w-6 h-6 text-red-400" />
                <h3 className="text-lg font-bold text-white">Cookie-Einstellungen</h3>
              </div>
              
              <p className="text-sm text-gray-300 leading-relaxed mb-2">
                Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern, 
                den Website-Verkehr zu analysieren und zu verstehen, woher unsere Besucher kommen.
              </p>
              
              <p className="text-xs text-gray-400">
                Sie können Ihre Einstellungen jederzeit ändern oder mehr in unserer{' '}
                <a 
                  href="/cookie-policy" 
                  className="text-red-400 hover:text-red-300 underline"
                >
                  Cookie-Richtlinie
                </a>{' '}
                erfahren.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 min-w-fit">
              <button
                onClick={handleShowSettings}
                className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-300 rounded-lg hover:bg-red-900/20 hover:text-white transition-all duration-200"
              >
                <Settings className="w-4 h-4" />
                Einstellungen
              </button>
              
              <button
                onClick={handleAcceptEssential}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-200"
              >
                Nur notwendige
              </button>
              
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-medium shadow-lg"
              >
                Alle akzeptieren
              </button>
            </div>
          </div>

          {/* Quick Info Icons */}
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-700">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Shield className="w-4 h-4 text-green-400" />
              <span>Notwendig</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <span>Analyse</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Megaphone className="w-4 h-4 text-purple-400" />
              <span>Marketing</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Settings className="w-4 h-4 text-yellow-400" />
              <span>Präferenzen</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Settings Modal */}
      {showSettings && (
        <CookieSettings 
          onClose={handleCloseSettings}
          onSave={() => {
            setShowSettings(false);
            setShowBanner(false);
          }}
        />
      )}
    </>
  );
}