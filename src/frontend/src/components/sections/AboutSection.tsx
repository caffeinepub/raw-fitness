import { Award, Clock, Eye, Star, Target, Users } from "lucide-react";

const whyUs = [
  {
    icon: Award,
    title: "Certified Trainers",
    desc: "All trainers are nationally certified with 5+ years of experience.",
  },
  {
    icon: Users,
    title: "Community First",
    desc: "A supportive community that motivates and holds you accountable.",
  },
  {
    icon: Clock,
    title: "Open 24/7",
    desc: "Train on your schedule — we're open around the clock, every day.",
  },
  {
    icon: Star,
    title: "Premium Equipment",
    desc: "State-of-the-art machines and free weights updated annually.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-brand-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="font-body text-xs uppercase tracking-widest text-brand-primary font-semibold">
            Who We Are
          </span>
          <h2 className="font-heading font-bold uppercase text-3xl lg:text-4xl text-white mt-2">
            About RAW FITNESS
          </h2>
          <div className="w-16 h-1 bg-brand-primary mx-auto mt-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <div className="reveal">
            <p className="text-brand-muted text-lg leading-relaxed mb-6">
              Founded in 2014, RAW FITNESS has been the premier destination for
              fitness enthusiasts in the city. We believe that fitness is not
              just a goal — it's a lifestyle. Our world-class facility is
              designed to push your limits and help you achieve results you
              never thought possible.
            </p>
            <p className="text-brand-muted text-lg leading-relaxed mb-8">
              Whether you're a beginner starting your journey or an elite
              athlete fine-tuning your performance, our expert team and
              cutting-edge equipment are here to support every step of the way.
            </p>

            {/* Mission & Vision */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-brand-card border border-brand-border rounded-lg p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-brand-primary/20 rounded flex items-center justify-center">
                    <Target className="w-4 h-4 text-brand-primary" />
                  </div>
                  <h3 className="font-heading font-semibold uppercase text-white text-sm tracking-wider">
                    Our Mission
                  </h3>
                </div>
                <p className="text-brand-muted text-sm leading-relaxed">
                  To empower every member to achieve their personal best through
                  expert guidance and elite facilities.
                </p>
              </div>
              <div className="bg-brand-card border border-brand-border rounded-lg p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-brand-primary/20 rounded flex items-center justify-center">
                    <Eye className="w-4 h-4 text-brand-primary" />
                  </div>
                  <h3 className="font-heading font-semibold uppercase text-white text-sm tracking-wider">
                    Our Vision
                  </h3>
                </div>
                <p className="text-brand-muted text-sm leading-relaxed">
                  To be the most transformative gym in the region, setting the
                  standard for fitness excellence.
                </p>
              </div>
            </div>
          </div>

          {/* Right — Why Choose Us */}
          <div className="reveal reveal-delay-2">
            <h3 className="font-heading font-bold uppercase text-xl text-white mb-8 tracking-wider">
              Why Choose Us
            </h3>
            <div className="grid gap-5">
              {whyUs.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 bg-brand-card border border-brand-border rounded-lg p-5 hover:border-brand-primary/50 transition-colors duration-300 group"
                >
                  <div className="w-10 h-10 bg-brand-primary/10 group-hover:bg-brand-primary/20 rounded flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold uppercase text-white text-sm tracking-wider mb-1">
                      {item.title}
                    </h4>
                    <p className="text-brand-muted text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
