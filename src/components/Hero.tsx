import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_IMAGES } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export function Hero() {
  const { t } = useTranslation();
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % HERO_IMAGES.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={HERO_IMAGES[i]}
            alt={t("hero.title")}
            className="h-full w-full object-cover"
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      <div className="relative z-10 flex h-full items-center">
        <div className="container-prose">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <p className="text-gold uppercase tracking-[0.3em] text-xs font-medium mb-4">
              {t("hero.subtitle")}
            </p>
            <h1 className="font-display text-cream text-5xl md:text-7xl leading-[1.05]">
              {t("hero.title")}
            </h1>
            <p className="mt-6 text-cream/85 text-lg md:text-xl max-w-xl">
              {t("hero.tagline")}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/acomodacoes">{t("hero.cta_book")}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-cream/40 text-cream hover:bg-cream hover:text-colonial"
              >
                <Link to="/acomodacoes">{t("hero.cta_rooms")}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <button
        onClick={() => setI((v) => (v - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)}
        aria-label="prev"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-black/30 text-cream backdrop-blur hover:bg-black/50 flex items-center justify-center"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => setI((v) => (v + 1) % HERO_IMAGES.length)}
        aria-label="next"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-black/30 text-cream backdrop-blur hover:bg-black/50 flex items-center justify-center"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {HERO_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`slide ${idx + 1}`}
            className={`h-1 rounded-full transition-all ${
              idx === i ? "w-10 bg-gold" : "w-4 bg-cream/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
