import { useState, type SyntheticEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUser } from "../store/authSlice";
import { updateProfile, updatePassword } from "../api/auth";

const ProfilePage = () => {
  const { user, token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState(user?.username ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [editingUsername, setEditingUsername] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);

  const profileMutation = useMutation({
    mutationFn: () => updateProfile(token!, username, email),
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      setEditingUsername(false);
      setEditingEmail(false);
      setTimeout(() => {
        profileMutation.reset();
      }, 3000);
    },
  });

  const passwordMutation = useMutation({
    mutationFn: () => updatePassword(token!, currentPassword, newPassword),
    onSuccess: () => {
      setCurrentPassword("");
      setNewPassword("");
      setEditingPassword(false);
      setTimeout(() => {
        passwordMutation.reset();
      }, 3000);
    },
  });

  if (!user) return null;

  return (
    <div className="max-w-md mx-auto mt-12">
      <h1 className="text-2xl font-bold mb-6">Profil</h1>

      <div className="bg-gray-900 rounded-lg p-6">
        {/* Kullanıcı adı */}
        <div className="flex items-center justify-between py-3 border-b border-gray-800">
          <div>
            <p className="text-sm text-gray-400">Kullanıcı adı</p>
            {editingUsername ? (
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 px-3 py-1 rounded bg-gray-800 border border-gray-700 focus:outline-none text-white"
                autoFocus
              />
            ) : (
              <p className="font-medium">{user.username}</p>
            )}
          </div>
          <div className="flex gap-2">
            {editingUsername ? (
              <>
                <button
                  onClick={() => profileMutation.mutate()}
                  disabled={profileMutation.isPending}
                  className="text-sm text-green-400 hover:text-green-300 disabled:opacity-50"
                >
                  Kaydet
                </button>
                <button
                  onClick={() => {
                    setUsername(user.username);
                    setEditingUsername(false);
                  }}
                  className="text-sm text-gray-400 hover:text-gray-300"
                >
                  İptal
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditingUsername(true)}
                className="text-sm text-gray-400 hover:text-white"
              >
                Düzenle
              </button>
            )}
          </div>
        </div>

        {/* E-posta */}
        <div className="flex items-center justify-between py-3 border-b border-gray-800">
          <div>
            <p className="text-sm text-gray-400">E-posta</p>
            {editingEmail ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 px-3 py-1 rounded bg-gray-800 border border-gray-700 focus:outline-none text-white"
                autoFocus
              />
            ) : (
              <p className="font-medium">{user.email}</p>
            )}
          </div>
          <div className="flex gap-2">
            {editingEmail ? (
              <>
                <button
                  onClick={() => profileMutation.mutate()}
                  disabled={profileMutation.isPending}
                  className="text-sm text-green-400 hover:text-green-300 disabled:opacity-50"
                >
                  Kaydet
                </button>
                <button
                  onClick={() => {
                    setEmail(user.email);
                    setEditingEmail(false);
                  }}
                  className="text-sm text-gray-400 hover:text-gray-300"
                >
                  İptal
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditingEmail(true)}
                className="text-sm text-gray-400 hover:text-white"
              >
                Düzenle
              </button>
            )}
          </div>
        </div>

        {/* Hata/başarı mesajı */}
        {profileMutation.isError && (
          <p className="text-red-400 text-sm mt-3">
            {profileMutation.error.message}
          </p>
        )}
        {profileMutation.isSuccess && (
          <p className="text-green-400 text-sm mt-3">Profil güncellendi.</p>
        )}

        {/* Şifre */}
        <div className="pt-3">
          {editingPassword ? (
            <form
              onSubmit={(e: SyntheticEvent) => {
                e.preventDefault();
                passwordMutation.mutate();
              }}
              className="flex flex-col gap-3"
            >
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Mevcut şifre"
                className="px-3 py-1 rounded bg-gray-800 border border-gray-700 focus:outline-none text-white"
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Yeni şifre"
                className="px-3 py-1 rounded bg-gray-800 border border-gray-700 focus:outline-none text-white"
              />
              {passwordMutation.isError && (
                <p className="text-red-400 text-sm">
                  {passwordMutation.error.message}
                </p>
              )}
              {passwordMutation.isSuccess && (
                <p className="text-green-400 text-sm">Şifre güncellendi.</p>
              )}
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={passwordMutation.isPending}
                  className="text-sm text-green-400 hover:text-green-300 disabled:opacity-50"
                >
                  {passwordMutation.isPending ? "Kaydediliyor..." : "Kaydet"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPassword("");
                    setNewPassword("");
                    setEditingPassword(false);
                  }}
                  className="text-sm text-gray-400 hover:text-gray-300"
                >
                  İptal
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setEditingPassword(true)}
              className="text-sm text-gray-400 hover:text-white"
            >
              Şifreyi Değiştir
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
