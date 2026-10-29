import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../api/auth";
import Spinner from "../components/Spinner";
import { SITE_NAME } from "../config";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const { data, error, isLoading } = useQuery({
    queryKey: ["verify-email", token],
    queryFn: () => verifyEmail(token),
    enabled: !!token,
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const pageTitle = <title>{`E-posta Doğrulama - ${SITE_NAME}`}</title>;

  if (isLoading) {
    return (
      <>
        {pageTitle}
        <Spinner />
      </>
    );
  }

  if (data) {
    return (
      <div className="max-w-md mx-auto mt-12">
        {pageTitle}
        <h1 className="text-2xl font-bold mb-2">Hesabın doğrulandı 🎉</h1>
        <p className="text-gray-300">{data}</p>
        <Link
          to="/login"
          className="mt-6 inline-block bg-white text-gray-900 px-6 py-2 rounded font-semibold"
        >
          Giriş Yap
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-12">
      {pageTitle}
      <h1 className="text-2xl font-bold mb-2">Doğrulama başarısız</h1>
      <p className="text-gray-400">
        {error?.message ?? "Bu sayfaya e-postadaki bağlantı ile gelmelisin."}
      </p>
      <p className="mt-4 text-sm text-gray-400">
        Giriş sayfasında e-posta ve şifreni yazınca yeni bir doğrulama
        bağlantısı isteyebilirsin.
      </p>
      <Link
        to="/login"
        className="mt-6 inline-block bg-white text-gray-900 px-6 py-2 rounded font-semibold"
      >
        Giriş sayfasına git
      </Link>
    </div>
  );
};

export default VerifyEmailPage;
