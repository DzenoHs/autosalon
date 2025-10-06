import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, MapPin, Upload, Car, Camera } from 'lucide-react'
import mobileApiService from '../services/mobileApiService'

const CarMessage = () => {
  const { carId } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const [formData, setFormData] = useState({
    // Kontakt podaci
    gender: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    
    // Trade-In vozilo podaci
    tradeInBrand: '',
    tradeInModel: '',
    tradeInYear: '',
    tradeInMileage: '',
    tradeInFuel: '',
    tradeInCondition: '',
    tradeInVIN: '',
    tradeInRegistration: '',
    
    // Fajlovi
    vehicleImages: [],
    vehicleDocuments: []
  })

  // Fetch car details
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carData = await mobileApiService.fetchCarDetails(carId)
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
      setLoading(false)
    }
  }, [carId])

  const [isSubmitting, setIsSubmitting] = useState(false)

  // File upload handlers
  const handleFileUpload = (type, files) => {
    const fileArray = Array.from(files)
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], ...fileArray]
    }))
  }

  const removeFile = (type, index) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    // Osnovni podaci
    if (!formData.gender) newErrors.gender = 'Anrede ist erforderlich'
    if (!formData.firstName.trim()) newErrors.firstName = 'Vorname ist erforderlich'
    if (!formData.lastName.trim()) newErrors.lastName = 'Nachname ist erforderlich'
    if (!formData.email.trim()) newErrors.email = 'E-Mail ist erforderlich'
    
    // Trade-In podaci
    if (!formData.tradeInBrand.trim()) newErrors.tradeInBrand = 'Marke Ihres Fahrzeugs ist erforderlich'
    if (!formData.tradeInModel.trim()) newErrors.tradeInModel = 'Modell ist erforderlich'
    if (!formData.tradeInYear) newErrors.tradeInYear = 'Baujahr ist erforderlich'
    if (!formData.tradeInMileage) newErrors.tradeInMileage = 'Kilometerstand ist erforderlich'
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      alert('Bitte füllen Sie alle erforderlichen Felder aus.')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Formatierte Trade-In Nachricht
      const tradeInMessage = `
🔄 NEUE INZAHLUNGNAHME ANFRAGE

═══════════════════════════════════════

👤 KUNDENDATEN:
• Anrede: ${formData.gender}
• Name: ${formData.firstName} ${formData.lastName}
• E-Mail: ${formData.email}
• Telefon: ${formData.phone || 'Nicht angegeben'}

🚙 INTERESSIERTES FAHRZEUG:
• Fahrzeug-ID: ${carId}
• Link: https://home.mobile.de/GM-TOP-CARS#des_${carId}
• ${car?.make} ${car?.model}
• Preis: ${car?.price ? new Intl.NumberFormat('de-DE').format(car.price) + ' €' : 'Auf Anfrage'}

🚗 TRADE-IN FAHRZEUG:
• Marke: ${formData.tradeInBrand}
• Modell: ${formData.tradeInModel}
• Baujahr: ${formData.tradeInYear}
• Kilometerstand: ${formData.tradeInMileage} km
• Kraftstoff: ${formData.tradeInFuel}
• Zustand: ${formData.tradeInCondition}
• FIN/VIN: ${formData.tradeInVIN || 'Nicht angegeben'}
• Erstzulassung: ${formData.tradeInRegistration || 'Nicht angegeben'}

📁 DOKUMENTE:
• Fahrzeugbilder: ${formData.vehicleImages.length} Datei(en)
• Fahrzeugdokumente: ${formData.vehicleDocuments.length} Datei(en)

📝 ZUSÄTZLICHE NACHRICHT:
${formData.message || 'Keine zusätzliche Nachricht'}

═══════════════════════════════════════

📅 Anfrage eingegangen am: ${new Date().toLocaleDateString('de-DE')} um ${new Date().toLocaleTimeString('de-DE')}
🌐 Quelle: autohausmiftari.de Trade-In Anfrage

BEWERTUNG ERFORDERLICH: Bitte bewerten Sie das Trade-In Fahrzeug und kontaktieren Sie den Kunden mit einem Angebot.
      `.trim()

      // Debug informacije
      console.log('📤 Slanje Trade-In zahteva:', {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        carId: carId,
        imagesCount: formData.vehicleImages.length,
        documentsCount: formData.vehicleDocuments.length
      })

      // Kreiraj FormData za slanje sa fajlovima
      const formDataToSend = new FormData()
      formDataToSend.append('name', `${formData.firstName} ${formData.lastName}`)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('message', tradeInMessage)
      formDataToSend.append('carId', carId)
      
      // Dodaj slike kao attachments
      formData.vehicleImages.forEach((file, index) => {
        formDataToSend.append('attachments', file, `fahrzeugbild_${index + 1}_${file.name}`)
      })
      
      // Dodaj dokumente kao attachments
      formData.vehicleDocuments.forEach((file, index) => {
        formDataToSend.append('attachments', file, `fahrzeugdokument_${index + 1}_${file.name}`)
      })

      // Pošalji preko novog CarMessage API-ja
      const result = await mobileApiService.sendCarMessageData(formDataToSend)
      
      console.log('✅ Trade-In zahtev uspešno poslat:', result)

      // Lep success message
      alert(`🎉 Uspešno poslato!\n\nVaš Trade-In zahtev je uspešno poslat na info@autohausmiftari.de\n\nPoslatih slika: ${formData.vehicleImages.length}\nPoslatih dokumenata: ${formData.vehicleDocuments.length}\n\nKontaktiraćemo vas uskoro sa procenom vrednosti vašeg vozila!`)
      
      // Reset form
      setFormData({
        gender: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        tradeInBrand: '',
        tradeInModel: '',
        tradeInYear: '',
        tradeInMileage: '',
        tradeInFuel: '',
        tradeInCondition: '',
        tradeInVIN: '',
        tradeInRegistration: '',
        vehicleImages: [],
        vehicleDocuments: []
      })
      
    } catch (error) {
      console.error('❌ Greška pri slanju Trade-In zahteva:', error)
      
      // Detaljnija error poruka
      let errorMessage = 'Dogodila se greška pri slanju zahteva.'
      
      if (error.response) {
        // Server je odgovorio sa error statusom
        errorMessage = `Server greška: ${error.response.status}\n${error.response.data?.message || 'Nepoznata greška'}`
      } else if (error.request) {
        // Zahtev je poslat ali nema odgovora
        errorMessage = 'Nema odgovora od servera. Proverite internet konekciju.'
      } else {
        // Nešto drugo
        errorMessage = `Greška: ${error.message}`
      }
      
      alert(`❌ Slanje neuspešno!\n\n${errorMessage}\n\nMolimo pokušajte ponovo ili nas kontaktirajte direktno:\n📧 info@autohausmiftari.de\n📞 +49 174 7692697`)
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
          {/* Trade-In Form */}
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
                🔄 Fahrzeug Inzahlungnahme
              </h1>
              <p style={{ 
                color: '#9ca3af',
                fontSize: '16px'
              }}>
                Lassen Sie Ihr Fahrzeug kostenlos bewerten für eine mögliche Inzahlungnahme
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Interessiertes Fahrzeug Info */}
              {car && (
                <div style={{ 
                  backgroundColor: '#065f46', 
                  padding: '20px', 
                  borderRadius: '8px',
                  border: '1px solid #047857'
                }}>
                  <h3 style={{ 
                    color: '#d1fae5', 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    marginBottom: '8px' 
                  }}>
                    🎯 Interessiertes Fahrzeug
                  </h3>
                  <p style={{ color: '#d1fae5', fontSize: '14px', margin: 0 }}>
                    {car.make} {car.model} • {car.price ? new Intl.NumberFormat('de-DE').format(car.price) + ' €' : 'Preis auf Anfrage'}
                  </p>
                </div>
              )}

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
                  👤 Ihre Kontaktdaten
                </h3>
                
                <div style={{ display: 'grid', gap: '16px' }}>
                  {/* Gender */}
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

                  {/* Name fields */}
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

                  {/* Contact fields */}
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

              {/* Trade-In Fahrzeug Daten */}
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
                  🚗 Ihr Fahrzeug (Trade-In)
                </h3>
                
                <div style={{ display: 'grid', gap: '16px' }}>
                  {/* Brand & Model */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontSize: '14px', 
                        fontWeight: '500', 
                        color: '#d1d5db', 
                        marginBottom: '6px' 
                      }}>
                        Marke *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.tradeInBrand}
                        onChange={(e) => setFormData({...formData, tradeInBrand: e.target.value})}
                        placeholder="z.B. BMW, Mercedes, Audi"
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
                        Modell *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.tradeInModel}
                        onChange={(e) => setFormData({...formData, tradeInModel: e.target.value})}
                        placeholder="z.B. 320d, C-Klasse, A4"
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

                  {/* Year & Mileage */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontSize: '14px', 
                        fontWeight: '500', 
                        color: '#d1d5db', 
                        marginBottom: '6px' 
                      }}>
                        Baujahr *
                      </label>
                      <input
                        type="number"
                        required
                        min="1990"
                        max={new Date().getFullYear()}
                        value={formData.tradeInYear}
                        onChange={(e) => setFormData({...formData, tradeInYear: e.target.value})}
                        placeholder="2020"
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
                        Kilometerstand *
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.tradeInMileage}
                        onChange={(e) => setFormData({...formData, tradeInMileage: e.target.value})}
                        placeholder="85000"
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

                  {/* Fuel & Condition */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontSize: '14px', 
                        fontWeight: '500', 
                        color: '#d1d5db', 
                        marginBottom: '6px' 
                      }}>
                        Kraftstoff
                      </label>
                      <select
                        value={formData.tradeInFuel}
                        onChange={(e) => setFormData({...formData, tradeInFuel: e.target.value})}
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
                        <option value="Benzin">Benzin</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Elektro">Elektro</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="LPG">LPG</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontSize: '14px', 
                        fontWeight: '500', 
                        color: '#d1d5db', 
                        marginBottom: '6px' 
                      }}>
                        Fahrzeugzustand
                      </label>
                      <select
                        value={formData.tradeInCondition}
                        onChange={(e) => setFormData({...formData, tradeInCondition: e.target.value})}
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
                        <option value="Neuwertig">Neuwertig</option>
                        <option value="Sehr gut">Sehr gut</option>
                        <option value="Gut">Gut</option>
                        <option value="Befriedigend">Befriedigend</option>
                        <option value="Ausreichend">Ausreichend</option>
                      </select>
                    </div>
                  </div>

                  {/* VIN & Registration */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontSize: '14px', 
                        fontWeight: '500', 
                        color: '#d1d5db', 
                        marginBottom: '6px' 
                      }}>
                        FIN/VIN (optional)
                      </label>
                      <input
                        type="text"
                        value={formData.tradeInVIN}
                        onChange={(e) => setFormData({...formData, tradeInVIN: e.target.value})}
                        placeholder="Fahrzeug-Identifikationsnummer"
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
                        Erstzulassung (optional)
                      </label>
                      <input
                        type="month"
                        value={formData.tradeInRegistration}
                        onChange={(e) => setFormData({...formData, tradeInRegistration: e.target.value})}
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

              {/* File Uploads */}
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
                  📁 Fahrzeugbilder & Dokumente
                </h3>
                
                <div style={{ display: 'grid', gap: '20px' }}>
                  {/* Vehicle Images */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '14px', 
                      fontWeight: '500', 
                      color: '#d1d5db', 
                      marginBottom: '8px' 
                    }}>
                      📸 Fahrzeugbilder (empfohlen)
                    </label>
                    
                    <div style={{
                      border: '2px dashed #4b5563',
                      borderRadius: '8px',
                      padding: '20px',
                      textAlign: 'center',
                      backgroundColor: '#1f2937'
                    }}>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleFileUpload('vehicleImages', e.target.files)}
                        style={{ display: 'none' }}
                        id="vehicleImages"
                      />
                      <label htmlFor="vehicleImages" style={{ cursor: 'pointer' }}>
                        <Camera size={48} style={{ color: '#6b7280', margin: '0 auto 12px' }} />
                        <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>
                          Klicken Sie hier oder ziehen Sie Bilder hierher
                        </p>
                        <p style={{ color: '#6b7280', fontSize: '12px', marginTop: '8px', margin: 0 }}>
                          Außenansicht, Innenraum, Motor, Schäden (falls vorhanden)
                        </p>
                      </label>
                    </div>

                    {/* Preview uploaded images */}
                    {formData.vehicleImages.length > 0 && (
                      <div style={{ marginTop: '12px' }}>
                        <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>
                          {formData.vehicleImages.length} Bild(er) ausgewählt:
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {formData.vehicleImages.map((file, index) => (
                            <div key={index} style={{
                              backgroundColor: '#1f2937',
                              padding: '8px 12px',
                              borderRadius: '4px',
                              fontSize: '12px',
                              color: '#d1d5db',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              {file.name}
                              <button
                                type="button"
                                onClick={() => removeFile('vehicleImages', index)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#ef4444',
                                  cursor: 'pointer',
                                  fontSize: '14px'
                                }}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Vehicle Documents */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '14px', 
                      fontWeight: '500', 
                      color: '#d1d5db', 
                      marginBottom: '8px' 
                    }}>
                      📄 Fahrzeugdokumente (optional)
                    </label>
                    
                    <div style={{
                      border: '2px dashed #4b5563',
                      borderRadius: '8px',
                      padding: '20px',
                      textAlign: 'center',
                      backgroundColor: '#1f2937'
                    }}>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload('vehicleDocuments', e.target.files)}
                        style={{ display: 'none' }}
                        id="vehicleDocuments"
                      />
                      <label htmlFor="vehicleDocuments" style={{ cursor: 'pointer' }}>
                        <Upload size={48} style={{ color: '#6b7280', margin: '0 auto 12px' }} />
                        <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>
                          Fahrzeugschein, Serviceheft, TÜV-Bericht
                        </p>
                        <p style={{ color: '#6b7280', fontSize: '12px', marginTop: '8px', margin: 0 }}>
                          PDF, JPG, PNG bis 10MB
                        </p>
                      </label>
                    </div>

                    {/* Preview uploaded documents */}
                    {formData.vehicleDocuments.length > 0 && (
                      <div style={{ marginTop: '12px' }}>
                        <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>
                          {formData.vehicleDocuments.length} Dokument(e) ausgewählt:
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {formData.vehicleDocuments.map((file, index) => (
                            <div key={index} style={{
                              backgroundColor: '#1f2937',
                              padding: '8px 12px',
                              borderRadius: '4px',
                              fontSize: '12px',
                              color: '#d1d5db',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              {file.name}
                              <button
                                type="button"
                                onClick={() => removeFile('vehicleDocuments', index)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#ef4444',
                                  cursor: 'pointer',
                                  fontSize: '14px'
                                }}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Message */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#d1d5db', 
                  marginBottom: '6px' 
                }}>
                  💬 Zusätzliche Nachricht (optional)
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Besondere Ausstattung, Schäden, gewünschter Ablauf der Inzahlungnahme..."
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
                  ℹ️ **Kostenlose Bewertung:** Wir bewerten Ihr Fahrzeug kostenlos und unverbindlich. Sie erhalten innerhalb von 24 Stunden eine faire Einschätzung des Marktwertes und ein konkretes Angebot für die Inzahlungnahme.
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
                  <Car size={20} />
                  {isSubmitting ? 'Wird gesendet...' : 'Bewertung anfordern'}
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
                <a href="tel:+491747692697" className="text-gray-300 hover:text-white">+49 174 7692697</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-red-500" size={20} />
              <div>
                <p className="font-medium">E-Mail</p>
                <a href="mailto:info@autohausmiftari.de" className="text-gray-300 hover:text-white">info@autohausmiftari.de</a>
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
