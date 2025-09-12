import React, { useEffect, useState } from "react";
import { Car, CalendarCheck, FileText, Truck, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function KakoKupitiAuto() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const steps = [
    {
      icon: <Car size={32} className="text-red-500" />,
      title: "Pregled automobila",
      content: "Dolaziš na lokaciju, detaljno pregledavaš auto sa našim stručnjacima, test vožnja je dostupna.",
    },
    {
      icon: <CalendarCheck size={32} className="text-yellow-500" />,
      title: "Rezervacija",
      content: "Online ili direktno na licu mjesta, rezervišeš željeno vozilo uz sigurnost svoje rezervacije.",
    },
    {
      icon: <FileText size={32} className="text-green-500" />,
      title: "Papirologija",
      content: "Pruža ti se potpuna pomoć oko svih pregovora, ugovora, registracije i ostale potrebne papirologije.",
    },
    {
      icon: <Truck size={32} className="text-blue-500" />,
      title: "Preuzimanje",
      content: "Nakon završenih procedura, možeš sigurno i jednostavno preuzeti svoj novi automobil.",
    },
  ];

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current > steps.length) clearInterval(interval);
      else setProgress(current);
    }, 700);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 py-8 flex flex-col items-center">
      {/* Nazad dugme i naslov */}
      <div className="w-full max-w-2xl px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 rounded transition"
        >
          <ArrowLeft size={20} />
          Nazad
        </button>
      </div>
      <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-900 dark:text-white tracking-tight w-full">
        Kako kupiti auto kod nas
      </h1>

      {/* Desktop layout - NE MIJENJA SE! */}
      <div className="hidden md:flex w-full min-h-[70vh] justify-center items-center">
  <div className="flex flex-row max-w-4xl w-full justify-center items-start gap-16">
    {/* Tekst lijevo */}
    <div className="flex-1 flex flex-col space-y-16 justify-center items-end">
      {steps.map((step, idx) => {
        const isActive = idx < progress;
        return (
          <div key={idx} className="flex flex-col items-end">
            <h2 className={`text-2xl font-bold ${isActive ? "text-red-600 dark:text-red-400" : "text-gray-600 dark:text-gray-400"} mb-2 text-right`}>
              {step.title}
            </h2>
            <p className={`max-w-lg text-base md:text-lg ${isActive ? "text-gray-900 dark:text-gray-200" : "text-gray-400 dark:text-gray-500"} text-right`}>
              {step.content}
            </p>
          </div>
        );
      })}
    </div>
    {/* Timeline desno, ikone tačno u liniji sa naslovima */}
    <div className="relative flex flex-col gap-12 items-center pt-2 pb-8">
      {/* Vertikalna linija */}
      <div className="absolute left-1/2 -translate-x-1/2 w-2 h-full bg-gray-300 dark:bg-gray-700 rounded-full z-0" />
      {/* Progres animacija */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-2 bg-red-500 rounded-full origin-top z-10"
        style={{
          height: `calc((100% / ${steps.length}) * ${progress})`,
          transition: "height 0.6s ease-in-out",
        }}
      />
      {/* Ikone u liniji sa tekstom */}
      {steps.map((step, idx) => {
        const isActive = idx < progress;
        return (
          <div key={idx} className="relative z-20 flex items-center justify-center" style={{ minHeight: "80px" }}>
            <div className={`rounded-full border-4 w-14 h-14 flex items-center justify-center shadow-lg ${isActive ? "border-red-500 bg-red-100 dark:bg-red-800" : "border-gray-300 bg-white dark:bg-gray-800"}`}
              style={{ boxShadow: isActive ? "0 0 12px 4px rgba(239,68,68,0.15)" : "none" }}
            >
              {step.icon}
            </div>
          </div>
        );
      })}
    </div>
  </div>
</div>
      {/* Mobile layout: Ikona lijevo, tekst desno */}
      <div className="block md:hidden w-full px-4">
        {steps.map((step, idx) => {
          const isActive = idx < progress;
          return (
            <div key={idx} className="flex items-center mb-10 last:mb-0">
              {/* Timeline ikona + linija */}
              <div className="flex flex-col items-center mr-4">
                <div className={`rounded-full border-4 w-12 h-12 flex items-center justify-center shadow ${isActive ? "border-red-500 bg-red-100 dark:bg-red-800" : "border-gray-300 bg-white dark:bg-gray-800"}`}
                  style={{ boxShadow: isActive ? "0 0 8px 2px rgba(239,68,68,0.13)" : "none" }}
                >
                  {step.icon}
                </div>
                {idx !== steps.length - 1 && (
                  <div className="w-1 h-10 bg-red-500 dark:bg-red-400 rounded-full" />
                )}
              </div>
              {/* Tekst desno od ikone */}
              <div>
                <h2 className={`text-lg font-bold ${isActive ? "text-red-600 dark:text-red-400" : "text-gray-600 dark:text-gray-400"}`}>
                  {step.title}
                </h2>
                <p className={`max-w-[80vw] ${isActive ? "text-gray-900 dark:text-gray-200" : "text-gray-400 dark:text-gray-500"}`}>
                  {step.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
