import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Estalagem Colonial Paraty" },
      { name: "description", content: "Perguntas frequentes sobre check-in, café da manhã, pets e pagamentos." },
      { property: "og:title", content: "FAQ — Estalagem Colonial" },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FAQPage,
});

function FAQPage() {
  const { t } = useTranslation();
  const items = t("faq.items", { returnObjects: true }) as { q: string; a: string }[];

  return (
    <div className="pt-24">
      <section className="bg-cream py-16">
        <div className="container-prose text-center max-w-2xl mx-auto">
          <h1 className="font-display text-5xl md:text-6xl text-colonial">{t("faq.title")}</h1>
          <p className="mt-4 text-foreground/75 text-lg">{t("faq.subtitle")}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-prose max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {items.map((it, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card border border-border rounded-xl px-5"
              >
                <AccordionTrigger className="text-left font-display text-lg hover:no-underline">
                  {it.q}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/75">{it.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
