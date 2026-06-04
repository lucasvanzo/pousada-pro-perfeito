import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ROOMS, SITE } from "@/lib/site";
import { toast } from "sonner";
import { MessageCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "—"),
  email: z.string().email(),
  phone: z.string().min(8),
  room: z.string(),
  payment: z.string(),
  checkin: z.string().min(1),
  checkout: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export function ReservationForm({ compact = false }: { compact?: boolean }) {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { room: ROOMS[0].slug, payment: "pix" },
  });

  const onSubmit = (data: FormData) => {
    setSubmitting(true);
    const msg = encodeURIComponent(
      `Olá! Gostaria de reservar.\n\nNome: ${data.name}\nE-mail: ${data.email}\nTelefone: ${data.phone}\nQuarto: ${data.room}\nCheck-in: ${data.checkin}\nCheck-out: ${data.checkout}\nPagamento: ${data.payment}`,
    );
    window.open(`https://wa.me/${SITE.whatsapp}?text=${msg}`, "_blank");
    toast.success(t("reservation.success"));
    setSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`bg-card text-card-foreground rounded-2xl p-6 md:p-8 shadow-elegant ${compact ? "" : "border border-border"}`}
    >
      <h3 className="font-display text-2xl">{t("reservation.title")}</h3>
      <p className="text-sm text-muted-foreground mt-1">{t("reservation.subtitle")}</p>

      <div className="mt-6 space-y-4">
        <div>
          <Label className="text-xs uppercase tracking-wide">{t("reservation.name")}</Label>
          <Input className="mt-1.5" placeholder={t("reservation.name_placeholder")} {...register("name")} />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs uppercase tracking-wide">{t("reservation.email")}</Label>
            <Input className="mt-1.5" type="email" placeholder="seu@email.com" {...register("email")} />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wide">{t("reservation.phone")}</Label>
            <Input className="mt-1.5" placeholder="(24) 99999-9999" {...register("phone")} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs uppercase tracking-wide">{t("reservation.room")}</Label>
            <Select defaultValue={ROOMS[0].slug} onValueChange={(v) => setValue("room", v)}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                {ROOMS.map((r) => (
                  <SelectItem key={r.slug} value={r.slug}>
                    {t(`rooms.list.${r.id}.name`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wide">{t("reservation.payment")}</Label>
            <Select defaultValue="pix" onValueChange={(v) => setValue("payment", v)}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="pix">{t("reservation.payments.pix")}</SelectItem>
                <SelectItem value="card">{t("reservation.payments.card")}</SelectItem>
                <SelectItem value="transfer">{t("reservation.payments.transfer")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-xs uppercase tracking-wide">{t("reservation.checkin")}</Label>
            <Input className="mt-1.5" type="date" {...register("checkin")} />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wide">{t("reservation.checkout")}</Label>
            <Input className="mt-1.5" type="date" {...register("checkout")} />
          </div>
        </div>

        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-base"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          {t("reservation.submit")}
        </Button>
      </div>
    </form>
  );
}
