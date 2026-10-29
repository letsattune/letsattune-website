# Let's Attune — Website

## 👋 Who you're talking to (READ FIRST)

This repo is owned by **Shilpa**, the coach — she is **not technical** and works mostly in the
**Claude Code desktop app**. Adjust how you communicate and act:

- **No jargon.** Avoid "git", "commit", "branch", "repo", "deploy", "CSS", "HTML" unless she uses
  them first. Say "your website", "publish your changes", "the page", "the wording", "the colour".
- **Do the technical steps for her.** Never ask her to run terminal commands. When she wants changes
  live, run the **`push-website`** skill yourself (it stages, saves, and publishes automatically —
  the git commands are pre-approved in `.claude/settings.json`, so nothing will prompt her).
- **Confirm visually, not technically.** Tell her to double-click a page to preview, and that the
  live site updates ~30 seconds after publishing.
- **Protect her words.** Her website copy is carefully written — see the "copy is sacred" rule in
  `CONTEXT.md`. Don't reword her text unless she explicitly asks.
- **Explain before doing anything irreversible**, in plain terms, and wait for a clear yes.
- **One thing at a time.** Keep answers short and friendly; offer to handle the next step.

To publish changes: just say something like *"publish my changes"* or *"make it live"* and Claude
will do the rest.

## Overview
Static HTML website for Shilpa Jahagirdar's life coaching business **Let's Attune**.
Hosted on GitHub Pages at `letsattune.com` (custom domain).

