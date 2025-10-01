/**
 * Floating Cookie Settings Button
 * Always visible button to access cookie settings
 */

import React, { useState } from 'react';
import { Cookie, Settings } from 'lucide-react';
import { useCookieConsent } from '../../hooks/useCookieConsent.jsx';
import CookieSettings from './CookieSettings';

export default function CookieFloatingButton() {
  const { consent } = useCookieConsent();
  const [showSettings, setShowSettings] = useState(false);

  // Only show if user has already made a choice
  if (!consent.hasConsented) return null;

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setShowSettings(true)}
          className="bg-gray-800/90 backdrop-blur-sm border border-gray-600 text-white p-3 rounded-full shadow-2xl hover:bg-gray-700 transition-all duration-300 hover:scale-110 group"
          title="Cookie-Einstellungen ändern"
        >
          <div className="flex items-center gap-2">
            <Cookie className="w-5 h-5 text-red-400" />
            <Settings className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
        </button>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <CookieSettings 
          onClose={() => setShowSettings(false)}
          onSave={() => setShowSettings(false)}
        />
      )}
    </>
  );
}