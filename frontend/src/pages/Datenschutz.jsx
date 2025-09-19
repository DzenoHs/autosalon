import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Datenschutz = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Back Button */}
      <motion.button
        onClick={handleGoBack}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={20} />
        Zurück
      </motion.button>

      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="prose prose-invert max-w-none"
        >
          <h1 className="text-4xl font-bold text-red-500 mb-8">Datenschutzerklärung</h1>
          
          {/* Section 1 */}
          <div className="bg-neutral-800 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-red-400 mb-6">1. Datenschutz auf einen Blick</h2>
            
            <h3 className="text-xl font-semibold text-white mb-4">Allgemeine Hinweise</h3>
            <p className="text-gray-300 mb-4">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, 
              wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert 
              werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten 
              Datenschutzerklärung.
            </p>

            <h3 className="text-xl font-semibold text-white mb-4">Datenerfassung auf dieser Website</h3>
            
            <h4 className="text-lg font-medium text-red-300 mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
            <p className="text-gray-300 mb-4">
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem 
              Abschnitt „Hinweis zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
            </p>

            <h4 className="text-lg font-medium text-red-300 mb-2">Wie erfassen wir Ihre Daten?</h4>
            <p className="text-gray-300 mb-4">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z. B. Eingaben im Kontaktformular). 
              Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst 
              (z. B. Browser, Betriebssystem, Uhrzeit des Seitenaufrufs). Die Erfassung erfolgt automatisch, sobald Sie die Website betreten.
            </p>

            <h4 className="text-lg font-medium text-red-300 mb-2">Wofür nutzen wir Ihre Daten?</h4>
            <p className="text-gray-300 mb-4">
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können 
              zur Analyse Ihres Nutzerverhaltens verwendet werden.
            </p>

            <h4 className="text-lg font-medium text-red-300 mb-2">Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
            <p className="text-gray-300 mb-4">
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten 
              personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht auf Berichtigung oder Löschung dieser Daten, 
              auf Widerruf erteilter Einwilligungen für die Zukunft sowie – unter bestimmten Umständen – auf Einschränkung der 
              Verarbeitung. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Hierzu sowie 
              zu weiteren Fragen zum Datenschutz können Sie sich jederzeit an uns wenden.
            </p>

            <h4 className="text-lg font-medium text-red-300 mb-2">Analyse-Tools und Tools von Drittanbietern</h4>
            <p className="text-gray-300">
              Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden, vor allem mit sogenannten 
              Analyseprogrammen. Details finden Sie unten in dieser Datenschutzerklärung.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-neutral-800 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-red-400 mb-6">2. Hosting</h2>
            
            <h3 className="text-xl font-semibold text-white mb-4">Externes Hosting</h3>
            <p className="text-gray-300 mb-4">
              Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf 
              den Servern des Hoster(s) gespeichert (u. a. IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, 
              Vertrags- und Kontaktdaten, Namen, Websitezugriffe sowie sonstige über eine Website generierte Daten).
            </p>
            <p className="text-gray-300 mb-4">
              Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer 
              sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots (Art. 6 Abs. 1 lit. f DSGVO). Sofern 
              eine Einwilligung abgefragt wurde, erfolgt die Verarbeitung auf Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 25 Abs. 1 
              TDDDG. Die Einwilligung ist jederzeit widerrufbar.
            </p>
            <p className="text-gray-300 mb-4">
              Unser(e) Hoster verarbeiten Ihre Daten nur insoweit, wie dies zur Erfüllung der Leistungspflichten erforderlich 
              ist und folgen unseren Weisungen.
            </p>
            <p className="text-gray-300 mb-4">
              <strong>Wir setzen folgenden Hoster ein:</strong><br />
              One.com Group AB, Carlsgatan 3, 211 20 Malmö
            </p>

            <h3 className="text-xl font-semibold text-white mb-4">Auftragsverarbeitung</h3>
            <p className="text-gray-300">
              Wir haben einen Vertrag über Auftragsverarbeitung (AVV) mit dem oben genannten Dienst geschlossen. Dieser gewährleistet 
              die Verarbeitung personenbezogener Daten unserer Website-Besucher nur nach unseren Weisungen und unter Einhaltung der DSGVO.
            </p>
          </div>

          {/* Section 3 */}
          <div className="bg-neutral-800 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-red-400 mb-6">3. Allgemeine Hinweise und Pflichtinformationen</h2>
            
            <h3 className="text-xl font-semibold text-white mb-4">Datenschutz</h3>
            <p className="text-gray-300 mb-4">
              Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften 
              sowie dieser Datenschutzerklärung. Bitte beachten Sie, dass die Datenübertragung im Internet (z. B. per E-Mail) 
              Sicherheitslücken aufweisen kann.
            </p>

            <h3 className="text-xl font-semibold text-white mb-4">Hinweis zur verantwortlichen Stelle</h3>
            <div className="bg-neutral-700 rounded p-4 mb-4">
              <p className="text-white font-medium">Autohouse Miftari</p>
              <p className="text-gray-300">Niestetalstr. 11, 34266 Niestetal-Heiligenrode, Germany</p>
              <p className="text-gray-300">Telefon: +49 174 7692697</p>
              <p className="text-gray-300">E-Mail: info@gm-top-cars.de</p>
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">Speicherdauer</h3>
            <p className="text-gray-300 mb-4">
              Soweit in dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen 
              Daten bei uns, bis der Zweck entfällt, Sie ein berechtigtes Löschersuchen stellen oder eine Einwilligung widerrufen. 
              Gesetzliche Aufbewahrungsfristen bleiben unberührt.
            </p>

            <h3 className="text-xl font-semibold text-white mb-4">Rechtsgrundlagen</h3>
            <p className="text-gray-300 mb-4">
              Je nach Vorgang: Art. 6 Abs. 1 lit. a (Einwilligung), lit. b (Vertrag/Anbahnung), lit. c (rechtliche Verpflichtung) 
              oder lit. f DSGVO (berechtigtes Interesse). Bei besonderen Kategorien Art. 9 Abs. 2 lit. a DSGVO. Bei Endgerätezugriffen 
              zusätzlich § 25 Abs. 1 TDDDG.
            </p>

            <h3 className="text-xl font-semibold text-white mb-4">SSL-/TLS-Verschlüsselung</h3>
            <p className="text-gray-300">
              Diese Seite nutzt SSL-/TLS-Verschlüsselung. Erkennbar an „https://" und dem Schloss-Symbol im Browser.
            </p>
          </div>

          {/* Section 4 */}
          <div className="bg-neutral-800 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-red-400 mb-6">4. Datenerfassung auf dieser Website</h2>
            
            <h3 className="text-xl font-semibold text-white mb-4">Cookies</h3>
            <p className="text-gray-300 mb-4">
              Wir verwenden Cookies (Session/permanent; First-/Third-Party). Notwendige Cookies basieren auf Art. 6 Abs. 1 lit. f DSGVO. 
              Bei Einwilligung Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 25 Abs. 1 TDDDG. Browser kann so konfiguriert werden, 
              dass Cookies abgelehnt/gelöscht werden.
            </p>

            <h3 className="text-xl font-semibold text-white mb-4">Server-Log-Dateien</h3>
            <p className="text-gray-300 mb-4">
              Automatisch erhoben: Browsertyp/-version, Betriebssystem, Referrer, Hostname, Uhrzeit der Serveranfrage, IP-Adresse. 
              Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
            </p>

            <h3 className="text-xl font-semibold text-white mb-4">Kontaktformular</h3>
            <p className="text-gray-300">
              Angaben werden zur Bearbeitung gespeichert, ohne Einwilligung nicht weitergegeben. Rechtsgrundlage: Art. 6 Abs. 1 lit. b 
              (vertraglich), sonst lit. f bzw. lit. a bei Einwilligung.
            </p>
          </div>

          {/* Section 5-7 condensed */}
          <div className="bg-neutral-800 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-red-400 mb-6">5. Weitere Bestimmungen</h2>
            
            <h3 className="text-xl font-semibold text-white mb-4">Ihre Rechte</h3>
            <div className="space-y-3 text-gray-300">
              <p><strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie können jederzeit aus Gründen, die sich aus Ihrer besonderen Situation ergeben, der Verarbeitung nach Art. 6 Abs. 1 lit. e/f DSGVO widersprechen.</p>
              <p><strong>Auskunft, Berichtigung, Löschung:</strong> Sie haben das Recht auf unentgeltliche Auskunft sowie auf Berichtigung oder Löschung im Rahmen der gesetzlichen Bestimmungen.</p>
              <p><strong>Recht auf Datenübertragbarkeit:</strong> Sie haben das Recht, Daten in einem gängigen, maschinenlesbaren Format zu erhalten bzw. übertragen zu lassen.</p>
              <p><strong>Beschwerderecht:</strong> Sie haben das Recht auf Beschwerde bei einer Aufsichtsbehörde.</p>
            </div>

            <h3 className="text-xl font-semibold text-white mb-4 mt-6">Umgang mit Bewerberdaten</h3>
            <p className="text-gray-300">
              Verarbeitung von Bewerberdaten soweit zur Entscheidung über die Begründung eines Beschäftigungsverhältnisses nötig 
              (§ 26 BDSG, Art. 6 Abs. 1 lit. b DSGVO). Erfolgreiche Bewerbungen: Speicherung zum Zweck des Beschäftigungsverhältnisses. 
              Abgelehnte Bewerbungen: Aufbewahrung bis zu 6 Monate, danach Löschung.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Datenschutz;