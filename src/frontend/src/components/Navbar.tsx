import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Page } from "../App";
import { useActor } from "../hooks/useActor";

const BURGUNDY = "#2A0715";
const GOLD = "#C8A24A";

type NavbarProps = {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
};

const navLinks: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Shop", page: "catalog" },
  { label: "About", page: "about" },
  { label: "Contact", page: "contact" },
  { label: "Admin", page: "admin" },
];

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const { actor } = useActor();
  const [storeName, setStoreName] = useState("Viraasa Jewels");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!actor) return;
    actor
      .getStoreInfo()
      .then((info) => {
        if (info.name) setStoreName(info.name);
      })
      .catch(() => {});
  }, [actor]);

  return (
    <header
      style={{
        backgroundColor: BURGUNDY,
        borderTop: `2px solid ${GOLD}`,
        borderBottom: `1px solid ${GOLD}40`,
      }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            data-ocid="nav.home.link"
            onClick={() => setCurrentPage("home")}
            className="flex flex-col items-start group"
          >
            <span
              style={{
                color: GOLD,
                fontFamily: "Cinzel, serif",
                letterSpacing: "0.15em",
              }}
              className="text-xl md:text-2xl font-semibold tracking-widest transition-opacity group-hover:opacity-80"
            >
              {storeName.toUpperCase()}
            </span>
            <span
              style={{
                color: `${GOLD}99`,
                fontFamily: "Cormorant Garamond, serif",
              }}
              className="text-xs italic tracking-widest hidden sm:block"
            >
              Fine Indian Jewellery
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.page}
                data-ocid={`nav.${link.page}.link`}
                onClick={() => setCurrentPage(link.page)}
                style={{
                  color: currentPage === link.page ? GOLD : `${GOLD}CC`,
                  fontFamily: "Cinzel, serif",
                  borderBottom:
                    currentPage === link.page
                      ? `1px solid ${GOLD}`
                      : "1px solid transparent",
                }}
                className="text-xs tracking-widest uppercase pb-1 transition-all hover:opacity-100 hover:border-current"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden p-2"
            style={{ color: GOLD }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            style={{ borderTop: `1px solid ${GOLD}40` }}
            className="md:hidden py-4 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.page}
                data-ocid={`nav.mobile.${link.page}.link`}
                onClick={() => {
                  setCurrentPage(link.page);
                  setMobileOpen(false);
                }}
                style={{
                  color: currentPage === link.page ? GOLD : `${GOLD}CC`,
                  fontFamily: "Cinzel, serif",
                }}
                className="text-sm tracking-widest uppercase text-left px-2 py-1"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
