import { useMutation } from "@tanstack/react-query";
import { useState, type SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { requestPasswordReset } from "../api/auth";
import { SITE_NAME } from "../config";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const mutation = useMutation({
    mutationFn: () => requestPasswordReset(email),
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <title>{`Şifremi Unuttum - ${SITE_NAME}`}</title>
      <h1 className="text-2xl font-bold mb-2">Şifremi Unuttum</h1>

      {mutation.isSuccess ? (
        <>
          <p className="text-gray-300">{mutation.data}</p>
          <p className="mt-2 text-sm text-gray-400">
            Gelen kutunu ve spam klasörünü kontrol et. Bağlantı 1 saat
            geçerlidir.
          </p>
          <Link
            to="/login"
            className="mt-6 inline-block bg-white text-gray-900 px-6 py-2 rounded font-semibold"
          >
            Girişe dön
          </Link>
        </>
      ) : (
        <>
          <p className="mb-6 text-sm text-gray-400">
            Hesabına kayıtlı e-posta adresini yaz, sana şifreni sıfırlaman için
            bir bağlantı gönderelim.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta"
              required
              className="px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />

            {mutation.isError && (
              <p className="text-red-400 text-sm">{mutation.error.message}</p>
            )}

            <button
              type="submit"
              disabled={mutation.isPending}
              className="bg-white text-gray-900 px-6 py-2 rounded font-semibold disabled:opacity-50"
            >
              {mutation.isPending ? "Gönderiliyor..." : "Bağlantı Gönder"}
            </button>
          </form>

          <p className="text-sm text-gray-400 mt-4">
            Şifreni hatırladın mı?{" "}
            <Link to="/login" className="text-white underline">
              Giriş yap
            </Link>
          </p>
        </>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
