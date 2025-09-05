  import React, { useState } from "react";
  import { motion } from 'framer-motion';
  import { Phone, Mail, MapPin, Send, User, MessageSquare } from 'lucide-react';

  export default function Contact() {
    const [form, setForm] = useState({
      name: "",
      email: "",
      message: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
      if (errors[e.target.name]) {
        setErrors({ ...errors, [e.target.name]: "" });
      }
    };

    const validateForm = () => {
      const newErrors = {};
      if (!form.name.trim()) newErrors.name = "Name ist erforderlich";
      if (!form.email.trim()) newErrors.email = "E-Mail ist erforderlich";
      if (!form.email.includes("@")) newErrors.email = "Gültige E-Mail ist erforderlich";
      if (!form.message.trim()) newErrors.message = "Nachricht ist erforderlich";
      return newErrors;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const newErrors = validateForm();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Nachricht erfolgreich gesendet!");
      setForm({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    };

    return (
      <section className="relative py-32 bg-gradient-to-b from-black via-neutral-900 to-black overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-3 h-3 bg-red-500 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-40 right-20 w-2 h-2 bg-yellow-500 rounded-full animate-ping opacity-40"></div>
          <div className="absolute bottom-32 left-1/4 w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse opacity-50"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tight leading-none">
              <span className="bg-gradient-to-r from-red-500 via-yellow-500 to-red-600 bg-clip-text text-transparent drop-shadow-2xl">
                KONTAKT
              </span>
            </h2>
            
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "10rem" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1.5 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 mx-auto mb-8 rounded-full shadow-lg"
            ></motion.div>
            
            <p className="text-gray-300 text-xl md:text-2xl max-w-4xl mx-auto font-medium">
              <span className="text-transparent bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text">
                Ihr Traumauto wartet auf Sie - Kontaktieren Sie uns jetzt!
              </span>
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 mb-20">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 via-yellow-500/10 to-red-500/20 rounded-3xl blur-2xl opacity-30"></div>
                
                <div className="relative bg-gradient-to-br from-neutral-900 via-black to-neutral-800 p-10 rounded-3xl border-2 border-neutral-700 shadow-2xl backdrop-blur-sm">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Name Input */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="group"
                    >
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                        <input
                          type="text"
                          name="name"
                          placeholder="Ihr Name"
                          value={form.name}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-5 rounded-xl bg-neutral-800/80 backdrop-blur-sm text-white text-lg border-2 ${
                            errors.name ? "border-red-500" : "border-neutral-600 focus:border-red-500"
                          } focus:outline-none transition-all duration-300 group-hover:bg-neutral-700/80`}
                        />
                      </div>
                      {errors.name && (
                        <motion.p 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-red-400 text-sm mt-2 font-medium"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Email Input */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="group"
                    >
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                        <input
                          type="email"
                          name="email"
                          placeholder="Ihre E-Mail"
                          value={form.email}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-5 rounded-xl bg-neutral-800/80 backdrop-blur-sm text-white text-lg border-2 ${
                            errors.email ? "border-red-500" : "border-neutral-600 focus:border-red-500"
                          } focus:outline-none transition-all duration-300 group-hover:bg-neutral-700/80`}
                        />
                      </div>
                      {errors.email && (
                        <motion.p 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-red-400 text-sm mt-2 font-medium"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Message Input */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="group"
                    >
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-6 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                        <textarea
                          name="message"
                          placeholder="Ihre Nachricht"
                          value={form.message}
                          onChange={handleChange}
                          rows={6}
                          className={`w-full pl-12 pr-4 py-5 rounded-xl bg-neutral-800/80 backdrop-blur-sm text-white text-lg border-2 ${
                            errors.message ? "border-red-500" : "border-neutral-600 focus:border-red-500"
                          } focus:outline-none transition-all duration-300 resize-none group-hover:bg-neutral-700/80`}
                        />
                      </div>
                      {errors.message && (
                        <motion.p 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-red-400 text-sm mt-2 font-medium"
                        >
                          {errors.message}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-red-500 via-red-600 to-yellow-500 text-white px-8 py-6 rounded-xl font-black text-xl shadow-2xl hover:shadow-red-500/25 transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <span className="relative z-10">
                        {isSubmitting ? "SENDEN..." : "NACHRICHT SENDEN"}
                      </span>
                      <Send className="relative z-10 group-hover:translate-x-1 transition-transform" size={24} />
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>

            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-blue-500/20 rounded-3xl blur-2xl opacity-30"></div>
                
                <div className="relative w-full h-[500px] lg:h-[600px] bg-neutral-800 rounded-3xl overflow-hidden border-2 border-neutral-700 shadow-2xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46302.08469805778!2d18.356!3d43.8476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758cbb1ed719bd1%3A0x562ecda6de87b33e!2sSarajevo%2C%20Bosnia%20and%20Herzegovina!5e0!3m2!1sen!2sba!4v1635872400000!5m2!1sen!2sba"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="AutohausMiftari Standort"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>

          {/* NOVI ELEGANTNI DIZAJN KONTAKT INFORMACIJA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <motion.h3 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-black text-center mb-12"
            >
              <span className="bg-gradient-to-r from-red-500 via-yellow-500 to-red-600 bg-clip-text text-transparent">
                Kontaktinformationen
              </span>
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  icon: Phone, 
                  title: "Telefon",
                  text: "+387 61 123 456", 
                  gradient: "from-indigo-500 to-violet-600",
                  delay: 0.1
                },
                { 
                  icon: Mail, 
                  title: "E-Mail",
                  text: "info@autohausmiftari.com", 
                  gradient: "from-cyan-500 to-blue-600",
                  delay: 0.2
                },
                { 
                  icon: MapPin, 
                  title: "Standort",
                  text: "Sarajevo, Bosnien und Herzegowina", 
                  gradient: "from-green-500 to-teal-600",
                  delay: 0.3
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.5 + item.delay, 
                    duration: 0.6
                  }}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  className="group"
                >
                  <div className="flex flex-col items-center text-center bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-800 rounded-3xl padding-40 border border-neutral-700 group-hover:border-neutral-600 shadow-xl group-hover:shadow-2xl transition-all duration-500 min-height-56 backdrop-blur-sm">
                    
                    {/* Icon Container */}
                    <motion.div 
                      className={`bg-gradient-to-br ${item.gradient} padding-6 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-500 margin-bottom-6`}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <item.icon className="text-white" size={32} />
                    </motion.div>
                    
                    {/* Title */}
                    <h4 className="text-white font-bold text-xl margin-bottom-3 group-hover:text-gray-200 transition-colors duration-300">
                      {item.title}
                    </h4>
                    
                    {/* Contact Text */}
                    <p className="text-gray-300 font-medium text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300 max-width-full word-break-break-words">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    );
  }
