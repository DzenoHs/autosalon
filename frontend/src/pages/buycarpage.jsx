import React, {useEffect, useState} from 'react'
import {Car, CalendarCheck, FileText, Truck, ArrowLeft, ChevronDown, ChevronUp, Phone, Mail} from 'lucide-react'
// import { useNavigate } from "react-router-dom";

export default function KakoKupitiAuto() {
  // const navigate = useNavigate();
  const [progress, setProgress] = useState(0)
  const [openFAQ, setOpenFAQ] = useState(null)

  const steps = [
    {
      icon: <Car size={32} className="text-red-500" />,
      title: 'Fahrzeugbesichtigung',
      content:
        'Sie kommen vor Ort, besichtigen das Fahrzeug ausführlich mit unseren Experten und können eine Probefahrt machen.'
    },
    {
      icon: <CalendarCheck size={32} className="text-yellow-500" />,
      title: 'Reservierung',
      content:
        'Online oder direkt vor Ort reservieren Sie Ihr gewünschtes Fahrzeug mit der Sicherheit Ihrer Reservierung.'
    },
    {
      icon: <FileText size={32} className="text-green-500" />,
      title: 'Dokumentation',
      content:
        'Wir bieten Ihnen vollständige Unterstützung bei allen Verhandlungen, Verträgen, Registrierung und anderen notwendigen Dokumenten.'
    },
    {
      icon: <Truck size={32} className="text-blue-500" />,
      title: 'Übergabe',
      content: 'Nach Abschluss aller Verfahren können Sie Ihr neues Fahrzeug sicher und einfach übernehmen.'
    }
  ]

  const faqItems = [
    {
      question: 'Welche Finanzierungsmöglichkeiten bieten Sie an?',
      answer:
        'Wir bieten verschiedene Finanzierungsmöglichkeiten an, einschließlich Bankdarlehen, Leasing und Ratenzahlung. Unsere Experten helfen Ihnen, die beste Option für Ihre Bedürfnisse zu finden. Wir arbeiten mit zwei renommierten Finanzpartnern zusammen:\n\nBank11 - bonitätsunabhängige Festzinsen ab 5,49%, Kreditsummen von 2.500€ bis 150.000€, Laufzeiten bis 96 Monate, kostenlose Sondertilgungen möglich.\n\nSantander - Deutschlands größter herstellerunabhängiger Kfz-Finanzierer mit zwei Optionen: ClassicCredit mit gleichbleibenden Raten oder BudgetCredit mit niedrigeren monatlichen Raten durch Schlussrate.\n\nBeide Partner bieten schnelle Online-Bearbeitung und flexible Konditionen - unabhängig von Automarke oder Händler.'
    },
    {
      question: 'Gibt es eine Garantie auf die Fahrzeuge?',
      answer:
        'Ja, alle unsere Fahrzeuge kommen mit einer Garantie. Die Garantiedauer variiert je nach Fahrzeugalter und -zustand. Detaillierte Informationen erhalten Sie bei der Besichtigung.'
    },
    {
      question: 'Kann ich mein altes Auto in Zahlung geben?',
      answer:
        'Für eine schnelle Bewertung Ihres Fahrzeugs klicken Sie in den Fahrzeugdetails auf "BEWERTUNGSFORMULAR" und senden Sie uns folgende Angaben:\n\nFahrzeugdaten:\n\n• Marke, Modell und Baujahr\n\n• Kilometerstand und Zustand\n\n• Serviceheft und TÜV-Bericht\n\n• Zusätzliche Fahrzeuginformationen\n\nUnser Expertenteam erstellt Ihnen innerhalb von 24 Stunden ein faires Angebot. Die Bewertung kann als:\n\n• Anzahlung für Ihr neues Fahrzeug\n\n• Reduzierung der Finanzierungssumme\n\n• Teilzahlung verwendet werden\n\nEinfach Formular ausfüllen und absenden - kostenlos und unverbindlich!'
    },
    {
      question: 'Wie lange dauert der gesamte Kaufprozess?',
      answer:
        'Der Kaufprozess kann normalerweise innerhalb von 1-3 Tagen abgeschlossen werden, abhängig von der Finanzierung und den erforderlichen Dokumenten.'
    },
    {
      question: 'Bieten Sie Lieferung an?',
      answer:
        'Ja, wir bieten Fahrzeuglieferung in der Region an. Die Lieferkosten hängen von der Entfernung ab. Sprechen Sie uns für Details an.'
    }
  ]

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current += 1
      if (current > steps.length) clearInterval(interval)
      else setProgress(current)
    }, 700)
    return () => clearInterval(interval)
  }, [steps.length])

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 py-8 flex flex-col items-center">
      {/* Nazad dugme i naslov */}
      <div className="w-full max-w-4xl px-4">
        <button
          onClick={() => window.close()}
          className="mb-8 flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 rounded transition"
        >
          <ArrowLeft size={20} />
          Schließen
        </button>

        {/* Uvodni tekst */}
        <div className="text-center mb-6">
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Unser Autokaufprozess ist einfach, transparent und kundenorientiert gestaltet, um Ihnen die bestmögliche
            Erfahrung zu bieten.
          </p>
        </div>
      </div>

      <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-900 dark:text-white tracking-tight w-full">
        Wie Sie bei uns ein Auto kaufen
      </h1>

      {/* Desktop layout */}
      <div className="hidden md:flex w-full min-h-[70vh] justify-center items-center">
        <div className="flex flex-row max-w-4xl w-full justify-center items-start gap-12">
          {/* Timeline links */}
          <div className="relative flex flex-col items-center pt-1">
            {/* Vertikalna linija */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-2 bg-gray-300 dark:bg-gray-700 rounded-full z-0"
              style={{height: `${(steps.length - 1) * 176 + 56}px`, top: '28px'}}
            />
            {/* Progres animacija */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-2 bg-red-500 rounded-full origin-top z-10"
              style={{
                height: `${Math.max(0, ((steps.length - 1) * 176 + 56) * (progress / steps.length))}px`,
                top: '28px',
                transition: 'height 0.6s ease-in-out'
              }}
            />
            {/* Ikone */}
            {steps.map((step, idx) => {
              const isActive = idx < progress
              return (
                <div
                  key={idx}
                  className="relative z-20 flex items-center justify-center"
                  style={{height: '56px', marginBottom: idx === steps.length - 1 ? '0' : '120px'}}
                >
                  <div
                    className={`rounded-full border-4 w-14 h-14 flex items-center justify-center shadow-lg ${
                      isActive
                        ? 'border-red-500 bg-red-100 dark:bg-red-800'
                        : 'border-gray-300 bg-white dark:bg-gray-800'
                    }`}
                    style={{boxShadow: isActive ? '0 0 12px 4px rgba(239,68,68,0.15)' : 'none'}}
                  >
                    {step.icon}
                  </div>
                </div>
              )
            })}
          </div>
          {/* Tekst desno */}
          <div className="flex-1 flex flex-col pt-1">
            {steps.map((step, idx) => {
              const isActive = idx < progress
              return (
                <div
                  key={idx}
                  className="flex flex-col items-start"
                  style={{height: '56px', marginBottom: idx === steps.length - 1 ? '0' : '120px'}}
                >
                  <h2
                    className={`text-2xl font-bold ${
                      isActive ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
                    } mb-2 text-left leading-tight`}
                  >
                    {step.title}
                  </h2>
                  <p
                    className={`max-w-lg text-base md:text-lg ${
                      isActive ? 'text-gray-900 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'
                    } text-left leading-relaxed`}
                  >
                    {step.content}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {/* Mobile layout: Ikona lijevo, tekst desno */}
      <div className="block md:hidden w-full px-4">
        {steps.map((step, idx) => {
          const isActive = idx < progress
          return (
            <div key={idx} className="flex items-center mb-10 last:mb-0">
              {/* Timeline ikona + linija */}
              <div className="flex flex-col items-center mr-4">
                <div
                  className={`rounded-full border-4 w-12 h-12 flex items-center justify-center shadow ${
                    isActive ? 'border-red-500 bg-red-100 dark:bg-red-800' : 'border-gray-300 bg-white dark:bg-gray-800'
                  }`}
                  style={{boxShadow: isActive ? '0 0 8px 2px rgba(239,68,68,0.13)' : 'none'}}
                >
                  {step.icon}
                </div>
                {idx !== steps.length - 1 && <div className="w-1 h-10 bg-red-500 dark:bg-red-400 rounded-full" />}
              </div>
              {/* Tekst desno od ikone */}
              <div>
                <h2
                  className={`text-lg font-bold ${
                    isActive ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {step.title}
                </h2>
                <p
                  className={`max-w-[80vw] ${
                    isActive ? 'text-gray-900 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {step.content}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-4xl px-4 mt-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">Häufig gestellte Fragen</h2>
        <div className="space-y-4">
          {faqItems.map((item, idx) => (
            <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg">
              <button
                onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="font-medium text-gray-900 dark:text-white">{item.question}</span>
                {openFAQ === idx ? (
                  <ChevronUp className="text-red-500 flex-shrink-0" size={20} />
                ) : (
                  <ChevronDown className="text-red-500 flex-shrink-0" size={20} />
                )}
              </button>
              {openFAQ === idx && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>


    </div>
  )
}
