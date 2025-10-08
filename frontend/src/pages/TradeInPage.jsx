import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  User, 
  Car, 
  Upload, 
  ChevronRight, 
  ChevronLeft, 
  Mail, 
  Phone, 
  Calendar, 
  Fuel, 
  Gauge, 
  Hash,
  FileText,
  Image,
  CheckCircle,
  AlertCircle,
  X,
  ArrowLeft,
  Euro,
  Zap,
  Award,
  Shield
} from 'lucide-react';
import mobileApiService from '../services/mobileApiService';

const TradeInPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  
  // Form states
  const [personalData, setPersonalData] = useState({
    gender: 'Herr',
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [vehicleData, setVehicleData] = useState({
    tradeInBrand: '',
    tradeInModel: '',
    tradeInYear: '',
    tradeInMileage: '',
    tradeInFuel: 'Benzin',
    tradeInCondition: 'Gut',
    tradeInVIN: '',
    tradeInRegistration: ''
  });
  
  const [files, setFiles] = useState({
    vehicleImages: [],
    vehicleDocuments: []
  });

  const fileInputRefs = {
    vehicleImages: useRef(null),
    vehicleDocuments: useRef(null)
  };

  // Fetch car details
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        const result = await mobileApiService.fetchCarDetails(id);
        console.log('Car data received:', result);
        
        if (result && result.success && result.car) {
          console.log('Parsed car data:', result.car);
          setCar(result.car);
        } else {
          throw new Error('Fahrzeug nicht gefunden');
        }
      } catch (error) {
        console.error('Fehler beim Laden der Fahrzeugdetails:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCarDetails();
    }
  }, [id]);

  const steps = [
    { 
      number: 1, 
      title: 'Kontakt', 
      icon: User, 
      description: 'Ihre Daten'
    },
    { 
      number: 2, 
      title: 'Fahrzeug', 
      icon: Car, 
      description: 'Ihr Auto'
    },
    { 
      number: 3, 
      title: 'Dokumente', 
      icon: Upload, 
      description: 'Optional'
    }
  ];

  const handleFileChange = (type, event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(prev => ({
      ...prev,
      [type]: [...prev[type], ...selectedFiles]
    }));
  };

  const removeFile = (type, index) => {
    setFiles(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const triggerFileInput = (type) => {
    fileInputRefs[type].current?.click();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    setShowPopup(true); // Prikaži popup odmah kad se klikne

    try {
      // Kreirati FormData za file upload
      const formData = new FormData();
      
      // Dodati osnovne podatke
      formData.append('name', personalData.name);
      formData.append('email', personalData.email);
      formData.append('phone', personalData.phone);
      formData.append('message', personalData.message);
      formData.append('gender', personalData.gender);
      
      // Dodati podatke o vozilu koje se kupuje
      formData.append('carId', id);
      formData.append('carMake', car?.make || '');
      formData.append('carModel', car?.modelDescription?.replace(/&amp;/g, '&').replace(/&quot;/g, '"') || car?.model || '');
      formData.append('carPrice', car?.price?.consumerPriceGross || car?.price?.value || car?.price || '');
      
      // Dodati podatke o trade-in vozilu
      formData.append('tradeInBrand', vehicleData.tradeInBrand);
      formData.append('tradeInModel', vehicleData.tradeInModel);
      formData.append('tradeInYear', vehicleData.tradeInYear);
      formData.append('tradeInMileage', vehicleData.tradeInMileage);
      formData.append('tradeInFuel', vehicleData.tradeInFuel);
      formData.append('tradeInCondition', vehicleData.tradeInCondition);
      formData.append('tradeInVIN', vehicleData.tradeInVIN);
      formData.append('tradeInRegistration', vehicleData.tradeInRegistration);
      
      // Dodati fajlove
      files.vehicleImages.forEach((file) => {
        formData.append('vehicleImages', file);
      });
      
      files.vehicleDocuments.forEach((file) => {
        formData.append('vehicleDocuments', file);
      });

      // Poslati API zahtev  
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5003';
      const response = await fetch(`${apiUrl}/api/send-tradein`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Trade-in email sent successfully:', result);
        setSubmitStatus('success');
        
        // Reset forma nakon uspešnog slanja
        setTimeout(() => {
          navigate(`/car/${id}`);
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error('❌ Error sending trade-in email:', errorData);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return personalData.name && personalData.email && personalData.phone;
      case 2:
        return vehicleData.tradeInBrand && 
               vehicleData.tradeInModel && 
               vehicleData.tradeInYear && 
               vehicleData.tradeInMileage &&
               vehicleData.tradeInFuel;
      case 3:
        return true; // Files are optional
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < 3 && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepProgress = () => {
    return (currentStep / 3) * 100;
  };

  const formatPrice = (priceObj) => {
    if (!priceObj) return 'Preis auf Anfrage';
    const price = priceObj.consumerPriceGross || priceObj.value || priceObj;
    return `${Number(price).toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2})} €`;
  };

  const formatMileage = (mileage) => {
    if (!mileage) return 'N/A';
    return `${mileage.toLocaleString('de-DE')} km`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white text-xl font-medium">Lade Fahrzeugdaten...</p>
          <div className="mt-2 text-red-400 text-sm">Bitte warten...</div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-black flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h2 className="text-white text-3xl font-bold mb-4">Fahrzeug nicht gefunden</h2>
          <p className="text-neutral-400 mb-6">Das gesuchte Fahrzeug konnte nicht geladen werden.</p>
          <button
            onClick={() => navigate('/cars')}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-colors duration-200 font-medium"
          >
            Zurück zur Übersicht
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-black">
      
      {/* Header */}
      <div className="bg-neutral-900 border-b border-red-600/30 sticky top-0 z-50">
        <div className="container mx-auto px-8 py-4">
          <button
            onClick={() => navigate(`/car/${id}`)}
            className="flex items-center gap-2 text-neutral-400 hover:text-red-500 transition-colors duration-200"
          >
            <ArrowLeft size={16} />
            <span className="text-sm font-medium">Zurück zum Fahrzeug</span>
          </button>
        </div>
      </div>

      {/* Main Content - Pixel Perfect Two Column Layout */}
      <div className="container mx-auto px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-8">
            
            {/* Left Column - 70% - Form Content */}
            <div className="col-span-12 lg:col-span-8">
              
              {/* Title Section */}
              <div className="mb-10">
                <h1 className="text-4xl font-bold text-white flex items-center gap-3 mb-3">
                  <span className="text-4xl">🔄</span>
                  <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                    Inzahlungnahme
                  </span>
                </h1>
                <p className="text-lg text-neutral-400 leading-relaxed">
                  Tauschen Sie Ihr Fahrzeug gegen unser Angebot ein
                </p>
              </div>

              {/* Progress Bar - Pixel Perfect */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div className={`
                          w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg border-2 mb-3
                          ${currentStep >= step.number 
                            ? 'bg-gradient-to-br from-red-500 to-red-700 text-white border-red-500' 
                            : 'bg-neutral-800 text-neutral-400 border-neutral-600'
                          }
                          ${currentStep === step.number ? 'ring-4 ring-red-500/40 scale-110' : ''}
                          transition-all duration-300
                        `}>
                          {currentStep > step.number ? (
                            <CheckCircle className="w-7 h-7" />
                          ) : (
                            step.number
                          )}
                        </div>
                        
                        <div className="text-center">
                          <div className={`text-sm font-bold mb-1 ${currentStep >= step.number ? 'text-white' : 'text-neutral-400'}`}>
                            {step.title}
                          </div>
                          <div className="text-xs text-neutral-500">{step.description}</div>
                        </div>
                      </div>
                      
                      {index < steps.length - 1 && (
                        <div className={`
                          h-px flex-1 mx-6 mt-[-60px]
                          ${currentStep > step.number ? 'bg-gradient-to-r from-red-600 to-red-700' : 'bg-neutral-700'}
                          transition-colors duration-300
                        `} />
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Progress Line */}
                <div className="w-full bg-neutral-800 rounded-full h-2 mb-4">
                  <div 
                    className="bg-gradient-to-r from-red-600 to-red-700 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getStepProgress()}%` }}
                  />
                </div>
                <div className="text-center text-sm text-neutral-400 font-medium">
                  Schritt {currentStep} von {steps.length} • {Math.round(getStepProgress())}% abgeschlossen
                </div>
              </div>

              {/* Form Content - Pixel Perfect */}
              <div className="bg-neutral-900 rounded-2xl p-8 border border-red-600/20 shadow-2xl">
                
                {/* Step 1: Personal Data */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-3">
                        <User className="w-7 h-7 text-red-500" />
                        Ihre Kontaktdaten
                      </h3>
                      <p className="text-neutral-400">Damit wir Sie erreichen können</p>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-neutral-300 mb-3">
                            Anrede *
                          </label>
                          <select
                            value={personalData.gender}
                            onChange={(e) => setPersonalData(prev => ({ ...prev, gender: e.target.value }))}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition-colors duration-200 font-medium"
                          >
                            <option value="Herr">Herr</option>
                            <option value="Frau">Frau</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-neutral-300 mb-3">
                            Name *
                          </label>
                          <input
                            type="text"
                            value={personalData.name}
                            onChange={(e) => setPersonalData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition-colors duration-200 font-medium"
                            placeholder="Ihr vollständiger Name"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-neutral-300 mb-3">
                            E-Mail *
                          </label>
                          <input
                            type="email"
                            value={personalData.email}
                            onChange={(e) => setPersonalData(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition-colors duration-200 font-medium"
                            placeholder="ihre.email@beispiel.de"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-neutral-300 mb-3">
                            Telefon *
                          </label>
                          <input
                            type="tel"
                            value={personalData.phone}
                            onChange={(e) => setPersonalData(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition-colors duration-200 font-medium"
                            placeholder="+49 123 456789"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-neutral-300 mb-3">
                          Nachricht (optional)
                        </label>
                        <textarea
                          value={personalData.message}
                          onChange={(e) => setPersonalData(prev => ({ ...prev, message: e.target.value }))}
                          className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition-colors duration-200 font-medium"
                          rows="4"
                          placeholder="Zusätzliche Informationen oder Fragen..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Vehicle Data */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-3">
                        <Car className="w-7 h-7 text-red-500" />
                        Ihr Fahrzeug
                      </h3>
                      <p className="text-neutral-400">Angaben zu Ihrem Tauschfahrzeug</p>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-neutral-300 mb-3">
                            Marke *
                          </label>
                          <input
                            type="text"
                            value={vehicleData.tradeInBrand}
                            onChange={(e) => setVehicleData(prev => ({ ...prev, tradeInBrand: e.target.value }))}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition-colors duration-200 font-medium"
                            placeholder="z.B. BMW, Mercedes, Audi"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-neutral-300 mb-3">
                            Modell *
                          </label>
                          <input
                            type="text"
                            value={vehicleData.tradeInModel}
                            onChange={(e) => setVehicleData(prev => ({ ...prev, tradeInModel: e.target.value }))}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition-colors duration-200 font-medium"
                            placeholder="z.B. A4, C-Klasse, 3er"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-neutral-300 mb-3">
                            Baujahr *
                          </label>
                          <input
                            type="number"
                            value={vehicleData.tradeInYear}
                            onChange={(e) => setVehicleData(prev => ({ ...prev, tradeInYear: e.target.value }))}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition-colors duration-200 font-medium"
                            placeholder="2020"
                            min="1950"
                            max="2025"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-neutral-300 mb-3">
                            Kilometer *
                          </label>
                          <input
                            type="number"
                            value={vehicleData.tradeInMileage}
                            onChange={(e) => setVehicleData(prev => ({ ...prev, tradeInMileage: e.target.value }))}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition-colors duration-200 font-medium"
                            placeholder="50000"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-neutral-300 mb-3">
                            Kraftstoff *
                          </label>
                          <select
                            value={vehicleData.tradeInFuel}
                            onChange={(e) => setVehicleData(prev => ({ ...prev, tradeInFuel: e.target.value }))}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition-colors duration-200 font-medium"
                          >
                            <option value="Benzin">Benzin</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Elektro">Elektro</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Gas">Gas (LPG/CNG)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-neutral-300 mb-3">
                            Zustand
                          </label>
                          <select
                            value={vehicleData.tradeInCondition}
                            onChange={(e) => setVehicleData(prev => ({ ...prev, tradeInCondition: e.target.value }))}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition-colors duration-200 font-medium"
                          >
                            <option value="Sehr gut">Sehr gut</option>
                            <option value="Gut">Gut</option>
                            <option value="Befriedigend">Befriedigend</option>
                            <option value="Reparaturbedürftig">Reparaturbedürftig</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-neutral-300 mb-3">
                            Erstzulassung
                          </label>
                          <input
                            type="text"
                            value={vehicleData.tradeInRegistration}
                            onChange={(e) => setVehicleData(prev => ({ ...prev, tradeInRegistration: e.target.value }))}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition-colors duration-200 font-medium"
                            placeholder="03/2020"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-neutral-300 mb-3">
                          Fahrgestellnummer (VIN) - optional
                        </label>
                        <input
                          type="text"
                          value={vehicleData.tradeInVIN}
                          onChange={(e) => setVehicleData(prev => ({ ...prev, tradeInVIN: e.target.value }))}
                          className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition-colors duration-200 font-medium"
                          placeholder="WBAVA31070L..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Files */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-3">
                        <Upload className="w-7 h-7 text-red-500" />
                        Dokumente & Bilder
                      </h3>
                      <p className="text-neutral-400">Helfen Sie uns bei der Bewertung (optional)</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Vehicle Images */}
                      <div>
                        <label className="block text-sm font-semibold text-neutral-300 mb-4">
                          Fahrzeugbilder
                        </label>
                        <div 
                          onClick={() => triggerFileInput('vehicleImages')}
                          className="border-2 border-dashed border-neutral-600 rounded-xl p-8 text-center cursor-pointer hover:border-red-500 transition-colors duration-200 bg-neutral-800/30 hover:bg-neutral-800/50"
                        >
                          <Image className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
                          <p className="text-neutral-300 font-semibold mb-1">Bilder auswählen</p>
                          <p className="text-xs text-neutral-500">JPEG, PNG (max. 10 MB)</p>
                        </div>
                        <input
                          ref={fileInputRefs.vehicleImages}
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleFileChange('vehicleImages', e)}
                          className="hidden"
                        />
                        
                        {files.vehicleImages.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {files.vehicleImages.map((file, index) => (
                              <div key={index} className="flex items-center justify-between bg-neutral-800 p-3 rounded-lg">
                                <span className="text-sm text-neutral-300 flex items-center gap-2 font-medium">
                                  <Image className="w-4 h-4 text-red-500" />
                                  {file.name}
                                </span>
                                <button
                                  onClick={() => removeFile('vehicleImages', index)}
                                  className="text-red-500 hover:text-red-400 hover:bg-red-500/10 p-1 rounded transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Vehicle Documents */}
                      <div>
                        <label className="block text-sm font-semibold text-neutral-300 mb-4">
                          Dokumente
                        </label>
                        <div 
                          onClick={() => triggerFileInput('vehicleDocuments')}
                          className="border-2 border-dashed border-neutral-600 rounded-xl p-8 text-center cursor-pointer hover:border-red-500 transition-colors duration-200 bg-neutral-800/30 hover:bg-neutral-800/50"
                        >
                          <FileText className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
                          <p className="text-neutral-300 font-semibold mb-1">Dokumente auswählen</p>
                          <p className="text-xs text-neutral-500">PDF, DOC (max. 10 MB)</p>
                        </div>
                        <input
                          ref={fileInputRefs.vehicleDocuments}
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileChange('vehicleDocuments', e)}
                          className="hidden"
                        />
                        
                        {files.vehicleDocuments.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {files.vehicleDocuments.map((file, index) => (
                              <div key={index} className="flex items-center justify-between bg-neutral-800 p-3 rounded-lg">
                                <span className="text-sm text-neutral-300 flex items-center gap-2 font-medium">
                                  <FileText className="w-4 h-4 text-red-500" />
                                  {file.name}
                                </span>
                                <button
                                  onClick={() => removeFile('vehicleDocuments', index)}
                                  className="text-red-500 hover:text-red-400 hover:bg-red-500/10 p-1 rounded transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-neutral-800/50 rounded-xl p-6 mt-8">
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-red-500" />
                        Hilfreiche Dokumente:
                      </h4>
                      <div className="text-sm text-neutral-400 space-y-1">
                        <div>• Fahrzeugschein & Fahrzeugbrief</div>
                        <div>• Serviceheft • TÜV-Bescheinigung</div>
                        <div>• Rechnungen für Reparaturen</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-10 pt-8 border-t border-neutral-700/50">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`
                      px-8 py-4 rounded-xl font-semibold flex items-center gap-3 transition-colors duration-200
                      ${currentStep === 1 
                        ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' 
                        : 'bg-neutral-700 text-white hover:bg-neutral-600'
                      }
                    `}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Zurück
                  </button>

                  {currentStep < 3 ? (
                    <button
                      onClick={nextStep}
                      disabled={!isStepValid(currentStep)}
                      className={`
                        px-8 py-4 rounded-xl font-semibold flex items-center gap-3 transition-colors duration-200
                        ${!isStepValid(currentStep)
                          ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg'
                        }
                      `}
                    >
                      <span>Weiter</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={`
                        px-10 py-4 rounded-xl font-semibold flex items-center gap-3 transition-colors duration-200
                        ${isSubmitting
                          ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg'
                        }
                      `}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-neutral-400 border-t-transparent rounded-full" />
                          <span>Wird gesendet...</span>
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5" />
                          <span>Anfrage senden</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Status messages */}
                {submitStatus === 'success' && (
                  <div className="mt-8 p-6 bg-green-900/50 border border-green-600/50 rounded-xl flex items-center gap-4">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <div>
                      <p className="text-green-300 font-semibold">Anfrage erfolgreich gesendet!</p>
                      <p className="text-green-400 text-sm">Wir melden uns schnellstmöglich bei Ihnen.</p>
                    </div>
                  </div>
                )}

                {submitStatus === 'development' && (
                  <div className="mt-8 p-8 bg-yellow-900/40 border-2 border-yellow-500/50 rounded-xl">
                    <div className="flex items-start gap-4">
                      <div className="bg-yellow-600 rounded-full p-2">
                        <Zap className="w-6 h-6 text-black" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-yellow-300 font-bold text-lg mb-2 flex items-center gap-2">
                          🚧 Feature in Entwicklung
                          <span className="text-xs bg-yellow-500/20 px-2 py-1 rounded-full">BETA</span>
                        </h4>
                        <p className="text-yellow-100 mb-4">
                          Diese Funktionalität wird gerade entwickelt und ist noch nicht vollständig verfügbar.
                        </p>
                        <div className="bg-neutral-800/50 rounded-lg p-4 mb-4 border border-yellow-500/20">
                          <p className="text-yellow-200 text-sm font-semibold mb-2 flex items-center gap-2">
                            <Award className="w-4 h-4" />
                            Was passiert als nächstes:
                          </p>
                          <ul className="text-yellow-300 text-sm space-y-1 ml-6">
                            <li>• 🔥 API-Integration für automatischen E-Mail-Versand</li>
                            <li>• 📱 Datei-Upload mit Drag & Drop Funktionalität</li>
                            <li>• 🤖 KI-basierte automatische Fahrzeugbewertung</li>
                            <li>• ⚡ Real-time Preis-Kalkulator</li>
                          </ul>
                        </div>
                        <div className="flex items-center gap-2 text-yellow-400 text-sm bg-neutral-800/30 p-3 rounded-lg border border-yellow-500/20">
                          <Phone className="w-4 h-4" />
                          <span>Für sofortige Hilfe: <strong className="text-yellow-300">+49 174 7692697</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mt-8 p-6 bg-red-900/50 border border-red-600/50 rounded-xl flex items-center gap-4">
                    <AlertCircle className="w-6 h-6 text-red-400" />
                    <div>
                      <p className="text-red-300 font-semibold">Fehler beim Senden</p>
                      <p className="text-red-400 text-sm">Bitte versuchen Sie es erneut.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - 30% - Car Image & Info */}
            <div className="col-span-12 lg:col-span-4">
              <div className="sticky top-24">
                
                {/* Car Image Section - Pixel Perfect */}
                <div className="bg-neutral-900 rounded-2xl p-6 border border-red-600/20 shadow-2xl mb-6">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-800 mb-6 border border-neutral-700">
                    {car.images?.[0] ? (
                      <img
                        src={car.images[0]?.xxl || car.images[0]?.xl || car.images[0]?.l || 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=600&h=400&fit=crop&crop=center'}
                        alt={`${car.make || 'Auto'} ${car.modelDescription || car.model || ''}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=600&h=400&fit=crop&crop=center';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Car className="w-20 h-20 text-neutral-600" />
                      </div>
                    )}
                  </div>

                  {/* Car Details */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {car.make || 'N/A'} {car.modelDescription?.replace(/&amp;/g, '&').replace(/&quot;/g, '"') || car.model || 'N/A'}
                      </h3>
                      <div className="text-2xl font-bold text-red-500 mb-4">
                        {formatPrice(car.price)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center justify-between py-2 border-b border-neutral-800">
                        <div className="flex items-center gap-2 text-neutral-400">
                          <Calendar className="w-4 h-4 text-red-500" />
                          <span className="text-sm font-medium">Baujahr</span>
                        </div>
                        <span className="text-white font-semibold">{car.year || 'N/A'}</span>
                      </div>
                      
                      <div className="flex items-center justify-between py-2 border-b border-neutral-800">
                        <div className="flex items-center gap-2 text-neutral-400">
                          <Gauge className="w-4 h-4 text-red-500" />
                          <span className="text-sm font-medium">Kilometer</span>
                        </div>
                        <span className="text-white font-semibold">{formatMileage(car.mileage)}</span>
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2 text-neutral-400">
                          <Fuel className="w-4 h-4 text-red-500" />
                          <span className="text-sm font-medium">Kraftstoff</span>
                        </div>
                        <span className="text-white font-semibold">{car.fuel || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefits Section */}
                <div className="bg-gradient-to-br from-red-900/20 to-red-800/20 rounded-2xl p-6 border border-red-600/30">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-red-500" />
                    Ihre Vorteile
                  </h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3 text-neutral-300">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      Faire Bewertung Ihres Fahrzeugs
                    </li>
                    <li className="flex items-center gap-3 text-neutral-300">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      Kostenlose Abholung möglich
                    </li>
                    <li className="flex items-center gap-3 text-neutral-300">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      Schnelle Abwicklung
                    </li>
                    <li className="flex items-center gap-3 text-neutral-300">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      Transparente Preisgestaltung
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup prozor za slanje maila */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-neutral-900 rounded-2xl p-8 border border-red-600/20 shadow-2xl max-w-md w-full mx-4">
            <div className="text-center">
              {submitStatus === 'success' ? (
                <>
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-3">Email erfolgreich gesendet!</h3>
                  <p className="text-neutral-300 mb-6">
                    Vielen Dank für Ihre Anfrage. Wir werden uns schnellstmöglich bei Ihnen melden.
                  </p>
                  <button
                    onClick={() => {
                      setShowPopup(false);
                      navigate(`/car/${id}`);
                    }}
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-colors duration-200 font-semibold"
                  >
                    Zurück zum Fahrzeug
                  </button>
                </>
              ) : submitStatus === 'error' ? (
                <>
                  <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-3">Fehler beim Senden</h3>
                  <p className="text-neutral-300 mb-6">
                    Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.
                  </p>
                  <button
                    onClick={() => setShowPopup(false)}
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-xl hover:from-red-700 hover:to-red-800 transition-colors duration-200 font-semibold"
                  >
                    Erneut versuchen
                  </button>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4 animate-spin"></div>
                  <h3 className="text-2xl font-bold text-white mb-3">Email wird gesendet...</h3>
                  <p className="text-neutral-300">
                    Bitte warten Sie einen Moment.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradeInPage;