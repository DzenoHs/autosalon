import React from 'react'
import { ArrowLeft, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Datenschutzerklaerung() {
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
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Datenschutzerklärung
            </h1>
          </div>
          <p className="text-neutral-400 text-lg">
            Autohaus Miftari - Schutz Ihrer persönlichen Daten
          </p>
        </div>

        {/* Content */}
        <div className="bg-neutral-900/50 backdrop-blur-sm rounded-3xl border border-neutral-800 p-6 md:p-8">
          <div className="prose prose-invert prose-neutral max-w-none">
            
            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-red-500 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">1</span>
                Datenschutz auf einen Blick
              </h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">Allgemeine Hinweise</h3>
              <p className="text-neutral-300 mb-4 leading-relaxed">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">Datenerfassung auf dieser Website</h3>
              
              <h4 className="text-lg font-medium text-red-400 mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
              <p className="text-neutral-300 mb-4 leading-relaxed">
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
              </p>

              <h4 className="text-lg font-medium text-red-400 mb-2">Wie erfassen wir Ihre Daten?</h4>
              <p className="text-neutral-300 mb-4 leading-relaxed">
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z. B. Eingaben im Kontaktformular). Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst (z. B. Browser, Betriebssystem, Uhrzeit des Seitenaufrufs). Die Erfassung erfolgt automatisch, sobald Sie die Website betreten.
              </p>

              <h4 className="text-lg font-medium text-red-400 mb-2">Wofür nutzen wir Ihre Daten?</h4>
              <p className="text-neutral-300 mb-4 leading-relaxed">
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
              </p>

              <h4 className="text-lg font-medium text-red-400 mb-2">Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
              <p className="text-neutral-300 mb-4 leading-relaxed">
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht auf Berichtigung oder Löschung dieser Daten, auf Widerruf erteilter Einwilligungen für die Zukunft sowie – unter bestimmten Umständen – auf Einschränkung der Verarbeitung. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Hierzu sowie zu weiteren Fragen zum Datenschutz können Sie sich jederzeit an uns wenden.
              </p>

              <h4 className="text-lg font-medium text-red-400 mb-2">Analyse-Tools und Tools von Drittanbietern</h4>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden, vor allem mit sogenannten Analyseprogrammen. Details finden Sie unten in dieser Datenschutzerklärung.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-red-500 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">2</span>
                Hosting
              </h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">Externes Hosting</h3>
              <p className="text-neutral-300 mb-4 leading-relaxed">
                Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hoster(s) gespeichert (u. a. IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertrags- und Kontaktdaten, Namen, Websitezugriffe sowie sonstige über eine Website generierte Daten).
              </p>
              <p className="text-neutral-300 mb-4 leading-relaxed">
                Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots (Art. 6 Abs. 1 lit. f DSGVO). Sofern eine Einwilligung abgefragt wurde, erfolgt die Verarbeitung auf Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar.
              </p>
              <p className="text-neutral-300 mb-4 leading-relaxed">
                Unser(e) Hoster verarbeiten Ihre Daten nur insoweit, wie dies zur Erfüllung der Leistungspflichten erforderlich ist und folgen unseren Weisungen.
              </p>
              <p className="text-neutral-300 mb-4 leading-relaxed">
                <strong className="text-red-400">Wir setzen folgenden Hoster ein:</strong><br />
                One.com Group AB, Carlsgatan 3, 211 20 Malmö
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">Auftragsverarbeitung</h3>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                Wir haben einen Vertrag über Auftragsverarbeitung (AVV) mit dem oben genannten Dienst geschlossen. Dieser gewährleistet die Verarbeitung personenbezogener Daten unserer Website-Besucher nur nach unseren Weisungen und unter Einhaltung der DSGVO.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-red-500 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">3</span>
                Allgemeine Hinweise und Pflichtinformationen
              </h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">Datenschutz</h3>
              <p className="text-neutral-300 mb-4 leading-relaxed">
                Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung. Bitte beachten Sie, dass die Datenübertragung im Internet (z. B. per E-Mail) Sicherheitslücken aufweisen kann.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">Hinweis zur verantwortlichen Stelle</h3>
              <div className="bg-neutral-800/50 rounded-xl p-4 mb-4">
                <p className="text-neutral-300 leading-relaxed">
                  <strong className="text-red-400">Autohaus Miftari</strong><br />
                  Niestetalstraße 11<br />
                  34266 Niestetal, Germany<br />
                  Telefon: <a href="tel:+4917476926970" className="text-red-400 hover:text-red-300">+49 174 7692697</a><br />
                  E-Mail: <a href="mailto:info@autohaus-miftari.de" className="text-red-400 hover:text-red-300">info@autohaus-miftari.de</a>
                </p>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">Speicherdauer</h3>
              <p className="text-neutral-300 mb-4 leading-relaxed">
                Soweit in dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck entfällt, Sie ein berechtigtes Löschersuchen stellen oder eine Einwilligung widerrufen. Gesetzliche Aufbewahrungsfristen bleiben unberührt.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">SSL-/TLS-Verschlüsselung</h3>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                Diese Seite nutzt SSL-/TLS-Verschlüsselung. Erkennbar an „https://" und dem Schloss-Symbol im Browser.
              </p>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-red-500 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">4</span>
                Datenerfassung auf dieser Website
              </h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">Cookies</h3>
              <p className="text-neutral-300 mb-4 leading-relaxed">
                Wir verwenden Cookies (Session/permanent; First-/Third-Party). Notwendige Cookies basieren auf Art. 6 Abs. 1 lit. f DSGVO. Bei Einwilligung Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 25 Abs. 1 TDDDG. Browser kann so konfiguriert werden, dass Cookies abgelehnt/gelöscht werden.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">Server-Log-Dateien</h3>
              <p className="text-neutral-300 mb-4 leading-relaxed">
                Automatisch erhoben: Browsertyp/-version, Betriebssystem, Referrer, Hostname, Uhrzeit der Serveranfrage, IP-Adresse. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">Kontaktformular</h3>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                Angaben werden zur Bearbeitung gespeichert, ohne Einwilligung nicht weitergegeben. Rechtsgrundlage: Art. 6 Abs. 1 lit. b (vertraglich), sonst lit. f bzw. lit. a bei Einwilligung.
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-red-500 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">5</span>
                Soziale Medien
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-neutral-800/30 rounded-xl p-4">
                  <h4 className="text-lg font-medium text-red-400 mb-2">Facebook</h4>
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    Anbieter: Meta Platforms Ireland Limited. Bei aktiven Elementen Übertragung auch in Drittländer (u. a. USA). Gemeinsame Verantwortlichkeit mit Meta für Erfassung/Weitergabe (Art. 26 DSGVO).
                  </p>
                </div>
                <div className="bg-neutral-800/30 rounded-xl p-4">
                  <h4 className="text-lg font-medium text-red-400 mb-2">Instagram</h4>
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    Anbieter: Meta Platforms Ireland Limited. Direkte Verbindung zu Instagram-Servern; gemeinsame Verantwortung wie bei Facebook.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-red-500 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">6</span>
                Plugins und Tools
              </h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">YouTube mit erweitertem Datenschutz</h3>
              <p className="text-neutral-300 mb-4 leading-relaxed">
                Betreiber: Google Ireland Limited. Informationen erst beim Abspielen; dennoch Verbindung zum Google-Marketing-Netzwerk. Nach Start können Cookies/ähnliche Technologien gesetzt werden. Rechtsgrundlage: berechtigtes Interesse bzw. Einwilligung.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">Google Maps</h3>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                Anbieter: Google Ireland Limited. Speicherung der IP-Adresse notwendig; regelmäßig Übertragung in die USA. Rechtsgrundlage: berechtigtes Interesse bzw. Einwilligung; gestützt auf EU-Standardvertragsklauseln.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-red-500 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">7</span>
                Eigene Dienste
              </h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">Umgang mit Bewerberdaten</h3>
              <p className="text-neutral-300 mb-4 leading-relaxed">
                Verarbeitung von Bewerberdaten soweit zur Entscheidung über die Begründung eines Beschäftigungsverhältnisses nötig (§ 26 BDSG, Art. 6 Abs. 1 lit. b DSGVO). Bei Einwilligung Art. 6 Abs. 1 lit. a DSGVO (widerruflich).
              </p>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                Erfolgreiche Bewerbungen: Speicherung zum Zweck des Beschäftigungsverhältnisses. Abgelehnte Bewerbungen: Aufbewahrung bis zu 6 Monate (berechtigtes Interesse/Nachweiszwecke), danach Löschung; längere Aufbewahrung bei Erforderlichkeit oder Einwilligung. Bewerber-Pool nur mit Einwilligung; Löschung spätestens nach zwei Jahren.
              </p>
            </section>

          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-12 pt-8 border-t border-neutral-800">
          <p className="text-neutral-400 mb-4">
            © 2025 Autohaus Miftari. Alle Rechte vorbehalten.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-neutral-500">
            <span>Stand: {new Date().toLocaleDateString('de-DE')}</span>
            <span className="hidden sm:block">•</span>
            <a href="mailto:info@autohaus-miftari.de" className="hover:text-red-400 transition-colors">
              Fragen zum Datenschutz
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
