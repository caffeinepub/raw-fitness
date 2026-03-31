import { Skeleton } from "@/components/ui/skeleton";
import { useGetMembershipPlans } from "@/hooks/useQueries";
import { Check } from "lucide-react";

export default function MembershipsSection() {
  const { data: plans, isLoading } = useGetMembershipPlans();

  const handleGetStarted = (planName: string) => {
    const msg = encodeURIComponent(
      `Hi RAW FITNESS! I'm interested in the ${planName} plan.`,
    );
    window.open(`https://wa.me/1234567890?text=${msg}`, "_blank");
  };

  return (
    <section id="memberships" className="py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="font-body text-xs uppercase tracking-widest text-brand-primary font-semibold">
            Pricing
          </span>
          <h2 className="font-heading font-bold uppercase text-3xl lg:text-4xl text-white mt-2">
            Membership Plans
          </h2>
          <div className="w-16 h-1 bg-brand-primary mx-auto mt-4" />
          <p className="text-brand-muted mt-4 max-w-md mx-auto">
            Choose the plan that fits your goals. All plans include free
            cancellation anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {isLoading
            ? [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-brand-card border border-brand-border rounded-lg p-8 space-y-4"
                >
                  <Skeleton className="h-6 w-24 bg-brand-olive/40" />
                  <Skeleton className="h-12 w-32 bg-brand-olive/40" />
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((j) => (
                      <Skeleton
                        key={j}
                        className="h-4 w-full bg-brand-olive/40"
                      />
                    ))}
                  </div>
                  <Skeleton className="h-12 w-full bg-brand-olive/40" />
                </div>
              ))
            : (plans ?? []).map((plan, i) => (
                <div
                  key={String(plan.id)}
                  className={`reveal reveal-delay-${i + 1} relative rounded-lg flex flex-col transition-transform duration-300 hover:-translate-y-2 ${
                    plan.featured
                      ? "bg-brand-card border-2 border-brand-primary shadow-neon-glow"
                      : "bg-brand-card border border-brand-border hover:border-brand-primary/50"
                  }`}
                  data-ocid={`memberships.card.${i + 1}`}
                >
                  {plan.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-primary text-brand-dark font-heading text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="font-heading font-bold uppercase text-lg text-brand-muted tracking-widest mb-1">
                      {plan.name}
                    </h3>
                    <div className="flex items-end gap-1 mb-6">
                      <span className="font-heading font-bold text-5xl text-white">
                        {plan.price}
                      </span>
                      <span className="text-brand-muted mb-2 text-lg">
                        {plan.period}
                      </span>
                    </div>

                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <Check className="w-4 h-4 text-brand-primary flex-shrink-0" />
                          <span className="text-brand-muted text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => handleGetStarted(plan.name)}
                      className={`w-full font-heading font-semibold uppercase tracking-wider text-sm py-3.5 rounded transition-all duration-300 flex items-center justify-center gap-2 ${
                        plan.featured
                          ? "bg-brand-primary text-brand-dark hover:bg-brand-olive"
                          : "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-dark"
                      }`}
                      data-ocid={`memberships.primary_button.${i + 1}`}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
