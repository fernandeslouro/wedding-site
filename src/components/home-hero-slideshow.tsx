"use client";

import { useEffect, useState } from "react";

export type HeroSlide = {
  location?: string;
  src: string;
};

export function HomeHeroSlideshow({
  slides,
  intervalMs = 5200,
}: {
  slides: HeroSlide[];
  intervalMs?: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [failedSlides, setFailedSlides] = useState<string[]>([]);

  const visibleSlides = slides.filter((slide) => !failedSlides.includes(slide.src));

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    if (visibleSlides.length < 2 || prefersReducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % visibleSlides.length);
    }, intervalMs);

    return () => {
      window.clearInterval(interval);
    };
  }, [intervalMs, prefersReducedMotion, visibleSlides.length]);

  useEffect(() => {
    if (activeIndex < visibleSlides.length) {
      return;
    }

    setActiveIndex(0);
  }, [activeIndex, visibleSlides.length]);

  if (visibleSlides.length === 0) {
    return null;
  }

  return (
    <div className="hero-slideshow">
      {visibleSlides.map((slide, index) => {
        const isChurchSlide = slide.src.includes("1168447-hero");

        return (
          <div
            aria-hidden="true"
            className={`hero-slide${index === activeIndex ? " is-active" : ""}${isChurchSlide ? " is-church-slide" : ""}`}
            key={`${slide.src}-${index}`}
          >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="hero-slide-image"
            decoding="async"
            fetchPriority={index === 0 ? "high" : undefined}
            loading={index === 0 ? "eager" : "lazy"}
            onError={() =>
              setFailedSlides((currentSlides) =>
                currentSlides.includes(slide.src)
                  ? currentSlides
                  : [...currentSlides, slide.src],
              )
            }
            src={slide.src}
          />
          </div>
        );
      })}
    </div>
  );
}
