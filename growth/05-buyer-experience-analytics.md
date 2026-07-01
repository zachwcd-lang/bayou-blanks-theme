# Playbook 5 — Buyer Experience & Analytics

**Goal:** Know exactly what the ~150–220 weekly web visitors do, why they don't buy, and where to invest next. The site converts ~0% — every theme/content decision should be driven by signal from this playbook, not vibes.

**Why this matters:** The live channels work; the website doesn't. Before spending effort "fixing" the site, we need to see the leak: do visitors bounce on the homepage, browse and stall, or add to cart and abandon at shipping? Each failure mode has a different (cheap) fix.

**KPIs:** web conversion rate (north star), sessions/week, add-to-cart rate, checkout-reach rate, % sessions with a UTM tag (attribution coverage).

---

## Phase 0 — The stack (keep it to three free tools)

| Tool | What it's FOR | Install |
|------|---------------|---------|
| **Shopify native analytics (ShopifyQL)** | The numbers: sessions, funnel, referrers, devices, sales. Already live, already queryable via the connected Shopify MCP (`run-analytics-query`). Source of truth for the weekly ritual. | Nothing — done. |
| **GA4** (via Google & YouTube channel app) | Cross-session behavior: landing→exit paths, engagement time, channel comparison over months. Comes free with the Playbook 2 install — do NOT set it up separately. | Rides on the P2 blocker (install Google & YouTube channel, toggle "share data with Google Analytics", link/create GA4 property). ~5 extra min on top of P2. |
| **Microsoft Clarity** (free, unlimited) | The *why*: heatmaps, scroll depth, session recordings, rage-clicks, dead-clicks. This is how we watch a screen printer try to find case-pack pricing and give up. | **BLOCKER (Zach, ~10 min):** create account at clarity.microsoft.com with Google login → install the free "Microsoft Clarity" app from the Shopify App Store → connect. No code, no theme edit. |

**Skip on purpose:** Hotjar/FullStory (paid for what Clarity gives free), Segment/any CDP, Mixpanel/Amplitude, Triple Whale, server-side tagging, cookie-consent banners beyond Shopify's built-in (US-only traffic for now). At this traffic level they add setup cost and zero decisions.

## Phase 1 — Event taxonomy across the buyer journey

What we track at each step, and where it comes from:

