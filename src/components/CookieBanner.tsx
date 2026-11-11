import { Link } from "react-router-dom";
import { useConsent } from "../hooks/useConsent";
import { isAnalyticsEnabled, saveConsent } from "../utils/consent";

const buttonClass =
  "flex-1 rounded border border-gray-600 px-5 py-2 text-sm font-semibold transition-colors hover:bg-gray-800 sm:flex-none";

const CookieBanner = () => {
  const { choice, isPanelOpen } = useConsent();

  if (!isAnalyticsEnabled || !isPanelOpen) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Çerez tercihleri"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-800 bg-gray-900/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-gray-300">
          <p>
            Siteyi nasıl kullandığını anlamak ve geliştirmek için Google
            Analytics çerezlerini kullanmak istiyoruz. Onay vermezsen bu
            çerezler hiç yüklenmez. Ayrıntılar için{" "}
            <Link to="/privacy" className="underline hover:text-white">
              Gizlilik Politikası
            </Link>
            .
          </p>
          {choice && (
            <p className="mt-1 text-xs text-gray-500">
              Şu anki tercihin:{" "}
              {choice === "granted" ? "Kabul edildi" : "Reddedildi"}
            </p>
          )}
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => saveConsent("denied")}
            className={buttonClass}
          >
            Reddet
          </button>
          <button
            type="button"
            onClick={() => saveConsent("granted")}
            className={buttonClass}
          >
            Kabul et
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
