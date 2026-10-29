import { Link } from "react-router-dom";
import { SITE_NAME } from "../config";

const NotFoundPage = () => {
  return (
    <div className="mx-auto mt-20 max-w-md text-center">
      <title>{`Sayfa Bulunamadı - ${SITE_NAME}`}</title>
      <p className="text-7xl font-bold text-gray-700">404</p>
      <h1 className="mt-4 text-2xl font-bold">Sayfa bulunamadı</h1>
      <p className="mt-2 text-gray-400">
        Aradığın sayfa taşınmış ya da hiç var olmamış olabilir.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block roundede bg-white px-4 py-1.5 font-semibold text-gray-900 transition-colors hover:bg-gray-200"
      >
        Ana sayfaya dön
      </Link>
    </div>
  );
};

export default NotFoundPage;
