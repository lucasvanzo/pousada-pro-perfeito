import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Check, Users } from "lucide-react";
import { ROOMS } from "@/lib/site";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReservationForm } from "@/components/ReservationForm";

export const Route = createFileRoute("/acomodacoes")({
  head: () => ({
    meta: [
      { title: "Acomodações — Estalagem Colonial Paraty" },
      { name: "description", content: "Conheça nossos três quartos coloniais em Paraty, com café da manhã, Wi-Fi e ar-condicionado." },
      { property: "og:title", content: "Acomodações — Estalagem Colonial" },
      { property: "og:description", content: "Quartos confortáveis no centro histórico de Paraty." },
      { property: "og:url", content: "/acomodacoes" },
    ],
    links: [{ rel: "canonical", href: "/acomodacoes" }],
  }),
  component: RoomsPage,
});

function RoomsPage() {
  const { t } = useTranslation();
  return (
    <div className="pt-24">
      <section className="bg-cream py-16">
        <div className="container-prose text-center max-w-2xl mx-auto">
          <h1 className="font-display text-5xl md:text-6xl text-colonial">{t("rooms.title")}</h1>
          <p className="mt-4 text-foreground/75 text-lg">{t("rooms.subtitle")}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-prose space-y-12">
          {ROOMS.map((room, idx) => (
            <Card
              key={room.slug}
              className="overflow-hidden border-border shadow-card p-0 grid md:grid-cols-2 gap-0"
            >
              <div className={`aspect-[4/3] md:aspect-auto overflow-hidden ${idx % 2 ? "md:order-2" : ""}`}>
                <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full">
                  <img src={room.photos[0]} alt="" className="col-span-2 row-span-1 object-cover w-full h-full" loading="lazy" />
                  <img src={room.photos[1]} alt="" className="object-cover w-full h-full" loading="lazy" />
                  <img src={room.photos[2]} alt="" className="object-cover w-full h-full" loading="lazy" />
                </div>
              </div>
              <div className="p-8 md:p-10 flex flex-col">
                <h2 className="font-display text-3xl text-colonial">{t(`rooms.list.${room.id}.name`)}</h2>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" /> {t("rooms.guests", { count: room.capacity })}
                </div>
                <p className="mt-4 text-foreground/80 leading-relaxed">{t(`rooms.list.${room.id}.desc`)}</p>

                <div className="mt-6">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">{t("rooms.amenities")}</p>
                  <ul className="grid grid-cols-2 gap-2 text-sm">
                    {room.amenities.map((a) => (
                      <li key={a} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-accent" /> {t(`rooms.amen.${a}`)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-6 flex items-end justify-between border-t border-border mt-6">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("rooms.from")}</p>
                    <p className="font-display text-3xl text-colonial">
                      R$ {room.price}
                      <span className="text-sm text-muted-foreground font-sans"> / {t("rooms.per_night")}</span>
                    </p>
                  </div>
                  <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <a href="#reservar">{t("rooms.book_this")}</a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section id="reservar" className="py-16 bg-cream">
        <div className="container-prose max-w-2xl">
          <ReservationForm />
        </div>
      </section>
    </div>
  );
}
