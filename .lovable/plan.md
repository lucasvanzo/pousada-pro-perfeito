
# Estalagem Colonial — Site público + Painel Admin

Baseado na varredura de `hotpink-curlew-687286.hostingersite.com`. Mantém identidade colonial (marrom escuro + terracota + creme) e toda a estrutura/conteúdo atual, melhorando layout, tradução, performance e funcionamento.

## 1. Stack & Infra
- TanStack Start (já no projeto) + Tailwind v4 + shadcn/ui
- **Lovable Cloud** (Supabase gerenciado) para: auth admin, banco (quartos, reservas, depoimentos, textos editáveis), storage (fotos/vídeo hero), envio de e-mail de reserva
- **i18n nativo PT/EN/ES** via `i18next` + `react-i18next` (detecção por navegador + seletor de bandeira)

## 2. Site público — rotas
Cada rota com `head()` próprio (title, description, OG, canonical, JSON-LD):

- `/` — Home: hero com carrossel/vídeo, "Sinta-se em casa", destaques (Pousada, Área Comum, Experiências), depoimentos, CTA reserva
- `/acomodacoes` — Galeria de quartos (Quarto 1/2/3) com fotos, comodidades, preços, CTA reservar
- `/acomodacoes/$slug` — Detalhe de cada quarto
- `/localizacao` — Mapa Google embed, endereço, pontos turísticos, distâncias
- `/faq` — Perguntas frequentes (Accordion)
- `/contato` — Formulário, WhatsApp, redes sociais, mapa
- `/reservar` — Formulário completo de reserva (atual está no hero; manter atalho no hero + página dedicada)
- `/auth` — Login admin
- `/admin/*` — Painel (protegido)

## 3. Melhorias de layout/UX (público)
- **Hero refinado**: imagem full-bleed com gradiente, título Playfair Display, subtítulo em PT/EN/ES traduzido, indicadores de slide elegantes, botão "Reservar" e "Ver acomodações"
- **Formulário de reserva**: validação (Zod + react-hook-form), date-picker com bloqueio de datas ocupadas (lido do Supabase), cálculo de noites/preço estimado, opção WhatsApp **ou** e-mail
- **Galeria**: grid responsivo + lightbox (já existe `aspect-ratio` e shadcn dialog)
- **Depoimentos**: carrossel com fonte (Airbnb/Booking), formulário "Deixe sua avaliação" com moderação (vai para Supabase com `approved=false`)
- **Localização**: cards de distâncias com ícones consistentes (Lucide, não emoji), Google Maps embed real
- **Footer profissional**: contatos, horários, redes, mapa do site, selo "Centro Histórico UNESCO"
- **Acessibilidade**: contraste AA, navegação por teclado, alt em todas as imagens, `lang` dinâmico
- **Performance**: lazy-load de imagens, `loading="lazy"`, formato WebP via Supabase transform, preconnect

## 4. Tradução (PT/EN/ES)
- Arquivos `src/locales/{pt,en,es}.json` com todas as strings
- Seletor de idioma no header (mantém bandeiras)
- Conteúdo editável (textos do admin) armazenado com 3 colunas (`text_pt`, `text_en`, `text_es`) ou tabela `translations`
- Tradução profissional de todos os textos atuais (corrigindo "hospédes" → "hóspedes", etc.)

## 5. Painel Admin (`/admin`)
Autenticação via Supabase Auth (e-mail/senha). Tabela `user_roles` com `has_role()`.

Páginas:
- **Dashboard** — próximas reservas, ocupação do mês, novas avaliações pendentes
- **Calendário de Reservas** — `react-big-calendar` (já no bundle original) com visão mês/semana, criar/editar/cancelar reserva, bloquear datas manualmente
- **Reservas** — tabela com filtros (status, período), exportar CSV, atualizar status (pendente/confirmada/cancelada)
- **Acomodações** — CRUD de quartos (fotos, descrição PT/EN/ES, preço, capacidade)
- **Galeria** — upload/reordenar fotos do hero e seções
- **Depoimentos** — aprovar/rejeitar avaliações enviadas
- **Textos do site** — editar copy de cada seção em PT/EN/ES + upload de vídeo MP4 do hero
- **Configurações** — contatos, redes, WhatsApp, endereço, horários

## 6. Modelo de dados (Supabase)
```text
rooms (id, slug, name_pt/en/es, description_*, price, capacity, photos[], amenities[])
reservations (id, room_id, guest_name, email, phone, check_in, check_out, payment_method, status, total, notes, created_at)
blocked_dates (id, room_id, start, end, reason)
testimonials (id, name, rating, text, source, approved, created_at)
site_texts (key, value_pt, value_en, value_es)
site_settings (key, value)  -- contatos, redes, vídeo hero
gallery_images (id, section, url, order)
user_roles (user_id, role)  -- 'admin'
```
Todas com RLS: leitura pública apenas em `rooms`, `testimonials WHERE approved`, `site_texts`, `gallery_images`. Escrita só `admin`.

## 7. SEO
- `JSON-LD LodgingBusiness` no root com endereço, telefone, geo, preço
- `Article`/`Review` para depoimentos
- Sitemap dinâmico, robots.txt
- Open Graph com foto da fachada
- `hreflang` PT/EN/ES

## 8. Entrega faseada
1. **Fase 1** — Estrutura, design system colonial, i18n, home + acomodações + contato + localização + FAQ (site público completo, dados mockados)
2. **Fase 2** — Lovable Cloud: auth admin, tabelas, RLS, migração de conteúdo para o banco
3. **Fase 3** — Painel admin completo (calendário, reservas, CRUDs)
4. **Fase 4** — Envio de e-mail de reserva, integração WhatsApp, polimento, SEO final

## Detalhes técnicos
- `i18next` com `react-i18next` + `i18next-browser-languagedetector`
- `react-hook-form` + `zod` para formulários
- `date-fns` + `react-day-picker` para datas
- `react-big-calendar` no admin
- E-mail via Resend (server function) — chave em secret
- Imagens via Supabase Storage + transform CDN

Confirma o plano? Posso começar pela **Fase 1** (site público com design refinado, i18n e todo conteúdo da varredura — sem precisar dos arquivos `src/` originais).
