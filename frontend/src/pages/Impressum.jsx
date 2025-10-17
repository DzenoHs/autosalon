import React from 'react'
import { ArrowLeft, Building, Phone, Mail, MapPin, Clock, Shield, Scale } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Impressum() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1) // Go back to previous page
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-black to-neutral-800">
      {/* Back Button */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white hover:text-red-500 transition-colors duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Zurück</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Impressum
            </h1>
          </div>
          <p className="text-neutral-400 text-lg">
            Rechtliche Informationen gemäß § 5 TMG
          </p>
        </div>

        {/* Content */}
        <div className="bg-neutral-900/50 backdrop-blur-sm rounded-3xl border border-neutral-800 p-6 md:p-8">
          
          {/* Company Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Building className="w-6 h-6" />
              Angaben gemäß § 5 TMG
            </h2>
            
            <div className="bg-neutral-800/50 rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Autohaus MIFTARI</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Geschäftsadresse
                  </h4>
                  <p className="text-neutral-300 leading-relaxed">
                    Niestetalstraße 11<br />
                    34266 Niestetal<br />
                    Deutschland
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Handelsregister</h4>
                  <p className="text-neutral-300 leading-relaxed">
                    
                   
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Registergericht</h4>
                 <p className="text-neutral-300 leading-relaxed">Kassel</p>
                </div>
              </div>
            </div>

            <div className="bg-neutral-800/30 rounded-xl p-4">
              <h4 className="text-white font-semibold mb-2">Inhaber</h4>
              <p className="text-neutral-300">Laurin Miftari</p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Phone className="w-6 h-6" />
              Kontakt
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <a 
                href="tel:+4917476926970"
                className="flex items-center gap-3 bg-neutral-800/50 rounded-xl p-4 hover:bg-neutral-700/50 transition-colors group"
              >
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">Telefon</div>
                  <div className="text-neutral-300">+491747692697</div>
                </div>
              </a>
              
              <a 
                href="mailto:laurin.miftari@gmx.de"
                className="flex items-center gap-3 bg-neutral-800/50 rounded-xl p-4 hover:bg-neutral-700/50 transition-colors group"
              >
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">E-Mail</div>
                  <div className="text-neutral-300">info@autohausmiftari.de</div>
                </div>
              </a>
            </div>
          </section>

          {/* Business Hours */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Geschäftszeiten
            </h2>
            
            <div className="bg-neutral-800/50 rounded-xl p-6">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-white font-semibold mb-1">Werktage</div>
                  <div className="text-neutral-300">nach Vereinbarung</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold mb-1">Support</div>
                  <div className="text-neutral-300">24h Antwort per E-Mail</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold mb-1">Beratung</div>
                  <div className="text-neutral-300">Kostenlos</div>
                </div>
              </div>
            </div>
          </section>

          {/* Tax Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6" />
              Steuerliche Angaben
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-neutral-800/50 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-2">USt-IdNr.- nach § 27a UStG</h4>
                <p className="text-neutral-300">DE364840933</p>
              </div>
              <div className="bg-neutral-800/50 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-2">Steuer-Nr.</h4>
                <p className="text-neutral-300">02684666920</p>
              </div>
            </div>
          </section>

          {/* Dispute Resolution */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6" />
              Streitbeilegung
            </h2>
            <div className="bg-neutral-800/30 rounded-xl p-4">
              <p className="text-neutral-300 leading-relaxed">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </section>

          {/* Copyright */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Urheberrecht</h2>
            <div className="space-y-4">
              <div className="bg-neutral-800/30 rounded-xl p-4">
                <p className="text-neutral-300 leading-relaxed mb-4">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
                <p className="text-neutral-300 leading-relaxed">
                  Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                </p>
              </div>
              <div className="bg-neutral-800/30 rounded-xl p-4">
                <p className="text-neutral-300 leading-relaxed">
                  Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                </p>
              </div>
            </div>
          </section>

          {/* Quick Contact Section */}
          <section className="bg-gradient-to-r from-red-600/20 to-neutral-800/20 rounded-2xl p-6 border border-red-500/20">
            <h3 className="text-xl font-bold text-white mb-4">Haben Sie Fragen?</h3>
            <p className="text-neutral-300 mb-4">
              Kontaktieren Sie uns für weitere Informationen oder rechtliche Anfragen.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href="tel:+491747692697"
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                <Phone className="w-4 h-4" />
                Anrufen
              </a>
              <a 
                href="mailto:info@autohausmiftari.de"
                className="flex items-center justify-center gap-2 border border-white text-white hover:bg-white hover:text-black px-6 py-3 rounded-xl font-medium transition-colors"
              >
                <Mail className="w-4 h-4" />
                E-Mail schreiben
              </a>
            </div>
          </section>

        </div>

        {/* Footer Info */}
        <div className="text-center mt-12 pt-8 border-t border-neutral-800">
          <p className="text-neutral-400 mb-4">
            © 2025 Autohaus MIFTARI. Alle Rechte vorbehalten.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-neutral-500">
            <span>Stand: {new Date().toLocaleDateString('de-DE')}</span>
            <span className="hidden sm:block">•</span>
            <span>Impressum nach § 5 TMG</span>
            <span className="hidden sm:block">•</span>
            <a href="mailto:laurin.miftari@gmx.de" className="hover:text-neutral-300 transition-colors">
              Rechtliche Anfragen
            </a>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="fixed bottom-8 right-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 rotate-90 group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  )
}
