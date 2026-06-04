import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Check, X, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/depoimentos")({
  component: TestimonialsAdmin,
});

type T = { id: string; name: string; rating: number; text: string; source: string | null; language: string | null; approved: boolean; created_at: string };

function TestimonialsAdmin() {
  const [items, setItems] = useState<T[]>([]);
  const [tab, setTab] = useState<"pending" | "approved">("pending");

  const load = async () => {
    const { data } = await supabase.from("testimonials").select("*").eq("approved", tab === "approved").order("created_at", { ascending: false });
    setItems((data as T[]) || []);
  };
  useEffect(() => { load(); }, [tab]);

  const setApproved = async (id: string, approved: boolean) => {
    const { error } = await supabase.from("testimonials").update({ approved }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(approved ? "Aprovado" : "Rejeitado");
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Remover?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    load();
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-display">Depoimentos</h1>
        <div className="flex gap-2">
          <Button size="sm" variant={tab === "pending" ? "default" : "outline"} onClick={() => setTab("pending")}>Pendentes</Button>
          <Button size="sm" variant={tab === "approved" ? "default" : "outline"} onClick={() => setTab("approved")}>Aprovados</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {items.length === 0 && <p className="text-sm text-muted-foreground">Nenhum depoimento.</p>}
        {items.map((t) => (
          <Card key={t.id} className="p-5">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">{t.name}</h3>
                <p className="text-xs text-muted-foreground">{t.source} · {t.language}</p>
              </div>
              <div className="flex">
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-accent text-accent" />)}
              </div>
            </div>
            <p className="text-sm">{t.text}</p>
            <div className="mt-4 flex gap-2 justify-end">
              {!t.approved ? (
                <Button size="sm" onClick={() => setApproved(t.id, true)}><Check className="h-3 w-3 mr-1" /> Aprovar</Button>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setApproved(t.id, false)}><X className="h-3 w-3 mr-1" /> Despublicar</Button>
              )}
              <Button size="sm" variant="ghost" className="text-destructive" onClick={() => remove(t.id)}><Trash2 className="h-3 w-3" /></Button>
            </div>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
