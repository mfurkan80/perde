import { useMutation } from "@tanstack/react-query";
import { useState, type SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AuthError, loginUser, resendVerification } from "../api/auth";
import { setCredentials } from "../store/authSlice";
import { SITE_NAME } from "../config";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: () => loginUser(email, password),
    onSuccess: (data) => {
      dispatch(setCredentials({ user: data.user, token: data.token }));
      navigate("/");
    },
  });

  const resendMutation = useMutation({
    mutationFn: () => resendVerification(email),
  });

  const needsVerification =
    mutation.error instanceof AuthError &&
    mutation.error.code === "EMAIL_NOT_VERIFIED";

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <title>{`Giriş Yap - ${SITE_NAME}`}</title>
      <h1 className="text-2xl font-bold mb-6">Giriş Yap</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-posta"
          className="px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifre"
          className="px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        />

        <Link
          to="/forgot-password"
          className="-mt-2 self-end text-sm text-gray-400 hover:text-white"
        >
          Şifremi unuttum
        </Link>

        {mutation.isError && (
          <p className="text-red-400 text-sm">{mutation.error.message}</p>
        )}

        {needsVerification && (
          <div className="rounded border border-gray-700 bg-gray-900 p-3 text-sm">
            {resendMutation.isSuccess ? (
              <p className="text-gray-300">{resendMutation.data}</p>
            ) : (
              <>
                <p className="text-gray-400">Doğrulama e-postası gelmedi mi?</p>
                <button
                  type="button"
                  onClick={() => resendMutation.mutate()}
                  disabled={resendMutation.isPending}
                  className="mt-2 font-semibold text-white underline disabled:opacity-50"
                >
                  {resendMutation.isPending
                    ? "Gönderiliyor..."
                    : "Doğrulama e-postasını tekrar gönder"}
                </button>
                {resendMutation.isError && (
                  <p className="mt-2 text-red-400">
                    {resendMutation.error.message}
                  </p>
                )}
              </>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-white text-gray-900 px-6 py-2 rounded font-semibold disabled:opacity-50"
        >
          {mutation.isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>
      </form>

      <p className="text-sm text-gray-400 mt-4">
        Hesabın yok mu?{" "}
        <Link to="/register" className="text-white underline">
          Kayıt ol
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
