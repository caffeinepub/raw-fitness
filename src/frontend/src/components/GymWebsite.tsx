import { useEffect, useRef } from "react";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import FloatingButtons from "./sections/FloatingButtons";
import Footer from "./sections/Footer";
import HeroSection from "./sections/HeroSection";
import MembershipsSection from "./sections/MembershipsSection";
import Navbar from "./sections/Navbar";
import TestimonialsSection from "./sections/TestimonialsSection";
import TrainersSection from "./sections/TrainersSection";
import TransformationsSection from "./sections/TransformationsSection";

export default function GymWebsite() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const elements = document.querySelectorAll(".reveal");
    for (const el of elements) {
      observerRef.current?.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const elements = document.querySelectorAll(".reveal:not(.visible)");
      for (const el of elements) {
        observerRef.current?.observe(el);
      }
    }, 100);
    return () => clearTimeout(timeout);
  });

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <MembershipsSection />
        <TrainersSection />
        <TransformationsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
