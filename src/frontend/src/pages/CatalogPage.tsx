import { useEffect, useState } from "react";
import type { Product } from "../backend";
import ProductCard from "../components/ProductCard";
import { useActor } from "../hooks/useActor";

const BURGUNDY = "#2A0715";
const GOLD = "#C8A24A";
const CREAM = "#F6F1EA";

const CATEGORIES = [
  "All",
  "Necklaces",
  "Earrings",
  "Bangles",
  "Rings",
  "Maang Tikka",
  "Anklets",
  "Bracelets",
  "Pendants",
];

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
    name: "Temple Gold Bangles Set",
    description:
      "South Indian temple jewellery bangles in 22kt gold with traditional deity motifs and filigree.",
    priceINR: 65000,
    category: "Bangles",
    featured: true,
    createdAt: 0n,
  },
  {
    id: 5n,
    name: "Emerald Solitaire Ring",
    description:
      "Breathtaking Colombian emerald set in 18kt gold with diamond accents and traditional floral design.",
    priceINR: 78000,
    category: "Rings",
    featured: false,
    createdAt: 0n,
  },
  {
    id: 6n,
    name: "Layered Pearl Necklace",
    description:
      "Multi-strand freshwater pearl necklace with a Kundan pendant centerpiece in antique gold.",
    priceINR: 28500,
    category: "Necklaces",
    featured: false,
    createdAt: 0n,
  },
  {
    id: 7n,
    name: "Oxidised Silver Anklets",
    description:
      "Pair of traditional oxidised silver anklets with ghungroo bells and intricate hand-engraved motifs.",
    priceINR: 4200,
    category: "Anklets",
    featured: false,
    createdAt: 0n,
  },
  {
    id: 8n,
    name: "Diamond Solitaire Earrings",
    description:
      "Elegant single-stone diamond earrings in 18kt white gold, perfect for everyday luxury.",
    priceINR: 55000,
    category: "Earrings",
    featured: false,
    createdAt: 0n,
  },
  {
    id: 9n,
    name: "Gold Kade Bracelets",
    description:
      "Heavy gold kade-style bracelets with hand-stamped peacock motifs in 22kt gold.",
    priceINR: 92000,
    category: "Bracelets",
    featured: false,
    createdAt: 0n,
  },
  {
    id: 10n,
    name: "Ruby Pendant",
    description:
      "Cabochon Burmese ruby pendant in gold with enamel work, suspended on an 18kt gold chain.",
    priceINR: 34000,
    category: "Pendants",
    featured: false,
    createdAt: 0n,
  },
  {
    id: 11n,
    name: "Antique Haar Necklace",
    description:
      "Long antique gold haar necklace with engraved coins and meenakari lotus motifs.",
    priceINR: 120000,
    category: "Necklaces",
    featured: false,
    createdAt: 0n,
  },
  {
    id: 12n,
    name: "Floral Diamond Ring",
    description:
      "Floral-pattern diamond ring in 14kt gold with seven brilliant-cut diamonds in a pave setting.",
    priceINR: 42000,
    category: "Rings",
    featured: false,
    createdAt: 0n,
  },
];

export default function CatalogPage() {
  const { actor } = useActor();
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!actor) {
      const timer = setTimeout(() => {
        const filtered =
          activeCategory === "All"
            ? SAMPLE_PRODUCTS
            : SAMPLE_PRODUCTS.filter((p) => p.category === activeCategory);
        setProducts(filtered);
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
    setIsLoading(true);
    const fetchPromise =
      activeCategory === "All"
        ? actor.getProducts()
        : actor.getProductsByCategory(activeCategory);
    fetchPromise
      .then((p) => {
        setProducts(
          p.length > 0
            ? p
            : SAMPLE_PRODUCTS.filter(
                (sp) =>
                  activeCategory === "All" || sp.category === activeCategory,
              ),
        );
      })
      .catch(() => {
        setProducts(
          SAMPLE_PRODUCTS.filter(
            (p) => activeCategory === "All" || p.category === activeCategory,
          ),
        );
      })
      .finally(() => setIsLoading(false));
  }, [actor, activeCategory]);

  return (
    <div style={{ backgroundColor: CREAM }} className="min-h-screen">
      {/* Page Header */}
      <div
        className="py-16 text-center px-4"
        style={{
          background: `linear-gradient(180deg, ${BURGUNDY} 0%, #3A0B1E 100%)`,
        }}
      >
        <p
          style={{
            color: `${GOLD}99`,
            fontFamily: "Cormorant Garamond, serif",
          }}
          className="italic text-sm tracking-widest mb-3"
        >
          Discover Timeless Beauty
        </p>
        <h1
          style={{
            color: GOLD,
            fontFamily: "Cinzel, serif",
            letterSpacing: "0.2em",
          }}
          className="text-4xl md:text-5xl font-semibold uppercase"
        >
          Our Collection
        </h1>
        <div className="flex items-center justify-center gap-3 mt-4">
          <span
            style={{ backgroundColor: GOLD }}
            className="h-px w-20 block opacity-60"
          />
          <span style={{ color: GOLD }} className="opacity-60">
            ✦
          </span>
          <span
            style={{ backgroundColor: GOLD }}
            className="h-px w-20 block opacity-60"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div
        style={{ backgroundColor: "#fff", borderBottom: `1px solid ${GOLD}30` }}
        className="sticky top-[64px] md:top-[80px] z-40"
      >
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex gap-1 py-3 min-w-max">
            {CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat}
                data-ocid={`catalog.${cat.toLowerCase().replace(" ", "_")}.tab`}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 text-xs tracking-widest uppercase rounded-sm transition-all"
                style={{
                  fontFamily: "Cinzel, serif",
                  backgroundColor:
                    activeCategory === cat ? GOLD : "transparent",
                  color: activeCategory === cat ? BURGUNDY : GOLD,
                  border: `1px solid ${GOLD}60`,
                  fontWeight: activeCategory === cat ? 600 : 400,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {isLoading ? (
          <div
            data-ocid="catalog.loading_state"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded"
                style={{ height: "380px", backgroundColor: "#e0d8ce" }}
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div data-ocid="catalog.empty_state" className="text-center py-24">
            <span style={{ color: GOLD }} className="text-5xl block mb-4">
              ✦
            </span>
            <p
              style={{ color: BURGUNDY, fontFamily: "Cinzel, serif" }}
              className="text-xl"
            >
              No items in this category yet.
            </p>
          </div>
        ) : (
          <div
            data-ocid="catalog.list"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {products.map((product, idx) => (
              <div
                key={product.id.toString()}
                data-ocid={`catalog.item.${idx + 1}`}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
