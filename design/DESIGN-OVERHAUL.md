# Bayou Blanks — Design Overhaul

> **v2 note (approved 2026-06-10):** Zach approved the rendered concept. The buildable spec now lives in `design/CLAUDE-CODE-PLAN.md` — that file is canonical where it differs from this one. Main delta: **liquid glass is IN** (refined, Apple-grade, on 3–4 surfaces only: header, hero stat ledger, bulk price panel, sticky ATC) — §1's "kill all glass" stance is softened to "kill the cheap frost, keep premium glass." Fonts locked (v3, 2026-06-10): ALL-INTER + IBM Plex Mono details — no serif. Zach wants SF-tech-minimal ("SF tech twitter"); hierarchy via weight/tracking.

**Direction in one line:** *The Bayou Blanks Company of Hattiesburg, Mississippi* — a heritage Southern supply company with a modern storefront. GIC's buttoned-up institutional calm, carried by the bayou, surfaced in liquid glass.

Reference: generalintelligencecompany.com — painterly hero art, paper-cream surfaces, editorial serif headlines, mono figure-captions ("Fig. 1"), enormous restraint. We borrow the *system* (institutional voice, editorial type, paper + ink, figures and tables), not the content.

---

## 1. Diagnosis — why it currently feels like slop

Audited 2026-06-10 (live site + theme code):

