# Playbook 3 — SEO & Trust Plumbing

**Goal:** Make the site rank for what decorators search, and make a 200-unit B2B order feel safe. These compound with Playbooks 2 and 4.

**Current gaps (audited 2026-06-10):** homepage meta description is literally "Bayou Blanks"; zero policy pages (no shipping, returns, about); footer had empty headings; claims "1000s of 5-star reviews" with none shown on site; no blog.

**KPIs:** organic sessions/week (currently ~150–200 total sessions/week, mostly TikTok referral), web conversion > 0%, indexed pages, ranking for style-code queries.

---

## Phase 1 — Policy & trust pages (week 1) — agent can do ALL of this via Shopify MCP (`pageCreate` GraphQL)

Create these pages (draft full copy in `drafts/` first, flag for approval, then publish):

1. **About Us** (`/pages/about`) — the story IS the moat: authentic Fanatics overstock via licensed liquidation channels, inspected in Hattiesburg, live daily on TikTok, backed by West Coast Deals. 300–500 words, include warehouse address + photos reference.
2. **Shipping Policy** (`/pages/shipping`) — ships from Hattiesburg MS; state carrier/timing (BLOCKER: confirm details with Zach — typical handling time, carriers, freight option for bulk).
3. **Returns & Refunds** (`/pages/returns`) — liquidation-friendly policy (e.g., defects/wrong-item only, X days). BLOCKER: Zach decides terms. Draft a standard version for approval.
4. **FAQ** (`/pages/faq`) — are these really Fanatics blanks? why so cheap? what's a case pack? do you offer freight/local pickup? are they printable (yes — that's the point)?
5. Also generate Shopify's standard **legal policies** (refund/privacy/TOS) in Settings → Policies (BLOCKER: one-time admin action, templates available in-admin).
6. Wire all pages into the footer menu via MCP (`menuUpdate` — same pattern used 2026-06-10).

## Phase 2 — Meta descriptions & on-page SEO (week 1–2) — agent, via MCP

1. **Homepage:** set in Online Store → Preferences (BLOCKER: admin UI) — draft: "Authentic Fanatics blank apparel at liquidation prices. Blank tees from $16/4-pack, hoodies from $10/unit. No minimums, no contracts. Ships from Hattiesburg, MS."
2. **Products:** `productUpdate` accepts an `seo {title, description}` field. Write meta descriptions for all 126 products — formula: `[Product] — blank/undecorated, [price-per-unit math], case packs of 4–12, no minimum. Authentic overstock, ships from MS.` Batch 20/day via aliased mutations.
3. **Collections:** descriptions already written (2026-06-10) and double as meta — done.
4. **Image alt text:** all product images currently have EMPTY alt text. Fix via `productUpdateMedia`/media mutations — alt = product title + color. Batch daily.
5. **Style-code capture:** ensure every known style code appears in its product's body copy (most already do) — these are exact-match search queries.

## Phase 3 — Reviews (week 2) 

1. BLOCKER: Zach installs a review app — recommend **Judge.me** (free tier: review widget, request emails, Google rich snippets) or Shopify's own Product Reviews alternative. Judge.me preferred for star-snippets in search.
2. Agent drafts the review-request email copy (ties into Playbook 1 post-purchase flow).
3. Existing social proof: screenshot/transcribe top TikTok & Whatnot reviews → "Wall of Love" section content for homepage (draft in `drafts/`; implementing it is a theme change — route through Claude Code/theme repo, NOT this folder).

## Phase 4 — Blog for style-code long-tail (ongoing, feeds Playbook 4)

Shopify blog via MCP (`articleCreate`). One article/week, 600–900 words, genuinely useful:
- "Gildan 2810 review for screen printers: specs, print surface, where to buy it blank for less"
- "What are Fanatics blanks? (And why they're the best-kept secret in wholesale apparel)"
- "Case pack math: what screen printers actually pay per unit in 2026"
- "Bella + Canvas 2805 vs standard fleece: which prints better?"
Each ends with a CTA to the relevant collection. Draft → approval → publish.

---

## What agents can do autonomously
- Create/update pages, blog articles, product SEO fields, image alt text, footer menu (Shopify MCP).
- Draft all copy into `drafts/` and flag for approval before publishing.

## What needs Zach (log as BLOCKER)
- Shipping/returns terms (one decision each).
- Homepage meta description paste (Preferences UI).
- Review app install.
- Approving page copy before publish.

## Daily agent tasks
- [ ] 20 product meta descriptions/day until all 126 done (log progress count).
- [ ] 20 products' image alt text/day until done.
- [ ] One page or article draft/day until Phase 1 + 4 backlog is built.
- [ ] Weekly: pull organic session count via Shopify analytics MCP → STATUS.md trendline.
