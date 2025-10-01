/**
 * Cookie Policy Page Component
 * Comprehensive German cookie policy with GDPR compliance
 */

import React from 'react';
import { Cookie, Shield, BarChart3, Megaphone, Settings, Clock, Mail, Phone } from 'lucide-react';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black">
      <div className="max-w-4xl mx-auto py-16 px-4 text-white">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Cookie className="w-8 h-8 text-red-400" />
            <h1 className="text-4xl font-bold">Cookie-Richtlinie</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transparente Informationen über die Verwendung von Cookies auf unserer Website
          </p>
          <div className="mt-4 text-sm text-gray-400">
            Letzte Aktualisierung: {new Date().toLocaleDateString('de-DE')}
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">Was sind Cookies?</h2>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <p className="text-gray-300 leading-relaxed">
                Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, wenn Sie unsere 
                Website besuchen. Sie helfen uns dabei, die Website funktionsfähig zu machen, sie sicherer 
                zu gestalten, eine bessere Benutzererfahrung zu bieten und zu verstehen, wie die Website 
                funktioniert und wo wir sie verbessern können.
              </p>
            </div>
          </section>

          {/* Cookie Categories */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">Arten von Cookies, die wir verwenden</h2>
            
            <div className="grid gap-6">
              {/* Essential Cookies */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-semibold text-white">Notwendige Cookies</h3>
                  <span className="px-3 py-1 bg-green-600/20 text-green-400 text-sm rounded-full border border-green-600/30">
                    Immer aktiv
                  </span>
                </div>
                <p className="text-gray-300 mb-4">
                  Diese Cookies sind für das Funktionieren der Website unbedingt erforderlich und können 
                  in unseren Systemen nicht deaktiviert werden.
                </p>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-600/30">
                  <h4 className="font-semibold text-white mb-2">Beispiele:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• <code className="bg-gray-700 px-2 py-1 rounded">session_id</code> - Sitzungsmanagement</li>
                    <li>• <code className="bg-gray-700 px-2 py-1 rounded">csrf_token</code> - Sicherheitsschutz</li>
                    <li>• <code className="bg-gray-700 px-2 py-1 rounded">cookie_consent</code> - Cookie-Einstellungen</li>
                  </ul>
                  <p className="text-xs text-gray-400 mt-3">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Speicherdauer: Session bis 1 Jahr
                  </p>
                </div>
              </div>

              {/* Analytical Cookies */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">Analyse-Cookies</h3>
                  <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-sm rounded-full border border-blue-600/30">
                    Optional
                  </span>
                </div>
                <p className="text-gray-300 mb-4">
                  Helfen uns dabei zu verstehen, wie Besucher mit der Website interagieren, indem sie 
                  Informationen anonym sammeln und weiterleiten.
                </p>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-600/30">
                  <h4 className="font-semibold text-white mb-2">Beispiele:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• <code className="bg-gray-700 px-2 py-1 rounded">_ga</code> - Google Analytics Hauptcookie</li>
                    <li>• <code className="bg-gray-700 px-2 py-1 rounded">_ga_XXXXXXXXXX</code> - Google Analytics 4</li>
                    <li>• <code className="bg-gray-700 px-2 py-1 rounded">_gid</code> - Google Analytics Sitzungs-Cookie</li>
                  </ul>
                  <p className="text-xs text-gray-400 mt-3">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Speicherdauer: 24 Monate
                  </p>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <Megaphone className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-semibold text-white">Marketing-Cookies</h3>
                  <span className="px-3 py-1 bg-purple-600/20 text-purple-400 text-sm rounded-full border border-purple-600/30">
                    Optional
                  </span>
                </div>
                <p className="text-gray-300 mb-4">
                  Werden von Werbepartnern über unsere Website gesetzt, um ein Profil Ihrer Interessen 
                  zu erstellen und relevante Werbung zu zeigen.
                </p>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-600/30">
                  <h4 className="font-semibold text-white mb-2">Beispiele:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• <code className="bg-gray-700 px-2 py-1 rounded">_fbp</code> - Facebook Browser Pixel</li>
                    <li>• <code className="bg-gray-700 px-2 py-1 rounded">_fbc</code> - Facebook Click Identifier</li>
                    <li>• <code className="bg-gray-700 px-2 py-1 rounded">ads_data_redaction</code> - Google Ads</li>
                  </ul>
                  <p className="text-xs text-gray-400 mt-3">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Speicherdauer: 30-90 Tage
                  </p>
                </div>
              </div>

              {/* Preference Cookies */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-semibold text-white">Präferenz-Cookies</h3>
                  <span className="px-3 py-1 bg-yellow-600/20 text-yellow-400 text-sm rounded-full border border-yellow-600/30">
                    Optional
                  </span>
                </div>
                <p className="text-gray-300 mb-4">
                  Ermöglichen es der Website, sich an Ihre Entscheidungen zu erinnern und Ihnen 
                  erweiterte, persönlichere Funktionen zu bieten.
                </p>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-600/30">
                  <h4 className="font-semibold text-white mb-2">Beispiele:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• <code className="bg-gray-700 px-2 py-1 rounded">car_filters</code> - Gespeicherte Filtereinstellungen</li>
                    <li>• <code className="bg-gray-700 px-2 py-1 rounded">viewed_cars</code> - Kürzlich angesehene Fahrzeuge</li>
                    <li>• <code className="bg-gray-700 px-2 py-1 rounded">language_pref</code> - Sprachpräferenz</li>
                  </ul>
                  <p className="text-xs text-gray-400 mt-3">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Speicherdauer: 30 Tage
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Third Party Services */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">Drittanbieter-Services</h2>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Google Analytics</h3>
                  <p className="text-gray-300 text-sm mb-2">
                    Wir verwenden Google Analytics zur Analyse der Website-Nutzung.
                  </p>
                  <a 
                    href="https://policies.google.com/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-red-400 text-sm hover:text-red-300 underline"
                  >
                    Google Datenschutzerklärung →
                  </a>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Facebook Pixel</h3>
                  <p className="text-gray-300 text-sm mb-2">
                    Für Werbezwecke und Conversion-Tracking in sozialen Medien.
                  </p>
                  <a 
                    href="https://www.facebook.com/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-red-400 text-sm hover:text-red-300 underline"
                  >
                    Facebook Datenschutzerklärung →
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">Ihre Rechte</h2>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-white">Widerspruch</h4>
                    <p className="text-gray-300 text-sm">
                      Sie können Ihre Einwilligung jederzeit widerrufen oder ändern.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-white">Browser-Einstellungen</h4>
                    <p className="text-gray-300 text-sm">
                      Sie können Cookies in Ihren Browser-Einstellungen blockieren oder löschen.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-white">Opt-Out Links</h4>
                    <p className="text-gray-300 text-sm">
                      Nutzen Sie die direkten Opt-Out-Möglichkeiten der Drittanbieter.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">Kontakt</h2>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <p className="text-gray-300 mb-4">
                Haben Sie Fragen zu unserer Cookie-Richtlinie oder möchten Sie Ihre Rechte ausüben?
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-red-400" />
                  <a 
                    href="mailto:info@autohaus-miftari.de" 
                    className="text-red-400 hover:text-red-300 underline"
                  >
                    info@autohaus-miftari.de
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-red-400" />
                  <a 
                    href="tel:+491747692697" 
                    className="text-red-400 hover:text-red-300 underline"
                  >
                    +49 174 7692697
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Note */}
          <div className="bg-red-900/20 border border-red-600/30 rounded-xl p-6 text-center">
            <p className="text-red-300 text-sm">
              Diese Cookie-Richtlinie kann gelegentlich aktualisiert werden. 
              Wesentliche Änderungen werden wir Ihnen mitteilen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}