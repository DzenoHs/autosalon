import React, { useState } from "react";
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
    await new Promise(r => setTimeout(r, 1000));
    alert("Nachricht erfolgreich gesendet!");
    setForm({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      className="relative py-32 bg-gradient-to-b from-black via-neutral-900 to-black overflow-hidden"
      style={{ overflowX: "hidden" }}
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-3 h-3 bg-red-500 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-yellow-500 rounded-full opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tight leading-none">
            <span className="bg-gradient-to-r from-red-500 via-yellow-500 to-red-600 bg-clip-text text-transparent drop-shadow-2xl">
              KONTAKT
            </span>
          </h2>
          <div className="h-1.5 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 mx-auto mb-8 rounded-full shadow-lg w-40" />
          <p className="text-gray-300 text-xl md:text-2xl max-w-4xl mx-auto font-medium">
            <span className="text-transparent bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text">
              Ihr Traumauto wartet auf Sie - Kontaktieren Sie uns jetzt!
            </span>
          </p>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 mb-20">
          {/* Contact Form */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 via-yellow-500/10 to-red-500/20 rounded-3xl blur-2xl opacity-30"></div>
              <div className="relative bg-gradient-to-br from-neutral-900 via-black to-neutral-800 p-10 rounded-3xl border-2 border-neutral-700 shadow-2xl backdrop-blur-sm">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name Input */}
                  <div className="group">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors duration-200" size={20} />
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
                    {errors.name && <p className="text-red-400 text-sm mt-2 font-medium">{errors.name}</p>}
                  </div>

                  {/* Email Input */}
                  <div className="group">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors duration-200" size={20} />
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
                    {errors.email && <p className="text-red-400 text-sm mt-2 font-medium">{errors.email}</p>}
                  </div>

                  {/* Message Input */}
                  <div className="group">
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-6 text-gray-400 group-focus-within:text-red-500 transition-colors duration-200" size={20} />
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
                    {errors.message && <p className="text-red-400 text-sm mt-2 font-medium">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-red-500 via-red-600 to-yellow-500 text-white px-8 py-6 rounded-xl font-black text-xl shadow-2xl hover:shadow-red-500/25 transition-all duration-200 flex items-center justify-center gap-3 group relative overflow-hidden hover:scale-105 active:scale-95"
                  >
                    <Send size={24} className="relative z-10" />
                    <span className="relative z-10">
                      {isSubmitting ? "SENDEN..." : "NACHRICHT SENDEN"}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-blue-500/20 rounded-3xl blur-2xl opacity-30"></div>
              <div className="relative w-full h-[500px] lg:h-[600px] bg-neutral-800 rounded-3xl overflow-hidden border-2 border-neutral-700 shadow-2xl">
                <iframe
                  id="contact"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46302.08469805778!2d18.356!3d43.8476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758cbb1ed719bd1%3A0x562ecda6de87b33e!2sSarajevo%2C%20Bosnia%20and%20Herzegovina!5e0!3m2!1sen!2sba!4v1635872400000!5m2!1sen!2sba"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="AutohausMiftari Standort"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* NOVA VARIJANTA - Block minimalistički stil */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-4xl md:text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-red-500 via-yellow-500 to-red-600 bg-clip-text text-transparent">
                WIE SIE UNS ERREICHEN
              </span>
            </h3>
          </div>

          {/* 3 bloka u jednom redu - moderni stil */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-gradient-to-r from-red-500/20 via-yellow-500/20 to-red-500/20 p-1 rounded-2xl">
            
            {/* Telefon Block */}
            <div className="bg-black p-12 rounded-xl hover:bg-neutral-900 transition-colors duration-300 group">
              <div className="text-center">
                <Phone className="mx-auto mb-6 text-red-500 group-hover:scale-110 transition-transform duration-300" size={40} />
                <div className="space-y-3">
                  <p className="text-red-400 font-bold text-lg tracking-wider uppercase">Telefon</p>
                  <a 
                    href="tel:+38761123456" 
                    className="block text-white font-black text-2xl hover:text-red-400 transition-colors duration-200"
                  >
                    +387 61 123 456
                  </a>
                </div>
              </div>
            </div>

            {/* Email Block */}
            <div className="bg-black p-12 rounded-xl hover:bg-neutral-900 transition-colors duration-300 group">
              <div className="text-center">
                <Mail className="mx-auto mb-6 text-blue-500 group-hover:scale-110 transition-transform duration-300" size={40} />
                <div className="space-y-3">
                  <p className="text-blue-400 font-bold text-lg tracking-wider uppercase">E-Mail</p>
                  <a 
                    href="mailto:info@autohausmiftari.com" 
                    className="block text-white font-black text-xl hover:text-blue-400 transition-colors duration-200 break-all"
                  >
                    info@autohausmiftari.com
                  </a>
                </div>
              </div>
            </div>

            {/* Lokacija Block */}
            <div className="bg-black p-12 rounded-xl hover:bg-neutral-900 transition-colors duration-300 group">
              <div className="text-center">
                <MapPin className="mx-auto mb-6 text-green-500 group-hover:scale-110 transition-transform duration-300" size={40} />
                <div className="space-y-3">
                  <p className="text-green-400 font-bold text-lg tracking-wider uppercase">Lokacija</p>
                  <p className="text-white font-black text-xl">
                    Sarajevo,<br />
                    Bosnien und Herzegowina
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Dodatni CTA */}
          <div className="mt-16 text-center">
            <p className="text-gray-400 text-lg font-medium">
              Bereit für Ihr neues Auto? Kontaktieren Sie uns noch heute!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
