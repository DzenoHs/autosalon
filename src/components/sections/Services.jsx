import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, FileText, Shield, Wrench, Car, Headphones } from 'lucide-react';

const services = [
  {
    icon: <CreditCard size={48} />,
    title: "Finansiranje",
    desc: "Povoljni krediti i leasing opcije prilagođene vašim potrebama"
  },
  {
    icon: <FileText size={48} />,
    title: "Registracija",
    desc: "Kompletan servis registracije i prebacivanja vlasništva"
  },
  {
    icon: <Shield size={48} />,
    title: "Garancija",
    desc: "Proširena garancija na sva vozila u našoj ponudi"
  },
  {
    icon: <Wrench size={48} />,
    title: "Servis",
    desc: "Profesionalni servis i održavanje vozila"
  },
  {
    icon: <Car size={48} />,
    title: "Uvoz vozila",
    desc: "Uvoz vozila po narudžbi iz cijele Evrope"
  },
  {
    icon: <Headphones size={48} />,
    title: "24/7 Podrška",
    desc: "Dostupni smo vam u svakom trenutku za sve informacije"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 px-6 bg-neutral-900">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
              NAŠE USLUGE
            </span>
          </h2>
          <p className="text-gray-400 text-xl">Kompletna podrška za vaš novi auto</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-neutral-800 p-8 rounded-xl hover:bg-neutral-700 transition-all duration-300 hover:scale-105"
            >
              <div className="text-red-500 mb-4 group-hover:text-yellow-500 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
