/**
 * Cookie Utilities for GDPR-compliant cookie management
 * Handles setting, getting, and parsing cookie consent preferences
 */

// Cookie consent categories
export const COOKIE_CATEGORIES = {
  essential: {
    name: 'Notwendige Cookies',
    nameEn: 'Essential Cookies',
    description: 'Erforderlich für grundlegende Website-Funktionen (Navigation, Sicherheit)',
    descriptionEn: 'Required for basic site functions (navigation, security)',
    required: true
  },
  analytical: {
    name: 'Analyse-Cookies',
    nameEn: 'Analytical Cookies',
    description: 'Helfen uns zu verstehen, wie Sie die Website nutzen (Google Analytics)',
    descriptionEn: 'Help us understand how you use the site (Google Analytics)',
    required: false
  },
  marketing: {
    name: 'Marketing-Cookies',
    nameEn: 'Marketing Cookies',
    description: 'Werden für personalisierte Werbung und Conversion-Tracking verwendet',
    descriptionEn: 'Used for personalized ads and conversion tracking',
    required: false
  },
  preferences: {
    name: 'Präferenz-Cookies',
    nameEn: 'Preference Cookies',
    description: 'Speichern Ihre Filtereinstellungen und Sprachpräferenzen',
    descriptionEn: 'Remember your filter settings and language',
    required: false
  }
};

// Cookie consent storage key
const CONSENT_COOKIE_NAME = 'miftari_cookie_consent';
const CONSENT_COOKIE_EXPIRES = 365; // days

/**
 * Set a cookie with specified name, value, and expiration days
 */
export const setCookie = (name, value, days = 365) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

/**
 * Get cookie value by name
 */
export const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

/**
 * Delete cookie by name
 */
export const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

/**
 * Get current cookie consent preferences
 * Returns object with boolean values for each category
 */
export const getConsentPreferences = () => {
  const consentCookie = getCookie(CONSENT_COOKIE_NAME);
  
  if (!consentCookie) {
    // No consent given yet - return default (only essential)
    return {
      essential: true,
      analytical: false,
      marketing: false,
      preferences: false,
      timestamp: null,
      hasConsented: false
    };
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(consentCookie));
    return {
      essential: true, // Always true
      analytical: parsed.analytical || false,
      marketing: parsed.marketing || false,
      preferences: parsed.preferences || false,
      timestamp: parsed.timestamp || null,
      hasConsented: true
    };
  } catch (error) {
    console.error('Error parsing cookie consent:', error);
    return {
      essential: true,
      analytical: false,
      marketing: false,
      preferences: false,
      timestamp: null,
      hasConsented: false
    };
  }
};

/**
 * Save cookie consent preferences
 */
export const saveConsentPreferences = (preferences) => {
  const consentData = {
    analytical: preferences.analytical || false,
    marketing: preferences.marketing || false,
    preferences: preferences.preferences || false,
    timestamp: new Date().toISOString()
  };

  const consentString = encodeURIComponent(JSON.stringify(consentData));
  setCookie(CONSENT_COOKIE_NAME, consentString, CONSENT_COOKIE_EXPIRES);
  
  return consentData;
};

/**
 * Check if user has given consent for specific category
 */
export const hasConsentFor = (category) => {
  const preferences = getConsentPreferences();
  
  if (category === 'essential') return true; // Essential cookies always allowed
  
  return preferences[category] === true;
};

/**
 * Check if user has already made a consent choice
 */
export const hasUserConsented = () => {
  const preferences = getConsentPreferences();
  return preferences.hasConsented;
};

/**
 * Withdraw all consent (reset to essential only)
 */
export const withdrawConsent = () => {
  deleteCookie(CONSENT_COOKIE_NAME);
  
  // Also clear any tracking cookies based on consent
  clearTrackingCookies();
};

/**
 * Clear tracking cookies when consent is withdrawn
 */
export const clearTrackingCookies = () => {
  // Google Analytics cookies
  deleteCookie('_ga');
  deleteCookie('_ga_' + 'GA_MEASUREMENT_ID'); // Replace with your GA ID
  deleteCookie('_gid');
  deleteCookie('_gat');
  
  // Facebook Pixel cookies
  deleteCookie('_fbp');
  deleteCookie('_fbc');
  
  // Other common tracking cookies
  deleteCookie('_utm_source');
  deleteCookie('_utm_medium');
  deleteCookie('_utm_campaign');
  
  console.log('Tracking cookies cleared due to consent withdrawal');
};

/**
 * Get consent summary for display
 */
export const getConsentSummary = () => {
  const preferences = getConsentPreferences();
  const enabledCategories = [];
  
  Object.keys(COOKIE_CATEGORIES).forEach(category => {
    if (preferences[category]) {
      enabledCategories.push(COOKIE_CATEGORIES[category].name);
    }
  });
  
  return {
    enabled: enabledCategories,
    total: Object.keys(COOKIE_CATEGORIES).length,
    timestamp: preferences.timestamp
  };
};

/**
 * Default consent preferences (all false except essential)
 */
export const getDefaultPreferences = () => ({
  essential: true,
  analytical: false,
  marketing: false,
  preferences: false
});

/**
 * Accept all cookies
 */
export const acceptAllCookies = () => {
  return saveConsentPreferences({
    analytical: true,
    marketing: true,
    preferences: true
  });
};

/**
 * Accept only essential cookies
 */
export const acceptEssentialOnly = () => {
  return saveConsentPreferences({
    analytical: false,
    marketing: false,
    preferences: false
  });
};