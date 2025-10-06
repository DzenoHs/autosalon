import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, Car, FileText, Camera, Check, AlertCircle } from 'lucide-react'
import mobileApiService from '../services/mobileApiService'

const CarMessage = () => {
  const { carId } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
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
    }
  }, [carId])

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files)
    setFormData(prev => ({
      ...prev,
      [type]: files
    }))
  }

  const removeFile = (index, type) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Kreiranje FormData objekta za file upload
      const formDataToSend = new FormData()
      
      // Osnovni podaci
      formDataToSend.append('name', `${formData.firstName} ${formData.lastName}`)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('message', formData.message)
      formDataToSend.append('gender', formData.gender)
      
      // Podaci o vozilu koje interesuje
      formDataToSend.append('carId', carId)
      formDataToSend.append('carMake', car?.make || '')
      formDataToSend.append('carModel', car?.model || '')
      formDataToSend.append('carPrice', car?.price || '')
      
      // Trade-in podaci
      formDataToSend.append('tradeInBrand', formData.tradeInBrand)
      formDataToSend.append('tradeInModel', formData.tradeInModel)
      formDataToSend.append('tradeInYear', formData.tradeInYear)
      formDataToSend.append('tradeInMileage', formData.tradeInMileage)
      formDataToSend.append('tradeInFuel', formData.tradeInFuel)
      formDataToSend.append('tradeInCondition', formData.tradeInCondition)
      formDataToSend.append('tradeInVIN', formData.tradeInVIN)
      formDataToSend.append('tradeInRegistration', formData.tradeInRegistration)
      
      // Dodavanje slika
      formData.vehicleImages.forEach((file) => {
        formDataToSend.append('vehicleImages', file)
      })
      
      // Dodavanje dokumenata
      formData.vehicleDocuments.forEach((file) => {
        formDataToSend.append('vehicleDocuments', file)
      })
      
      const response = await fetch('http://localhost:5003/api/send-tradein', {
        method: 'POST',
        body: formDataToSend // Ne stavi Content-Type header za FormData
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      alert(`🎉 Erfolgreich gesendet!\n\nIhr Trade-In Antrag wurde an info@autohausmiftari.de gesendet.\n\nWir kontaktieren Sie bald mit einer Bewertung!`)
      
      // Reset form
      setFormData({
        gender: '', firstName: '', lastName: '', email: '', phone: '', message: '',
        tradeInBrand: '', tradeInModel: '', tradeInYear: '', tradeInMileage: '',
        tradeInFuel: '', tradeInCondition: '', tradeInVIN: '', tradeInRegistration: '',
        vehicleImages: [], vehicleDocuments: []
      })
      
    } catch (error) {
      console.error('❌ Greška pri slanju Trade-In zahteva:', error)
      
      let errorMessage = 'Dogodila se greška pri slanju zahteva.'
      
      if (error.response) {
        errorMessage = `Server greška: ${error.response.status}\n${error.response.data?.message || 'Nepoznata greška'}`
      } else if (error.request) {
        errorMessage = 'Nema odgovora od servera. Proverite internet konekciju.'
      } else {
        errorMessage = `Greška: ${error.message}`
      }
      
      alert(`❌ Slanje neuspešno!\n\n${errorMessage}\n\nMolimo pokušajte ponovo ili nas kontaktirajte direktno:\n📧 info@autohausmiftari.de\n📞 +49 174 7692697`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-white">Lade Fahrzeugdaten...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(`/car/${carId}`)}
            className="flex items-center gap-2 text-gray-300 hover:text-red-400 transition-all duration-300 hover:translate-x-[-4px]"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Zurück zum Fahrzeug</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-full px-6 py-3 mb-6">
            <Car className="text-red-400" size={24} />
            <span className="text-red-400 font-semibold">Trade-In Service</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Fahrzeug <span className="text-red-500">Inzahlungnahme</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Lassen Sie Ihr Fahrzeug kostenlos bewerten und nutzen Sie den Wert für Ihren neuen Traumwagen
          </p>
        </div>

        {/* Interessiertes Fahrzeug */}
        {car && (
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <Check className="text-green-400" size={20} />
              </div>
              <h3 className="text-xl font-bold text-green-400">Interessiertes Fahrzeug</h3>
            </div>
            <div className="text-white">
              <p className="text-2xl font-bold">{car.make} {car.model}</p>
              <p className="text-green-300 text-lg">
                {car.price ? new Intl.NumberFormat('de-DE').format(car.price) + ' €' : 'Preis auf Anfrage'}
              </p>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Kontaktdaten */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                  <span className="text-red-400 text-lg">👤</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Ihre Kontaktdaten</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Anrede *</label>
                  <select
                    required
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  >
                    <option value="">Wählen Sie</option>
                    <option value="Herr">Herr</option>
                    <option value="Frau">Frau</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Vorname *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Ihr Vorname"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nachname *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Ihr Nachname"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">E-Mail *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="ihre.email@beispiel.de"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Telefon</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="+49 123 456789"
                  />
                </div>
              </div>
            </div>

            {/* Trade-In Fahrzeug */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Car className="text-blue-400" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-white">Ihr Trade-In Fahrzeug</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Marke *</label>
                  <input
                    type="text"
                    required
                    value={formData.tradeInBrand}
                    onChange={(e) => setFormData({...formData, tradeInBrand: e.target.value})}
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="z.B. BMW, Mercedes, Audi"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Modell *</label>
                  <input
                    type="text"
                    required
                    value={formData.tradeInModel}
                    onChange={(e) => setFormData({...formData, tradeInModel: e.target.value})}
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="z.B. 320d, C-Klasse, A4"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Baujahr *</label>
                  <input
                    type="number"
                    required
                    value={formData.tradeInYear}
                    onChange={(e) => setFormData({...formData, tradeInYear: e.target.value})}
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="2020"
                    min="1990"
                    max="2025"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Kilometerstand *</label>
                  <input
                    type="number"
                    required
                    value={formData.tradeInMileage}
                    onChange={(e) => setFormData({...formData, tradeInMileage: e.target.value})}
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="150000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Kraftstoff *</label>
                  <select
                    required
                    value={formData.tradeInFuel}
                    onChange={(e) => setFormData({...formData, tradeInFuel: e.target.value})}
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  >
                    <option value="">Kraftstoff wählen</option>
                    <option value="Benzin">Benzin</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Elektro">Elektro</option>
                    <option value="LPG">LPG</option>
                    <option value="CNG">CNG</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Zustand *</label>
                  <select
                    required
                    value={formData.tradeInCondition}
                    onChange={(e) => setFormData({...formData, tradeInCondition: e.target.value})}
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  >
                    <option value="">Zustand wählen</option>
                    <option value="Sehr gut">Sehr gut</option>
                    <option value="Gut">Gut</option>
                    <option value="Befriedigend">Befriedigend</option>
                    <option value="Reparaturbedürftig">Reparaturbedürftig</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">FIN/VIN</label>
                  <input
                    type="text"
                    value={formData.tradeInVIN}
                    onChange={(e) => setFormData({...formData, tradeInVIN: e.target.value})}
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Fahrzeugidentifikationsnummer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Erstzulassung</label>
                  <input
                    type="month"
                    value={formData.tradeInRegistration}
                    onChange={(e) => setFormData({...formData, tradeInRegistration: e.target.value})}
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* File Uploads */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Upload className="text-purple-400" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-white">Fahrzeugdokumente</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Vehicle Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    <Camera className="inline mr-2" size={16} />
                    Fahrzeugbilder
                  </label>
                  <div className="border-2 border-dashed border-gray-600 hover:border-red-500 transition-colors rounded-xl p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'vehicleImages')}
                      className="hidden"
                      id="vehicle-images"
                    />
                    <label htmlFor="vehicle-images" className="cursor-pointer">
                      <Camera className="mx-auto mb-3 text-gray-400" size={48} />
                      <p className="text-gray-300">Bilder hochladen</p>
                      <p className="text-sm text-gray-500 mt-1">JPG, PNG bis 10MB</p>
                    </label>
                  </div>
                  {formData.vehicleImages.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {formData.vehicleImages.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-800 p-2 rounded">
                          <span className="text-sm text-gray-300 truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index, 'vehicleImages')}
                            className="text-red-400 hover:text-red-300 ml-2"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Vehicle Documents */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    <FileText className="inline mr-2" size={16} />
                    Fahrzeugdokumente
                  </label>
                  <div className="border-2 border-dashed border-gray-600 hover:border-red-500 transition-colors rounded-xl p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,image/*"
                      onChange={(e) => handleFileChange(e, 'vehicleDocuments')}
                      className="hidden"
                      id="vehicle-documents"
                    />
                    <label htmlFor="vehicle-documents" className="cursor-pointer">
                      <FileText className="mx-auto mb-3 text-gray-400" size={48} />
                      <p className="text-gray-300">Dokumente hochladen</p>
                      <p className="text-sm text-gray-500 mt-1">PDF, DOC, Bilder bis 10MB</p>
                    </label>
                  </div>
                  {formData.vehicleDocuments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {formData.vehicleDocuments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-800 p-2 rounded">
                          <span className="text-sm text-gray-300 truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index, 'vehicleDocuments')}
                            className="text-red-400 hover:text-red-300 ml-2"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Zusätzliche Nachricht</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={4}
                className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                placeholder="Teilen Sie uns zusätzliche Informationen über Ihr Fahrzeug mit..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-red-500/25"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Wird gesendet...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <Upload size={20} />
                    <span>Trade-In Anfrage senden</span>
                  </div>
                )}
              </button>
            </div>

            {/* Info Note */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-blue-400 mt-0.5" size={20} />
                <div className="text-sm text-blue-300">
                  <p className="font-medium mb-1">Datenschutz & Sicherheit</p>
                  <p>Ihre Daten werden vertraulich behandelt und nur für die Fahrzeugbewertung verwendet. Die Bewertung ist kostenlos und unverbindlich.</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CarMessage