## Repo
- Repo: `letsattune/letsattune-website` (the Let's Attune organisation on GitHub,
  https://github.com/letsattune/letsattune-website). It was `shilpa-attune/letsattune-website` before;
  GitHub forwards the old address, so an older clone (including one that pushes through the SSH alias
  `github-letsattune-website`) keeps working. New clones use `https://github.com/letsattune/letsattune-website.git`.
- Shilpa's GitHub login is `shilpa-attune`; San's is `archisandev`. Both can push.
- Cloned next to `letsattune-social` and `mecove-claude-space`, in one folder per machine.

## Social content (reels, YouTube, Instagram)
Lives in the **`letsattune-social`** repo, cloned next to this one (`../letsattune-social`), with its
photos and videos on the **letsattune-social** Google shared drive. Channels: YouTube
https://www.youtube.com/@LetsAttune and Let's Attune's Instagram.
- **This website is the source of the brand.** `letsattune-social` reads this repo's `CONTEXT.md` for
  every word it writes, and keeps a copy of the look (colours, fonts, logo) in
  `brands/letsattune/brand/`. If you change the logo, colours or fonts here, tell Shilpa or San the
  reels' copy needs updating too — or update it in `letsattune-social` in the same session.
- **Programs** (workshops, listening circles, corporate programs) have their pages here and their reels
  in `letsattune-social/brands/letsattune/programs/<program>/`. When a program page changes here (dates,
  price, wording), check whether its reels or posts need the same change, and the reverse.
- To make a reel: open `letsattune-social` and use `/reel`.

## Hosting
- Platform: GitHub Pages (free)
- Custom domain: `letsattune.com`
- SSL: Enforced via GitHub Pages (Let's Encrypt)
- Deploy: automatic on push to `main` branch (~30 seconds)

> **Brand & content vocabulary lives in `CONTEXT.md`** — read it before changing copy.
> **Architecture rationale lives in `docs/adr/0001`** (why zero-build / duplicated markup).

## Stack
- Plain HTML + CSS + vanilla JavaScript — no frameworks, no build tools
- Shared `styles.css` + `main.js` (design/behaviour centralised); header/footer markup is
  duplicated per page on purpose — see ADR 0001. Do not introduce a templating layer/SSG.
- A few shared pieces are added by `main.js` at load time, not written in each page: the
  "Work with us" dropdown in the nav, the social links in the footer's Connect column, and the
  Privacy link in the footer. Change those in `main.js`, not page by page.
- Fonts (Google Fonts): **Fraunces** (display/headlines/brand) + **Poppins** (body/UI)
- No npm, no bundler, no server needed

## Colour Palette
Sampled from the brand palette file (`assets/Lets attune pallet.jpeg`) — CSS vars in `styles.css`:
- Navy (primary text / dark sections): `#1d3557`
- Steel blue (secondary accent): `#457b9d`
- Coral (CTAs / highlights): `#e63946`
- Dark green (rare accent / announce bar): `#0e4f47`
- Sage (brand field): `#abc9c9`
- Page base: `#f3f7f6` (light sage tint) · soft sage band: `#dbe8e6`

## File Structure
```
/
├── index.html                  # Homepage
├── about.html                  # About — story, founders, contributors, values
├── coaching.html               # Individual coaching (with Shilpa)
├── workshops.html              # Workshops for people, teams and organisations
├── gatherings.html             # Attune Gatherings (topic-led group conversations)
├── working-professionals.html  # Support for working professionals (with Santosh)
├── our-work.html               # Our Work — examples and outcomes (+ our-work.css, our-work.js)
├── contact.html                # Contact Us form
├── privacy.html                # Privacy policy
├── form-sample.html            # Old workshop registration sample — not linked from any page
├── styles.css                  # Shared design system
├── main.js                     # Shared behaviour (header, nav dropdown, footer extras, reveal)
├── CNAME                       # Custom domain (letsattune.com)
├── CLAUDE.md                   # This file
├── CONTEXT.md                  # Brand & content vocabulary (source of truth for copy)
├── docs/adr/                   # Architecture decision records
└── assets/                     # Logo, palette, photos of Shilpa, Santosh, contributors,
                                # workshops and gatherings, WhatsApp QR (qr.png)
```

## Pages
Main nav: Work with us (dropdown: Coaching · Workshops · Gatherings · Working professionals) ·
Our work · About · Contact us. Every page shares the same footer (company name
"Let's Attune Pvt. Ltd.", `hello@letsattune.com`, WhatsApp, Privacy link).

### index.html — Homepage
Forest hero → "Something needs my attention" recognition → Different ways to begin (links to the
four service pages) → the Attune way → Our work proof → the company/people → meCove feature →
closing invite to contact.

### about.html — About
Hero with founder portraits → story → what Let's Attune brings together → philosophy → founders
(Shilpa, Santosh) → contributors (Pramitha, Dev) → values → reflections → closing invite.

### coaching.html · workshops.html · gatherings.html · working-professionals.html
One page per way of working with Let's Attune. Each ends with a call to contact. Coaching is led by
Shilpa; working professionals by Santosh. `workshops.html` is now a general workshops page — the old
July 2026 workshop page, its registration pop-up and UPI payment step are gone.

### our-work.html — Our Work
Support examples grouped by what is bothering the person, with optional tabs (`our-work.js`).

### contact.html — Contact Us
Form (name, phone, email, topic, message) → Formspree. Sidebar: direct contact, WhatsApp QR.

### privacy.html — Privacy policy

## Booking / contact
- All enquiries → contact.html → Formspree (`formspree.io/f/mgojvkwl`) → shilpa@letsattune.com
- WhatsApp `wa.me/918080166955` · public email `hello@letsattune.com`
- No Calendly, no online payment on the site at the moment.

## Effects Used
- Sticky shrinking glass header · scroll fade-ins (IntersectionObserver) · card hover lift
- `main.js` still has the typewriter code, but no page uses it now
- All motion respects `prefers-reduced-motion`

## Local Preview
Just double-click `index.html` — opens directly in browser. No server needed.
All JS effects work fine locally (no API calls or network requests).

## Workflow
1. Make changes to HTML files
2. Preview locally (double-click index.html)
3. `git add . && git commit -m "description" && git push`
4. Site updates live in ~30 seconds

## Business Info
- Business: Let's Attune — life & executive coaching
- Coach: Shilpa Jahagirdar (PCC, ICF Certified)
- Email: shilpa@letsattune.com (public address on the site: hello@letsattune.com)
- Phone: +91 8080166955
- Contact form: https://forms.gle/p1m3mecHvxKqkyVN9
- Original Google Sites: https://www.letsattune.com/
