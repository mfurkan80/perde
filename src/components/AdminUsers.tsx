import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchAdminUsers } from "../api/admin";
import { useAppSelector } from "../store/hooks";
import AdminUserCard from "./AdminUserCard";
import Spinner from "./Spinner";

const AdminUsers = () => {
  const token = useAppSelector((state) => state.auth.token);
  const [search, setSearch] = useState("");

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: () => fetchAdminUsers(token!),
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-red-400">{error.message}</p>;
  }

  if (!users || users.length === 0) {
    return (
      <p className="py-12 text-center text-gray-400">Henüz kullanıcı yok.</p>
    );
  }

  const query = search.trim().toLocaleLowerCase("tr-TR");
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLocaleLowerCase("tr-TR").includes(query) ||
      user.email.toLocaleLowerCase("tr-TR").includes(query),
  );

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Kullanıcı adı veya e-posta ara..."
          className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm focus:ring-2 focus:ring-gray-600 focus:outline-none sm:max-w-xs"
        />
        <p className="text-sm text-gray-400">
          {query
            ? `${filteredUsers.length} / ${users.length} kullanıcı`
            : `${users.length} kullanıcı`}
        </p>
      </div>

      {filteredUsers.length === 0 ? (
        <p className="py-12 text-center text-gray-400">
          "{search.trim()}" ile eşleşen kullanıcı yok.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {filteredUsers.map((user) => (
            <AdminUserCard key={user.id} user={user} />
          ))}
        </ul>
      )}
    </>
  );
};

export default AdminUsers;
