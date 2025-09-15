# AutoSalon - Vercel Deployment Guide

## Priprema za Production

### 1. Environment Variables u Vercel
Dodaj sledeće environment variables u Vercel dashboard:

```
MOBILE_DE_USERNAME=REMOVED
MOBILE_DE_PASSWORD=REMOVED
MOBILE_DE_USERNAME=REMOVED
MOBILE_DE_PASSWORD=REMOVED
```

### 2. Deployment Steps

1. **Push kod na GitHub**
```bash
git add .
git commit -m "Add Vercel serverless functions"
git push origin main
```

2. **Deploy na Vercel**
- Idi na vercel.com
- Import GitHub repository
- Framework Preset: Create React App
- Environment Variables: Dodaj MOBILE_DE_USERNAME i MOBILE_DE_PASSWORD

### 3. Post-Deployment
Backend API će biti dostupan na:
- `https://your-app.vercel.app/api/cars` - Lista automobila
- `https://your-app.vercel.app/api/cars/[id]` - Detalji automobila

## Promene napravljene za Vercel:

1. ✅ Kreiran `/api` folder sa serverless funkcijama
2. ✅ Ažuriran `mobileApiService.js` za production URLs
3. ✅ Dodana `vercel.json` konfiguracija
4. ✅ Environment variables setup
5. ✅ CORS headers dodani za production

## Testiranje lokalno:
```bash
# Install Vercel CLI
npm i -g vercel

# Test serverless functions locally
vercel dev
```

## Troubleshooting:

**Problem: API ne radi na production**
- Preri environment variables u Vercel dashboard
- Preri Network tab u browser dev tools za greške

**Problem: CORS greške**
- Serverless funkcije imaju CORS headers
- Preti da su pravilno konfigurisane

**Problem: Mobile.de API rate limiting**
- Serverless funkcije imaju timeout od 15s
- Implementiran retry mehanizam
