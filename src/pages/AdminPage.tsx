import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchAdminMessages } from "../api/admin";
import AdminComments from "../components/AdminComments";
import AdminMessages from "../components/AdminMessages";
import AdminUsers from "../components/AdminUsers";
import { useAppSelector } from "../store/hooks";

type Section = "comments" | "messages" | "users";

const AdminPage = () => {
  const token = useAppSelector((state) => state.auth.token);
  const [section, setSection] = useState<Section>("comments");

  const { data: messages } = useQuery({
    queryKey: ["admin", "messages"],
    queryFn: () => fetchAdminMessages(token!),
  });

  const unreadCount =
    messages?.filter((message) => !message.isRead).length ?? 0;

  const sections: { value: Section; label: string; badge?: number }[] = [
    { value: "comments", label: "Yorumlar" },
    { value: "messages", label: "Mesajlar", badge: unreadCount },
    { value: "users", label: "Kullanıcılar" },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold md:text-3xl">Admin Paneli</h1>

      <div className="mt-6 mb-8 flex flex-wrap gap-2">
        {sections.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setSection(item.value)}
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              section === item.value
                ? "bg-white text-gray-900"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {item.label}
            {item.badge ? (
              <span className="rounded-full bg-yellow-400 px-2 text-xs text-gray-900">
                {item.badge}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {section === "comments" && <AdminComments />}
      {section === "messages" && <AdminMessages />}
      {section === "users" && <AdminUsers />}
    </div>
  );
};

export default AdminPage;
