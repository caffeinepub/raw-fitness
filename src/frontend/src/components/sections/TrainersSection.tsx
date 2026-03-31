import { Skeleton } from "@/components/ui/skeleton";
import { useGetTrainers } from "@/hooks/useQueries";
import { Award, MessageCircle } from "lucide-react";

export default function TrainersSection() {
  const { data: trainers, isLoading } = useGetTrainers();

  return (
    <section id="trainers" className="py-24 bg-brand-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="font-body text-xs uppercase tracking-widest text-brand-primary font-semibold">
            Expert Team
          </span>
          <h2 className="font-heading font-bold uppercase text-3xl lg:text-4xl text-white mt-2">
            Our Trainers
          </h2>
          <div className="w-16 h-1 bg-brand-primary mx-auto mt-4" />
          <p className="text-brand-muted mt-4 max-w-md mx-auto">
            Train under the guidance of industry-leading certified coaches.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-brand-card border border-brand-border rounded-lg overflow-hidden"
                >
                  <Skeleton className="h-64 w-full bg-brand-olive/40" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-5 w-32 bg-brand-olive/40" />
                    <Skeleton className="h-4 w-24 bg-brand-olive/40" />
                    <Skeleton className="h-16 w-full bg-brand-olive/40" />
                  </div>
                </div>
              ))
            : (trainers ?? []).map((trainer, i) => (
                <div
                  key={String(trainer.id)}
                  className={`reveal reveal-delay-${i + 1} bg-brand-card border border-brand-border rounded-lg overflow-hidden hover:border-brand-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover group`}
                  data-ocid={`trainers.card.${i + 1}`}
                >
                  <div className="relative overflow-hidden h-64">
                    {trainer.imageUrl ? (
                      <img
                        src={trainer.imageUrl}
                        alt={trainer.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-brand-olive/20 flex items-center justify-center">
                        <span className="font-heading text-4xl text-brand-primary">
                          {trainer.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 bg-brand-primary/90 rounded px-2.5 py-1 flex items-center gap-1.5">
                      <Award className="w-3 h-3 text-brand-dark" />
                      <span className="font-body text-xs text-brand-dark font-semibold">
                        {trainer.cert}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-heading font-bold uppercase text-lg text-white tracking-wider">
                      {trainer.name}
                    </h3>
                    <p className="text-brand-primary font-body text-sm font-semibold mt-0.5 mb-1">
                      {trainer.title}
                    </p>
                    <p className="text-brand-muted text-xs mb-3">
                      {trainer.experience} Experience
                    </p>
                    <p className="text-brand-muted text-sm leading-relaxed mb-5">
                      {trainer.bio}
                    </p>
                    <a
                      href={`https://wa.me/1234567890?text=${encodeURIComponent(`Hi! I'd like to book a session with ${trainer.name}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-heading font-semibold uppercase text-xs tracking-wider text-brand-primary border border-brand-primary rounded px-4 py-2.5 hover:bg-brand-primary hover:text-brand-dark transition-all duration-300"
                      data-ocid={`trainers.primary_button.${i + 1}`}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Book Session
                    </a>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
