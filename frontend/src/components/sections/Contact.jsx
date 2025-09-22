import {useState} from 'react'
import {Phone, Mail, Send, User, MessageSquare} from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
    if (errors[e.target.name]) {
      setErrors({...errors, [e.target.name]: ''})
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name ist erforderlich'
    if (!form.email.trim()) newErrors.email = 'E-Mail ist erforderlich'
    if (!form.email.includes('@')) newErrors.email = 'Gültige E-Mail ist erforderlich'
    if (!form.message.trim()) newErrors.message = 'Nachricht ist erforderlich'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1000))
    alert('Nachricht erfolgreich gesendet!')
    setForm({name: '', email: '', message: ''})
    setIsSubmitting(false)
  }

  return (
    <section
      id="contact"
      className="relative py-26 bg-gradient-to-b from-black via-neutral-900 to-black overflow-hidden"
      style={{overflowX: 'hidden'}}
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-3 h-3 bg-red-500 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-yellow-500 rounded-full opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 tracking-tight leading-none">
            <span className="bg-gradient-to-r from-red-500 via-yellow-500 to-red-600 bg-clip-text text-transparent drop-shadow-2xl">
              KONTAKT
            </span>
          </h2>
          <div className="h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 mx-auto mb-4 rounded-full shadow-lg w-28" />
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto font-medium">
            <span className="text-transparent bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text">
              Ihr Traumauto wartet auf Sie - Kontaktieren Sie uns jetzt!
            </span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 mb-14">
          {/* Contact Form */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 via-yellow-500/10 to-red-500/20 rounded-3xl blur-2xl opacity-30"></div>
              <div className="relative bg-gradient-to-br from-neutral-900 via-black to-neutral-800 p-8 rounded-3xl border-2 border-neutral-700 shadow-2xl backdrop-blur-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div className="group relative">
                    <User
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors duration-200"
                      size={20}
                    />
                    <input
                      type="text"
                      name="name"
                      placeholder="Ihr Name"
                      value={form.name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-4 rounded-xl bg-neutral-800/80 backdrop-blur-sm text-white text-base border-2 ${
                        errors.name ? 'border-red-500' : 'border-neutral-600 focus:border-red-500'
                      } focus:outline-none transition-all duration-300 group-hover:bg-neutral-700/80`}
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-2 font-medium">{errors.name}</p>}
                  </div>

                  {/* Email Input */}
                  <div className="group relative">
                    <Mail
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors duration-200"
                      size={20}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Ihre E-Mail"
                      value={form.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-4 rounded-xl bg-neutral-800/80 backdrop-blur-sm text-white text-base border-2 ${
                        errors.email ? 'border-red-500' : 'border-neutral-600 focus:border-red-500'
                      } focus:outline-none transition-all duration-300 group-hover:bg-neutral-700/80`}
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-2 font-medium">{errors.email}</p>}
                  </div>

                  {/* Message Input */}
                  <div className="group relative">
                    <MessageSquare
                      className="absolute left-4 top-6 text-gray-400 group-focus-within:text-red-500 transition-colors duration-200"
                      size={20}
                    />
                    <textarea
                      name="message"
                      placeholder="Ihre Nachricht"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full pl-10 pr-4 py-4 rounded-xl bg-neutral-800/80 backdrop-blur-sm text-white text-base border-2 ${
                        errors.message ? 'border-red-500' : 'border-neutral-600 focus:border-red-500'
                      } focus:outline-none transition-all duration-300 resize-none group-hover:bg-neutral-700/80`}
                    />
                    {errors.message && <p className="text-red-400 text-sm mt-2 font-medium">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-red-500 via-red-600 to-yellow-500 text-white px-6 py-5 rounded-xl font-black text-lg shadow-2xl hover:shadow-red-500/25 transition-all duration-200 flex items-center justify-center gap-2 group relative overflow-hidden hover:scale-105 active:scale-95"
                  >
                    <Send size={20} className="relative z-10" />
                    <span className="relative z-10">{isSubmitting ? 'SENDEN...' : 'NACHRICHT SENDEN'}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="flex-1 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-blue-500/20 rounded-3xl blur-2xl opacity-30"></div>
            <div className="relative w-full h-[400px] lg:h-[480px] bg-neutral-800 rounded-3xl overflow-hidden border-2 border-neutral-700 shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2474.776436389574!2d9.568464912229766!3d51.30946727187529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bb386bc3336435%3A0x86d894ce7d2736a4!2sNiestetalstra%C3%9Fe%2011%2C%2034266%20Niestetal%2C%20Njema%C4%8Dka!5e0!3m2!1sen!2srs!4v1726320000000!5m2!1sen!2srs"
                width="100%"
                height="100%"
                style={{border: 0}}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Niestetalstraße 11, 34266 Niestetal, Deutschland"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* Contact Info ispod mape */}
            <div className="text-center mt-6 flex flex-col sm:flex-row justify-center gap-6 text-white font-bold tracking-wide text-lg select-none">
              <a
                href="tel:+49 174 7692697"
                className="flex items-center justify-center gap-2 text-red-500 hover:text-red-400 transition-colors"
              >
                <Phone size={24} />
                +49 174 7692697
              </a>
              <a
                href="mailto:info@autohausmiftari.com"
                className="flex items-center justify-center gap-2 text-blue-500 hover:text-blue-400 transition-colors break-all"
              >
                <Mail size={24} />
                info@autohaus-miftari.de
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
