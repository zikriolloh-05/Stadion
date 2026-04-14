"use client";

import React, { useState } from "react";
import { MapPin, User } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import LoginModal from "./LoginModal";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { city, setCity, user, isLoginOpen, setIsLoginOpen } = useAppContext();
  const pathname = usePathname();

  const tabs = [
    { id: "fields", label: "Поля", href: "/" },
    { id: "bookings", label: "Мои брони", href: "/my-bookings" },
    { id: "about", label: "О нас", href: "/about" }
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#0a1210]/95 backdrop-blur-xl border-b border-white/10">
        <div className="px-4 md:px-6 py-3 flex items-center justify-between">
          
          {/* Левая часть: Логотип */}
          <Link href="/" className="flex items-center gap-0.5 hover:opacity-80 transition">
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white">
              STADI
            </span>
            <span className="text-xl md:text-2xl text-[#e9c400]">⚽</span>
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white">
              N
            </span>
          </Link>

          {/* Центр: Навигационные вкладки */}
          <ul className="flex items-center gap-6 md:gap-8">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <Link
                  href={tab.href}
                  className={`relative py-1 text-sm md:text-base font-medium transition-colors ${
                    pathname === tab.href 
                      ? "text-[#e9c400]" 
                      : "text-white/60 hover:text-white/80"
                  }`}
                >
                  {tab.label}
                  {pathname === tab.href && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#e9c400] rounded-full"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Правая часть: Город + Логин */}
          <div className="flex items-center gap-4">
            {/* Выбор города */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 text-white/80 hover:text-[#e9c400] transition">
                <MapPin size={16} className="text-[#e9c400]" />
                <span className="text-sm font-medium">{city === "Dushanbe" ? "Душанбе" : "Худжанд"}</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Выпадающий список */}
              <div className="absolute top-full right-0 mt-2 w-36 bg-[#15221a] rounded-xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <ul className="py-2">
                  <li>
                    <button
                      onClick={() => setCity("Dushanbe")}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition ${
                        city === "Dushanbe" ? "text-[#e9c400]" : "text-white/70"
                      }`}
                    >
                      Душанбе
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setCity("Khujand")}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition ${
                        city === "Khujand" ? "text-[#e9c400]" : "text-white/70"
                      }`}
                    >
                      Худжанд
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Кнопка логина */}
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="flex items-center gap-2 bg-[#e9c400] text-[#09160e] px-3 md:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider hover:scale-105 transition-transform"
            >
              <User size={14} />
              {user ? user.firstName : "Log In"}
            </button>
          </div>
        </div>
      </nav>

      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
    </>
  );
}