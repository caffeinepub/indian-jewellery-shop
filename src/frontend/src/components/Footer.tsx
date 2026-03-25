import { useEffect, useState } from "react";
import type { Page } from "../App";
import { useActor } from "../hooks/useActor";

const BURGUNDY = "#2A0715";
const GOLD = "#C8A24A";
const CREAM = "#F6F1EA";

type FooterProps = {
  setCurrentPage: (page: Page) => void;
};

const quickLinks: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Shop", page: "catalog" },
  { label: "About Us", page: "about" },
  { label: "Contact", page: "contact" },
];

export default function Footer({ setCurrentPage }: FooterProps) {
  const { actor } = useActor();
  const [storeInfo, setStoreInfo] = useState({
    name: "Viraasa Jewels",
    address: "123 Jewellery Market, Connaught Place, New Delhi - 110001",
    phone: "+91 98765 43210",
    whatsapp: "919876543210",
    email: "contact@viraasajewels.com",
    tagline: "Timeless elegance, rooted in tradition.",
  });

  useEffect(() => {
    if (!actor) return;
    actor
      .getStoreInfo()
      .then((info) => {
        setStoreInfo((prev) => ({
          name: info.name || prev.name,
          address: info.address || prev.address,
          phone: info.phone || prev.phone,
          whatsapp: info.whatsapp || prev.whatsapp,
          email: info.email || prev.email,
          tagline: info.tagline || prev.tagline,
        }));
      })
      .catch(() => {});
  }, [actor]);

  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      style={{ backgroundColor: BURGUNDY, borderTop: `1px solid ${GOLD}40` }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3
              style={{
                color: GOLD,
                fontFamily: "Cinzel, serif",
                letterSpacing: "0.12em",
              }}
              className="text-xl font-semibold mb-2"
            >
              {storeInfo.name.toUpperCase()}
            </h3>
            <p
              style={{
                color: `${CREAM}99`,
                fontFamily: "Cormorant Garamond, serif",
              }}
              className="italic text-sm mb-4"
            >
              {storeInfo.tagline}
            </p>
            <p
              style={{ color: `${CREAM}80` }}
              className="text-sm leading-relaxed"
            >
              {storeInfo.address}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                color: GOLD,
                fontFamily: "Cinzel, serif",
                letterSpacing: "0.1em",
              }}
              className="text-sm font-semibold uppercase tracking-widest mb-4"
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    type="button"
                    data-ocid={`footer.${link.page}.link`}
                    onClick={() => setCurrentPage(link.page)}
                    style={{ color: `${CREAM}99` }}
                    className="text-sm hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                color: GOLD,
                fontFamily: "Cinzel, serif",
                letterSpacing: "0.1em",
              }}
              className="text-sm font-semibold uppercase tracking-widest mb-4"
            >
              Contact Us
            </h4>
            <div className="space-y-2">
              <a
                href={`tel:${storeInfo.phone}`}
                style={{ color: `${CREAM}99` }}
                className="block text-sm hover:opacity-100"
              >
                📞 {storeInfo.phone}
              </a>
              <a
                href={`mailto:${storeInfo.email}`}
                style={{ color: `${CREAM}99` }}
                className="block text-sm hover:opacity-100"
              >
                ✉️ {storeInfo.email}
              </a>
              {storeInfo.whatsapp && (
                <a
                  href={`https://wa.me/${storeInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded mt-1"
                  style={{ backgroundColor: "#25D366", color: "#fff" }}
                >
                  💬 WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>

        <div
          style={{ borderTop: `1px solid ${GOLD}30`, color: `${CREAM}50` }}
          className="mt-10 pt-6 text-center text-xs"
        >
          © {year} {storeInfo.name}. All rights reserved. &nbsp;|&nbsp; Built
          with ♥ using{" "}
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: GOLD }}
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
