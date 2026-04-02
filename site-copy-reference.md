# Jackknife Marketing Site — Layout & Copy Reference

> **How to use this file:** Feed this document to Claude Code Chat alongside the actual HTML file(s) to discuss copy changes. It contains every headline, body copy, label, button, and animated element across both pages.

---

## Files Covered
- `index.html` — Main landing page
- `features.html` — Features detail page

---

---

# INDEX.HTML — Main Landing Page

**Page Title:** "Jackknife - Spend Your Weekends on Your Life, Not Your House"

---

## Navigation

- **Logo:** Jackknife logo image
- **Links:** Features · FAQ · Our Story
- **Mobile:** Hamburger menu that reveals links

---

## Above-Hero H1 (full-width, above the two-column section)

> "Stop managing your most important asset with a junk drawer and a prayer."

*(Sits above the hero section, left-aligned, max-width 1200px)*

---

## SECTION 1: Hero — "One Photo"

**Background:** White
**Layout:** Two-column — left: text/CTA, right: animated phone mockup

### Left Column Copy

| Element | Text |
|---------|------|
| Section label (small caps, teal) | POINT YOUR PHONE |
| H2 | One photo. Everything you need to know. |
| Body | Jackknife identifies the make, model, age, warranty status, and maintenance needs from a single photo. No manuals. No serial numbers. No guesswork. |
| CTA Button | Try the First Photo |

### Right Column — Phone Mockup (Animated)

Phone shows an **LG WashTower** photo with a scanning beam sweeping top-to-bottom.

**4 detection callouts animate in as the beam passes:**

| # | Position | Content |
|---|----------|---------|
| 1 | Top-right | **IDENTIFIED** — LG WashTower · WKE100HWA |
| 2 | Left-middle | **VALUE** — Est. $1,000 · (Add Receipt) |
| 3 | Right-middle | **WARRANTY** — 2yr Parts · 10yr Motor |
| 4 | Bottom-left | **MAINTENANCE** — Filter: Clean every 30 days |

*Animation: 13.54s cycle, linear beam sweep, callouts fade in as beam passes, fade out at ~10.6s into the cycle.*

---

## SECTION 2: Something's Wrong

