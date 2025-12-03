import { Inter } from "next/font/google";
import "./globals.css";
// Impor komponen yang baru kita buat
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Usaha Gxyer88",
  description: "Platform Jual Beli Barang Bekas Berkualitas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${inter.className} flex flex-col min-h-screen bg-[#006BFF]`}>
        <Header />
        {/* children adalah tempat konten utama (page.js) akan muncul */}
        {children}
        <Footer />
      </body>
    </html>
  );
}