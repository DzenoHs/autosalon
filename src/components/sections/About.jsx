import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Award, Star } from 'lucide-react';

const features = [
  { 
    icon: <ShieldCheck size={32} />, 
    title: "Garancija", 
    desc: "Sva vozila sa garancijom i provjerenom istorijom." 
  },
  { 
    icon: <Users size={32} />, 
    title: "Profesionalizam", 
    desc: "Stručan tim sa dugogodišnjim iskustvom." 
  },
  { 
    icon: <Award size={32} />, 
    title: "Pouzdanost", 
    desc: "Više od 1000 zadovoljnih kupaca." 
  },
  { 
    icon: <Star size={32} />, 
    title: "Povjerenje", 
    desc: "Transparentnost i sigurnost u svakoj kupovini." 
  },
];

export default function About() {
  return (
        <section id="about" className="max-w-7xl mx-auto py-20 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&crop=center"
              alt="Auto showroom"
              className="w-full h-96 object-cover rounded-xl shadow-2xl"
            />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
                ZAŠTO BAŠE MI?
              </span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Mi smo tim sa dugogodišnjim iskustvom u prodaji premium vozila. 
              Naša misija je pružiti najbolju uslugu i povjerenje kupaca kroz 
              transparentnost, profesionalizam i kvalitet.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center p-4 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors"
                >
                  <div className="text-red-500 mb-3">{feature.icon}</div>
                  <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
