import { Link } from "react-router-dom";

const linkGroups = [
  {
    title: "Keşfet",
    links: [
      { label: "Ana Sayfa", to: "/" },
      { label: "Favorilerim", to: "/favorites" },
      { label: "Diziler", to: "/tv" },
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
              Perde
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
      </div>
    </footer>
  );
};

export default Footer;
