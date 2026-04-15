"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

// Демо-поля для Душанбе
const defaultDushanbeFields = [
  {
    id: 1,
    name: "Арена-1",
    location: "пр. Рудаки, 45",
    photos: ["https://picsum.photos/id/167/800/500"],
    workingHours: { open: "08:00", close: "23:00" },
    price: "250 сомони/час",
    bookings: [],
  },
  {
    id: 2,
    name: "Футбол Сити",
    location: "ул. Айни, 78",
    photos: ["https://picsum.photos/id/168/800/500"],
    workingHours: { open: "09:00", close: "22:00" },
    price: "300 сомони/час",
    bookings: [],
  },
  {
    id: 3,
    name: "Стадион-Центр",
    location: "пр. Саади Шерози, 23",
    photos: ["https://picsum.photos/id/169/800/500"],
    workingHours: { open: "07:00", close: "21:00" },
    price: "350 сомони/час",
    bookings: [],
  },
  {
    id: 4,
    name: "Зеленый Газон",
    location: "ул. Сомони, 101",
    photos: ["https://picsum.photos/id/170/800/500"],
    workingHours: { open: "10:00", close: "23:00" },
    price: "280 сомони/час",
    bookings: [],
  },
];

export function AppProvider({ children }) {
  const [city, setCity] = useState("Dushanbe");
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [fields, setFields] = useState([]);
  const [allFields, setAllFields] = useState([]); // Сохраняем все добавленные поля

  // Загрузка данных
  useEffect(() => {
    const savedFields = localStorage.getItem("fields");
    const savedUser = localStorage.getItem("user");
    
    if (savedFields) {
      const parsed = JSON.parse(savedFields);
      setAllFields(parsed);
      setFields(parsed);
    } else {
      setAllFields(defaultDushanbeFields);
      setFields(defaultDushanbeFields);
    }
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Сохранение данных
  useEffect(() => {
    if (allFields.length > 0) {
      localStorage.setItem("fields", JSON.stringify(allFields));
    }
  }, [allFields]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Обновление отображаемых полей при смене города
  useEffect(() => {
    if (city === "Dushanbe") {
      setFields(defaultDushanbeFields);
    } else {
      // Для Худжанда показываем только добавленные поля (id > 4)
      const khujandFields = allFields.filter(f => f.id > 4);
      setFields(khujandFields);
    }
  }, [city, allFields]);

  // Функция для добавления нового поля
  const addField = (newField) => {
    const fieldWithId = { ...newField, id: Date.now(), bookings: [] };
    setAllFields(prev => [...prev, fieldWithId]);
    if (city === "Khujand") {
      setFields(prev => [...prev, fieldWithId]);
    }
  };

  // Функция для добавления бронирования
  const addBooking = (fieldId, bookingTime) => {
    setAllFields(prev => 
      prev.map(field => 
        field.id === fieldId 
          ? { ...field, bookings: [...field.bookings, bookingTime] }
          : field
      )
    );
    
    // Обновляем отображаемые поля
    setFields(prev => 
      prev.map(field => 
        field.id === fieldId 
          ? { ...field, bookings: [...field.bookings, bookingTime] }
          : field
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        city,
        setCity,
        user,
        setUser,
        isLoginOpen,
        setIsLoginOpen,
        fields,
        addField,
        addBooking,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}