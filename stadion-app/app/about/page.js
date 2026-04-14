"use client";

import Navbar from "../components/navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="pt-24 max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-white mb-6">О нас</h1>
        <div className="space-y-4 text-white/70">
          <p>STADION ⚽ — платформа для бронирования футбольных полей в Таджикистане.</p>
          <p>Мы помогаем найти и забронировать поле в Душанбе, Худжанде и других городах.</p>
          <p>Профессиональное покрытие, удобное время и онлайн-оплата.</p>
        </div>
      </div>
    </>
  );
}