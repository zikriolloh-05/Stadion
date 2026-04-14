"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function LoginModal({ onClose }) {
  const { setUser } = useAppContext();
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!phone.trim()) newErrors.phone = "Номер телефона не может быть пустым";
    if (!firstName.trim()) newErrors.firstName = "Имя не может быть пустым";
    if (!lastName.trim()) newErrors.lastName = "Фамилия не может быть пустой";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setUser({ phone, firstName, lastName });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#15221a] rounded-3xl w-full max-w-md p-6 relative border border-white/10">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Вход в аккаунт
        </h2>

        <div className="space-y-4">
          <div>
            <input
              type="tel"
              placeholder="Номер телефона"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-[#e9c400] focus:outline-none"
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Имя"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-[#e9c400] focus:outline-none"
            />
            {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Фамилия"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-[#e9c400] focus:outline-none"
            />
            {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-white/30 text-white font-medium hover:bg-white/10"
            >
              Отменить
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 rounded-xl bg-[#e9c400] text-[#09160e] font-medium hover:bg-[#d4b000]"
            >
              ОК
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}