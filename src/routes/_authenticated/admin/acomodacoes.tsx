import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/acomodacoes")({
  component: RoomsAdmin,
});

type Room = {
  id?: string;
  slug: string;
  name_pt: string; name_en: string; name_es: string;
  description_pt: string; description_en: string; description_es: string;
  price: number; capacity: number;
  photos: string[]; amenities: string[];
  active: boolean; sort_order: number;
};

const empty: Room = {
  slug: "", name_pt: "", name_en: "", name_es: "",
  description_pt: "", description_en: "", description_es: "",
  price: 0, capacity: 2, photos: [], amenities: [], active: true, sort_order: 0,
};

function RoomsAdmin() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [editing, setEditing] = useState<Room | null>(null);
  const [open, setOpen] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("rooms").select("*").order("sort_order");
    setRooms((data as Room[]) || []);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    const payload = { ...editing };
    const { error } = editing.id
      ? await supabase.from("rooms").update(payload).eq("id", editing.id)
      : await supabase.from("rooms").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Salvo");
    setOpen(false); setEditing(null); load();
  };

  const remove = async (id: string) => {
    if (!confirm("Remover acomodação?")) return;
    const { error } = await supabase.from("rooms").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  const openNew = () => { setEditing({ ...empty }); setOpen(true); };
  const openEdit = (r: Room) => { setEditing({ ...r }); setOpen(true); };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-display">Acomodações</h1>
        <Button onClick={openNew}><Plus className="h-4 w-4 mr-1" /> Nova</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((r) => (
          <Card key={r.id} className="overflow-hidden">
            {r.photos[0] && <img src={r.photos[0]} alt={r.name_pt} className="h-44 w-full object-cover" />}
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{r.name_pt}</h3>
                  <p className="text-xs text-muted-foreground">{r.slug}</p>
                </div>
                <span className="text-sm font-medium">R$ {r.price}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{r.description_pt}</p>
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" onClick={() => openEdit(r)}><Pencil className="h-3 w-3 mr-1" /> Editar</Button>
                <Button size="sm" variant="ghost" className="text-destructive" onClick={() => r.id && remove(r.id)}><Trash2 className="h-3 w-3" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Editar" : "Nova"} acomodação</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Slug" value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: v })} />
              <Field label="Preço (R$)" type="number" value={String(editing.price)} onChange={(v) => setEditing({ ...editing, price: Number(v) })} />
              <Field label="Capacidade" type="number" value={String(editing.capacity)} onChange={(v) => setEditing({ ...editing, capacity: Number(v) })} />
              <Field label="Ordem" type="number" value={String(editing.sort_order)} onChange={(v) => setEditing({ ...editing, sort_order: Number(v) })} />
              <Field label="Nome (PT)" value={editing.name_pt} onChange={(v) => setEditing({ ...editing, name_pt: v })} />
              <Field label="Nome (EN)" value={editing.name_en} onChange={(v) => setEditing({ ...editing, name_en: v })} />
              <Field label="Nome (ES)" value={editing.name_es} onChange={(v) => setEditing({ ...editing, name_es: v })} />
              <div className="sm:col-span-2">
                <Label>Descrição (PT)</Label>
                <Textarea rows={3} value={editing.description_pt} onChange={(e) => setEditing({ ...editing, description_pt: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <Label>Descrição (EN)</Label>
                <Textarea rows={3} value={editing.description_en} onChange={(e) => setEditing({ ...editing, description_en: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <Label>Descrição (ES)</Label>
                <Textarea rows={3} value={editing.description_es} onChange={(e) => setEditing({ ...editing, description_es: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <Label>Fotos (URLs separadas por vírgula)</Label>
                <Textarea rows={2} value={editing.photos.join(", ")} onChange={(e) => setEditing({ ...editing, photos: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })} />
              </div>
              <div className="sm:col-span-2">
                <Label>Comodidades (separadas por vírgula)</Label>
                <Input value={editing.amenities.join(", ")} onChange={(e) => setEditing({ ...editing, amenities: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })} />
              </div>
              <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                <Button onClick={save}>Salvar</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
