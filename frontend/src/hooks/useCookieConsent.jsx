/**
 * Custom React Hook for Cookie Consent Management
 * Handles global consent state, preferences, and third-party script loading
 */

import { useState, useEffect, useContext, createContext } from 'react';
import {
  getConsentPreferences,
  saveConsentPreferences,
  hasUserConsented,
  hasConsentFor,
  withdrawConsent,
  acceptAllCookies,
  acceptEssentialOnly,
  COOKIE_CATEGORIES
} from '../utils/cookieUtils';

// Create Cookie Consent Context
const CookieConsentContext = createContext();

/**
 * Cookie Consent Provider Component
 * Wrap your app with this to provide consent state globally
 */
export const CookieConsentProvider = ({ children }) => {
  const [consent, setConsent] = useState(getConsentPreferences());
  const [showBanner, setShowBanner] = useState(!hasUserConsented());
  const [language, setLanguage] = useState('de'); // 'de' for German, 'en' for English

  // Update consent and trigger side effects
  const updateConsent = (newPreferences) => {
    const savedConsent = saveConsentPreferences(newPreferences);
    const fullConsent = {
      essential: true,
      ...savedConsent,
      hasConsented: true
    };
    
    setConsent(fullConsent);
    setShowBanner(false);
    
    // Load or unload third-party scripts based on consent
    handleThirdPartyScripts(fullConsent);
    
    return fullConsent;
  };

  // Handle third-party script loading based on consent
  const handleThirdPartyScripts = (consentData) => {
    // Google Analytics
    if (consentData.analytical) {
      loadAnalyticsScript();
    } else {
      unloadAnalyticsScript();
    }

    // Marketing scripts (Facebook Pixel, Google Ads, etc.)
    if (consentData.marketing) {
      loadMarketingScripts();
    } else {
      unloadMarketingScripts();
    }

    // Preference scripts (language, theme, etc.)
    if (consentData.preferences) {
      loadPreferenceScripts();
    }
  };

  // Initialize consent on mount
  useEffect(() => {
    const currentConsent = getConsentPreferences();
    setConsent(currentConsent);
    
    // If user has already consented, load appropriate scripts
    if (currentConsent.hasConsented) {
      handleThirdPartyScripts(currentConsent);
      setShowBanner(false);
    }
  }, []);

  // Reset all consent
  const resetConsent = () => {
    withdrawConsent();
    setConsent(getConsentPreferences());
    setShowBanner(true);
    
    // Unload all third-party scripts
    unloadAnalyticsScript();
    unloadMarketingScripts();
  };

  // Accept all cookies
  const acceptAll = () => {
    return updateConsent({
      analytical: true,
      marketing: true,
      preferences: true
    });
  };

  // Accept only essential cookies
  const acceptEssential = () => {
    return updateConsent({
      analytical: false,
      marketing: false,
      preferences: false
    });
  };

  // Check consent for specific category
  const hasConsent = (category) => {
    return hasConsentFor(category);
  };

  const value = {
    consent,
    showBanner,
    language,
    updateConsent,
    resetConsent,
    acceptAll,
    acceptEssential,
    hasConsent,
    setLanguage,
    setShowBanner,
    categories: COOKIE_CATEGORIES
  };

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
};

/**
 * Hook to use cookie consent context
 */
export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within CookieConsentProvider');
  }
  return context;
};

// Third-party script loading functions

/**
 * Load Google Analytics script (mock implementation)
 * In production, this would inject the actual GA script
 */
const loadAnalyticsScript = () => {
  // Mock implementation - in production you would:
  /*
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID';
  document.head.appendChild(script);
  
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
  */
  
  console.log('🔍 Analytics script loaded (Google Analytics consent given)');
  
  // Set a flag to indicate analytics is loaded
  window.analyticsLoaded = true;
};

/**
 * Unload Analytics script
 */
const unloadAnalyticsScript = () => {
  // Remove analytics scripts and data
  const analyticsScripts = document.querySelectorAll('script[src*="googletagmanager"]');
  analyticsScripts.forEach(script => script.remove());
  
  // Clear analytics data
  if (window.gtag) {
    delete window.gtag;
  }
  if (window.dataLayer) {
    window.dataLayer = [];
  }
  window.analyticsLoaded = false;
  
  console.log('🔍 Analytics script unloaded (consent withdrawn)');
};

/**
 * Load Marketing scripts (Facebook Pixel, Google Ads, etc.)
 */
const loadMarketingScripts = () => {
  // Mock implementation - in production you would load:
  /*
  // Facebook Pixel
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
  */
  
  console.log('📢 Marketing scripts loaded (Facebook Pixel, Google Ads consent given)');
  window.marketingLoaded = true;
};

/**
 * Unload Marketing scripts
 */
const unloadMarketingScripts = () => {
  // Remove marketing scripts
  const fbScripts = document.querySelectorAll('script[src*="fbevents.js"]');
  fbScripts.forEach(script => script.remove());
  
  if (window.fbq) {
    delete window.fbq;
  }
  window.marketingLoaded = false;
  
  console.log('📢 Marketing scripts unloaded (consent withdrawn)');
};

/**
 * Load Preference scripts (user settings, personalization)
 */
const loadPreferenceScripts = () => {
  // Mock implementation - in production this might load:
  // - User preference storage
  // - Personalization engines
  // - A/B testing tools
  
  console.log('⚙️ Preference scripts loaded (personalization consent given)');
  window.preferencesLoaded = true;
};