import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation, Trans } from "react-i18next";
import { motion } from "framer-motion";
import { MapPin, Star, ArrowRight, Church, UtensilsCrossed, Ship, Waves } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ReservationForm } from "@/components/ReservationForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FACADE_IMAGE, COMMON_AREA_IMAGE, HERO_IMAGES, TESTIMONIALS, SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Estalagem Colonial — Pousada em Paraty" },
      { name: "description", content: "Pousada colonial no centro histórico de Paraty. Reserve sua estadia." },
      { property: "og:title", content: "Estalagem Colonial — Paraty" },
      { property: "og:description", content: "Hospedagem histórica no centro de Paraty (UNESCO)." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const { t } = useTranslation();

  return (
    <>
      <Hero />

      {/* Reservation card overlapping hero */}
      <section className="relative -mt-24 z-20 pb-20">
        <div className="container-prose grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 hidden lg:block" />
          <div className="lg:col-span-2">
            <ReservationForm />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-cream">
        <div className="container-prose grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent uppercase tracking-[0.3em] text-xs font-medium">
              {t("about.eyebrow")}
            </p>
            <h2 className="font-display text-4xl md:text-5xl mt-3 text-colonial">
              {t("about.title")}
            </h2>
            <p className="mt-6 text-foreground/80 text-lg leading-relaxed">{t("about.p1")}</p>
            <p className="mt-4 text-foreground/80 text-lg leading-relaxed">{t("about.p2")}</p>
            <Button asChild className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/acomodacoes">
                {t("nav.rooms")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-elegant"
          >
            <img src={FACADE_IMAGE} alt={t("highlights.facade.title")} className="h-full w-full object-cover" loading="lazy" />
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20">
        <div className="container-prose">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-4xl md:text-5xl text-colonial">{t("highlights.title")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { img: FACADE_IMAGE, k: "facade" },
              { img: COMMON_AREA_IMAGE, k: "common" },
              { img: HERO_IMAGES[4], k: "experiences" },
            ].map((card, idx) => (
              <motion.div
                key={card.k}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="group overflow-hidden border-border shadow-card p-0">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={card.img} alt={t(`highlights.${card.k}.title`)} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl text-colonial">{t(`highlights.${card.k}.title`)}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{t(`highlights.${card.k}.desc`)}</p>
                    <Link to="/acomodacoes" className="mt-4 inline-flex items-center text-sm text-accent font-medium hover:underline">
                      {t("highlights.see_more")} <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-cream">
        <div className="container-prose">
          <h2 className="font-display text-4xl md:text-5xl text-center text-colonial mb-12">
            {t("testimonials.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((tm, i) => (
              <Card key={i} className="p-6 bg-card border-border shadow-card">
                <div className="flex gap-0.5 text-gold mb-3">
                  {Array.from({ length: tm.rating }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-gold" />
                  ))}
                </div>
                <p className="text-foreground/85 italic leading-relaxed">"{tm.text}"</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="font-semibold text-foreground">{tm.name}</p>
                  <p className="text-xs text-muted-foreground">{tm.date} · {tm.source}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location preview */}
      <section className="py-20">
        <div className="container-prose grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-accent uppercase tracking-[0.3em] text-xs font-medium">{t("location.eyebrow")}</p>
            <h2 className="font-display text-4xl md:text-5xl mt-3 text-colonial">{t("location.title")}</h2>
            <p className="mt-6 text-foreground/80 leading-relaxed">{t("location.description")}</p>
            <div className="mt-6 flex items-start gap-2 text-sm text-foreground/70">
              <MapPin className="h-4 w-4 mt-1 text-accent shrink-0" />
              <span>{SITE.address}</span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { Icon: Church, k: "church" },
                { Icon: UtensilsCrossed, k: "restaurants" },
                { Icon: Ship, k: "port" },
                { Icon: Waves, k: "beaches" },
              ].map(({ Icon, k }) => (
                <div key={k} className="flex items-start gap-2 text-sm">
                  <Icon className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                  <span className="text-foreground/80">{t(`location.poi.${k}`)}</span>
                </div>
              ))}
            </div>
            <Button asChild className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/localizacao">{t("location.see_map")} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant">
            <iframe
              src={SITE.mapEmbed}
              className="w-full h-full border-0"
              loading="lazy"
              title="map"
            />
          </div>
        </div>
      </section>
    </>
  );
}
