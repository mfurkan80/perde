import { useMutation } from "@tanstack/react-query";
import { useState, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api/auth";
import { setCredentials } from "../store/authSlice";
import { useAppDispatch } from "../store/hooks";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  const mutation = useMutation({
    mutationFn: async () => {
      await registerUser(email, password, username);
      return loginUser(email, password);
    },
    onSuccess: (data) => {
      dispatch(setCredentials({ user: data.user, token: data.token }));
      navigate("/");
    },
  });
  return (
    <div className="max-w-md mx-auto mt-12">
      <h1 className="text-2xl font-bold mb-6">Kayıt ol</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Kullanıcı adı"
          className="px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
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
          {mutation.isPending ? "Kayıt olunuyor..." : "Kayıt ol"}
        </button>
      </form>

      <p className="text-sm text-gray-400 mt-4">
        Zaten hesabın var mı?{" "}
        <Link to="/login" className="text-white underline">
          Giriş yap
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
