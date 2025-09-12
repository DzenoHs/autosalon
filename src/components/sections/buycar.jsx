import { Car, CalendarCheck, FileText, Truck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Stavi Montserrat link u <head> za font kao i ranije

export default function BuyingProcessStrip() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => { setIsVisible(true); }, []);

  const steps = [
    { icon: <Car size={32} />, title: "Besichtigung", description: "Detaillierte Fahrzeugbesichtigung\nmit Experten", color: "bg-cyan-500", gradient: "from-cyan-400 to-blue-600" },
    { icon: <CalendarCheck size={32} />, title: "Reservierung", description: "Online oder vor Ort reservieren", color: "bg-amber-500", gradient: "from-amber-400 to-orange-500" },
    { icon: <FileText size={32} />, title: "Formalitäten", description: "Komplette Hilfe bei Verträgen und Registrierung", color: "bg-emerald-500", gradient: "from-emerald-400 to-teal-500" },
    { icon: <Truck size={32} />, title: "Übergabe", description: "Sichere Übergabe Ihres\nneuen Fahrzeugs", color: "bg-purple-500", gradient: "from-violet-400 to-purple-500" },
  ];

  return (
    <section className="relative py-16 md:py-28 bg-black dark:bg-gray-900">
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className={`mb-16 text-center`}>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4" style={{ fontFamily: "'Montserrat', 'Inter', sans-serif" }}>
            Wie Sie bei uns ein Auto kaufen
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Vier Schritte zu Ihrem perfekten Automobil – moderne Experience, glasklar!
          </p>
        </div>
        {/* Timeline LINE */}
        <div className="relative flex items-center justify-between">
          {/* Glavna linija – uvijek istegnuta, nije prekidana */}
          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 bg-gradient-to-r from-gray-700 via-gray-600/60 to-gray-700 dark:from-gray-700 dark:via-gray-900 dark:to-gray-700 z-0 rounded-full"></div>
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center flex-1 z-10">
              {/* STEP CIRCLE */}
              <div className={`relative z-10 group transition-transform duration-300`}>
                <div className={`w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br ${step.gradient} shadow-2xl border-4 border-gray-900 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-white">{step.icon}</span>
                  {/* Glow on hover */}
                  <span className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 blur-sm bg-gradient-to-br ${step.gradient} transition`}></span>
                </div>
                {/* Broj koraka iznad */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white text-xs px-3 py-1 rounded-full font-montserrat font-semibold tracking-wide shadow">
                  {idx + 1}
                </div>
              </div>
              {/* Text below */}
              <div className="mt-6 text-center max-w-[11rem]">
                <div className="text-lg font-bold text-white mb-1 font-montserrat">{step.title}</div>
                <div className="text-gray-300 text-sm whitespace-pre-line">{step.description}</div>
              </div>
            </div>
          ))}
        </div>
        {/* CTA */}
        <div className="text-center mt-14">
          <button
            onClick={() => navigate('/kako-kupiti')}
            className="inline-flex items-center px-8 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-400 text-black font-montserrat font-semibold text-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Detaillierte Prozesserklärung
            <ArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}
