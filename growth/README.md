# Bayou Blanks — Growth Playbooks

Operating system for growing shopbayoublanks.com without paid ads. Four playbooks, each designed so an agent (or a person) can pick it up cold and execute.

## The playbooks

| # | File | Goal | North-star metric |
|---|------|------|-------------------|
| 1 | `01-email-list-and-flows.md` | Convert live-stream buyers into an owned email list | List size; revenue per "Pallet Drop" email |
| 2 | `02-google-shopping-free-listings.md` | Get all in-stock products into Google's free Shopping tab | Impressions/clicks from Google surfaces |
| 3 | `03-seo-trust-plumbing.md` | Policy pages, meta descriptions, reviews on site | Organic sessions/week; web conversion rate > 0 |
| 4 | `04-fanatics-moat-content.md` | Own the "authentic Fanatics blanks" story everywhere | Branded search volume; community-sourced orders |

## Context every agent needs (as of 2026-06-10)

- **Business:** Liquidation wholesaler of blank (undecorated) apparel — authentic Fanatics overstock. Warehouse: 6633 US Hwy 49, Hattiesburg, MS. Backed by West Coast Deals.
- **Channels:** Daily TikTok lives (@bayou.blanks) + Whatnot. 100K+ units sold in first 4 weeks on TikTok. ALL recent Shopify orders are Whatnot-sourced; the website itself converts ~0%.
- **Customers:** 657 in Shopify. ~806 orders all-time. Typical order: $12–$35, single item, bought during a live.
- **Catalog:** 126 products, ~80 in stock at any time, ~136K total units. Two price ladders: $10/$12/$15 (fleece/hoodies/polos) and $16/$19/$34 (tees/jerseys), sold as 4/6/8/12-packs.
- **Collections (smart, in-stock only, best-selling sort):** `t-shirts` (54), `hoodies-fleece` (15), `jerseys` (7), `polos` (2), `tanks` (2), `youth-toddler` (2), `womens` (11), `in-stock` (80, all categories).
- **Target buyers:** screen printers, embroiderers, decorators, resellers, teams — plus live-shopping bargain hunters.
- **Tone:** direct, no-BS, deal-forward. "The Cheapest Wholesale Apparel Prices. Period." No corporate speak.

## How daily delegation works

1. Each playbook ends with a **"Daily agent tasks"** section — small, repeatable units of work.
2. Every task writes its result to `STATUS.md` (append-only log: date, playbook, task, outcome, blockers).
3. An agent picking up work should: read this README → read `STATUS.md` → read its assigned playbook → execute the next unchecked items → log results.
4. Anything requiring Zach (account signups, OAuth connections, payments, final approval on outbound posts) gets logged as a **BLOCKER** in `STATUS.md` rather than attempted.

### Suggested daily prompt

> Read growth/README.md and growth/STATUS.md in the bayou-blanks-theme folder. Then execute the next pending tasks in growth/0X-<playbook>.md. Use the Shopify MCP connection where the playbook says it's available. Log everything you did (and any blockers) to STATUS.md. Do not post anything publicly without flagging it for review first.

## Hard rules for all agents

- Never change product prices or inventory.
- Never send an email campaign or publish a public post without explicit approval — draft and flag.
- Drafts live in `growth/drafts/` with date-prefixed filenames.
- This folder is business ops, not theme code — do not let it interfere with theme deploys (it's gitignored; keep it that way).
