import { useQuery } from "@tanstack/react-query";
import { fetchAdminMessages } from "../api/admin";
import { useAppSelector } from "../store/hooks";
import AdminMessageCard from "./AdminMessageCard";
import Spinner from "./Spinner";

const AdminMessages = () => {
  const token = useAppSelector((state) => state.auth.token);

  const {
    data: messages,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin", "messages"],
    queryFn: () => fetchAdminMessages(token!),
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-red-400">{error.message}</p>;
  }

  if (!messages || messages.length === 0) {
    return <p className="py-12 text-center text-gray-400">Henüz mesaj yok.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {messages.map((message) => (
        <AdminMessageCard key={message.id} message={message} />
      ))}
    </ul>
  );
};

export default AdminMessages;
