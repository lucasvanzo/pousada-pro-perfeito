export const SITE = {
  name: "Estalagem Colonial",
  city: "Paraty, RJ",
  phone: "+55 24 99999-9999",
  whatsapp: "5524999999999",
  email: "reservas@estalagemcolonial.com.br",
  address: "Rua Comendador José Luiz, 231 — Casa 07, Centro Histórico, Paraty/RJ",
  mapUrl: "https://maps.app.goo.gl/yRnD2hXhx7MBqiY79",
  mapEmbed:
    "https://www.google.com/maps?q=Rua+Comendador+Jos%C3%A9+Luiz%2C+231%2C+Paraty&output=embed",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
};

export const HERO_IMAGES = [
  "https://sfcjbghvfyzdfajzjeur.supabase.co/storage/v1/object/public/images/uploads/1779926046450_eulaliasilva2008-historic-church-1708633.jpg",
  "https://sfcjbghvfyzdfajzjeur.supabase.co/storage/v1/object/public/images/uploads/1779926064678_gilberto-olimpio-Voxlac0w_6I-unsplash.jpg",
  "https://sfcjbghvfyzdfajzjeur.supabase.co/storage/v1/object/public/images/uploads/1779926094223_mauro-lima-pkTgsLqLPs8-unsplash.jpg",
  "https://sfcjbghvfyzdfajzjeur.supabase.co/storage/v1/object/public/images/uploads/1779926110912_gilberto-olimpio-2e6qccw499s-unsplash.jpg",
  "https://sfcjbghvfyzdfajzjeur.supabase.co/storage/v1/object/public/images/uploads/1779926132968_anapuakaindiosonline-paraty-956460.jpg",
  "https://sfcjbghvfyzdfajzjeur.supabase.co/storage/v1/object/public/images/uploads/1779926152195_siqueiraadriano-paraty-2584656.jpg",
  "https://sfcjbghvfyzdfajzjeur.supabase.co/storage/v1/object/public/images/uploads/1779925995510_auluz-brazil-2712865.jpg",
];

export const FACADE_IMAGE =
  "https://sfcjbghvfyzdfajzjeur.supabase.co/storage/v1/object/public/images/uploads/1780541676917_fachada.jpeg";

export const COMMON_AREA_IMAGE =
  "https://sfcjbghvfyzdfajzjeur.supabase.co/storage/v1/object/public/images/uploads/1780541776468_quiosque.jpeg";

export const ROOMS = [
  {
    id: "room1",
    slug: "quarto-colonial",
    price: 420,
    capacity: 2,
    photos: [HERO_IMAGES[1], HERO_IMAGES[3], FACADE_IMAGE],
    amenities: ["wifi", "ac", "breakfast", "private_bath", "tv", "bedlinen"],
  },
  {
    id: "room2",
    slug: "quarto-casario",
    price: 380,
    capacity: 2,
    photos: [HERO_IMAGES[2], COMMON_AREA_IMAGE, HERO_IMAGES[4]],
    amenities: ["wifi", "ac", "breakfast", "private_bath", "bedlinen"],
  },
  {
    id: "room3",
    slug: "quarto-patio",
    price: 520,
    capacity: 4,
    photos: [HERO_IMAGES[5], HERO_IMAGES[6], FACADE_IMAGE],
    amenities: ["wifi", "ac", "breakfast", "private_bath", "tv", "bedlinen"],
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Cláudia M.",
    source: "Airbnb",
    date: "Maio 2025",
    rating: 5,
    text: "O quarto era aconchegante, cama ótima, toalhas macias e tudo muito limpo. A distância caminhando para os restaurantes e barzinhos do centro é de uns 5 minutos. Voltarei com certeza!",
  },
  {
    name: "Rafael S.",
    source: "Booking",
    date: "Abril 2025",
    rating: 5,
    text: "Atendimento impecável e localização perfeita. A fachada colonial é um charme à parte. Café da manhã farto e delicioso.",
  },
  {
    name: "María P.",
    source: "Google",
    date: "Março 2025",
    rating: 5,
    text: "Una experiencia maravillosa. La posada conserva todo el encanto colonial y los anfitriones son muy amables.",
  },
];
