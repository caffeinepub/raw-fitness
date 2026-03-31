import { useEffect } from "react";

export default function TestimonialsSection() {
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://www.jotform.com/website-widgets/embed/019d057c3925789fa89add598845db656417"]',
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "https://www.jotform.com/website-widgets/embed/019d057c3925789fa89add598845db656417";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-brand-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="font-body text-xs uppercase tracking-widest text-brand-primary font-semibold">
            Google Reviews
          </span>
          <h2 className="font-heading font-bold uppercase text-3xl lg:text-4xl text-white mt-2">
            What Members Say
          </h2>
          <div className="w-16 h-1 bg-brand-primary mx-auto mt-4" />
        </div>

        <div
          id="JFWebsiteWidget-019d057c3925789fa89add598845db656417"
          className="w-full min-h-[300px]"
        />
      </div>
    </section>
  );
}
