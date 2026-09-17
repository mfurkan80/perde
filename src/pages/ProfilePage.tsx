import { useAppSelector } from "../store/hooks";

const ProfilePage = () => {
  const user = useAppSelector((state) => state.auth.user);
  if (!user) {
    return null;
  }
  return (
    <div className="max-w-md mx-auto mt-12">
      <h1 className="text-2xl font-bold mb-6">Profil</h1>

      <div className="bg-gray-900 rounded-lg p-6 flex flex-col gap-4">
        <div>
          <p className="text-sm text-gray-400">Kullanıcı adı</p>
          <p className="font-medium">{user.username}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">E-posta</p>
          <p className="font-medium">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
