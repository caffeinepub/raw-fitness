import { Dumbbell, Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const socialLinks = [
    { Icon: Instagram, label: "Instagram", href: "https://instagram.com" },
    { Icon: Facebook, label: "Facebook", href: "https://facebook.com" },
    { Icon: Youtube, label: "YouTube", href: "https://youtube.com" },
  ];

  const quickLinks = [
    ["#home", "Home"],
    ["#about", "About"],
    ["#memberships", "Memberships"],
    ["#trainers", "Trainers"],
    ["#contact", "Contact"],
  ] as const;

  return (
    <footer className="bg-brand-darker border-t border-brand-border py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-brand-primary rounded flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-brand-dark" />
              </div>
              <span className="font-heading font-bold text-xl text-white uppercase tracking-wider">
                RAW <span className="text-brand-primary">FITNESS</span>
              </span>
            </div>
            <p className="text-brand-muted text-sm leading-relaxed max-w-xs mb-6">
              Premium fitness center dedicated to transforming bodies and
              changing lives. Join the RAW FITNESS family today.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-brand-card border border-brand-border rounded flex items-center justify-center text-brand-muted hover:text-brand-primary hover:border-brand-primary transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold uppercase text-white text-sm tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(([href, label]) => (
                <li key={href}>
                  <button
                    type="button"
                    onClick={() => scrollTo(href)}
                    className="text-brand-muted text-sm hover:text-brand-primary transition-colors text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold uppercase text-white text-sm tracking-widest mb-5">
              Contact
            </h4>
            <ul className="space-y-3 text-brand-muted text-sm">
              <li>551/A, Kumarpara, Rajbari</li>
              <li>Dum Dum, Kolkata 700028</li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="hover:text-brand-primary transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-primary transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-brand-muted text-xs">
            © {year} RAW FITNESS. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/admin"
              className="text-brand-muted/40 text-xs hover:text-brand-muted transition-colors"
              data-ocid="footer.link"
            >
              Admin
            </a>
            <p className="text-brand-muted text-xs">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-primary transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
