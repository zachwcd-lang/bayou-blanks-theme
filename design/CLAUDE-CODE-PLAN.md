# Claude Code Implementation Plan — Bayou Blanks Theme Redesign

**This is the canonical build spec.** Approved by Zach 2026-06-10 from a rendered concept. Background/rationale: `design/DESIGN-OVERHAUL.md`. Repo is GitHub-linked to Shopify — **pushing to main deploys to the live store.** Work in small commits; each phase below is one session.

## The look (one paragraph)
Cream paper + deep bayou-green ink. **All-Inter typography** — SF-tech-minimal, hierarchy from weight and tracking, not typeface changes: headlines Inter 600 with -0.025em tracking, body Inter 400, UI labels Inter 500. IBM Plex Mono carries the spec/terminal details (style codes, per-unit prices, unit counts, labels — uppercase + letterspaced); it's the personality layer. No serif anywhere. Liquid glass — high-blur, saturated, hairline-bordered translucency — on exactly four surfaces: sticky header, hero stat ledger, bulk-band price panel, mobile sticky add-to-cart. Everything else is flat paper with 1px hairline borders. Radius: 2px buttons/inputs, 4px cards/panels. No drop shadows except under sticky/overlay elements. No Sale badges, no compare-at strikethroughs, anywhere. Per-unit pricing is the headline number sitewide.

## Design tokens (replace `:root` in `assets/bayou-custom.css`)
```css
:root {
  --bb-paper: #FAF8F2;
  --bb-paper-deep: #F1ECDD;
  --bb-ink: #1A2415;
  --bb-ink-soft: #2D3B1E;
  --bb-moss: #5C7A3A;
  --bb-gold: #C9B96B;
  --bb-haze: rgba(26, 36, 21, 0.14);
  --bb-glass: rgba(250, 248, 242, 0.62);
  --bb-glass-dark: rgba(250, 248, 242, 0.08);
  --bb-glass-border: rgba(250, 248, 242, 0.22);
  --bb-blur: 18px;
  --bb-radius-btn: 2px;
  --bb-radius-card: 4px;
  --font-display: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;
}
```
Glass recipe (the ONLY frost allowed): `background: var(--bb-glass); backdrop-filter: blur(var(--bb-blur)) saturate(1.4); border: 1px solid var(--bb-haze);` (dark surfaces: `--bb-glass-dark` + `--bb-glass-border`). Delete every other frost/glass rule in the current bayou-custom.css.

Mono label utility used everywhere: `font-family: var(--font-mono); font-size: 11px; letter-spacing: .08em; text-transform: uppercase;`

## Imagery rules (hard constraints from Zach)
- **Hero/landing and primary brand imagery must NOT be warehouse/pallet photos.** The hero is the painterly bayou artwork (spec below) or its CSS-haze fallback — never a photo of inventory.
- Warehouse footage in live-selling context is fine: the existing `hattiesburg-hero.mov` may stay in the TikTok section (restyled per Phase 3), since "watch us work live" is the point there.
- Product photos: keep as-is this pass; cards crop them square via CSS `object-fit: cover` with consistent treatment `filter: saturate(.92) sepia(.06);`.
- Illustrations (How-it-works): simple 1.5px line drawings in ink color (inline SVG), never photos, never icon-font icons scaled up.

## Hero image spec (asset: `assets/bayou-hero-painting.jpg`)
Painterly oil-landscape of a Mississippi bayou: cypress trees with hanging moss, still dark water, low morning haze, soft gold light from the left. Palette must sit inside the brand: deep greens #1A2415–#46582E, sage #A4B47A, restrained gold #C9B96B, cream sky #FAF8F2. Mood: calm, heritage, Hudson-River-School-meets-the-Delta. No people, no buildings, no text, no logos. Exports: 2400×1030 (hero, 21:9), 2400×300 (footer strip), under 350KB each (compress aggressively — it sits behind a scrim).
**Fallback (build first, keep as the no-image state):** layered CSS bands on `#22301B` — three full-width horizontal bars (`#2D3B1E`, `#46582E`, `#A4B47A` at 90/70/45% opacity, blur 28–46px) + one gold radial glow at 22% opacity, exactly like the approved concept. The hero section schema gets an `image_picker` setting; when set, image replaces the CSS scene under the same bottom-third ink scrim (`linear-gradient(transparent 40%, rgba(26,36,21,.55))`).

---

