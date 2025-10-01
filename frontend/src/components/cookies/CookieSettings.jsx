/**
 * Cookie Settings Modal Component
 * Allows granular control over cookie categories
 */

import React, { useState, useEffect } from 'react';
import { X, Shield, BarChart3, Megaphone, Settings, Check, Info } from 'lucide-react';
import { useCookieConsent } from '../../hooks/useCookieConsent.jsx';

export default function CookieSettings({ onClose, onSave }) {
  const { consent, updateConsent, categories } = useCookieConsent();
  
  const [preferences, setPreferences] = useState({
    essential: true, // Always true
    analytical: consent.analytical || false,
    marketing: consent.marketing || false,
    preferences: consent.preferences || false
  });

  // Update local state when consent changes
  useEffect(() => {
    setPreferences({
      essential: true,
      analytical: consent.analytical || false,
      marketing: consent.marketing || false,
      preferences: consent.preferences || false
    });
  }, [consent]);

  const handleToggle = (category) => {
    if (category === 'essential') return; // Can't disable essential cookies
    
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleSave = () => {
    updateConsent({
      analytical: preferences.analytical,
      marketing: preferences.marketing,
      preferences: preferences.preferences
    });
    onSave && onSave();
  };

  const handleAcceptAll = () => {
    const allEnabled = {
      analytical: true,
      marketing: true,
      preferences: true
    };
    setPreferences({
      essential: true,
      ...allEnabled
    });
    updateConsent(allEnabled);
    onSave && onSave();
  };

  const handleRejectAll = () => {
    const onlyEssential = {
      analytical: false,
      marketing: false,
      preferences: false
    };
    setPreferences({
      essential: true,
      ...onlyEssential
    });
    updateConsent(onlyEssential);
    onSave && onSave();
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'essential': return <Shield className="w-5 h-5 text-green-400" />;
      case 'analytical': return <BarChart3 className="w-5 h-5 text-blue-400" />;
      case 'marketing': return <Megaphone className="w-5 h-5 text-purple-400" />;
      case 'preferences': return <Settings className="w-5 h-5 text-yellow-400" />;
      default: return <Info className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-red-900/20 p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Cookie-Einstellungen</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-red-600/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>
          </div>
          <p className="text-gray-300 mt-2 text-sm">
            Wählen Sie, welche Arten von Cookies Sie akzeptieren möchten. 
            Diese Einstellungen werden nur auf diesem Gerät und Browser gespeichert.
          </p>
        </div>

        {/* Cookie Categories */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-6">
            {Object.entries(categories).map(([key, category]) => (
              <div key={key} className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {getCategoryIcon(key)}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {category.name}
                        </h3>
                        {category.required && (
                          <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full border border-green-600/30">
                            Erforderlich
                          </span>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {category.description}
                      </p>
                      
                      {/* Detailed cookie info */}
                      <div className="mt-3 p-3 bg-gray-900/50 rounded-lg border border-gray-600/30">
                        <div className="text-xs text-gray-400">
                          {key === 'essential' && (
                            <div>
                              <strong className="text-gray-300">Beispiele:</strong> Session-Cookies, 
                              CSRF-Schutz, Spracheinstellungen, Sicherheits-Token
                              <br />
                              <strong className="text-gray-300">Speicherdauer:</strong> Session bis 1 Jahr
                            </div>
                          )}
                          {key === 'analytical' && (
                            <div>
                              <strong className="text-gray-300">Beispiele:</strong> Google Analytics (_ga, _gid), 
                              Besucherstatistiken, Seitenaufrufe
                              <br />
                              <strong className="text-gray-300">Speicherdauer:</strong> 2 Jahre
                            </div>
                          )}
                          {key === 'marketing' && (
                            <div>
                              <strong className="text-gray-300">Beispiele:</strong> Facebook Pixel (_fbp), 
                              Google Ads, Conversion-Tracking
                              <br />
                              <strong className="text-gray-300">Speicherdauer:</strong> 30-90 Tage
                            </div>
                          )}
                          {key === 'preferences' && (
                            <div>
                              <strong className="text-gray-300">Beispiele:</strong> Filter-Einstellungen, 
                              Anzeigepräferenzen, kürzlich angesehene Fahrzeuge
                              <br />
                              <strong className="text-gray-300">Speicherdauer:</strong> 30 Tage
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <div className="ml-4">
                    <button
                      onClick={() => handleToggle(key)}
                      disabled={category.required}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                        preferences[key]
                          ? 'bg-red-600' 
                          : 'bg-gray-600'
                      } ${category.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences[key] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-800/50 p-6 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <div className="flex gap-3">
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
              >
                Alle ablehnen
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Alle akzeptieren
              </button>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                Abbrechen
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
              >
                <Check className="w-4 h-4" />
                Auswahl speichern
              </button>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-400 text-center">
              Weitere Informationen finden Sie in unserer{' '}
              <a href="/cookie-policy" className="text-red-400 hover:text-red-300 underline">
                Cookie-Richtlinie
              </a>{' '}
              und{' '}
              <a href="/datenschutzerklarung" className="text-red-400 hover:text-red-300 underline">
                Datenschutzerklärung
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}