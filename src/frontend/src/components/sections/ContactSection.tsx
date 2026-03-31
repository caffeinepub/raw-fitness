import { CheckCircle, Clock, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSubmitted(true);
    toast.success("Message received, we'll contact you on WhatsApp!");
    const msg = encodeURIComponent(
      `Hi RAW FITNESS! My name is ${form.name}, phone: ${form.phone}. ${form.message}`,
    );
    setTimeout(() => {
      window.open(`https://wa.me/1234567890?text=${msg}`, "_blank");
    }, 800);
  };

  return (
    <section id="contact" className="py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="font-body text-xs uppercase tracking-widest text-brand-primary font-semibold">
            Get In Touch
          </span>
          <h2 className="font-heading font-bold uppercase text-3xl lg:text-4xl text-white mt-2">
            Contact Us
          </h2>
          <div className="w-16 h-1 bg-brand-primary mx-auto mt-4" />
          <p className="text-brand-muted mt-4 max-w-md mx-auto">
            Ready to start your transformation? Drop us a message or reach out
            on WhatsApp.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="reveal">
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center h-full min-h-64 text-center gap-4 bg-brand-card border border-brand-border rounded-lg p-12"
                data-ocid="contact.success_state"
              >
                <CheckCircle className="w-16 h-16 text-green-500" />
                <h3 className="font-heading font-bold uppercase text-xl text-white tracking-wider">
                  Message Sent!
                </h3>
                <p className="text-brand-muted">
                  Thank you! We're opening WhatsApp so you can connect with us
                  directly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", phone: "", message: "" });
                  }}
                  className="mt-2 font-heading font-semibold uppercase text-sm tracking-wider text-brand-primary border border-brand-primary rounded px-6 py-2 hover:bg-brand-primary hover:text-brand-dark transition-colors"
                  data-ocid="contact.secondary_button"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                data-ocid="contact.panel"
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-heading text-xs uppercase tracking-widest text-brand-muted mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="John Smith"
                    className="w-full bg-brand-card border border-brand-border rounded px-4 py-3 text-white placeholder-zinc-600 font-body text-sm focus:outline-none focus:border-brand-primary transition-colors"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block font-heading text-xs uppercase tracking-widest text-brand-muted mb-2"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    placeholder="+91 98765 43210"
                    className="w-full bg-brand-card border border-brand-border rounded px-4 py-3 text-white placeholder-zinc-600 font-body text-sm focus:outline-none focus:border-brand-primary transition-colors"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-heading text-xs uppercase tracking-widest text-brand-muted mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Tell us about your fitness goals..."
                    rows={5}
                    className="w-full bg-brand-card border border-brand-border rounded px-4 py-3 text-white placeholder-zinc-600 font-body text-sm focus:outline-none focus:border-brand-primary transition-colors resize-none"
                    data-ocid="contact.textarea"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full font-heading font-semibold uppercase tracking-wider text-sm bg-brand-primary text-brand-dark py-4 rounded hover:bg-brand-olive transition-all duration-300 flex items-center justify-center gap-2"
                  data-ocid="contact.submit_button"
                >
                  <Send className="w-4 h-4" />
                  Send Message via WhatsApp
                </button>
              </form>
            )}
          </div>

          <div className="reveal reveal-delay-2 space-y-6">
            <div className="bg-brand-card border border-brand-border rounded-lg p-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-primary/10 rounded flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-brand-primary" />
                </div>
                <div>
                  <h4 className="font-heading font-bold uppercase text-white text-sm tracking-wider mb-1">
                    Address
                  </h4>
                  <p className="text-brand-muted text-sm">
                    551/A, Kumarpara, Rajbari
                    <br />
                    Dum Dum, Kolkata, West Bengal 700028
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-primary/10 rounded flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-brand-primary" />
                </div>
                <div>
                  <h4 className="font-heading font-bold uppercase text-white text-sm tracking-wider mb-1">
                    Phone
                  </h4>
                  <a
                    href="tel:+1234567890"
                    className="text-brand-muted text-sm hover:text-brand-primary transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-primary/10 rounded flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-brand-primary" />
                </div>
                <div>
                  <h4 className="font-heading font-bold uppercase text-white text-sm tracking-wider mb-1">
                    Hours
                  </h4>
                  <p className="text-brand-muted text-sm">
                    Open 24 hours, 7 days a week
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-brand-border h-64">
              <iframe
                src="https://maps.google.com/maps?q=551%2FA+Kumarpara+Rajbari+Dum+Dum+Kolkata+West+Bengal+700028&output=embed"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "grayscale(1) invert(0.9) contrast(0.8)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="RAW FITNESS Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
