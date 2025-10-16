import React, {useState, useMemo, useCallback} from 'react'
import {motion} from 'framer-motion'
import {Shield, CheckCircle, CreditCard, Zap, Car, Award, Clock, Users, Star} from 'lucide-react'

function WhyChooseUs() {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [hoveredStat, setHoveredStat] = useState(null)

  // ✅ Memoized static data
  const features = useMemo(
    () => [
      {
        icon: <CheckCircle size={52} />,
        title: 'GARANTIE',
        description: 'Erweiterte Garantie für maximale Sicherheit auf Wunsch',
        gradient: 'from-emerald-400 via-green-500 to-emerald-700',
        shadowColor: 'shadow-emerald-500/25'
      },
      {
        icon: <Shield size={52} />,
        title: 'GEPRÜFT',
        description: 'Detaillierte technische Inspektion durch zertifizierte Experten auf Wunsch',
        gradient: 'from-cyan-400 via-blue-500 to-indigo-700',
        shadowColor: 'shadow-blue-500/25'
      },
      {
        icon: <CreditCard size={52} />,
        title: 'FINANZIERUNG',
        description: 'Flexible Zahlungspläne über SANTANDER und BANK11',
        gradient: 'from-violet-400 via-purple-500 to-fuchsia-700',
        shadowColor: 'shadow-purple-500/25'
      },
      {
        icon: <Zap size={52} />,
        title: 'EXPRESS',
        description: 'Expresse Kaufabwicklung in 48 Stunden',
        gradient: 'from-amber-400 via-orange-500 to-red-600',
        shadowColor: 'shadow-orange-500/25'
      }
    ],
    []
  )

  const stats = useMemo(
    () => [
      {number: '6000+', label: 'ZUFRIEDENE KUNDEN', icon: <Users size={26} />, color: 'from-green-400 to-emerald-600'},
      {number: '30+', label: 'JAHRE ERFAHRUNG', icon: <Award size={26} />, color: 'from-blue-400 to-cyan-600'},
      {number: '150+', label: 'FAHRZEUGBESTAND', icon: <Car size={26} />, color: 'from-purple-400 to-pink-600'},
      {number: '24/7', label: 'E-MAIL SUPPORT', icon: <Clock size={26} />, color: 'from-orange-400 to-red-600'}
    ],
    []
  )

  // ✅ Memoized handlers
  const handleCardHover = useCallback((i) => setHoveredCard(i), [])
  const handleCardLeave = useCallback(() => setHoveredCard(null), [])
  const handleStatHover = useCallback((i) => setHoveredStat(i), [])
  const handleStatLeave = useCallback(() => setHoveredStat(null), [])

  return (
    <section id="about" className="relative py-20 bg-gradient-to-b from-black via-neutral-900 to-black overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{opacity: 0, y: 50}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.8}}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-black mb-4 tracking-tight leading-none"
            initial={{scale: 0.9, opacity: 0}}
            whileInView={{scale: 1, opacity: 1}}
            viewport={{once: true}}
            transition={{duration: 0.6}}
          >
            <span className="text-white drop-shadow-2xl">WARUM</span>
            <span className="text-white ml-4">AUTOHAUS MIFTARI?</span>
          </motion.h2>

          <motion.div
            initial={{width: 0}}
            whileInView={{width: '12rem'}}
            viewport={{once: true}}
            transition={{duration: 0.8}}
            className="h-1 bg-gradient-to-r from-red-500 to-yellow-500 mx-auto mb-8 rounded-full"
          />

          <motion.p
            className="text-white text-lg md:text-xl max-w-3xl mx-auto font-medium"
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            transition={{delay: 0.3}}
          >
            <span className="text-transparent bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text">
              Über 30 Jahre Erfahrung in Premium-Automobildienstleistungen
            </span>
          </motion.p>
        </motion.div>

        {/* ✅ Optimized Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={handleCardLeave}
              className="group relative cursor-pointer will-change-transform"
              initial={{opacity: 0, y: 40}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.5, delay: index * 0.1}}
            >
              <motion.div
                className={`absolute -inset-2 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-md`}
                animate={{opacity: hoveredCard === index ? 0.4 : 0}}
                transition={{duration: 0.3}}
              />

              <motion.div
                className="relative p-5 lg:p-6 rounded-3xl border transition-all duration-500 shadow-xl backdrop-blur-sm h-[280px] lg:h-[320px]"
                animate={{
                  y: hoveredCard === index ? -10 : 0,
                  scale: hoveredCard === index ? 1.03 : 1,
                  rotateY: hoveredCard === index ? 6 : 0,
                  borderColor: hoveredCard === index ? 'transparent' : 'rgb(64 64 64)'
                }}
                style={{
                  transformOrigin: 'center center',
                  backfaceVisibility: 'hidden',
                  background:
                    hoveredCard === index
                      ? `linear-gradient(135deg, ${feature.gradient})`
                      : 'linear-gradient(135deg, #171717, #000000, #262626)'
                }}
              >
                <div className="text-center relative z-10 h-full flex flex-col justify-center">
                  <div className="mb-5">
                    <motion.div
                      className="inline-flex p-5 rounded-2xl shadow-md transition-transform duration-300"
                      animate={{
                        rotate: hoveredCard === index ? 360 : 0,
                        scale: hoveredCard === index ? 1.1 : 1
                      }}
                      transition={{duration: 0.9}}
                    >
                      <div className="text-white">{feature.icon}</div>
                    </motion.div>
                  </div>

                  <h3 className="text-base lg:text-2xl font-black mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-xs lg:text-base font-medium">{feature.description}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* ✅ Optimized Stats */}
        <motion.div
          initial={{opacity: 0, y: 50}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.8, delay: 0.4}}
          className="mt-24 pt-10 border-t border-neutral-700"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                onMouseEnter={() => handleStatHover(index)}
                onMouseLeave={handleStatLeave}
                className="text-center cursor-pointer will-change-transform"
                initial={{opacity: 0, scale: 0.8}}
                whileInView={{opacity: 1, scale: 1}}
                viewport={{once: true}}
                transition={{duration: 0.5, delay: index * 0.1}}
              >
                <motion.div
                  className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${stat.color} mb-3 shadow-md`}
                  animate={{
                    rotate: hoveredStat === index ? 360 : 0,
                    scale: hoveredStat === index ? 1.1 : 1,
                    y: hoveredStat === index ? -6 : 0
                  }}
                  transition={{duration: 1}}
                >
                  <div className="text-white">{stat.icon}</div>
                </motion.div>

                <motion.div
                  className="text-3xl lg:text-5xl font-black text-white mb-2"
                  animate={{scale: hoveredStat === index ? 1.1 : 1}}
                >
                  {stat.number}
                </motion.div>

                <div className="text-xs lg:text-base font-bold tracking-wider text-white">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default React.memo(WhyChooseUs)
