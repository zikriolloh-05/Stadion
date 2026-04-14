"use client";

import { useParams } from "next/navigation";
import { useAppContext } from "../../context/AppContext";
import { useState } from "react";
import { X } from "lucide-react";
import Navbar from "../../components/navbar";
// Модальное окно для бронирования
function BookingModal({ isOpen, onClose, field, selectedTime, onConfirm }) {
  const [cardNumber, setCardNumber] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (cardNumber.trim()) {
      onConfirm(selectedTime);
      onClose();
    } else {
      alert("Введите номер карты");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#15221a] rounded-3xl w-full max-w-md p-6 relative border border-white/10">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold text-white mb-4">Оплата бронирования</h2>
        <p className="text-white/70 mb-4">
          {field?.name} — {selectedTime}
        </p>
        <p className="text-[#e9c400] text-sm mb-4">{field?.price || "250 сомони/час"}</p>
        <input
          type="text"
          placeholder="Номер карты"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-[#e9c400] focus:outline-none mb-4"
        />
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2 border border-white/30 rounded-xl text-white hover:bg-white/10">Отмена</button>
          <button onClick={handleSubmit} className="flex-1 py-2 bg-[#e9c400] text-[#09160e] rounded-xl font-medium">ОК</button>
        </div>
      </div>
    </div>
  );
}

export default function FieldPage() {
  const { id } = useParams();
  const { fields, addBooking } = useAppContext();
  const [selectedTime, setSelectedTime] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  const field = fields.find(f => f.id === parseInt(id));
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  if (!field) {
    return (
      <>
        <Navbar onAddFieldClick={() => {}} />
        <div className="flex items-center justify-center h-screen">
          <p className="text-white/50">Поле не найдено</p>
        </div>
      </>
    );
  }

  // Генерация времени работы
  const workingHours = [];
  const openHour = parseInt(field.workingHours?.open || "08");
  const closeHour = parseInt(field.workingHours?.close || "23");
  
  for (let hour = openHour; hour < closeHour; hour++) {
    const timeString = `${hour.toString().padStart(2, "0")}:00`;
    const isBooked = field.bookings?.includes(`${selectedDate} ${timeString}`);
    workingHours.push({ time: timeString, isBooked });
  }

  const handleBooking = (slot) => {
    if (!slot.isBooked) {
      setSelectedTime(`${selectedDate} ${slot.time}`);
      setIsBookingOpen(true);
    }
  };

  const handleConfirmBooking = (bookingTime) => {
    addBooking(field.id, bookingTime);
    alert(`✅ Поле "${field.name}" забронировано на ${bookingTime}`);
  };

  return (
    <>
      <Navbar onAddFieldClick={() => {}} />
      
      <main className="max-w-4xl mx-auto px-4 py-6 mt-16">
        {/* Фото поля */}
        <div className="flex justify-center mb-6">
          <div className="w-full md:w-[60%]">
            <img
              src={field.photos?.[0] || "https://picsum.photos/id/167/800/500"}
              alt={field.name}
              className="w-full h-64 md:h-80 object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Информация о поле */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white">{field.name}</h1>
          <p className="text-white/50 mt-1">{field.location}</p>
          <p className="text-[#e9c400] font-bold text-xl mt-2">{field.price || "250 сомони/час"}</p>
        </div>

        {/* Выбор даты */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white/70 mb-2">Выберите дату</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:border-[#e9c400] focus:outline-none"
          />
        </div>

        {/* Свободное время */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">🟢 Свободное время</h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {workingHours.filter(h => !h.isBooked).length === 0 ? (
              <p className="text-white/50">Нет свободного времени на эту дату</p>
            ) : (
              workingHours.filter(h => !h.isBooked).map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => handleBooking(slot)}
                  className="px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                >
                  {slot.time}
                </button>
              ))
            )}
          </div>

          {/* Занятое время */}
          <h2 className="text-xl font-semibold text-white mb-4">🔴 Занятое время</h2>
          <div className="flex flex-wrap gap-3">
            {workingHours.filter(h => h.isBooked).map((slot) => (
              <button
                key={slot.time}
                disabled
                className="px-5 py-2 bg-white/10 text-white/30 rounded-full cursor-not-allowed"
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      </main>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        field={field}
        selectedTime={selectedTime}
        onConfirm={handleConfirmBooking}
      />
    </>
  );
}