**Background:** Light blue (#f0f8fa)
**Layout:** Two-column — left: animated 4-step phone, right: synced text blocks

### Right Column Copy (Synced Text Blocks)

| Element | Text |
|---------|------|
| Section label (small caps, teal) | SOMETHING'S WRONG |
| H2 | Point at the problem. Get the plan. |

**Step 1 text (active/green when Step 1 plays):**
- Headline: See the problem.
- Body: Point at what's wrong. Get the cause, the severity, and how urgent it is. No Googling. No guessing.

**Step 2 text (active/green when Step 2 plays):**
- Headline: See your options.
- Body: DIY with step-by-step instructions, or get matched with a pro your neighbors already trust. Your call.

**Step 3 text (active/green when Step 3 plays):**
- Headline: See it through.
- Body: Every repair is tracked from diagnosis to completion. Cost, timeline, contractor, result. All in one place.

### Left Column — Phone Mockup (4-Step Animated)

Photo of a water-stained ceiling. The phone cycles through 4 steps:

| Step | Label | Phone Screen |
|------|-------|-------------|
| 0 | Photo upload / scan | Ceiling photo with scan beam sweeping, "Analyzing..." label |
| 1 | Diagnosis | Diagnosis card with cause, severity, urgency |
| 2 | Options | DIY instructions or contractor match cards |
| 3 | Done / tracked | Repair record summary |

*Steps auto-cycle: step 0 = 2.35s, steps 1-2 = 2.82s each, step 3 = 2.35s. Linear scan beam.*

---

## SECTION 3: Save Money (3-card grid)

**Background:** White
**Layout:** Section headline + 3-column card grid

*(Note: "Save Money" section appears before "Contractor Experience" in the current page order)*

---

## SECTION 4: Contractor Experience

**Background:** Light blue (#f0f8fa)
**Layout:** Two-column — left: text, right: phone mockup with rotating pro profiles

---

## SECTION 5: Stay Organized

**Background:** White
**Layout:** Section headline + feature grid

---

## SECTION 6: Privacy / Trust Bar

**Background:** Dark navy (#063340)
**Layout:** Centered heading + 3-column grid

| Element | Text |
|---------|------|
| H3 (centered) | It's Your Home. It's Your Data. |

| Column | Headline | Body |
|--------|----------|------|
| 1 | No ads. | Jackknife is 100% ad-free. We work for homeowners not advertisers. |
| 2 | We don't sell your data. | Contractors pay for qualified matches to homeowner job requests. |
| 3 | You call the shots. | Need help from a pro? You select the pro and control every piece of information shared. |

---

## SECTION 7: Final CTA

**Background:** Dark navy
**Layout:** Centered

| Element | Text |
|---------|------|
| H2 | The most expensive thing you own is the one thing you know the least about. |
| CTA Button | Get Jackknife (It's Free) |
| Below button | Available in Essex County, MA |

---

## Sticky CTA Bar (fixed bottom, appears on scroll)

| Element | Text |
|---------|------|
| Bold text | Ready to know your home? |
| Small text | 60-second setup. |
| Button | Get Jackknife (It's Free) → |

---

## Footer

| Column | Content |
|--------|---------|
| Left | © 2026 Jackknife · Essex County, MA |
| Center | Privacy Policy · Terms of Service |
| Right | Are you a contractor? Learn about Jackknife Pro → |

---

---

# FEATURES.HTML — Features Page

**Page Title:** "Jackknife Features - Everything Your Home Needs in One App"

---

## Navigation

Same as index — Features link is active (teal).

---

## SECTION 1: Peace of Mind

**Background:** White
**Layout:** Two-column — left: phone with water heater scan, right: text

### Left Column — Phone Mockup (Animated)

Photo of a water heater with scan beam. 3 detection callouts:

| # | Content |
|---|---------|
| 1 | **AGE** — Installed 2014 · 12 years old |
| 2 | **REPLACEMENT COST** — Est. $2,800–$3,400 installed |
| 3 | **STATUS** — Routine flush recommended |

### Right Column Copy

| Element | Text |
|---------|------|
| Section label | PEACE OF MIND |
| H2 | Know what's aging before it fails. |
| Body | Your water heater, furnace, roof. Jackknife tracks the age and condition of everything in your home and tells you what needs attention next. |
| CTA Button | Try the First Photo |

---

## SECTION 2: Protection

**Background:** Light blue (#f0f8fa)
**Layout:** Two-column — left: flooded room image with insurance claim card overlay, right: text

### Left Column — Image & Card Overlay

Photo: flooded living room with standing water.

**Insurance Claim Card (animated overlay):**

| Element | Text |
|---------|------|
| Header | ✓ Insurance Claim Ready to Export |
| Items documented | 12 |
| Photos attached | 31 |
| Total value | $14,200 |
| Export button (teal) | Export Claim (PDF) |
| Question (italic) | Am I covered for water damage to my floors? |
| Answer | Yes. Your policy covers sudden water damage. Deductible: $1,000. |
| Agent button | 📞 Call Your Agent |
| Agent info | Sarah Chen · Arbella Insurance |

### Right Column Copy

| Element | Text |
|---------|------|
| Section label | PROTECTION |
| H2 | Built for the moment you hope never comes. |
| Body | Every item you've captured is insurance-ready. Export a complete claim, ask questions about your policy, or call your agent. All from one screen. |
| CTA Button | Try the First Photo |

---

## SECTION 3: Recall Alerts

**Background:** White
**Layout:** Two-column — left: text, right: phone mockup

### Left Column Copy

| Element | Text |
|---------|------|
| Section label | RECALL ALERTS |
| H2 | 90% of recalled products are never returned. They're still in someone's home. |
| Body | Most people never find out about a recall until something goes wrong. Jackknife checks every item you've captured against the federal recall database - automatically. If there's a match, you know immediately. |
| CTA Button | Try the First Photo |

### Right Column — Phone Mockup

App header shows a ⚠ Safety Alert label.

**Recall Alert Screen:**

| Card | Content |
|------|---------|
| Alert banner | PRODUCT RECALL · GE Gas Range — Fire Hazard · CPSC Recall #24-123 · Posted 2 days ago |
| Hazard card | Gas valve may fail to close fully, posing a fire risk during oven self-clean cycle. |
| Remedy card | Free in-home repair. Contact GE at 1-800-432-2737 or schedule online. |
| Your item card | GE Profile Gas Range · Kitchen · Model PGS930 |
| CTA 1 | View on CPSC.gov |
| CTA 2 | Schedule Repair |

---

## SECTION 4: Bottom CTA

**Background:** Dark navy gradient
**Layout:** Centered

| Element | Text |
|---------|------|
| H2 | Understand your home. Fix your home. Protect your home. |
| CTA Button | Get Jackknife. It's Free |
| Below button | Available in Essex County, MA |

---

## Footer

| | Content |
|-|---------|
| Left | © 2026 Jackknife · Essex County, MA |
| Center | Jackknife logo |
| Right | Privacy · Terms |

---

---

# Style Reference (for copy context)

| Color | Usage |
|-------|-------|
| #00A385 (teal) | Section labels, active states, CTAs |
| #0a4a5c / #063340 (dark navy) | Headlines, backgrounds, buttons |
| #f0f8fa (light blue) | Alternating section backgrounds |
| #6b7c85 (gray) | Body copy |
| #E85A4F (coral) | Alerts, warnings |

| Font | Usage |
|------|-------|
| Montserrat 700–900 | Headlines, section labels |
| Inter 400–600 | Body copy |

---

*Last updated: 2026-04-01. For copy questions, reference this file alongside the source HTML.*
