import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

const BURGUNDY = "#2A0715";
const BURGUNDY_MID = "#3A0B1E";
const GOLD = "#C8A24A";
const CREAM = "#F6F1EA";

export default function ContactPage() {
  const { actor } = useActor();
  const [storeInfo, setStoreInfo] = useState({
    name: "Viraasa Jewels",
    address: "123 Jewellery Market, Connaught Place, New Delhi - 110001",
    phone: "+91 98765 43210",
    whatsapp: "919876543210",
    email: "contact@viraasajewels.com",
    tagline: "Timeless elegance, rooted in tradition.",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
      toast.success("Message sent! We'll get back to you within 24 hours.");
    }, 1200);
  };

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
          We’d love to hear from you
        </p>
        <h1
          style={{
            color: GOLD,
            fontFamily: "Cinzel, serif",
            letterSpacing: "0.2em",
          }}
          className="text-4xl md:text-5xl font-semibold uppercase"
        >
          Contact Us
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

      <section style={{ backgroundColor: CREAM }} className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Cards */}
          <div className="space-y-6">
            <h2
              style={{ color: BURGUNDY, fontFamily: "Cinzel, serif" }}
              className="text-2xl font-semibold mb-6"
            >
              Visit Us
            </h2>

            <div
              className="p-6 bg-white"
              style={{ border: `1px solid ${GOLD}40` }}
            >
              <h3
                style={{ color: BURGUNDY, fontFamily: "Cinzel, serif" }}
                className="text-sm font-semibold uppercase tracking-widest mb-2"
              >
                📍 Address
              </h3>
              <p
                style={{
                  color: "#5a4a3a",
                  fontFamily: "Cormorant Garamond, serif",
                }}
                className="text-base leading-relaxed"
              >
                {storeInfo.address}
              </p>
            </div>

            <div
              className="p-6 bg-white"
              style={{ border: `1px solid ${GOLD}40` }}
            >
              <h3
                style={{ color: BURGUNDY, fontFamily: "Cinzel, serif" }}
                className="text-sm font-semibold uppercase tracking-widest mb-2"
              >
                📞 Phone
              </h3>
              <a
                href={`tel:${storeInfo.phone}`}
                style={{
                  color: BURGUNDY,
                  fontFamily: "Cormorant Garamond, serif",
                }}
                className="text-base hover:underline"
              >
                {storeInfo.phone}
              </a>
            </div>

            <div
              className="p-6 bg-white"
              style={{ border: `1px solid ${GOLD}40` }}
            >
              <h3
                style={{ color: BURGUNDY, fontFamily: "Cinzel, serif" }}
                className="text-sm font-semibold uppercase tracking-widest mb-2"
              >
                ✉️ Email
              </h3>
              <a
                href={`mailto:${storeInfo.email}`}
                style={{
                  color: BURGUNDY,
                  fontFamily: "Cormorant Garamond, serif",
                }}
                className="text-base hover:underline"
              >
                {storeInfo.email}
              </a>
            </div>

            {storeInfo.whatsapp && (
              <div
                className="p-6 bg-white"
                style={{ border: `1px solid ${GOLD}40` }}
              >
                <h3
                  style={{ color: BURGUNDY, fontFamily: "Cinzel, serif" }}
                  className="text-sm font-semibold uppercase tracking-widest mb-3"
                >
                  💬 WhatsApp
                </h3>
                <a
                  href={`https://wa.me/${storeInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-medium"
                  style={{ backgroundColor: "#25D366", color: "#fff" }}
                >
                  Chat on WhatsApp
                </a>
              </div>
            )}

            <div
              className="p-8 flex flex-col items-center justify-center text-center"
              style={{
                backgroundColor: "#f0e8d8",
                border: `1px solid ${GOLD}40`,
                minHeight: "160px",
              }}
            >
              <span style={{ color: GOLD }} className="text-3xl mb-3">
                🗺️
              </span>
              <p
                style={{ color: BURGUNDY, fontFamily: "Cinzel, serif" }}
                className="text-sm font-semibold tracking-widest uppercase mb-1"
              >
                Find Us
              </p>
              <p
                style={{
                  color: "#5a4a3a",
                  fontFamily: "Cormorant Garamond, serif",
                }}
                className="text-sm"
              >
                {storeInfo.address}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2
              style={{ color: BURGUNDY, fontFamily: "Cinzel, serif" }}
              className="text-2xl font-semibold mb-6"
            >
              Send a Message
            </h2>
            <form
              data-ocid="contact.form"
              onSubmit={handleSubmit}
              className="space-y-5 bg-white p-8"
              style={{ border: `1px solid ${GOLD}40` }}
            >
              <div>
                <label
                  htmlFor="contact-name"
                  style={{ color: BURGUNDY, fontFamily: "Cinzel, serif" }}
                  className="block text-xs tracking-widest uppercase mb-2"
                >
                  Full Name *
                </label>
                <Input
                  id="contact-name"
                  data-ocid="contact.name.input"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Your name"
                  style={{ borderColor: `${GOLD}60` }}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  style={{ color: BURGUNDY, fontFamily: "Cinzel, serif" }}
                  className="block text-xs tracking-widest uppercase mb-2"
                >
                  Email Address *
                </label>
                <Input
                  id="contact-email"
                  data-ocid="contact.email.input"
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="your@email.com"
                  style={{ borderColor: `${GOLD}60` }}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-phone"
                  style={{ color: BURGUNDY, fontFamily: "Cinzel, serif" }}
                  className="block text-xs tracking-widest uppercase mb-2"
                >
                  Phone Number
                </label>
                <Input
                  id="contact-phone"
                  data-ocid="contact.phone.input"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="+91 98765 43210"
                  style={{ borderColor: `${GOLD}60` }}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  style={{ color: BURGUNDY, fontFamily: "Cinzel, serif" }}
                  className="block text-xs tracking-widest uppercase mb-2"
                >
                  Message *
                </label>
                <Textarea
                  id="contact-message"
                  data-ocid="contact.message.textarea"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  placeholder="Tell us about your enquiry..."
                  style={{ borderColor: `${GOLD}60` }}
                />
              </div>
              <Button
                data-ocid="contact.submit_button"
                type="submit"
                disabled={submitting}
                className="w-full py-3 tracking-widest uppercase text-sm transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: BURGUNDY,
                  color: GOLD,
                  fontFamily: "Cinzel, serif",
                  border: `1px solid ${GOLD}50`,
                }}
              >
                {submitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
