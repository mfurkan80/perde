import { Link } from "react-router-dom";
import { SITE_NAME } from "../config";
import { isAnalyticsEnabled, openConsentPanel } from "../utils/consent";

const linkGroups = [
  {
    title: "Keşfet",
    links: [
      { label: "Ana Sayfa", to: "/" },
      { label: "Filmler", to: "/movie" },
      { label: "Diziler", to: "/tv" },
      { label: "Favorilerim", to: "/favorites" },
      { label: "İzlediklerim", to: "/watched" },
    ],
  },
  {
    title: "Kurumsal",
    links: [
      { label: "İletişim", to: "/contact" },
      { label: "Gizlilik Politikası", to: "/privacy" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="text-lg font-bold">
              {SITE_NAME}
            </Link>
            <p className="mt-2 text-sm text-gray-400">
              Film bilgisi almak için doğru adres.
            </p>
          </div>

          {linkGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="text-sm font-semibold text-white">
                {group.title}
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-gray-800 pt-6 text-xs text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>
            Film ve dizi verileri{" "}
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              TMDB
            </a>{" "}
            tarafından sağlanır. Bu site TMDB API'sini kullanır ancak TMDB
            tarafından onaylanmış veya desteklenmiş değildir.
          </p>
          <div className="flex shrink-0 items-center gap-4">
            {isAnalyticsEnabled && (
              <button
                type="button"
                onClick={openConsentPanel}
                className="transition-colors duration-200 hover:text-white"
              >
                Çerez Tercihleri
              </button>
            )}
            <span>
              © {new Date().getFullYear()} {SITE_NAME}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
