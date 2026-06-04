import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { MapPin, Phone, Mail, MessageCircle, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { SITE } from "@/lib/site";
import { toast } from "sonner";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Estalagem Colonial Paraty" },
      { name: "description", content: "Entre em contato com a Estalagem Colonial em Paraty. WhatsApp, e-mail e mapa." },
      { property: "og:title", content: "Contato — Estalagem Colonial" },
      { property: "og:url", content: "/contato" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
  component: ContactPage,
});

type FD = { name: string; email: string; message: string };

function ContactPage() {
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm<FD>();
  const onSubmit = (data: FD) => {
    const msg = encodeURIComponent(`${data.name} (${data.email})\n\n${data.message}`);
    window.open(`https://wa.me/${SITE.whatsapp}?text=${msg}`, "_blank");
    toast.success(t("reservation.success"));
    reset();
  };

  return (
    <div className="pt-24">
      <section className="bg-cream py-16">
        <div className="container-prose text-center max-w-2xl mx-auto">
          <h1 className="font-display text-5xl md:text-6xl text-colonial">{t("contact.title")}</h1>
          <p className="mt-4 text-foreground/75 text-lg">{t("contact.subtitle")}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-prose grid lg:grid-cols-2 gap-10">
          <Card className="p-8 border-border shadow-card">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label className="text-xs uppercase tracking-wide">{t("contact.name")}</Label>
                <Input className="mt-1.5" required {...register("name")} />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wide">{t("contact.email")}</Label>
                <Input className="mt-1.5" type="email" required {...register("email")} />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wide">{t("contact.message")}</Label>
                <Textarea className="mt-1.5 min-h-32" required {...register("message")} />
              </div>
              <div className="flex gap-3">
                <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                  {t("contact.send")}
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-4 w-4 mr-2" /> {t("contact.whatsapp")}
                  </a>
                </Button>
              </div>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 border-border">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("contact.address_label")}</p>
                  <p className="mt-1 text-foreground">{SITE.address}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 border-border">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("contact.phone_label")}</p>
                  <p className="mt-1 text-foreground">{SITE.phone}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 border-border">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("contact.email_label")}</p>
                  <p className="mt-1 text-foreground">{SITE.email}</p>
                </div>
              </div>
            </Card>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">{t("contact.social")}</p>
              <div className="flex gap-3">
                <a href={SITE.instagram} target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href={SITE.facebook} target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="container-prose mt-12 aspect-[16/7] rounded-2xl overflow-hidden shadow-elegant">
          <iframe src={SITE.mapEmbed} className="w-full h-full border-0" loading="lazy" title="map" />
        </div>
      </section>
    </div>
  );
}
