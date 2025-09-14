# Frontend Struktura - Autosalon

## 📁 Organizacija fajlova

```
src/
├── 📄 App.jsx                  # Glavna aplikacija i rutiranje
├── 📄 index.js                 # Entry point aplikacije
├── 🎨 App.css                  # Globalni stilovi
├── 🎨 index.css                # Tailwind i globalni stilovi
│
├── 📂 components/              # Komponente
│   ├── 📄 Header.jsx           # Glavni header
│   ├── 📄 Footer.jsx           # Glavni footer
│   │
│   ├── 📂 sections/            # Sekcije za homepage
│   │   ├── 📄 Hero.jsx         # Hero sekcija
│   │   ├── 📄 Cars.jsx         # Automobili showcase
│   │   ├── 📄 Brands.jsx       # Brendovi automobila
│   │   ├── 📄 Contact.jsx      # Kontakt sekcija
│   │   └── 📄 WhyChooseUs.jsx  # Zašto nas izabrati
│   │
│   └── 📂 ui/                  # UI komponente
│       └── 📄 FilterPanel.jsx  # Filter panel za automobile
│
├── 📂 pages/                   # Stranice
│   ├── 📄 CarsPage.jsx         # Stranica sa svim automobilima
│   └── 📄 CarDetails.jsx       # Detalji automobila
│
├── 📂 context/                 # React Context
│   └── 📄 CarsContext.jsx      # State management za automobile
│
├── 📂 services/                # API servisi
│   └── 📄 mobileApiService.js  # Mobile.de API komunikacija
│
└── 📂 data/                    # Statički podaci
    └── 📄 gallery.js           # Gallery podaci
```

## 🛠️ Opis komponenti

### 🏠 **App.jsx**
- Glavni wrapper aplikacije
- React Router konfiguracija
- CarsProvider wrapper

### 📄 **Stranice (pages/)**
- `CarsPage.jsx` - Lista svih automobila sa filterima (crna tema)
- `CarDetails.jsx` - Detalji pojedinačnog automobila

### 🧱 **Komponente (components/)**

#### **Layout komponente:**
- `Header.jsx` - Navigacija i header
- `Footer.jsx` - Footer sa linkovima

#### **Homepage sekcije (sections/):**
- `Hero.jsx` - Glavni banner
- `Cars.jsx` - Showcase automobila
- `Brands.jsx` - Brendovi
- `Contact.jsx` - Kontakt forma
- `WhyChooseUs.jsx` - Prednosti

#### **UI komponente (ui/):**
- `FilterPanel.jsx` - Napredni filter panel za automobile

### ⚙️ **Servisi (services/)**
- `mobileApiService.js` - API komunikacija sa Mobile.de

### 🔗 **Context (context/)**
- `CarsContext.jsx` - Globalno upravljanje stanjem automobila

### 💾 **Data (data/)**
- `gallery.js` - Statički podaci za galeriju

## 🎨 **Tema i stilizovanje**

### **Crna tema (CarsPage)**
- `bg-gray-900` - Glavni background
- `bg-gray-800` - Kartice i elementi
- `text-white` - Glavni tekst
- `text-gray-300` - Sekundarni tekst
- `bg-blue-600/500` - Akcenti i dugmad

### **Ostale stranice**
- `bg-neutral-900` - Tamna tema
- Tailwind CSS za sve stilove

## 🚀 **Pokretanje**

1. **Backend server (port 5003):**
   ```bash
   node server_moderate.js
   ```

2. **Frontend (port 3000):**
   ```bash
   npm start
   ```

## ✅ **Optimizacije sprovedene**

- ✅ Backend optimizovan za 40% (238 linija umesto 437)
- ✅ Bez fallback sistema prema zahtevu
- ✅ Crna tema implementirana u CarsPage
- ✅ Organizacija fajlova - UI komponente u subfolder
- ✅ Uklonjena dupla fajlova (CarDetails_enhanced, CarsPage_clean)
- ✅ Čista folder struktura

## 🔄 **API konekcije**

- Backend proxy server na portu 5003
- Mobile.de sandbox API integracija
- CORS konfiguracija za localhost:3000
- Rate limiting: 50 zahteva po minutu