| Journey step | Event | Source | Status |
|---|---|---|---|
| Land | session start, landing page, referrer, UTM, device | Shopify + GA4 | Free, automatic |
| Browse | collection views (`/collections/*`) | Shopify + GA4 (page views) | Free, automatic |
| Browse | **pill-nav clicks** (which category pills get tapped) | needs custom theme event | **Handoff → theme workstream** |
| Browse | on-site search terms | Shopify admin report | Free, automatic |
| Product view | `view_item` / product page views | Shopify + GA4 | Free, automatic |
| Product view | **case-pack size selection** (4/6/8/12 toggle) | needs custom theme event | **Handoff → theme workstream** |
| Add to cart | `add_to_cart` | Shopify + GA4 (Shopify's GA4 integration fires standard ecommerce events) | Free, automatic |
| Checkout | `begin_checkout`, shipping step, payment step | Shopify (checkout is hosted; steps are tracked natively) | Free, automatic |
| Purchase | `purchase` w/ revenue, items | Shopify + GA4 | Free, automatic |
| Repeat | returning-customer flag, orders per customer | Shopify (customers/orders via MCP) | Free, automatic |
| Why-it-failed | rage clicks, dead clicks, scroll depth, recordings | Clarity | Free once installed |

**Rule:** ~90% of the journey is covered with zero custom code. The two custom events (pill-nav clicks, pack-size selection) are theme changes — **out of scope for this playbook**. Log them as a handoff note in STATUS.md for the theme session; until then, Clarity heatmaps on the homepage and product pages are a good-enough proxy for both.

## Phase 2 — Weekly signal review (every Monday, agent-run)

Run these via Shopify MCP `run-analytics-query`, append one summary line per query to STATUS.md so trendlines build week over week. (First run: validate each query against the live schema; if a column name errors, fix it and update this file.)

```sql
-- 1. Sessions + conversion trend (the headline)
FROM sessions SHOW sessions, conversion_rate BY week SINCE -28d ORDER BY week

-- 2. Funnel: where do they leak?
FROM sessions SHOW sessions, cart_sessions, checkout_sessions, checkout_completed_sessions SINCE -7d

-- 3. Top entry pages
FROM sessions SHOW sessions BY landing_page_path SINCE -7d ORDER BY sessions DESC LIMIT 10

-- 4. Referrer split (is TikTok bio traffic actually arriving?)
FROM sessions SHOW sessions BY referrer_source, referrer_name SINCE -7d ORDER BY sessions DESC LIMIT 10

-- 5. UTM coverage + campaign performance
FROM sessions SHOW sessions, conversion_rate BY utm_source, utm_campaign SINCE -7d ORDER BY sessions DESC

-- 6. Device split
FROM sessions SHOW sessions, conversion_rate BY device_type SINCE -7d
```

Plus two non-ShopifyQL pulls:
- **Search terms:** Shopify admin "Top online store searches" report (query via MCP analytics if exposed; else flag for Zach to screenshot monthly).
- **Cart abandonment rate:** `1 − (orders ÷ checkout_sessions)` from query 2; cross-check abandoned checkouts via GraphQL (`abandonedCheckouts`) when investigating.

### Decision rules (if X → invest in Y)

- **Sessions < 100/wk two weeks running** → traffic problem, not site problem. Push Playbooks 2 & 4; stop site tweaks.
- **Mobile > 75% of sessions** (likely — traffic is TikTok) → every theme fix gets specced mobile-first; flag to theme workstream.
- **Entry pages ≠ homepage** (e.g. a product link from a live) → make sure stream links point at `/collections/in-stock` with UTMs, not the bare homepage.
- **Add-to-cart > 0 but checkout completions = 0** → trust/shipping problem → accelerate Playbook 3 (policy pages, shipping clarity).
- **Add-to-cart ≈ 0 despite product views** → price/pack-size confusion → watch 10 Clarity recordings of product pages, write findings to STATUS.md, spec the fix for theme workstream.
- **Search terms show team names/specific styles** → create matching smart collections (agent can do via MCP) and feature them in the pill nav.
- **A UTM campaign converts** (any nonzero) → do more of exactly that link placement; note it in the Pallet Drop playbook (P1).

## Phase 3 — UTM discipline (start immediately, costs nothing)

Every link we control gets tagged. Lowercase, hyphens, no spaces. Convention:

| Link placement | utm_source | utm_medium | utm_campaign |
|---|---|---|---|
| TikTok bio link | `tiktok` | `bio` | `evergreen-bio` |
| Link dropped during a TikTok live | `tiktok` | `live` | `live-YYYYMMDD` |
| Whatnot profile/shoutout | `whatnot` | `bio` | `evergreen-bio` |
| Pallet Drop email (P1) | `email` | `pallet-drop` | `drop-YYYYMMDD` |
| Welcome/post-purchase flows (P1) | `email` | `flow` | `welcome` / `post-purchase` |
| Any one-off social post | `tiktok`/`instagram` | `post` | `post-YYYYMMDD-slug` |

Example bio link: `https://shopbayoublanks.com/collections/in-stock?utm_source=tiktok&utm_medium=bio&utm_campaign=evergreen-bio`

Agents draft the tagged URLs in `drafts/`; Zach pastes them into TikTok/Whatnot bios (one-time BLOCKER). Untagged TikTok traffic shows up as direct/`l.tiktok.com` referrer — UTMs are the only way to separate bio clicks from live-stream clicks.

## Phase 4 — North-star metrics & baselines (as of 2026-06-10)

| Metric | Baseline | 90-day target |
|---|---|---|
| **Web conversion rate (north star)** | ~0% | sustained ≥ 0.5% |
| Web sessions/week | ~150–220 | 400 |
| Customers | 657 (≈ all Whatnot-sourced) | +50 web-attributed |
| AOV | $12–35 (live channels) | web AOV ≥ $40 (case-packs should pull it up) |
| Attribution coverage (% sessions w/ UTM) | ~0% | ≥ 30% |

One web order/week ≈ 0.5% conversion at current traffic — the bar is genuinely that low. The first web-attributed order is a STATUS.md milestone event.

---

## What agents can do autonomously
- Run the full Monday query set via Shopify MCP; append trendline rows + a 3-line "signal summary" to STATUS.md.
- Validate/fix ShopifyQL column names against the live schema; keep this file's queries current.
- Draft all UTM-tagged URLs into `drafts/`.
- Apply the decision rules and log the recommended investment (with evidence) — but only recommend; cross-playbook execution follows that playbook's own rules.
- Once Clarity is installed: review recordings/heatmaps weekly, log top 3 friction findings.

## What needs Zach (log as BLOCKER)
- Install Microsoft Clarity (account + free Shopify app, ~10 min).
- GA4 toggle during the Google & YouTube channel install (rides on existing P2 blocker).
- Paste UTM-tagged links into TikTok and Whatnot bios (one-time, ~5 min).
- Any theme change spec'd by the decision rules (pill-nav/pack-size events, mobile fixes) — hand off to theme workstream, don't touch here.

## Daily agent tasks
- [ ] **Mondays:** run the Phase 2 query set → append trendline + signal summary + triggered decision rules to STATUS.md.
- [ ] Check any new outbound link drafted by other playbooks carries correct UTMs (Phase 3 table); fix drafts that don't.
- [ ] If Clarity is live: scan for new rage-click/dead-click pages; log anything new.
- [ ] If a web-attributed order appears (non-Whatnot source): log it as a milestone with its full source/UTM path.
- [ ] Once: first-run ShopifyQL schema validation; correct queries in this file if needed.
