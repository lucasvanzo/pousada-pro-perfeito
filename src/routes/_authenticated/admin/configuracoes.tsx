import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/configuracoes")({
  component: SettingsPage,
});

type Contact = {
  phone: string; whatsapp: string; email: string; address: string;
  instagram: string; facebook: string;
};

const defaults: Contact = {
  phone: "", whatsapp: "", email: "", address: "", instagram: "", facebook: "",
};

function SettingsPage() {
  const [contact, setContact] = useState<Contact>(defaults);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("site_settings").select("value").eq("key", "contact").maybeSingle();
      if (data?.value) setContact({ ...defaults, ...(data.value as any) });
    })();
  }, []);

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("site_settings").upsert({ key: "contact", value: contact });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Configurações salvas");
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-display mb-6">Configurações</h1>
      <Card className="p-6 max-w-2xl space-y-4">
        <h2 className="font-semibold">Contato</h2>
        {(Object.keys(defaults) as (keyof Contact)[]).map((k) => (
          <div key={k}>
            <Label className="capitalize">{k}</Label>
            <Input value={contact[k]} onChange={(e) => setContact({ ...contact, [k]: e.target.value })} />
          </div>
        ))}
        <div className="pt-2">
          <Button onClick={save} disabled={saving}>{saving ? "Salvando…" : "Salvar"}</Button>
        </div>
      </Card>
    </AdminLayout>
  );
}
