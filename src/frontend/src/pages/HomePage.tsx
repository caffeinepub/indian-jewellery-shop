import { useEffect, useState } from "react";
import type { Page } from "../App";
import type { Product } from "../backend";
import ProductCard from "../components/ProductCard";
import { useActor } from "../hooks/useActor";

const BURGUNDY = "#2A0715";
const BURGUNDY_MID = "#3A0B1E";
const GOLD = "#C8A24A";
const CREAM = "#F6F1EA";

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1n,
    name: "Royal Kundan Necklace",
    description:
      "Exquisite Kundan necklace with 22kt gold plating, intricate meenakari work, and precious stones.",
    priceINR: 45000,
    category: "Necklaces",
    featured: true,
    createdAt: 0n,
  },
  {
    id: 2n,
    name: "Jadau Jhumka Earrings",
    description:
      "Traditional Jadau jhumka with ruby and emerald inlay, crafted by master artisans in Jaipur.",
    priceINR: 18500,
    category: "Earrings",
    featured: true,
    createdAt: 0n,
  },
  {
    id: 3n,
    name: "Polki Maang Tikka",
    description:
      "Handcrafted Polki diamond maang tikka with pearls, perfect for bridal occasions.",
    priceINR: 32000,
    category: "Maang Tikka",
    featured: true,
    createdAt: 0n,
  },
  {
    id: 4n,
    name: "Temple Gold Bangles",
    description:
      "South Indian temple jewellery bangles in 22kt gold with traditional deity motifs and filigree.",
    priceINR: 65000,
    category: "Bangles",
    featured: true,
    createdAt: 0n,
  },
];

const categories = [
  { name: "Necklaces", icon: "♦" },
  { name: "Earrings", icon: "✦" },
  { name: "Bangles", icon: "◎" },
  { name: "Rings", icon: "◇" },
  { name: "Maang Tikka", icon: "✿" },
  { name: "Anklets", icon: "❋" },
  { name: "Bracelets", icon: "⟡" },
  { name: "Pendants", icon: "✧" },
];

const CORNER_DOTS = [15, 30, 45, 60];
const MANDALA_OUTER_ANGLES = [
  0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330,
];
const MANDALA_LINE_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];
const DIVIDER_ITEMS = Array.from({ length: 20 }, (_, i) => i);

const CornerMandala = ({ flip = false }: { flip?: boolean }) => (
  <svg
    viewBox="0 0 120 120"
    width="120"
    height="120"
    style={{ transform: flip ? "scaleX(-1)" : undefined, opacity: 0.25 }}
  >
    <title>Decorative corner</title>
    <path
      d="M0 0 Q60 0 60 60 Q0 60 0 0"
      fill="none"
      stroke={GOLD}
      strokeWidth="1"
    />
    <path
      d="M0 0 Q80 0 80 80 Q0 80 0 0"
      fill="none"
      stroke={GOLD}
      strokeWidth="0.6"
    />
    <circle
      cx="0"
      cy="0"
      r="45"
      fill="none"
      stroke={GOLD}
      strokeWidth="0.5"
      strokeDasharray="3 4"
    />
    <circle
      cx="0"
      cy="0"
      r="60"
      fill="none"
      stroke={GOLD}
      strokeWidth="0.4"
      strokeDasharray="2 5"
    />
    {CORNER_DOTS.map((v) => (
      <circle key={v} cx={v * 0.7} cy={v * 0.3} r="1.5" fill={GOLD} />
    ))}
  </svg>
);

const OrnamentDivider = () => (
  <div style={{ backgroundColor: CREAM }} className="py-3 overflow-hidden">
    <div className="flex items-center justify-center gap-2">
      {DIVIDER_ITEMS.map((i) => (
        <span key={i} style={{ color: GOLD, fontSize: "10px" }}>
          ◆
        </span>
      ))}
    </div>
  </div>
);

type HomePageProps = {
  setCurrentPage: (page: Page) => void;
};

