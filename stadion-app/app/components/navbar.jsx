"use client";

import React, { useState, useEffect } from "react";
import { MapPin, User, Menu, X } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import LoginModal from "./LoginModal";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { city, setCity, user, isLoginOpen, setIsLoginOpen } = useAppContext();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkTablet = () => {
      setIsTablet(window.innerWidth >= 640 && window.innerWidth <= 768);
    };
    checkTablet();
    window.addEventListener("resize", checkTablet);
    return () => window.removeEventListener("resize", checkTablet);
  }, []);

  const tabs = [
    { id: "fields", label: "Поля", href: "/" },
    { id: "bookings", label: "Мои брони", href: "/my-bookings" },
    { id: "about", label: "О нас", href: "/about" }
  ];

  const handleTabClick = () => {
    setIsMobileMenuOpen(false);
  };

  const menuWidth = isTablet ? "w-[60%]" : "w-full";

  return (
    <>
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/10">
        <div className="px-4 md:px-6 py-3 flex items-center justify-between">
          
          {/* Логотип */}
          <Link href="/" className="flex items-center gap-0.5 hover:opacity-80 transition z-10">
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white">STADI</span>
            <span className="text-xl md:text-2xl text-[#e9c400]">⚽</span>
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white">N</span>
          </Link>

          {/* Десктопная навигация */}
          <ul className="hidden md:flex items-center gap-6 md:gap-8">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <Link
                  href={tab.href}
                  className={`relative py-1 text-sm md:text-base font-medium transition-colors ${
                    pathname === tab.href ? "text-[#e9c400]" : "text-white/60 hover:text-white/80"
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

          {/* Правая часть */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Город */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 text-white/80 hover:text-[#e9c400] transition">
                <MapPin size={16} className="text-[#e9c400]" />
                <span className="text-sm font-medium hidden sm:inline">
                  {city === "Dushanbe" ? "Душанбе" : "Худжанд"}
                </span>
                <span className="text-sm font-medium sm:hidden">
                  {city === "Dushanbe" ? "Душ" : "Худж"}
                </span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-36 bg-[#15221a] rounded-xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <ul className="py-2">
                  <li>
                    <button onClick={() => setCity("Dushanbe")} className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition ${city === "Dushanbe" ? "text-[#e9c400]" : "text-white/70"}`}>Душанбе</button>
                  </li>
                  <li>
                    <button onClick={() => setCity("Khujand")} className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition ${city === "Khujand" ? "text-[#e9c400]" : "text-white/70"}`}>Худжанд</button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Логин */}
            <button onClick={() => setIsLoginOpen(true)} className="flex items-center gap-2 bg-[#e9c400] text-[#09160e] px-3 md:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider hover:scale-105 transition-transform">
              <User size={14} />
              <span className="hidden sm:inline">{user ? user.firstName : "Log In"}</span>
              <span className="sm:hidden">{user ? user.firstName?.[0] : "L"}</span>
            </button>

            {/* Бургер-меню */}
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition">
              <Menu size={20} className="text-white" />
            </button>
          </div>
        </div>
      </nav>

      {/* ========== МОБИЛЬНОЕ МЕНЮ (ЗАМЕНИТЕ ЭТУ ЧАСТЬ) ========== */}
      {isMobileMenuOpen && (
        <>
          {/* Затемнение фона */}
          <div 
            className="fixed inset-0 z-40 bg-black/60 md:hidden" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Само меню */}
          <div className={`fixed top-0 ${isTablet ? 'right-0' : 'inset-x-0'} z-50 bg-[#0b3026ee] backdrop-blur-xl md:hidden ${menuWidth} ${isTablet ? 'h-full rounded-l-2xl' : 'h-full'}`}>
            
            {/* Заголовок меню с логотипом и кнопкой закрытия */}
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div className="flex items-center gap-0.5">
                <span className="text-2xl font-black tracking-tighter text-white">STADI</span>
                <span className="text-2xl text-[#e9c400]">⚽</span>
                <span className="text-2xl font-black tracking-tighter text-white">N</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
              >
                <X size={22} className="text-white" />
              </button>
            </div>

            {/* Навигационные ссылки */}
            <div className="flex flex-col p-5">
              {tabs.map((tab, index) => (
                <div key={tab.id}>
                  <Link
                    href={tab.href}
                    onClick={handleTabClick}
                    className={`flex items-center justify-between py-5 text-lg font-medium transition-colors ${
                      pathname === tab.href 
                        ? "text-[#e9c400]" 
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <span>{tab.label}</span>
                    {pathname === tab.href && (
                      <span className="w-2 h-2 rounded-full bg-[#e9c400]"></span>
                    )}
                  </Link>
                  {index < tabs.length - 1 && (
                    <div className="h-px bg-white/10"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Дополнительная информация внизу меню */}
            <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-white/10">
              <p className="text-white/30 text-xs text-center">
                Версия 1.0 | © 2025 Stadion
              </p>
            </div>
          </div>
        </>
      )}
      {/* ========== КОНЕЦ МОБИЛЬНОГО МЕНЮ ========== */}

      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
    </>
  );
}