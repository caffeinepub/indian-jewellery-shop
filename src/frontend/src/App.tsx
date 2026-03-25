import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import CatalogPage from "./pages/CatalogPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";

export type Page = "home" | "catalog" | "about" | "contact" | "admin";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage setCurrentPage={setCurrentPage} />;
      case "catalog":
        return <CatalogPage />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      case "admin":
        return <AdminPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1">{renderPage()}</main>
      <Footer setCurrentPage={setCurrentPage} />
      <Toaster richColors position="top-right" />
    </div>
  );
}