1. **Glassmorphism + rounded-everything.** `bayou-custom.css` self-describes as "Frosty / rounded / premium streetwear" — frosted glass tokens, 10–16px radii on every surface, pill badges. That's 2023 dropshipping aesthetic; it reads template, not company.
2. **The marquee strip repeats the same 5 phrases 10×.** Filler energy. One of the strongest slop signals on the page.
3. **Hero is a JPEG with text baked in** (`newhero.JPG`) — unreadable scaling, no typographic control, instantly "Canva."
4. **Discount theater.** Every card shows ~~$72.00~~ → $17.00 + a "Sale" badge. When *everything* is 75% off forever, nothing is — sophisticated buyers (printers buying 200 units) read this as scam-pattern. Our actual story ("liquidation = the price just IS low") is stronger than fake urgency.
5. **Default Dawn everywhere it matters.** Product cards, PDP, cart are untouched Dawn — generic where the buying happens, custom only in the marketing sections. Backwards.
6. **Type has no hierarchy.** One sans (Assistant setting / DM Sans override) at default Dawn sizes. No display voice, no detail voice.
7. **Five disconnected color schemes** (white / gray / navy / black / cobalt #334FB4) — the cobalt blue belongs to no brand here. The good bayou palette already exists in CSS but barely shows up.
8. **Product photos on green turf** — actually kind of charming/authentic, but uncropped, inconsistent angles, mixed lighting. (Reshoot is ops, not design — see §7 interim treatment.)

What's already good: the name, the story (Fanatics overstock, Hattiesburg warehouse, live daily), the green/cream palette tokens, clean catalog/nav structure (rebuilt 2026-06-10), and the pill nav.

---

## 2. Design principles

1. **Paper + ink, not glass.** Cream paper surfaces, deep bayou-green ink. Hairline borders. Shadows almost never.
2. **Editorial, not promotional.** Serif headlines that state facts ("Authentic Fanatics blanks. $10 a unit."). No exclamation points, no badge confetti.
3. **The spec sheet is the aesthetic.** Our buyers are tradespeople. Style codes, fabric specs, case-pack tables, per-unit math — set in mono, presented like a catalog from a real supply house. Make the utilitarian beautiful instead of hiding it.
4. **One painting, everywhere.** A single painterly bayou artwork (cypress, still water, morning haze) is the brand image — hero, footer strip, email header. Calm, not loud.
5. **Restraint is the flex.** If a section doesn't earn its scroll, cut it. Whitespace over marquees.

---

## 3. Foundations

### Type (all free via Google Fonts — keep $0)

| Role | Face | Usage |
|------|------|-------|
| Display serif | **Fraunces** (or Instrument Serif as lighter alt) | H1/H2, hero statements, section titles. Tight leading, -1% tracking. |
| Body sans | **Inter** (replace DM Sans) | Everything readable. 16px base, 1.6 line-height. |
| Mono detail | **IBM Plex Mono** | Style codes, prices-per-unit, figure captions, table headers, badges, "EST. HATTIESBURG MS". 11–13px, +5% tracking, often uppercase. |

Scale: 12 / 14 / 16 / 20 / 28 / 40 / 56–72(hero). Hard rule: serif never below 20px; mono never above 14px.

### Color (remap existing tokens — they're good)

| Token | Hex | Role |
|-------|-----|------|
| `--paper` | #FAF8F2 (existing offwhite) | Default page background. Kill pure white. |
| `--paper-deep` | #F1ECDD (derived from cream) | Alternate section bands, table stripes |
| `--ink` | #1A2415 (existing bayou-dark) | Text, buttons, borders. THE brand color. |
| `--moss` | #5C7A3A | Links, active states, in-stock dots. Sparingly. |
| `--gold` | #C9B96B | Rare accent: "last units" markers, one underline. Max 1 use per viewport. |
| `--haze` | rgba(26,36,21,.12) | Hairline borders everywhere |

Delete: cobalt scheme-5, frost tokens, gradients. Dark sections use `--ink` as bg with paper text (footer, max one mid-page band).

### Shape & space
- Radius: **2px** buttons/inputs, **4px** cards/images. Pills survive ONLY in the collection nav + size selectors (they're functional there).
- Borders: 1px `--haze` instead of shadows. Shadow only on sticky/overlay elements (cart drawer, sticky ATC).
- `page_width` 1200 is fine; section vertical padding 96px desktop / 56px mobile, consistent.

---

## 4. Component system

- **Buttons:** solid `--ink` / paper text; secondary = 1px ink outline on paper. Mono uppercase 13px labels ("ADD TO CART — $40.00"). No hover lift; background darkens 8%.
- **Product card:** image (4px radius, treated — §7) → serif title 20px → mono meta line: `4-PACK FROM $10.00 · $2.50/UNIT` → tiny mono style code bottom-right (e.g. `2G17-4505`) as a *design feature*. Stock state: small moss dot + `IN STOCK · 1,756 UNITS` (real numbers are our credibility). **No Sale badge, no strikethrough** (see pricing note §8).
- **Figure captions (the GIC move):** every diagram/photo block gets a mono caption — `Fig. 1 — One case pack: 12 units, inspected in Hattiesburg.` Used in How-It-Works, Bulk page, About.
- **Tables:** price ladders and size runs as honest bordered tables, mono headers, `--paper-deep` row stripes. This replaces badge-driven price display sitewide.
- **Ticker (marquee replacement):** ONE thin line, hairline-bordered top/bottom, mono 12px, scrolling slowly: live unit counts + last restock date — *data, not slogans*: `136,320 UNITS IN STOCK · LAST PALLET: JUN 8 · LIVE DAILY @BAYOU.BLANKS`. Single instance, single repetition visible.

---

## 5. Page-by-page

### Home (`index.json`, `bayou-*.liquid` sections)
1. **Hero** (`bayou-hero.liquid` rebuild): painterly bayou artwork full-bleed (§7), cream scrim bottom third. Real HTML text: serif 64px "Authentic Fanatics blanks. Liquidation prices." / sub 18px "No accounts. No minimums. Ships from Hattiesburg, MS." / two buttons: Shop In Stock + Buy Bulk. Mono kicker above title: `THE BAYOU BLANKS COMPANY · HATTIESBURG, MS`.
2. **Data ticker** (replaces `bayou-marquee` ×10 strips).
3. **Shop grid** — keep (already pulls `in-stock`), new cards, header row: serif "In the warehouse" + mono link `VIEW ALL 80 →`.
4. **How it works** (`bayou-trust` rebuild): 3 columns w/ Fig. captions — Fig. 1 sourcing, Fig. 2 inspection, Fig. 3 live daily. Simple line illustrations or treated photos, not icons.
5. **Bulk band** (`bayou-wholesale` rebuild): `--ink` dark band, serif headline, and the actual price-ladder table right there (transparency = trust), CTA to Buy Bulk.
6. **TikTok section** (`bayou-tiktok-cta`): shrink to a quiet split — keep the warehouse video, lose the hype copy. Mono caption: `LIVE FROM THE WAREHOUSE, DAILY.`
7. **Stats** (`bayou-stats`): fold into one ledger row under hero (mono, hairline-separated): `100K+ UNITS SOLD / FIRST 4 WEEKS · 5★ ACROSS TIKTOK · WHATNOT · AMAZON · BACKED BY WEST COAST DEALS`. Delete as standalone section.

### Collection (`main-collection-product-grid`, `collection-nav` snippet)
- Pills: mono uppercase, ink outline, active = solid ink. (Restyle only — logic shipped 2026-06-10.)
- New product cards (above). Per-unit price is the headline number for this audience.
- Mono results line: `54 STYLES · SORTED BY VELOCITY`.

### Product page (`main-product.liquid`, `buy-buttons`, `price`) — **highest buyer-experience impact**
Layout = left gallery / right spec sheet:
1. Serif title; mono style code + true brand under it (`STYLE 2G17-4505 · FANATICS OVERSTOCK`).
2. **Pack/price table** replacing the dropdown-and-mystery-price pattern: rows = 4/6/8/12-pack with total + **per-unit** + units remaining; selecting a row updates the buy button. The unit math is the whole pitch — never make a printer do division.
3. Spec block (mono table): fabric, weight, fit, print surface notes.
4. Accordions: Shipping (from Hattiesburg) / Returns / "Are these really Fanatics?" — pulls Playbook-3 policy content.
5. Sticky mobile ATC bar with chosen pack + total.
6. Below: "From the same pallet" (related by tag) instead of generic recommendations.

### Buy Bulk page (`page.contact.json`)
Stop hiding the offer behind a form: tier table (case → half-pallet → pallet, per-unit price bands), Fig.-captioned warehouse photo, freight note, THEN the form ("Tell us volume + styles; quote same business day"). Form fields: business type dropdown (printer/embroiderer/reseller/team/other) — that dropdown is also buyer-signal gold.

### Cart / drawer
Per-unit math echoed per line item; mono subtotal block; "Liquidation stock — sold out is gone" as the honest urgency line. One trust row (payment icons, ships-from-MS).

### Footer (`footer-group.json`)
`--ink` band, painting strip along the top edge (the GIC footer-art move), 3 columns (Shop / Company / The Warehouse w/ address + live schedule), mono small print: `THE BAYOU BLANKS COMPANY · EST. HATTIESBURG, MS · BACKED BY WEST COAST DEALS`.

---

## 6. Motion
150–200ms ease-out on hover/fade only. Ticker scrolls slow (60s loop). No parallax, no scroll-jacking, no glass blurs. `prefers-reduced-motion` respected (Dawn handles most).

## 7. Imagery & art direction
- **The painting:** one wide painterly bayou landscape (cypress, water, morning haze — Hudson-River-School-meets-the-Delta). Options: commission (~$150–400, Playbook-4 asset) or AI-generate + paint-over. Needed crops: hero 21:9, footer strip 8:1, email header 3:1. BLOCKER: Zach picks source route.
- **Product photos, interim treatment** (no reshoot needed): uniform square crop, +5 warmth / slight desaturation toward paper tones via CSS filter or batch edit, consistent margin. The turf becomes a deliberate signature instead of an accident. Long-term ops: one corner of the warehouse as a permanent photo station, paper backdrop.

## 8. Pricing display honesty (design decision, needs Zach sign-off)
Remove `compare_at_price` theater (~~$72~~) and Sale badges sitewide. Replace with what's true and stronger: per-unit price + "vs. $24.00 list" set quietly in mono where a real list price is verifiable. If compare-at data stays in Shopify for channel reasons, the theme simply stops rendering it.

---

## 9. Implementation map (phased — each phase = one Claude Code session)

**Phase 1 — Foundations (1 session):** fonts in `theme.liquid` + settings (Fraunces/Inter/IBM Plex Mono); rewrite `:root` tokens; gut frost/radius blocks in `bayou-custom.css`; collapse color schemes to paper/ink (+ ink-dark scheme); global button/border styles. *Site instantly stops looking like a template.*

**Phase 2 — Cards & money pages (1–2 sessions):** `card-product.liquid` (mono meta, style code, stock dot, no badges), `price.liquid` + PDP pack/price table, spec accordions, sticky ATC, cart drawer, collection pill restyle + results line.

**Phase 3 — Homepage (1–2 sessions):** hero rebuild (real text over art — needs §7 artwork first; ship with treated photo placeholder if art isn't ready), ticker replaces marquee, trust/wholesale/tiktok/stats rebuilds per §5, footer band.

**Phase 4 — Bulk page + polish (1 session):** Buy Bulk tier table + form, empty/404/search states, contrast + mobile QA, Lighthouse pass (≥90 perf — we're removing blur filters, should improve).

Constraints for implementing agents: never touch pricing/inventory data; keep all section settings schema-editable (Zach must be able to tweak copy in the customizer); commit per-phase; theme-check clean on touched files; screenshot desktop+mobile before/after per phase.

## 10. Definition of done
- Zero frosted glass, zero >4px radii (outside functional pills), zero Sale badges, zero baked-text images.
- Serif/sans/mono hierarchy visible on every page; per-unit price visible on every card, PDP, and cart line.
- A printer landing cold can answer in <10s: what is this, why so cheap, can I trust it, what's my per-unit cost.
- Mobile = first-class (most TikTok traffic is mobile).
- WCAG AA contrast on paper/ink combos (ink on paper passes easily; verify gold usage).
