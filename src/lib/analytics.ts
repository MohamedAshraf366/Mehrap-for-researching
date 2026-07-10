// Google Analytics 4 configuration.
// استبدل القيمة أدناه بمعرّف قياس GA4 الخاص بك (يبدأ بـ G-).
// معرّف GA4 هو مفتاح عام آمن، لا يحتاج إلى تخزين كسر.
export const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

export const isGaEnabled = () =>
  typeof window !== "undefined" &&
  GA_MEASUREMENT_ID &&
  GA_MEASUREMENT_ID !== "G-XXXXXXXXXX";

type GtagFn = (...args: unknown[]) => void;
declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

export const trackEvent = (
  event: string,
  params: Record<string, unknown> = {},
) => {
  if (!isGaEnabled() || !window.gtag) return;
  window.gtag("event", event, params);
};
