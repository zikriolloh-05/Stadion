"use client";
import { useState } from "react";
import { useAppContext } from "./context/AppContext";
import FieldCard from "./components/FieldCard";
import AddFieldModal from "./components/AddFieldModal";
import Navbar from "./components/navbar";

interface Field {
  id: number;
  name: string;
  location: string;
  photos: string[];
  price: string;
  workingHours: { open: string; close: string };
  bookings: string[];
}

export default function HomePage() {
  const { fields, city } = useAppContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      {/* <Navbar onAddFieldClick={() => setIsAddModalOpen(true)} /> */}

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero секция */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Поле в твоих руках
            Забронируй сейчас
          </h1>
          {city === "Khujand" && (
            <p className="text-white/60 text-lg">
              Худжанд готовится! Будьте первым, кто добавит свое поле.
            </p>
          )}
        </div>

        {/* Сетка карточек полей */}
        {fields.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/40 text-lg mb-4">Нет доступных полей</p>
            {city === "Khujand" && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[#e9c400] text-[#09160e] px-6 py-3 rounded-full font-bold hover:scale-105 transition"
              >
                Добавить своё поле
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map((field: Field) => (
              <FieldCard key={field.id} field={field} />
            ))}
          </div>
        )}
      </main>

      <AddFieldModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </>
  );
}