export type ConsentChoice = "granted" | "denied";

interface ConsentState {
  choice: ConsentChoice | null;
  isPanelOpen: boolean;
}

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

const STORAGE_KEY = "cookie-consent";
const GTM_ID = import.meta.env.VITE_GTM_ID;

// VITE_GTM_ID yoksa (örneğin geliştirme ortamında) analiz tamamen kapalı:
// ne çerez bandı gösterilir ne de Google etiketi yüklenir.
export const isAnalyticsEnabled = Boolean(GTM_ID);

const readChoice = (): ConsentChoice | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
};

const writeChoice = (choice: ConsentChoice) => {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Tarayıcı depolamayı engelliyorsa tercih sadece bu oturumda geçerli olur.
  }
};

const initialChoice = readChoice();

let state: ConsentState = {
  choice: initialChoice,
  isPanelOpen: isAnalyticsEnabled && initialChoice === null,
};

const listeners = new Set<() => void>();

const setState = (next: Partial<ConsentState>) => {
  state = { ...state, ...next };
  listeners.forEach((listener) => listener());
};

export const subscribeConsent = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const getConsentState = () => state;

// gtag, dataLayer'a bir dizi değil `arguments` nesnesi göndermek zorunda;
// Google etiketi komutları ancak bu şekilde tanıyor. Arrow function'larda
// `arguments` olmadığı için burada function ifadesi kullanmak gerekiyor.
const gtag: (...args: unknown[]) => void = function () {
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
};

let isTagLoaded = false;

const loadGoogleTag = () => {
  if (!GTM_ID || isTagLoaded) {
    return;
  }
  isTagLoaded = true;

  window.dataLayer = window.dataLayer || [];
  gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  gtag("js", new Date());

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
};

// Google Analytics çerezleri (_ga, _ga_XXXX) ana alan adına yazılır;
// onay geri çekildiğinde hem tam host hem de üst alan adı için silinir.
const clearAnalyticsCookies = () => {
  const hostParts = window.location.hostname.split(".");
  const domains = [
    window.location.hostname,
    `.${hostParts.slice(-2).join(".")}`,
  ];

  document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0].trim())
    .filter((name) => name.startsWith("_ga"))
    .forEach((name) => {
      domains.forEach((domain) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
      });
    });
};

export const saveConsent = (choice: ConsentChoice) => {
  writeChoice(choice);

  if (choice === "granted") {
    if (isTagLoaded) {
      gtag("consent", "update", { analytics_storage: "granted" });
    } else {
      loadGoogleTag();
    }
  } else if (isTagLoaded) {
    gtag("consent", "update", { analytics_storage: "denied" });
    clearAnalyticsCookies();
  } else {
    clearAnalyticsCookies();
  }

  setState({ choice, isPanelOpen: false });
};

export const openConsentPanel = () => {
  setState({ isPanelOpen: true });
};

export const initAnalytics = () => {
  if (state.choice === "granted") {
    loadGoogleTag();
  }
};
