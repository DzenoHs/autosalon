import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react'
import mobileApiService from '../services/mobileApiService'

const CarMessage = () => {
  const { carId } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  
  console.log('CarMessage component rendered - carId:', carId, 'loading:', loading, 'car:', car)
  const [formData, setFormData] = useState({
    gender: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  })

  // Fetch car details
  useEffect(() => {
    console.log('CarMessage useEffect - carId:', carId)
    const fetchCar = async () => {
      try {
        console.log('Fetching car details for carId:', carId)
        const carData = await mobileApiService.fetchCarDetails(carId)
        console.log('Car data received:', carData)
        setCar(carData)
      } catch (error) {
        console.error('Error fetching car:', error)
      } finally {
        setLoading(false)
      }
    }

    if (carId) {
      fetchCar()
    } else {
      console.log('No carId provided')
      setLoading(false)
    }
  }, [carId])

  const formatPrice = (price) => {
    if (!price) return 'Preis auf Anfrage'
    return new Intl.NumberFormat('de-DE').format(price)
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!formData.gender) newErrors.gender = 'Anrede ist erforderlich'
    if (!formData.firstName.trim()) newErrors.firstName = 'Vorname ist erforderlich'
    if (!formData.lastName.trim()) newErrors.lastName = 'Nachname ist erforderlich'
    if (!formData.email.trim()) newErrors.email = 'E-Mail ist erforderlich'
    if (!formData.email.includes('@')) newErrors.email = 'Gültige E-Mail ist erforderlich'
    if (!formData.message.trim()) newErrors.message = 'Nachricht ist erforderlich'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    console.log('Form submitted with car data:', car)
    console.log('Car ID from URL:', carId)

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      alert('Bitte füllen Sie alle erforderlichen Felder aus.')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Erstelle formatierte Nachricht für Backend
      const carMessage = `
🚗 NEUE FAHRZEUGANFRAGE

═══════════════════════════════════════

👤 KUNDENDATEN:
• Anrede: ${formData.gender}
• Name: ${formData.firstName} ${formData.lastName}
• E-Mail: ${formData.email}
• Telefon: ${formData.phone || 'Nicht angegeben'}

🚙 INTERESSIERTES FAHRZEUG:
• Fahrzeug-ID: ${carId}

📝 KUNDENANFRAGE:
${formData.message}

═══════════════════════════════════════

📅 Anfrage eingegangen am: ${new Date().toLocaleDateString('de-DE')} um ${new Date().toLocaleTimeString('de-DE')}
🌐 Quelle: autohausmiftari.de Fahrzeuganfrage

Bitte kontaktieren Sie den Kunden schnellstmöglich bezüglich seiner Anfrage.
      `.trim()

      // Pošalji preko backend API-ja
      await mobileApiService.sendContactData({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        message: carMessage
      })

      // Uspešna poruka
      alert('Ihre Anfrage wurde erfolgreich gesendet! Wir melden uns schnellstmöglich bei Ihnen.')
      
      // Reset form
      setFormData({
        gender: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      })
      
    } catch (error) {
      console.error('Error sending car inquiry:', error)
      alert('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'white', textAlign: 'center' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '3px solid #ef4444', 
            borderTop: '3px solid transparent', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px auto'
          }}></div>
          <p style={{ fontSize: '18px' }}>Fahrzeugdaten werden geladen...</p>
        </div>
      </div>
    )
  }

  if (!car) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'white', textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Fahrzeug nicht gefunden</h2>
          <button
            onClick={() => navigate('/cars')}
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Zurück zur Übersicht
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'black', color: 'white' }}>
      {/* Header */}
      <div className="bg-black border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(`/car/${carId}`)}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Zurück zum Fahrzeug
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <div style={{ 
            backgroundColor: '#1f2937', 
            borderRadius: '12px', 
            padding: '32px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h1 style={{ 
                fontSize: '28px', 
                fontWeight: 'bold', 
                color: '#ef4444',
                marginBottom: '8px'
              }}>
                Inzahlungnahme Anfrage
              </h1>
              <p style={{ 
                color: '#9ca3af',
                fontSize: '16px'
              }}>
                Interesse an diesem Fahrzeug? Senden Sie uns Ihre Anfrage
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Persönliche Daten */}
              <div style={{ 
                backgroundColor: '#374151', 
                padding: '20px', 
                borderRadius: '8px',
                border: '1px solid #4b5563'
              }}>
                <h3 style={{ 
                  color: '#ef4444', 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  marginBottom: '16px' 
                }}>
                  Ihre Kontaktdaten
                </h3>
                
                <div style={{ display: 'grid', gap: '16px' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '14px', 
                      fontWeight: '500', 
                      color: '#d1d5db', 
                      marginBottom: '6px' 
                    }}>
                      Anrede *
                    </label>
                    <select
                      required
                      value={formData.gender}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        backgroundColor: '#1f2937',
                        border: '1px solid #4b5563',
                        borderRadius: '6px',
                        color: 'white',
                        fontSize: '16px'
                      }}
                    >
                      <option value="">Bitte wählen</option>
                      <option value="Herr">Herr</option>
                      <option value="Frau">Frau</option>
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontSize: '14px', 
                        fontWeight: '500', 
                        color: '#d1d5db', 
                        marginBottom: '6px' 
                      }}>
                        Vorname *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        placeholder="Ihr Vorname"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          backgroundColor: '#1f2937',
                          border: '1px solid #4b5563',
                          borderRadius: '6px',
                          color: 'white',
                          fontSize: '16px'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontSize: '14px', 
                        fontWeight: '500', 
                        color: '#d1d5db', 
                        marginBottom: '6px' 
                      }}>
                        Nachname *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        placeholder="Ihr Nachname"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          backgroundColor: '#1f2937',
                          border: '1px solid #4b5563',
                          borderRadius: '6px',
                          color: 'white',
                          fontSize: '16px'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontSize: '14px', 
                        fontWeight: '500', 
                        color: '#d1d5db', 
                        marginBottom: '6px' 
                      }}>
                        E-Mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="ihre.email@beispiel.de"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          backgroundColor: '#1f2937',
                          border: '1px solid #4b5563',
                          borderRadius: '6px',
                          color: 'white',
                          fontSize: '16px'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontSize: '14px', 
                        fontWeight: '500', 
                        color: '#d1d5db', 
                        marginBottom: '6px' 
                      }}>
                        Telefon
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+49 123 456789"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          backgroundColor: '#1f2937',
                          border: '1px solid #4b5563',
                          borderRadius: '6px',
                          color: 'white',
                          fontSize: '16px'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>



              {/* Ihre Nachricht */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#d1d5db', 
                  marginBottom: '6px' 
                }}>
                  Ihre Nachricht *
                </label>
                <textarea
                  rows={6}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Beschreiben Sie Ihr Interesse am Fahrzeug. Haben Sie Fragen zu Finanzierung, Inzahlungnahme oder möchten Sie eine Probefahrt vereinbaren?"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: '#1f2937',
                    border: '1px solid #4b5563',
                    borderRadius: '6px',
                    color: 'white',
                    fontSize: '16px',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Info Box */}
              <div style={{ 
                backgroundColor: '#065f46', 
                padding: '16px', 
                borderRadius: '6px',
                border: '1px solid #047857'
              }}>
                <p style={{ fontSize: '14px', color: '#d1fae5', margin: 0 }}>
                  <Mail style={{ display: 'inline', width: '16px', height: '16px', marginRight: '8px' }} />
                  Ihre Anfrage wird direkt an info@autohausmiftari.de gesendet. Unser Team meldet sich schnellstmöglich bei Ihnen.
                </p>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  type="button"
                  onClick={() => navigate(`/car/${carId}`)}
                  style={{
                    flex: 1,
                    padding: '12px 24px',
                    border: '1px solid #6b7280',
                    backgroundColor: 'transparent',
                    color: '#d1d5db',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    flex: 1,
                    padding: '12px 24px',
                    border: 'none',
                    background: isSubmitting ? '#6b7280' : 'linear-gradient(to right, #059669, #047857)',
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                >
                  <Mail size={20} />
                  {isSubmitting ? 'Wird gesendet...' : 'Anfrage senden'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 bg-gray-900 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 text-red-500">Kontakt</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Phone className="text-red-500" size={20} />
              <div>
                <p className="font-medium">Telefon</p>
                <p className="text-gray-300">+49 174 7692697</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-red-500" size={20} />
              <div>
                <p className="font-medium">E-Mail</p>
                <p className="text-gray-300">info@autohausmiftari.de</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-red-500" size={20} />
              <div>
                <p className="font-medium">Adresse</p>
                <p className="text-gray-300">Ihr Autohaus Miftari</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarMessage