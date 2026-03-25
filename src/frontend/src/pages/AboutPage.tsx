const BURGUNDY = "#2A0715";
const BURGUNDY_MID = "#3A0B1E";
const GOLD = "#C8A24A";
const CREAM = "#F6F1EA";

const values = [
  {
    icon: "✦",
    title: "Master Craftsmanship",
    desc: "Every piece is handcrafted by artisans trained in centuries-old techniques, ensuring flawless quality and attention to detail.",
  },
  {
    icon: "❋",
    title: "Ethically Sourced",
    desc: "We source only conflict-free gemstones and responsibly mined metals, committed to both beauty and ethical integrity.",
  },
  {
    icon: "✿",
    title: "Heritage Designs",
    desc: "Our designs draw from the rich tapestry of India's regional jewellery traditions — Kundan, Polki, Meenakari, Temple, and more.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="py-20 text-center px-4"
        style={{
          background: `linear-gradient(180deg, ${BURGUNDY} 0%, ${BURGUNDY_MID} 100%)`,
        }}
      >
        <p
          style={{
            color: `${GOLD}99`,
            fontFamily: "Cormorant Garamond, serif",
          }}
          className="italic text-sm tracking-widest mb-3"
        >
          Who We Are
        </p>
        <h1
          style={{
            color: GOLD,
            fontFamily: "Cinzel, serif",
            letterSpacing: "0.2em",
          }}
          className="text-4xl md:text-5xl font-semibold uppercase"
        >
          Our Story
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
      </section>

      {/* Brand Story */}
      <section style={{ backgroundColor: CREAM }} className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2
            style={{ color: BURGUNDY, fontFamily: "Cinzel, serif" }}
            className="text-2xl md:text-3xl font-semibold mb-6 text-center"
          >
            A Legacy of Elegance
          </h2>
          <div
            className="space-y-6"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              color: "#3a2a1a",
            }}
          >
            <p className="text-lg leading-loose">
              Founded in 1976 in the heart of Delhi's historic jewellery bazaar
              by master goldsmith Shri Rameshwar Lal Gupta, Viraasa Jewels began
              as a humble workshop with a singular vision: to create jewellery
              that carries the soul of India in every curve and stone.
            </p>
            <p className="text-lg leading-loose">
              Over three generations, the craft has evolved while staying deeply
              rooted in tradition. From the intricate Kundan setting techniques
              of Rajasthan to the delicate wire-filigree work of Odisha and the
              bold temple jewellery of South India — Viraasa has been a
              custodian of these precious arts.
            </p>
            <p className="text-lg leading-loose">
              Today, led by the third generation of the Gupta family, Viraasa
              Jewels bridges centuries-old craftsmanship with contemporary
              sensibilities. Each piece is a conversation between the past and
              the present, between the artisan's skilled hands and the wearer's
              individual story.
            </p>
            <p className="text-lg leading-loose">
              Our workshop employs over forty master karigars — many trained
              since childhood in their ancestral craft — who pour their life's
              skill into every necklace, earring, and bangle that bears the
              Viraasa mark.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ backgroundColor: "#fff" }} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2
            style={{
              color: BURGUNDY,
              fontFamily: "Cinzel, serif",
              letterSpacing: "0.12em",
            }}
            className="text-2xl md:text-3xl font-semibold text-center uppercase mb-12"
          >
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="p-8 text-center"
                style={{ border: `1px solid ${GOLD}40` }}
              >
                <span style={{ color: GOLD }} className="text-4xl block mb-4">
                  {v.icon}
                </span>
                <h3
                  style={{ color: BURGUNDY, fontFamily: "Cinzel, serif" }}
                  className="text-lg font-semibold mb-3"
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    color: "#5a4a3a",
                    fontFamily: "Cormorant Garamond, serif",
                  }}
                  className="text-base leading-relaxed"
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section
        style={{ backgroundColor: BURGUNDY_MID }}
        className="py-20 px-6 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <span
            style={{ color: GOLD }}
            className="text-5xl block mb-6 opacity-40"
          >
            ❝
          </span>
          <blockquote
            style={{ color: CREAM, fontFamily: "Cormorant Garamond, serif" }}
            className="text-2xl md:text-3xl italic leading-relaxed mb-6"
          >
            Jewellery is not just adornment — it is memory made tangible, love
            made visible, and heritage made eternal.
          </blockquote>
          <p
            style={{ color: `${GOLD}AA`, fontFamily: "Cinzel, serif" }}
            className="text-xs tracking-widest uppercase"
          >
            — Rameshwar Lal Gupta, Founder, Viraasa Jewels
          </p>
        </div>
      </section>
    </div>
  );
}
