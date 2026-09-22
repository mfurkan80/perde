import { useMutation } from "@tanstack/react-query";
import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { sendContactMessage } from "../api/contact";
import { useAppSelector } from "../store/hooks";
import type { ContactPayload } from "../types/contact";

const emptyForm: ContactPayload = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

type FormErrors = Partial<Record<keyof ContactPayload, string>>;

const validate = (form: ContactPayload): FormErrors => {
  const errors: FormErrors = {};

  const name = form.name.trim();
  const email = form.email.trim();
  const subject = form.subject.trim();
  const message = form.message.trim();
  if (name.length < 2 || name.length > 100) {
    errors.name = "İsim 2 ile 100 karakter arasında olmalıdır.";
  }

  if (!email) {
    errors.email = "E-posta adresi zorunludur.";
  } else if (!email.includes("@")) {
    errors.email = "Geçerli bir e-posta adresi giriniz.";
  } else if (email.length > 255) {
    errors.email = "E-posta adresi en fazla 255 karakter olabilir.";
  }

  if (subject.length < 3 || subject.length > 150) {
    errors.subject = "Konu 3 ile 150 karakter arasında olmalıdır.";
  }

  if (message.length < 10 || message.length > 2000) {
    errors.message = "Mesaj 10 ile 2000 karakter arasında olmalıdır.";
  }

  return errors;
};

const ContactPage = () => {
  const [form, setForm] = useState<ContactPayload>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const token = useAppSelector((state) => state.auth.token);

  const mutation = useMutation({
    mutationFn: () => sendContactMessage(form, token),
    onSuccess: () => {
      setForm(emptyForm);
      setTimeout(() => {
        mutation.reset();
      }, 3000);
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const newErrors = validate(form);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    mutation.mutate();
  };

  return (
    <div className="max-w-xl mx-auto mt-12">
      <h1 className="text-2xl font-bold mb-2">İletişim</h1>
      <p className="text-gray-400 mb-6">
        Soru, öneri veya sorun bildirimi için bize yazın.
      </p>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Adınız"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="E-posta adresiniz"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Konu"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          {errors.subject && (
            <p className="text-red-400 text-sm mt-1">{errors.subject}</p>
          )}
        </div>

        <div>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Mesajınız"
            rows={6}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 resize-none"
          />
          <p className="text-xs text-gray-500 text-right">
            {form.message.length} / 2000
          </p>
          {errors.message && (
            <p className="text-red-400 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        {mutation.isError && (
          <p className="text-red-400 text-sm">{mutation.error.message}</p>
        )}
        {mutation.isSuccess && (
          <p className="text-green-400 text-sm">
            Mesajınız alındı, teşekkürler.
          </p>
        )}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-white text-gray-900 px-6 py-2 rounded font-semibold disabled:opacity-50"
        >
          {mutation.isPending ? "Gönderiliyor..." : "Gönder"}
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
