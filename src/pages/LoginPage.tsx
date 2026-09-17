import { useMutation } from "@tanstack/react-query";
import { useState, type SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { setCredentials } from "../store/authSlice";

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

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="max-w-md mx-auto mt-12">
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

        {mutation.isError && (
          <p className="text-red-400 text-sm">{mutation.error.message}</p>
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
