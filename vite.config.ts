import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, type Plugin } from "vite";

// Arama motorlarının taramaması gereken, kullanıcıya özel veya
// tek kullanımlık sayfalar.
const DISALLOWED_PATHS = [
  "/admin",
  "/profile",
  "/favorites",
  "/watched",
  "/search",
  "/reset-password",
  "/verify-email",
];

// robots.txt build sırasında üretilir, çünkü sitemap backend'de duruyor ve
// adresi VITE_API_URL'e bağlı.
const robotsTxt = (apiUrl: string | undefined): Plugin => ({
  name: "robots-txt",
  apply: "build",
  generateBundle() {
    const lines = [
      "User-agent: *",
      ...DISALLOWED_PATHS.map((path) => `Disallow: ${path}`),
    ];

    if (apiUrl?.startsWith("http")) {
      lines.push("", `Sitemap: ${apiUrl.replace(/\/$/, "")}/sitemap.xml`);
    }

    this.emitFile({
      type: "asset",
      fileName: "robots.txt",
      source: `${lines.join("\n")}\n`,
    });
  },
});

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    plugins: [react(), tailwindcss(), robotsTxt(env.VITE_API_URL)],
  };
});
