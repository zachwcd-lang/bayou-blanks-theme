# Playbook 2 — Google Shopping Free Listings

**Goal:** Every in-stock product listed in Google's free Shopping tab + Search product surfaces. Zero ad spend — these are organic listings.

**Why it works for us:** decorators search exact style codes ("Gildan 2810 blanks", "Bella Canvas 2805 wholesale") and intent phrases ("blank hoodies bulk no minimum"). Google Shopping ranks free listings heavily on price — and our $10–$17/unit pricing wins nearly every comparison on sight.

**KPIs:** approved products in Merchant Center, impressions/clicks from Google (Merchant Center dashboard), web orders with Google referrer.

---

## Phase 0 — Setup (BLOCKER: Zach, ~30 min, one-time)

1. Install the **Google & YouTube** channel app from the Shopify App Store (free).
2. Connect/create a Google account → Merchant Center is auto-created and the domain auto-verified via Shopify.
3. Enable **free listings** (on by default). Do NOT set up any ad campaign — skip every "Performance Max" upsell screen.
4. Set shipping settings in Merchant Center (sync from Shopify is offered during setup — accept it).
5. Tax settings: sync from Shopify.

## Phase 1 — Feed eligibility (agent work, via Shopify MCP)

Google rejects products missing key data. Audit and fix:

1. **Product identifiers.** Liquidation blanks mostly lack GTIN/UPC. Fix: set MPN = style code (2G17-4505, ZA41-1204, etc. — we have these in tags/descriptions) and brand = "Bayou Blanks" (or true brand where known: Gildan, Bella + Canvas, Port & Company, Alleson). Where no GTIN exists, the channel app's "This product doesn't have a unique product identifier" / `identifier_exists = false` handling applies. Agent: build a product → {brand, MPN} mapping and apply via metafields the Google channel reads (`mm-google-shopping` namespace) or via the channel app's bulk editor (flag if app-side editing needed).
2. **Google product category:** Apparel & Accessories > Clothing (auto-mapped, verify spot-checks).
3. **Descriptions:** all 126 products have real descriptions already — good. Flag any under 500 characters for enrichment.
4. **Images:** Google rejects images with overlay text/watermarks — ours are clean warehouse photos, should pass. Spot-check rejections in Merchant Center weekly.
5. **Variants:** our variants are Size × Bundle Quantity. Google will list each variant; that's fine (each bundle size shows its price).
6. **Condition:** "new" (they are new; liquidation ≠ used).

## Phase 2 — Approval triage (week 1–2 after setup)

1. Merchant Center → Products → check disapprovals. Common ones for us:
   - "Missing identifier" → Phase 1 fix.
   - "Mismatched price/availability" → ensure feed sync is current (channel app handles this).
   - "Promotional overlay on image" → replace image.
2. Agent logs disapproval counts + reasons to STATUS.md; fixes what's fixable via MCP; flags the rest.

## Phase 3 — Optimization (ongoing)

1. **Titles are search queries.** Google gives heavy weight to product titles. Ours are now clean ("Active Blue Fleece Pullover Hoodie") — for Google, richer is better. Where a true brand/style is known, ensure it's in the title or MPN field ("Gildan 2810 Long Sleeve V-Neck Tee" already perfect).
2. **Price competitiveness report** in Merchant Center: confirms we undercut — screenshot-worthy proof for Playbook 4 content too.
3. **Out-of-stock hygiene:** feed syncs automatically from Shopify; since sold-out products stay ACTIVE in Shopify, they'll show "out of stock" on Google — acceptable, no action.

---

## What agents can do autonomously
- Audit catalog for missing brand/MPN/description data (Shopify MCP) and apply fixes via metafields/product updates.
- Build and maintain the style-code → brand mapping table (commit as `drafts/style-code-map.md`).
- Weekly: log Merchant Center approval counts (BLOCKER until Zach grants access or shares screenshots; otherwise infer from channel app status via admin).

## What needs Zach (log as BLOCKER)
- Installing the Google & YouTube app + Google account connect (one-time).
- Resolving any Merchant Center identity/verification prompts.

## Daily agent tasks
- [ ] Until Phase 0 done: nothing — log "waiting on Google channel install" if absent.
- [ ] After setup: fix up to 10 products/day for feed eligibility (brand/MPN/category), log progress.
- [ ] Weekly: disapproval triage + impressions/clicks log to STATUS.md.
