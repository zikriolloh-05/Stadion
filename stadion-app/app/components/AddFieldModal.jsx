"use client";

import { useState, useRef } from "react";
import { X, Upload, MapPin, Clock } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function AddFieldModal({ isOpen, onClose }) {
  const { addField, city } = useAppContext();
  const [photos, setPhotos] = useState([]);
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [openTime, setOpenTime] = useState("15:00");
  const [closeTime, setCloseTime] = useState("21:00");
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const timeOptions = [];
  for (let i = 0; i < 24; i++) {
    timeOptions.push(`${i.toString().padStart(2, "0")}:00`);
  }

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map((file) => URL.createObjectURL(file));
    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Название поля не может быть пустым";
    if (photos.length === 0) newErrors.photos = "Добавьте хотя бы одно фото";
    if (!location.trim()) newErrors.location = "Местоположение не может быть пустым";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      addField({
        name: name,
        location: location,
        photos: photos,
        price: price || "200 сомони/час",
        workingHours: { open: openTime, close: closeTime },
      });
      // Очистка формы
      setName("");
      setPhotos([]);
      setLocation("");
      setPrice("");
      setOpenTime("15:00");
      setCloseTime("21:00");
      onClose();
      alert("✅ Поле успешно добавлено!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#15221a] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative border border-white/10">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 text-center">Добавить поле</h2>

        <div className="space-y-5">
          {/* Название поля */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Название поля</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Например: Арена-Центр"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-[#e9c400] focus:outline-none"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Фото поля */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Добавить фото</label>
            <div
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed border-white/30 rounded-xl p-6 text-center cursor-pointer hover:border-[#e9c400] transition"
            >
              <Upload className="mx-auto text-white/50 mb-2" size={32} />
              <p className="text-sm text-white/50">Нажмите для загрузки фото</p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>
            {photos.length > 0 && (
              <div className="flex gap-2 mt-3 overflow-x-auto">
                {photos.map((photo, idx) => (
                  <img key={idx} src={photo} alt={`Фото ${idx + 1}`} className="w-20 h-20 object-cover rounded-lg" />
                ))}
              </div>
            )}
            {errors.photos && <p className="text-red-400 text-sm mt-1">{errors.photos}</p>}
          </div>

          {/* Местоположение */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Местоположение</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Адрес поля"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-[#e9c400] focus:outline-none"
              />
              <button className="px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20">
                <MapPin size={20} className="text-white/70" />
              </button>
            </div>
            {errors.location && <p className="text-red-400 text-sm mt-1">{errors.location}</p>}
          </div>

          {/* Цена */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Цена (сомони/час)</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="200"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-[#e9c400] focus:outline-none"
            />
          </div>

          {/* Время работы */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Время работы</label>
            <div className="flex gap-3 items-center">
              <select
                value={openTime}
                onChange={(e) => setOpenTime(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:border-[#e9c400] focus:outline-none"
              >
                {timeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <span className="text-white/50">—</span>
              <select
                value={closeTime}
                onChange={(e) => setCloseTime(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:border-[#e9c400] focus:outline-none"
              >
                {timeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <Clock size={20} className="text-white/50" />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-xl bg-[#e9c400] text-[#09160e] font-medium hover:bg-[#d4b000] transition mt-4"
          >
            Добавить поле
          </button>
        </div>
      </div>
    </div>
  );
}