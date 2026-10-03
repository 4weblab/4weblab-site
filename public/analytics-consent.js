/* Google Analytics 4 is intentionally loaded only after explicit analytics consent.
 * The cookie banner must call `window.fourWebLabAnalytics.grant()` on acceptance
 * and `window.fourWebLabAnalytics.deny()` on refusal or withdrawal.
 */
(() => {
  const measurementId = 'G-HWVJ1KWYSN';
  const preferenceKey = '4weblab-cookie-preferences';
  const preferenceMaxAge = 183 * 24 * 60 * 60 * 1000;
  let loaded = false;

  const readPreference = () => {
    try {
      const stored = window.localStorage.getItem(preferenceKey);
      if (!stored) return null;
      const preferences = JSON.parse(stored);
      const timestamp = new Date(preferences?.updatedAt).getTime();
      if (!timestamp || Date.now() - timestamp > preferenceMaxAge) {
        window.localStorage.removeItem(preferenceKey);
        return null;
      }
      return preferences?.analytics === true ? 'granted' : preferences?.analytics === false ? 'denied' : null;
    } catch {
      return null;
    }
  };

  const loadAnalytics = () => {
    if (loaded || document.querySelector(`script[data-ga4-id="${measurementId}"]`)) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    window.gtag('config', measurementId, { anonymize_ip: true });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.dataset.ga4Id = measurementId;
    document.head.appendChild(script);
  };

  const savePreference = (analytics) => {
    try {
      const current = JSON.parse(window.localStorage.getItem(preferenceKey) || '{}');
      window.localStorage.setItem(preferenceKey, JSON.stringify({ ...current, analytics }));
    } catch {
      // Consent still applies for the current page if storage is unavailable.
    }
  };

  window.fourWebLabAnalytics = {
    grant() {
      savePreference(true);
      loadAnalytics();
    },
    deny() {
      savePreference(false);
      if (window.gtag) window.gtag('consent', 'update', { analytics_storage: 'denied' });
    },
  };

  window.addEventListener('4weblab:analytics-consent', (event) => {
    if (event.detail?.analytics === true) window.fourWebLabAnalytics.grant();
    if (event.detail?.analytics === false) window.fourWebLabAnalytics.deny();
  });

  if (readPreference() === 'granted') loadAnalytics();
})();
