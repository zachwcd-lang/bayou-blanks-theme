# Playbook 1 — Email List & Flows

**Goal:** Turn the live-stream audience (TikTok/Whatnot) into an owned email list, and make "new pallet just landed" emails a repeatable revenue channel.

**Why this is #1:** 657 existing customers, thousands of live viewers, zero email marketing. Live-commerce buyers are drop-driven — a pallet-drop email is the highest-intent message this audience can receive. This channel compounds; everything else feeds it.

**KPIs:** list size, capture rate (signups/session), open rate (target 40%+ for this niche), revenue per campaign, repeat purchase rate.

---

## Phase 0 — Tool decision (BLOCKER: Zach)

Pick one:
- **Shopify Email** — free up to 10K sends/month, zero setup, lives in admin. Good enough to start. **Recommended for week 1.**
- **Klaviyo** — better flows/segmentation, free to 250 contacts (list will outgrow this fast). Migrate later if needed.

Decision rule: start with Shopify Email today; revisit Klaviyo when list > 1,500 or when flow logic feels limiting.

## Phase 1 — Capture (week 1)

1. **On-site popup** (Shopify Forms app, free): headline "Get pinged when a new pallet lands 📦", subtext "First dibs on Fanatics blanks at liquidation prices. No spam, just drops." Incentive: agents can create a discount code via MCP (e.g. `FIRSTPALLET` — 10% first order). Trigger: 5 seconds or 50% scroll, once per visitor.
2. **Footer signup** already exists in theme — confirm it's wired to the same list.
3. **Live-stream capture:** add to stream toolkit — pinned comment + verbal CTA every ~20 min: "Site drops hit email first — shopbayoublanks.com, signup box at the bottom." Make a recurring OBS/stream overlay graphic (draft copy in `drafts/`).
4. **Post-purchase opt-in:** in Shopify admin → Checkout settings, ensure email marketing checkbox is ON and pre-selection is compliant.
5. **Backfill:** the 657 existing customers — only those who opted in can be emailed. Agent task: query customer list via MCP, count `emailMarketingConsent` opted-in vs not. Opted-in go straight into the list.

## Phase 2 — Flows (week 1–2)

Build these three (drafts in `drafts/` — write them before Zach opens the tool):

1. **Welcome (signup, not yet purchased):** 2 emails.
   - E1 (immediately): who we are (Fanatics overstock, Hattiesburg warehouse, live daily), `FIRSTPALLET` code, top 4 in-stock products.
   - E2 (+3 days): "How printers use us" — case-pack math ($10/unit hoodies vs $24 retail), link to Buy Bulk.
2. **Post-purchase:** 2 emails.
   - E1 (+2 days after delivery): "How'd the blanks print?" + ask for a review (ties into Playbook 3).
   - E2 (+14 days): restock nudge — "Pallets move fast. Here's what's new since your order" linking `/collections/in-stock?sort_by=created-descending`.
3. **Abandoned checkout:** Shopify's built-in — just turn it on, default timing (10h) is fine. Mention case-pack scarcity ("liquidation inventory doesn't restock").

## Phase 3 — The Pallet Drop campaign (recurring, forever)

The core engine. Every time meaningful inventory lands:

1. Agent checks via Shopify MCP: products created or restocked in last 7 days (`created_at` filter / inventory deltas vs STATUS.md log).
2. Draft email: subject "🚨 Pallet Drop: [headline item] from $X", 4–6 product cards with prices vs "retail", hard scarcity (real unit counts — we have them), one CTA to `/collections/in-stock`.
3. Flag for Zach's approval → send. Log revenue 48h later (MCP analytics: sales by referrer).

Cadence: whenever real inventory lands, max 2×/week. No inventory = no email. Authenticity is the brand.

---

## What agents can do autonomously
- Query customers/consent counts, inventory changes, sales attribution (Shopify MCP).
- Draft all email copy, popup copy, stream-overlay copy into `drafts/`.
- Create discount codes via MCP (flag for approval first).
- After sends: pull open/click/revenue stats into STATUS.md.

## What needs Zach (log as BLOCKER)
- Installing Shopify Forms / choosing Shopify Email vs Klaviyo (one-time, ~20 min).
- Clicking "send" on any campaign.
- Adding the CTA habit + overlay to live streams.

## Daily agent tasks
- [ ] Check for new-inventory signal → if found, draft Pallet Drop email → flag for approval.
- [ ] Log yesterday's list growth (customer count w/ marketing consent) to STATUS.md.
- [ ] If a campaign went out in last 48h, log its revenue/opens to STATUS.md.
- [ ] Once: Phase 1–2 setup checklist above, one item per day until done.
