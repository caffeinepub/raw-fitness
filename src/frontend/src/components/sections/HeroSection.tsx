export default function HeroSection() {
  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/gym-hero.dim_1920x1080.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-brand-primary/20 border border-brand-primary/40 rounded-full px-4 py-1.5 mb-6 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            <span className="font-body text-xs uppercase tracking-widest text-brand-primary font-semibold">
              Premium Fitness Center
            </span>
          </div>

          <h1
            className="font-heading font-bold uppercase leading-tight text-white mb-6 animate-fade-in-up"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              animationDelay: "0.1s",
              lineHeight: 1.1,
            }}
          >
            Transform
            <br />
            Your Body.
            <br />
            <span className="text-brand-primary">Train With</span>
            <br />
            The Best.
          </h1>

          <p
            className="text-brand-muted text-lg leading-relaxed mb-8 animate-fade-in-up max-w-lg"
            style={{ animationDelay: "0.2s" }}
          >
            Join RAW FITNESS — where elite coaching meets cutting-edge
            equipment. Over 500 members have already transformed their lives.
            Your journey starts now.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <a
              href="https://wa.me/1234567890?text=Hi%20RAW%20FITNESS%2C%20I%20want%20to%20join!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-heading font-semibold uppercase tracking-wider text-base bg-brand-primary text-brand-dark px-8 py-4 rounded hover:bg-brand-olive transition-all duration-300 shadow-neon-glow hover:shadow-none hover:scale-105"
              data-ocid="hero.primary_button"
            >
              Join Now — Free Trial
            </a>
            <button
              type="button"
              onClick={() => scrollToSection("#memberships")}
              className="inline-flex items-center justify-center font-heading font-semibold uppercase tracking-wider text-base border-2 border-white/60 text-white px-8 py-4 rounded hover:border-brand-primary hover:text-brand-primary transition-all duration-300"
              data-ocid="hero.secondary_button"
            >
              Explore Plans
            </button>
          </div>

          <div
            className="flex flex-wrap gap-8 mt-12 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            {[
              { value: "500+", label: "Members" },
              { value: "15+", label: "Trainers" },
              { value: "10+", label: "Years" },
              { value: "98%", label: "Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading font-bold text-2xl text-brand-primary">
                  {stat.value}
                </div>
                <div className="font-body text-xs uppercase tracking-widest text-brand-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce">
        <span className="font-body text-xs uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-px h-8 bg-white/20" />
      </div>
    </section>
  );
}
