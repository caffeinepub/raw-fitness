import { Skeleton } from "@/components/ui/skeleton";
import { useGetTransformations } from "@/hooks/useQueries";

export default function TransformationsSection() {
  const { data: transformations, isLoading } = useGetTransformations();

  return (
    <section id="transformations" className="py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="font-body text-xs uppercase tracking-widest text-brand-primary font-semibold">
            Real Results
          </span>
          <h2 className="font-heading font-bold uppercase text-3xl lg:text-4xl text-white mt-2">
            Member Transformations
          </h2>
          <div className="w-16 h-1 bg-brand-primary mx-auto mt-4" />
          <p className="text-brand-muted mt-4 max-w-md mx-auto">
            Real members, real results. No filters, no tricks — just hard work
            and expert coaching.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? [1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton
                  key={i}
                  className="h-56 rounded-lg bg-brand-olive/40"
                />
              ))
            : (transformations ?? []).map((t, i) => (
                <div
                  key={String(t.id)}
                  className={`reveal reveal-delay-${(i % 3) + 1} bg-brand-card border border-brand-border rounded-lg overflow-hidden hover:border-brand-primary/50 transition-all duration-300 hover:-translate-y-1`}
                  data-ocid={`transformations.item.${i + 1}`}
                >
                  <div className="flex h-44">
                    <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 relative">
                      <div className="w-16 h-16 rounded-full bg-zinc-600/50 border-2 border-zinc-500 mb-2 flex items-center justify-center">
                        <span className="text-zinc-400 text-xs font-heading uppercase tracking-wider">
                          B
                        </span>
                      </div>
                      <div className="w-12 h-8 bg-zinc-600/30 rounded" />
                      <span className="absolute top-2 left-2 bg-zinc-700/80 text-zinc-300 text-xs font-heading uppercase tracking-wider px-2 py-0.5 rounded">
                        Before
                      </span>
                    </div>
                    <div className="w-px bg-brand-border" />
                    <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-brand-olive to-zinc-900 relative">
                      <div className="w-16 h-16 rounded-full bg-brand-primary/20 border-2 border-brand-primary mb-2 flex items-center justify-center">
                        <span className="text-brand-primary text-xs font-heading uppercase tracking-wider">
                          A
                        </span>
                      </div>
                      <div className="w-10 h-6 bg-brand-olive/30 rounded" />
                      <span className="absolute top-2 right-2 bg-brand-primary/80 text-brand-dark text-xs font-heading uppercase tracking-wider px-2 py-0.5 rounded">
                        After
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-heading font-bold uppercase text-white text-sm tracking-wider">
                        {t.name}
                      </p>
                      <p className="text-brand-muted text-xs">{t.duration}</p>
                    </div>
                    <div className="bg-brand-primary/10 border border-brand-primary/30 rounded-full px-3 py-1">
                      <span className="text-brand-primary font-heading font-bold text-xs uppercase tracking-wider">
                        {t.result}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
