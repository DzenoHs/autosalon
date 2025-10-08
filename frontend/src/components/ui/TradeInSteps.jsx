import React, { useState, useRef } from 'react';
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
  X
} from 'lucide-react';
import mobileApiService from '../../services/mobileApiService';

const TradeInSteps = ({ selectedCar }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
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

  const steps = [
    { number: 1, title: 'Persönliche Daten', icon: User, color: 'from-red-600 to-red-800' },
    { number: 2, title: 'Fahrzeugdaten', icon: Car, color: 'from-red-600 to-red-800' },
    { number: 3, title: 'Dokumente & Bilder', icon: Upload, color: 'from-red-600 to-red-800' }
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

    try {
      const formData = new FormData();
      
      // Add all form data
      Object.entries(personalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      Object.entries(vehicleData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Add selected car data
      if (selectedCar) {
        formData.append('carId', selectedCar.id);
        formData.append('carMake', selectedCar.make);
        formData.append('carModel', selectedCar.modelDescription);
        formData.append('carPrice', selectedCar.price);
      }

      // Add files
      files.vehicleImages.forEach(file => {
        formData.append('vehicleImages', file);
      });
      
      files.vehicleDocuments.forEach(file => {
        formData.append('vehicleDocuments', file);
      });

      await mobileApiService.sendCarMessageData(formData);
      
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setCurrentStep(1);
        setPersonalData({ gender: 'Herr', name: '', email: '', phone: '', message: '' });
        setVehicleData({ tradeInBrand: '', tradeInModel: '', tradeInYear: '', tradeInMileage: '', tradeInFuel: 'Benzin', tradeInCondition: 'Gut', tradeInVIN: '', tradeInRegistration: '' });
        setFiles({ vehicleImages: [], vehicleDocuments: [] });
        setSubmitStatus(null);
      }, 3000);
      
    } catch (error) {
      console.error('Error sending trade-in request:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return personalData.name && personalData.email;
      case 2:
        return vehicleData.tradeInBrand && vehicleData.tradeInModel && vehicleData.tradeInYear;
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

  return (
    <div className="bg-gradient-to-br from-neutral-900 via-black to-neutral-900 border border-red-600/30 rounded-xl shadow-2xl overflow-hidden">
      {/* Header with selected car info */}
      {selectedCar && (
        <div className="bg-gradient-to-r from-red-600 to-red-800 p-6">
          <div className="flex items-center gap-4">
            <div className="bg-black/20 p-3 rounded-lg">
              <Car className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                {selectedCar.make} {selectedCar.modelDescription?.replace(/&amp;/g, '&').replace(/&quot;/g, '"') || selectedCar.model}
              </h3>
              <p className="text-red-100 opacity-90">
                Inzahlungnahme anfragen für €{selectedCar.price?.toLocaleString('de-DE')}
              </p>
              <div className="flex items-center gap-4 mt-2 text-sm text-red-100/80">
                <span>Erstzulassung: {selectedCar.buildYear || selectedCar.year || selectedCar.firstRegistration?.substring(0, 4) || 'N/A'}</span>
                <span>•</span>
                <span>Kraftstoff: {selectedCar.fuel || 'N/A'}</span>
                <span>•</span>
                <span>Kilometerstand: {selectedCar.mileage?.toLocaleString('de-DE') || 'N/A'} km</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress bar with icons */}
      <div className="bg-black/50 p-4">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                {/* Step Icon Container */}
                <div className="flex flex-col items-center">
                  <div className={`
                    w-16 h-16 rounded-full flex items-center justify-center font-bold text-sm relative
                    ${currentStep >= step.number 
                      ? 'bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white shadow-xl shadow-red-600/40' 
                      : 'bg-gradient-to-br from-neutral-700 to-neutral-800 text-neutral-400'
                    }
                    ${currentStep === step.number ? 'ring-4 ring-red-500/30 scale-110 animate-pulse' : ''}
                    transition-all duration-500 transform hover:scale-105
                  `}>
                    {currentStep > step.number ? (
                      <CheckCircle className="w-8 h-8" />
                    ) : (
                      <step.icon className="w-8 h-8" />
                    )}
                    
                    {/* Glow effect for active step */}
                    {currentStep === step.number && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600 to-red-800 blur-lg opacity-60 animate-pulse -z-10" />
                    )}
                  </div>
                  
                  {/* Step Title */}
                  <div className="mt-3 text-center">
                    <p className={`text-sm font-semibold ${
                      currentStep >= step.number ? 'text-white' : 'text-neutral-400'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      Schritt {step.number}
                    </p>
                  </div>
                </div>
                
                {/* Connecting Line - Fixed consistent spacing */}
                {index < steps.length - 1 && (
                  <div className="flex items-center justify-center mx-8 -mt-12">
                    <div className={`
                      h-3 w-32 rounded-full transition-all duration-700 relative overflow-hidden
                      ${currentStep > step.number 
                        ? 'bg-gradient-to-r from-red-600 to-red-800 shadow-lg shadow-red-600/30' 
                        : 'bg-neutral-700'
                      }
                    `}>
                      {/* Animated progress fill */}
                      {currentStep > step.number && (
                        <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 animate-pulse opacity-50" />
                      )}
                      
                      {/* Moving glow effect */}
                      {currentStep === step.number + 1 && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform translate-x-full animate-pulse" />
                      )}
                      
                      {/* Decorative dots */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-2">
                        <div className={`w-1 h-1 rounded-full ${
                          currentStep > step.number ? 'bg-red-300' : 'bg-neutral-500'
                        }`} />
                        <div className={`w-1 h-1 rounded-full ${
                          currentStep > step.number ? 'bg-red-300' : 'bg-neutral-500'
                        }`} />
                        <div className={`w-1 h-1 rounded-full ${
                          currentStep > step.number ? 'bg-red-300' : 'bg-neutral-500'
                        }`} />
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {/* Progress info */}
        <div className="mb-1">
          <div className="flex justify-between text-sm text-neutral-400 mb-1">
            <span className="font-medium">{steps[currentStep - 1]?.title}</span>
            <span className="text-red-400 font-bold">{Math.round(getStepProgress())}% abgeschlossen</span>
          </div>
          <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-red-600 via-red-500 to-red-800 h-2 rounded-full transition-all duration-700 shadow-lg shadow-red-600/30 relative"
              style={{ width: `${getStepProgress()}%` }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Form content */}
      <div className="p-4">
        {/* Step 1: Personal Data */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <User className="w-5 h-5 text-red-600" />
              Persönliche Daten
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Anrede *
                </label>
                <select
                  value={personalData.gender}
                  onChange={(e) => setPersonalData(prev => ({ ...prev, gender: e.target.value }))}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                >
                  <option value="Herr">Herr</option>
                  <option value="Frau">Frau</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Vollständiger Name *
                </label>
                <input
                  type="text"
                  value={personalData.name}
                  onChange={(e) => setPersonalData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                  placeholder="Max Mustermann"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  <Mail className="inline w-4 h-4 mr-1" />
                  E-Mail Adresse *
                </label>
                <input
                  type="email"
                  value={personalData.email}
                  onChange={(e) => setPersonalData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                  placeholder="max@beispiel.de"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  <Phone className="inline w-4 h-4 mr-1" />
                  Telefonnummer
                </label>
                <input
                  type="tel"
                  value={personalData.phone}
                  onChange={(e) => setPersonalData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                  placeholder="+49 123 456789"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Nachricht
              </label>
              <textarea
                value={personalData.message}
                onChange={(e) => setPersonalData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                rows="4"
                placeholder="Weitere Informationen oder spezielle Wünsche..."
              />
            </div>
          </div>
        )}

        {/* Step 2: Vehicle Data */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <Car className="w-5 h-5 text-red-600" />
              Ihr Fahrzeug
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Marke *
                </label>
                <input
                  type="text"
                  value={vehicleData.tradeInBrand}
                  onChange={(e) => setVehicleData(prev => ({ ...prev, tradeInBrand: e.target.value }))}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                  placeholder="BMW, Mercedes, Audi..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Modell *
                </label>
                <input
                  type="text"
                  value={vehicleData.tradeInModel}
                  onChange={(e) => setVehicleData(prev => ({ ...prev, tradeInModel: e.target.value }))}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                  placeholder="A4, C-Klasse, 3er..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Erstzulassung *
                </label>
                <input
                  type="number"
                  value={vehicleData.tradeInYear}
                  onChange={(e) => setVehicleData(prev => ({ ...prev, tradeInYear: e.target.value }))}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                  placeholder="2020"
                  min="1950"
                  max="2025"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  <Gauge className="inline w-4 h-4 mr-1" />
                  Kilometerstand
                </label>
                <input
                  type="number"
                  value={vehicleData.tradeInMileage}
                  onChange={(e) => setVehicleData(prev => ({ ...prev, tradeInMileage: e.target.value }))}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                  placeholder="50000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  <Fuel className="inline w-4 h-4 mr-1" />
                  Kraftstoff
                </label>
                <select
                  value={vehicleData.tradeInFuel}
                  onChange={(e) => setVehicleData(prev => ({ ...prev, tradeInFuel: e.target.value }))}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                >
                  <option value="Benzin">Benzin</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Elektro">Elektro</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Gas">Gas (LPG/CNG)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Zustand
                </label>
                <select
                  value={vehicleData.tradeInCondition}
                  onChange={(e) => setVehicleData(prev => ({ ...prev, tradeInCondition: e.target.value }))}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                >
                  <option value="Sehr gut">Sehr gut</option>
                  <option value="Gut">Gut</option>
                  <option value="Befriedigend">Befriedigend</option>
                  <option value="Reparaturbedürftig">Reparaturbedürftig</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  <Hash className="inline w-4 h-4 mr-1" />
                  Fahrgestellnummer (VIN)
                </label>
                <input
                  type="text"
                  value={vehicleData.tradeInVIN}
                  onChange={(e) => setVehicleData(prev => ({ ...prev, tradeInVIN: e.target.value }))}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                  placeholder="WBAVA31070L..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Erstzulassung
                </label>
                <input
                  type="text"
                  value={vehicleData.tradeInRegistration}
                  onChange={(e) => setVehicleData(prev => ({ ...prev, tradeInRegistration: e.target.value }))}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                  placeholder="03/2020"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Files */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <Upload className="w-5 h-5 text-red-600" />
              Dokumente & Bilder
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Vehicle Images */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  <Image className="inline w-4 h-4 mr-1" />
                  Fahrzeugbilder
                </label>
                <div 
                  onClick={() => triggerFileInput('vehicleImages')}
                  className="border-2 border-dashed border-neutral-600 rounded-lg p-6 text-center cursor-pointer hover:border-red-600 transition-colors bg-neutral-800/50"
                >
                  <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                  <p className="text-neutral-400">Bilder auswählen</p>
                  <p className="text-xs text-neutral-500 mt-1">
                    JPEG, PNG, GIF (max. 10 MB pro Datei)
                  </p>
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
                  <div className="mt-3 space-y-2">
                    {files.vehicleImages.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-neutral-800 p-2 rounded">
                        <span className="text-sm text-neutral-300 truncate">{file.name}</span>
                        <button
                          onClick={() => removeFile('vehicleImages', index)}
                          className="text-red-500 hover:text-red-400 ml-2"
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
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  <FileText className="inline w-4 h-4 mr-1" />
                  Fahrzeugdokumente
                </label>
                <div 
                  onClick={() => triggerFileInput('vehicleDocuments')}
                  className="border-2 border-dashed border-neutral-600 rounded-lg p-6 text-center cursor-pointer hover:border-red-600 transition-colors bg-neutral-800/50"
                >
                  <FileText className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                  <p className="text-neutral-400">Dokumente auswählen</p>
                  <p className="text-xs text-neutral-500 mt-1">
                    PDF, DOC, DOCX (max. 10 MB pro Datei)
                  </p>
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
                  <div className="mt-3 space-y-2">
                    {files.vehicleDocuments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-neutral-800 p-2 rounded">
                        <span className="text-sm text-neutral-300 truncate">{file.name}</span>
                        <button
                          onClick={() => removeFile('vehicleDocuments', index)}
                          className="text-red-500 hover:text-red-400 ml-2"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-neutral-800/50 rounded-lg p-3">
              <p className="text-sm text-neutral-400 mb-2">
                <strong>Empfohlene Dokumente:</strong>
              </p>
              <ul className="text-xs text-neutral-500 space-y-1">
                <li>• Fahrzeugschein (Zulassungsbescheinigung Teil I)</li>
                <li>• Fahrzeugbrief (Zulassungsbescheinigung Teil II)</li>
                <li>• Serviceheft/Wartungsnachweis</li>
                <li>• TÜV/AU-Bescheinigung</li>
                <li>• Rechnungen für Reparaturen/Umbauten</li>
              </ul>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-6 pt-4 border-t border-neutral-700">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`
              px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all
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
                px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all
                ${!isStepValid(currentStep)
                  ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 to-red-800 text-white hover:from-red-700 hover:to-red-900 shadow-lg shadow-red-600/30'
                }
              `}
            >
              Weiter
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`
                px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-all
                ${isSubmitting
                  ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 to-red-800 text-white hover:from-red-700 hover:to-red-900 shadow-lg shadow-red-600/30'
                }
              `}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
                  Wird gesendet...
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  Anfrage senden
                </>
              )}
            </button>
          )}
        </div>

        {/* Status messages */}
        {submitStatus === 'success' && (
          <div className="mt-4 p-4 bg-green-900/50 border border-green-600 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <div>
              <p className="text-green-300 font-medium">Anfrage erfolgreich gesendet!</p>
              <p className="text-green-400 text-sm">Wir melden uns schnellstmöglich bei Ihnen.</p>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mt-4 p-4 bg-red-900/50 border border-red-600 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-400" />
            <div>
              <p className="text-red-300 font-medium">Fehler beim Senden der Anfrage</p>
              <p className="text-red-400 text-sm">Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradeInSteps;