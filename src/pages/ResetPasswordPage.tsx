import { useMutation } from "@tanstack/react-query";
import { useState, type SyntheticEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { resetPassword } from "../api/auth";
import { SITE_NAME } from "../config";

const PASSWORD_MIN = 6;

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [formError, setFormError] = useState("");

  const mutation = useMutation({
    mutationFn: () => resetPassword(token, password),
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (password.length < PASSWORD_MIN) {
      setFormError(`Şifre en az ${PASSWORD_MIN} karakter olmalıdır.`);
      return;
    }
    if (password !== passwordAgain) {
      setFormError("Şifreler birbiriyle aynı değil.");
      return;
    }

    setFormError("");
    mutation.mutate();
  };

  const pageTitle = <title>{`Yeni Şifre - ${SITE_NAME}`}</title>;

  if (!token) {
    return (
      <div className="max-w-md mx-auto mt-12">
        {pageTitle}
        <h1 className="text-2xl font-bold mb-2">Bağlantı geçersiz</h1>
        <p className="text-gray-400">
          Bu sayfaya e-postadaki bağlantı ile gelmelisin.
        </p>
        <Link
          to="/forgot-password"
          className="mt-6 inline-block bg-white text-gray-900 px-6 py-2 rounded font-semibold"
        >
          Yeni bağlantı iste
        </Link>
      </div>
    );
  }

  if (mutation.isSuccess) {
    return (
      <div className="max-w-md mx-auto mt-12">
        {pageTitle}
        <h1 className="text-2xl font-bold mb-2">Şifren güncellendi</h1>
        <p className="text-gray-300">{mutation.data}</p>
        <Link
          to="/login"
          className="mt-6 inline-block bg-white text-gray-900 px-6 py-2 rounded font-semibold"
        >
          Giriş Yap
        </Link>
      </div>
    );
  }

  const errorMessage =
    formError || (mutation.isError && mutation.error.message);

  return (
    <div className="max-w-md mx-auto mt-12">
      {pageTitle}
      <h1 className="text-2xl font-bold mb-6">Yeni Şifre Belirle</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Yeni şifre"
          autoComplete="new-password"
          className="px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
        <input
          type="password"
          value={passwordAgain}
          onChange={(e) => setPasswordAgain(e.target.value)}
          placeholder="Yeni şifre (tekrar)"
          autoComplete="new-password"
          className="px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        />

        {errorMessage && <p className="text-red-400 text-sm">{errorMessage}</p>}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-white text-gray-900 px-6 py-2 rounded font-semibold disabled:opacity-50"
        >
          {mutation.isPending ? "Kaydediliyor..." : "Şifreyi Güncelle"}
        </button>
      </form>

      {mutation.isError && (
        <Link
          to="/forgot-password"
          className="mt-4 inline-block text-sm text-white underline"
        >
          Yeni bağlantı iste
        </Link>
      )}
    </div>
  );
};

export default ResetPasswordPage;
