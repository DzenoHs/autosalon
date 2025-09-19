import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Impressum = () => {
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

      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="prose prose-invert max-w-none"
        >
          <h1 className="text-4xl font-bold text-red-500 mb-8">Impressum</h1>
          
          <div className="bg-neutral-800 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Autohouse Mifftari (haftungsbeschränkt)</h2>
            <p className="text-gray-300 mb-2">in Gründung</p>
            
            <div className="mt-6 space-y-2">
              <p className="text-white">Niestetalstraße 11, 34266 Niestetal, Germany</p>
            </div>
          </div>

          <div className="bg-neutral-800 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-red-400 mb-4">Handelsregister</h3>
            <p className="text-gray-300">Handelsregister: wird nachgetragen</p>
            <p className="text-gray-300">Registergericht: wird nachgetragen</p>
            <p className="text-gray-300 mt-2">Vertreten durch die Gründer: [wird nachgetragen]</p>
          </div>

          <div className="bg-neutral-800 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-red-400 mb-4">Kontakt</h3>
            <p className="text-gray-300">Telefon: +49 174 7692697</p>
            <p className="text-gray-300">E-Mail: info@gm-top-cars.de</p>
          </div>

          <div className="bg-neutral-800 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-red-400 mb-4">Umsatzsteuer</h3>
            <p className="text-gray-300">
              Eine Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz wird beantragt und nachgereicht.
            </p>
          </div>

          <div className="bg-neutral-800 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-red-400 mb-4">Streitbeilegung</h3>
            <p className="text-gray-300">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>

          <div className="bg-neutral-800 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-red-400 mb-4">Urheberrecht</h3>
            <p className="text-gray-300 mb-4">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. 
              Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes 
              bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind 
              nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
            <p className="text-gray-300">
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. 
              Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung 
              aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir 
              derartige Inhalte umgehend entfernen.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Impressum;