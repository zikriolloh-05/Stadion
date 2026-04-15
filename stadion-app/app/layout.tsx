import "./globals.css";
import { Inter, Lexend } from "next/font/google";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/navbar";

const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });

export const metadata = {
  title: "Stadion | Бронирование футбольных полей",
  description: "Лучшие футбольные поля Таджикистана",
};

// export default function RootLayout({ children }) 
export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
})
{
  return (
    <html lang="ru">
      <body className={`${lexend.variable} font-sans bg-[#09160e] text-white`}>
        <AppProvider>
          <Navbar />
          <main className="pt-20 min-h-screen">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}