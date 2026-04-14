"use client";

import { useAppContext } from "../context/AppContext";
import Navbar from "../components/navbar";

export default function MyBookingsPage() {
  const { user, fields } = useAppContext();

  return (
    <>
      <Navbar />
      <div className="pt-24 max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-white mb-6">Мои бронирования</h1>
        {!user ? (
          <p className="text-white/50 text-center py-10">Войдите чтобы увидеть свои бронирования</p>
        ) : (
          <div className="space-y-4">
            <p className="text-white/70">Здесь будут ваши бронирования</p>
          </div>
        )}
      </div>
    </>
  );
}