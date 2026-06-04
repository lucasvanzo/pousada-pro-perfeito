import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { MapPin, Church, UtensilsCrossed, Ship, Waves, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/localizacao")({
  head: () => ({
    meta: [
      { title: "Localização — Estalagem Colonial Paraty" },
      { name: "description", content: "Estamos no centro histórico de Paraty, Patrimônio da Humanidade pela UNESCO." },
      { property: "og:title", content: "Localização — Estalagem Colonial" },
      { property: "og:url", content: "/localizacao" },
    ],
    links: [{ rel: "canonical", href: "/localizacao" }],
  }),
  component: LocationPage,
});

function LocationPage() {
  const { t } = useTranslation();
  return (
    <div className="pt-24">
      <section className="bg-cream py-16">
        <div className="container-prose text-center max-w-3xl mx-auto">
          <p className="text-accent uppercase tracking-[0.3em] text-xs font-medium">{t("location.eyebrow")}</p>
          <h1 className="font-display text-5xl md:text-6xl text-colonial mt-3">{t("location.title")}</h1>
          <p className="mt-6 text-foreground/80 leading-relaxed">{t("location.description")}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-prose grid lg:grid-cols-2 gap-10">
          <div className="aspect-square lg:aspect-auto lg:min-h-[500px] rounded-2xl overflow-hidden shadow-elegant">
            <iframe src={SITE.mapEmbed} className="w-full h-full border-0" loading="lazy" title="map" />
          </div>
          <div className="space-y-6">
            <Card className="p-6 border-border shadow-card">
              <h2 className="font-display text-2xl text-colonial">{t("location.card_title")}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t("location.card_desc")}</p>
              <div className="mt-4 flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                <span>{SITE.address}</span>
              </div>
              <Button asChild className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground" size="sm">
                <a href={SITE.mapUrl} target="_blank" rel="noreferrer">
                  {t("location.see_map")} <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                </a>
              </Button>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { Icon: Church, k: "church" },
                { Icon: UtensilsCrossed, k: "restaurants" },
                { Icon: Ship, k: "port" },
                { Icon: Waves, k: "beaches" },
              ].map(({ Icon, k }) => (
                <Card key={k} className="p-5 border-border">
                  <Icon className="h-6 w-6 text-accent" />
                  <p className="mt-3 text-sm font-medium">{t(`location.poi.${k}`)}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