## Phase 1 — Foundations (one session)
**Files: `layout/theme.liquid`, `assets/bayou-custom.css`, `config/settings_data.json`**
1. Load fonts in `theme.liquid` `<head>` (preconnect + single CSS2 URL): Inter 400;500;600, IBM Plex Mono 400;500. Remove the DM Sans loader.
2. Rewrite `bayou-custom.css` top-to-bottom: new tokens (above), kill all old frost/radius/streetwear blocks. Global maps: h1–h3 + `.h0–.h3` → Inter 600, letter-spacing -0.025em, tightened leading (1.08 display / 1.2 section); body → Inter 400 (16px, lh 1.6); UI labels/nav → Inter 500 or mono per component specs; buttons/inputs → 2px radius, mono 11px uppercase labels; cards/media → 4px radius; borders 1px `--bb-haze`; backgrounds `--bb-paper`. Inter 600 is the ONLY weight above 500 — never 700+.
3. `settings_data.json` color schemes: scheme-1 = paper bg / ink text / ink buttons; scheme-2 = paper-deep; scheme-3 (dark) = ink bg / paper text; scheme-4 = duplicate of 3; scheme-5 = retire (remap to scheme-1 values so nothing referencing it breaks). Buttons radius 2, card radius 4, badge radius 2.
4. **Kill discount theater globally:** in `snippets/price.liquid` stop rendering compare-at strikethrough; in `snippets/card-product.liquid` remove the Sale badge render. Do NOT touch product data — display only.
5. QA: every template loads, contrast AA (ink on paper = 13.4:1, passes), mobile spot-check. Commit: `Phase 1: design foundations — type, tokens, schemes, no discount theater`.