export default function HomePage({ setCurrentPage }: HomePageProps) {
  const { actor } = useActor();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!actor) return;
    setIsLoading(true);
    actor
      .getFeaturedProducts()
      .then((products) => {
        setFeaturedProducts(
          products.length > 0 ? products.slice(0, 4) : SAMPLE_PRODUCTS,
        );
      })
      .catch(() => {
        setFeaturedProducts(SAMPLE_PRODUCTS);
      })
      .finally(() => setIsLoading(false));
  }, [actor]);

  useEffect(() => {
    if (!actor && isLoading) {
      const timer = setTimeout(() => {
        setFeaturedProducts(SAMPLE_PRODUCTS);
        setIsLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [actor, isLoading]);

  return (
    <div>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden flex flex-col items-center justify-center text-center px-4"
        style={{
          background: `linear-gradient(160deg, ${BURGUNDY} 0%, ${BURGUNDY_MID} 60%, #1a0510 100%)`,
          minHeight: "92vh",
        }}
      >
        <div className="absolute top-0 left-0">
          <CornerMandala />
        </div>
        <div className="absolute top-0 right-0">
          <CornerMandala flip />
        </div>
        <div
          className="absolute bottom-0 left-0"
          style={{ transform: "scaleY(-1)" }}
        >
          <CornerMandala />
        </div>
        <div
          className="absolute bottom-0 right-0"
          style={{ transform: "scale(-1)" }}
        >
          <CornerMandala />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <p
            style={{
              color: GOLD,
              fontFamily: "Cormorant Garamond, serif",
              letterSpacing: "0.4em",
            }}
            className="text-sm uppercase tracking-widest mb-6 italic"
          >
            Since 1976 · Celebrating Indian Heritage
          </p>
          <h1
            style={{
              color: GOLD,
              fontFamily: "Cinzel, serif",
              lineHeight: 1.15,
            }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            ELEGANCE.
            <br />
            TRADITION.
            <br />
            VIRAASA.
          </h1>
          <p
            style={{
              color: `${CREAM}CC`,
              fontFamily: "Cormorant Garamond, serif",
            }}
            className="text-xl md:text-2xl italic mb-10 leading-relaxed"
          >
            Where every jewel tells the story of a thousand years of
            craftsmanship.
          </p>
          <button
            type="button"
            data-ocid="hero.primary_button"
            onClick={() => setCurrentPage("catalog")}
            className="px-8 py-4 text-sm tracking-[0.2em] uppercase transition-all hover:opacity-90 hover:-translate-y-0.5"
            style={{
              backgroundColor: GOLD,
              color: BURGUNDY,
              fontFamily: "Cinzel, serif",
              fontWeight: 600,
              border: `1px solid ${GOLD}`,
            }}
          >
            Explore the Collection
          </button>
        </div>
      </section>

      <OrnamentDivider />

      {/* ── Featured Collections ── */}
      <section style={{ backgroundColor: CREAM }} className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p
              style={{ color: GOLD, fontFamily: "Cormorant Garamond, serif" }}
              className="italic text-sm tracking-widest mb-2"
            >
              Handpicked for you
            </p>
            <h2
              style={{
                color: BURGUNDY,
                fontFamily: "Cinzel, serif",
                letterSpacing: "0.15em",
              }}
              className="text-3xl md:text-4xl font-semibold uppercase"
            >
              Featured Collections
            </h2>
            <div className="flex items-center justify-center gap-3 mt-3">
              <span
                style={{ backgroundColor: GOLD }}
                className="h-px w-16 block"
              />
              <span style={{ color: GOLD }} className="text-lg">
                ✦
              </span>
              <span
                style={{ backgroundColor: GOLD }}
                className="h-px w-16 block"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="rounded animate-pulse"
                  style={{ height: "360px", backgroundColor: "#e8e0d4" }}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id.toString()} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <button
              type="button"
              data-ocid="featured.view_all.button"
              onClick={() => setCurrentPage("catalog")}
              className="px-8 py-3 text-xs tracking-widest uppercase border transition-all hover:opacity-80"
              style={{
                borderColor: BURGUNDY,
                color: BURGUNDY,
                fontFamily: "Cinzel, serif",
              }}
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      <OrnamentDivider />

      {/* ── Category Tiles ── */}
      <section style={{ backgroundColor: BURGUNDY }} className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              style={{
                color: GOLD,
                fontFamily: "Cinzel, serif",
                letterSpacing: "0.15em",
              }}
              className="text-3xl md:text-4xl font-semibold uppercase"
            >
              Shop by Category
            </h2>
            <div className="flex items-center justify-center gap-3 mt-3">
              <span
                style={{ backgroundColor: GOLD }}
                className="h-px w-16 block opacity-50"
              />
              <span style={{ color: GOLD }} className="text-lg opacity-50">
                ✦
              </span>
              <span
                style={{ backgroundColor: GOLD }}
                className="h-px w-16 block opacity-50"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat.name}
                data-ocid={`category.${cat.name.toLowerCase().replace(" ", "_")}.button`}
                onClick={() => setCurrentPage("catalog")}
                className="flex flex-col items-center justify-center py-8 px-4 rounded transition-all hover:-translate-y-1 hover:opacity-90"
                style={{
                  border: `1px solid ${GOLD}50`,
                  backgroundColor: `${GOLD}08`,
                }}
              >
                <span style={{ color: GOLD }} className="text-3xl mb-3">
                  {cat.icon}
                </span>
                <span
                  style={{
                    color: CREAM,
                    fontFamily: "Cinzel, serif",
                    letterSpacing: "0.1em",
                  }}
                  className="text-xs uppercase tracking-widest"
                >
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <OrnamentDivider />

      {/* ── Heritage Section ── */}
      <section
        style={{ backgroundColor: BURGUNDY_MID }}
        className="py-20 px-6 md:px-20"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p
              style={{ color: GOLD, fontFamily: "Cormorant Garamond, serif" }}
              className="italic tracking-widest text-sm mb-3"
            >
              Our Lineage
            </p>
            <h2
              style={{
                color: GOLD,
                fontFamily: "Cinzel, serif",
                lineHeight: 1.3,
              }}
              className="text-3xl md:text-4xl font-semibold mb-6"
            >
              THE HERITAGE
              <br />
              CRAFT
            </h2>
            <p
              style={{
                color: `${CREAM}CC`,
                fontFamily: "Cormorant Garamond, serif",
              }}
              className="text-lg leading-loose mb-4"
            >
              For over four decades, the artisans of Viraasa Jewels have
              preserved the ancient traditions of Indian jewellery-making. Each
              piece is a testament to the mastery passed down through three
              generations of master karigars.
            </p>
            <p
              style={{
                color: `${CREAM}99`,
                fontFamily: "Cormorant Garamond, serif",
              }}
              className="text-base leading-loose"
            >
              From the intricate Kundan work of Rajasthan to the delicate
              filigree of Odisha, we celebrate the diversity and richness of
              India’s jewellery-making traditions.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="relative flex items-center justify-center"
              style={{
                width: "320px",
                height: "320px",
                border: `2px solid ${GOLD}60`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "12px",
                  border: `1px solid ${GOLD}30`,
                }}
              />
              <svg viewBox="0 0 200 200" width="200" height="200">
                <title>Heritage mandala</title>
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke={GOLD}
                  strokeWidth="1"
                  opacity="0.4"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke={GOLD}
                  strokeWidth="0.8"
                  opacity="0.4"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="50"
                  fill="none"
                  stroke={GOLD}
                  strokeWidth="0.6"
                  opacity="0.5"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="30"
                  fill="none"
                  stroke={GOLD}
                  strokeWidth="1"
                  opacity="0.6"
                />
                <circle cx="100" cy="100" r="10" fill={GOLD} opacity="0.5" />
                {MANDALA_OUTER_ANGLES.map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const x = 100 + 70 * Math.cos(rad);
                  const y = 100 + 70 * Math.sin(rad);
                  return (
                    <circle
                      key={angle}
                      cx={x}
                      cy={y}
                      r="3"
                      fill={GOLD}
                      opacity="0.6"
                    />
                  );
                })}
                {MANDALA_LINE_ANGLES.map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 100 + 10 * Math.cos(rad);
                  const y1 = 100 + 10 * Math.sin(rad);
                  const x2 = 100 + 90 * Math.cos(rad);
                  const y2 = 100 + 90 * Math.sin(rad);
                  return (
                    <line
                      key={angle}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={GOLD}
                      strokeWidth="0.5"
                      opacity="0.3"
                    />
                  );
                })}
              </svg>
              <div
                className="absolute bottom-4 left-0 right-0 text-center"
                style={{
                  color: `${GOLD}80`,
                  fontFamily: "Cinzel, serif",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                }}
              >
                EST. 1976
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
