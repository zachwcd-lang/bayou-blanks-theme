# Bayou Blanks Theme — Agent Context

Shopify theme (Dawn-based) for shopbayoublanks.com — blank liquidation apparel, Hattiesburg MS.

**CRITICAL: this repo is GitHub-linked to Shopify. Pushing to `main` deploys to the LIVE store.** Commit small, QA before push.

## Key docs
- `design/CLAUDE-CODE-PLAN.md` — canonical redesign build spec (4 phases). If you're doing theme work, start here.
- `design/DESIGN-OVERHAUL.md` — design rationale/background.
- `growth/` — business ops playbooks (gitignored, not theme work — don't touch unless asked).

## Hard rules
- Display layer only: NEVER modify product, pricing, or inventory data.
- Warehouse footage is fine in the TikTok/live context (existing video can stay), but NOT as hero/landing or primary brand imagery — no pallet photos as the hero (owner rule). Hero = painterly artwork / CSS scene per design plan.
- No Sale badges or compare-at strikethroughs — per-unit pricing is the pricing story.
- All copy/images editable via section schema settings (owner edits in customizer).
- Don't commit `.claude/`, `design/screens/`, or stray root images. `growth/` is gitignored.
- Run `npx @shopify/cli theme check` on touched files before pushing (pre-existing offenses in untouched files are known; ignore).

## Store facts agents often need
- Collections (smart, in-stock only, best-selling): `in-stock` (homepage grid), `t-shirts`, `hoodies-fleece`, `jerseys`, `polos`, `tanks`, `youth-toddler`, `womens`.
- Main menu: Home / Shop (dropdown, 8 children) / Buy Bulk / TikTok. Pill nav on collection pages reads the Shop dropdown's children (`snippets/collection-nav.liquid`).
- Variants pattern: Size × Bundle Quantity (4/6/8/12-Pack). Per-unit price = variant price ÷ pack count parsed from option value.
- Style codes live in product tags (e.g. `2G17-4505`, `ZA41-1204`); category tags `cat-*` drive smart collections — never remove tags.
