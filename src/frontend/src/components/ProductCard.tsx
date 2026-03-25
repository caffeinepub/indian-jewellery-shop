import type { Product } from "../backend";

const GOLD = "#C8A24A";
const MAROON = "#6B0F2B";

const MANDALA_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

const MandalaSVG = () => (
  <svg viewBox="0 0 100 100" width="80" height="80" opacity="0.3">
    <title>Decorative mandala</title>
    <circle cx="50" cy="50" r="45" fill="none" stroke={GOLD} strokeWidth="1" />
    <circle cx="50" cy="50" r="30" fill="none" stroke={GOLD} strokeWidth="1" />
    <circle cx="50" cy="50" r="15" fill="none" stroke={GOLD} strokeWidth="1" />
    <line x1="5" y1="50" x2="95" y2="50" stroke={GOLD} strokeWidth="0.5" />
    <line x1="50" y1="5" x2="50" y2="95" stroke={GOLD} strokeWidth="0.5" />
    <line x1="18" y1="18" x2="82" y2="82" stroke={GOLD} strokeWidth="0.5" />
    <line x1="82" y1="18" x2="18" y2="82" stroke={GOLD} strokeWidth="0.5" />
    {MANDALA_ANGLES.map((angle) => {
      const rad = (angle * Math.PI) / 180;
      const x = 50 + 38 * Math.cos(rad);
      const y = 50 + 38 * Math.sin(rad);
      return <circle key={angle} cx={x} cy={y} r="3" fill={GOLD} />;
    })}
  </svg>
);

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.image ? product.image.getDirectURL() : null;

  return (
    <div
      className="relative flex flex-col bg-white rounded overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg"
      style={{
        border: `1px solid ${GOLD}60`,
        boxShadow: "0 2px 12px rgba(200,162,74,0.08)",
      }}
    >
      {product.featured && (
        <span
          className="absolute top-3 left-3 z-10 text-xs px-2 py-0.5 tracking-widest uppercase"
          style={{
            backgroundColor: GOLD,
            color: "#1a0a00",
            fontFamily: "Cinzel, serif",
          }}
        >
          Featured
        </span>
      )}

      {/* Image */}
      <div
        className="w-full flex items-center justify-center overflow-hidden"
        style={{ height: "220px", backgroundColor: "#FAF6F0" }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <MandalaSVG />
            <span
              style={{ color: `${GOLD}80`, fontFamily: "Cinzel, serif" }}
              className="text-xs tracking-widest mt-2"
            >
              {product.category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3
          style={{ fontFamily: "Cinzel, serif", color: "#1a0a00" }}
          className="text-sm font-semibold mb-1 leading-tight"
        >
          {product.name}
        </h3>
        <p
          className="text-sm leading-snug mb-3 flex-1"
          style={{
            color: "#555",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            fontFamily: "Cormorant Garamond, serif",
          }}
        >
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span
            style={{ color: GOLD, fontFamily: "Cinzel, serif" }}
            className="text-base font-semibold"
          >
            ₹{product.priceINR.toLocaleString("en-IN")}
          </span>
          <button
            type="button"
            className="text-xs px-3 py-1.5 rounded tracking-wider uppercase transition-opacity hover:opacity-80"
            style={{
              backgroundColor: MAROON,
              color: "#fff",
              fontFamily: "Cinzel, serif",
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