## Phase 2 — Cards & money pages (one–two sessions)
**Files: `snippets/card-product.liquid`, `snippets/price.liquid`, `sections/main-product.liquid`, `snippets/buy-buttons.liquid`, `snippets/collection-nav.liquid`, `sections/main-collection-product-grid.liquid`, cart drawer/page**
1. **Product card:** image (square crop, treatment filter) → Inter 500 title 16px → mono meta line `4-PACK FROM $40.00 · $10.00/UNIT` (compute per-unit: lowest variant price ÷ units parsed from the variant's Bundle Quantity option, e.g. "6-Pack" → 6) → footer row: moss stock dot + `{{ product.selected_or_first_available_variant — use product totalInventory }} UNITS` left, mono style code right (parse from tags: first tag matching `/^[0-9A-Z]{2,4}[A-Z0-9/-]*$/` pattern or skip if none).
2. **PDP buy module (the centerpiece):** replace variant dropdown UX with the pack/price table — one row per Bundle Quantity option value showing PACK / TOTAL / PER UNIT, click selects (updates hidden variant input + button label `ADD TO CART — $48.00`). Size selector stays as pills above the table. Under the table: mono line `<N> UNITS REMAINING · LIQUIDATION STOCK DOES NOT RESTOCK` (real inventory). Keep it a progressive enhancement over Dawn's variant-picker so cart/checkout still work with JS quirks.
3. PDP left column: Inter 600 title (28px, -0.02em), mono subtitle `STYLE <code> · FANATICS OVERSTOCK · NEW`, spec table (mono labels: FABRIC/SIZES/PRINT/SHIPS — populate from metafields if present, else sensible defaults per product type), accordions (Shipping / Returns / "Are these really Fanatics?") — content as section settings so Zach can edit.
4. Sticky mobile ATC bar (glass surface #4): chosen pack + total + button.
5. Collection page: restyle pills (mono uppercase, ink outline, active solid ink); mono results line `54 STYLES · SORTED BY VELOCITY`; cards from #1.
6. Cart drawer/page: per-line mono per-unit math, honesty line `LIQUIDATION STOCK — SOLD OUT IS GONE`, payment icons row. Commit per logical chunk.

## Phase 3 — Homepage (one–two sessions)
**Files: `sections/bayou-hero.liquid`, `sections/bayou-marquee.liquid` → new `sections/bayou-ticker.liquid`, `sections/bayou-stats.liquid`, `sections/bayou-trust.liquid`, `sections/bayou-wholesale.liquid`, `sections/bayou-tiktok-cta.liquid`, `sections/header.liquid` glass treatment, `sections/footer.liquid`, `templates/index.json`**
1. **Header:** glass surface #1 — sticky, translucent paper, hairline bottom border. Wordmark: Inter 600 "Bayou Blanks" ONLY — no microline/tagline under it (removed 2026-06-11, Zach: too busy; the company line lives in the footer). Wordmark vertically centered. Nav links mono 11px uppercase.
2. **Hero rebuild:** real HTML text over the CSS-haze scene (+ image_picker per spec above). Layout top-to-bottom:
   - **Social-proof chips (Grain.com pattern — Zach reference, 2026-06-10):** 2–3 small chips in a row ABOVE the headline. Each chip = glass surface (#2, replaces the old stat-ledger idea — "units sold" stat is CUT): platform mark + text + stars, e.g. `[TikTok] ★★★★★ 1,000s of 5-star reviews` and `[Whatnot] ★★★★★ Top-rated seller`. Build as section blocks (icon picker/image + text + star count) so Zach edits/adds chips in the customizer. Chip anatomy: 1px `--bb-glass-border`, 4px radius, 10px/16px padding, Inter 500 13px text, gold `--bb-gold` stars at 12px, platform mark 16px grayscale-cream. Mobile: chips wrap or horizontal-scroll, never truncate.
   - Mono kicker `AUTHENTIC FANATICS OVERSTOCK · LICENSED LIQUIDATION` → Inter 600 -0.03em ~56px desktop/36px mobile "Pro-grade blanks. Liquidation prices." → sub → buttons [Shop in stock → /collections/in-stock] [Bulk pricing → /pages/contact]. All copy = schema settings.
   - Once a review app is live (growth Playbook 3 installs Judge.me), chips can deep-link to the reviews section/page; until then they're static claims.
3. **Ticker** replaces marquee (delete the 10× repetition): one thin mono line between hairlines, 60s slow scroll, content from schema settings: units in stock · last pallet date · live daily @bayou.blanks · ships from Hattiesburg. Respect `prefers-reduced-motion` (static, single line).
4. **Delete `bayou-stats` from index.json** (ledger replaced it).
5. **How it works (`bayou-trust`):** 3 columns, inline line-drawing SVGs (case pack box / inspection checkmark-tag / live signal waves), mono Fig. captions: `Fig. 1 — Sourced: authentic Fanatics overstock`, `Fig. 2 — Inspected: every case pack, Hattiesburg, MS`, `Fig. 3 — Sold live: daily on TikTok & Whatnot`. Short body lines below each. NO photos.
6. **Bulk band (`bayou-wholesale`):** ink-dark scheme, Inter 600 "Printing at volume?", body line, button, right side = **glass price panel** (surface #3): CASE 48u / HALF PALLET 288u / PALLET 576+u rows with from-$/unit (values = schema settings; gold accent on "talk to us"). Remove the old 4-chip feature row.
7. **TikTok section:** restyle as a quiet split — left Inter 600 "Live daily." + mono `@BAYOU.BLANKS · TIKTOK & WHATNOT` + follow button; right = the existing warehouse video (`hattiesburg-hero.mov`), kept, with 4px radius + hairline border + mono caption `LIVE FROM THE WAREHOUSE, DAILY.` (Warehouse footage is allowed here — live-selling context — just not as hero imagery.)
8. **Footer:** ink band; painting strip top edge when asset exists (8:1 crop, schema image_picker, graceful absence); columns Shop / Company / The Warehouse (address text + live schedule — text is fine, no photos); mono smallprint `THE BAYOU BLANKS COMPANY · EST. HATTIESBURG, MS · BACKED BY WEST COAST DEALS · © 2026`.

## Phase 4 — Bulk page & polish (one session)
1. Buy Bulk (`templates/page.contact.json` + section work): tier table on top (same data as bulk band), form below with BUSINESS TYPE select (Screen printer / Embroiderer / Reseller / Team / Other) — this field is analytics signal, keep the name `business_type`.
2. 404 / empty cart / empty search states in the new voice (mono one-liners, e.g. `NOTHING ON THIS SHELF. → SHOP IN STOCK`).
3. QA pass: mobile first (most traffic is TikTok mobile), Lighthouse ≥ 85 mobile (blur layers are the risk — limit glass to the 4 surfaces, never animate blur), `npx @shopify/cli theme check` clean on all touched files, AA contrast check on gold-on-ink (use gold only at ≥18px or on mono labels with the ink-900 background).

---

## Universal constraints (every session)
- All copy, prices-in-copy, and images go through **section schema settings** — Zach must be able to edit everything in the customizer without code.
- Never modify product/pricing/inventory DATA — display layer only.
- Don't touch `growth/` or `design/` content; don't commit `.claude/` or stray root images.
- Progressive enhancement: site must remain shoppable with JS off (tables fall back to Dawn's native variant picker).
- Commit per phase (or per logical chunk in Phase 2/3), descriptive messages, push to main only when the phase passes QA — **main = production**.
- Before/after screenshots desktop + 390px mobile for each phase, saved to `design/screens/` (gitignored).

## Asset blockers (Zach)
- [ ] Hero painting + footer strip (spec above). Routes: commission, or AI-generate and pick. Until then the CSS fallback ships and looks intentional.
- [ ] Confirm bulk tier pricing numbers for the bulk band/page (current values are placeholders).
