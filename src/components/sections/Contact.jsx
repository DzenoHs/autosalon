import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.email.includes("@")) newErrors.email = "Valid email is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    alert("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="bg-neutral-900 py-20 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-white mb-6">Contact Our Dealership</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className={`w-full p-4 rounded-lg bg-neutral-800 text-white border ${
                  errors.name ? "border-red-500" : "border-neutral-700"
                } focus:border-red-500 focus:outline-none transition`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className={`w-full p-4 rounded-lg bg-neutral-800 text-white border ${
                  errors.email ? "border-red-500" : "border-neutral-700"
                } focus:border-red-500 focus:outline-none transition`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className={`w-full p-4 rounded-lg bg-neutral-800 text-white border ${
                  errors.message ? "border-red-500" : "border-neutral-700"
                } focus:border-red-500 focus:outline-none transition`}
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:scale-105 transition"
            >
              Send Message
            </button>
          </form>
          
          <div className="mt-12 space-y-4 text-white">
            <div className="flex items-center gap-3">
              <span className="text-red-500">📞</span>
              <span>+387 61 123 456</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-red-500">✉️</span>
              <span>info@autolux.com</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-red-500">📍</span>
              <span>Sarajevo, Bosnia and Herzegovina</span>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="w-full h-96 bg-neutral-800 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46302.08469805778!2d18.356!3d43.8476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758cbb1ed719bd1%3A0x562ecda6de87b33e!2sSarajevo%2C%20Bosnia%20and%20Herzegovina!5e0!3m2!1sen!2sba!4v1635872400000!5m2!1sen!2sba"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}