# Jackknife — Apple App Store Listing Copy

> **How to use this file:** This is the source of truth for the App Store Connect listing fields. The description was redlined against App Store reading behavior (only ~170 characters show before "more"; fewer than 5% of visitors expand) and against the live Airbnb, Uber, and Acorns listings. Full walkthrough with rationale: [redline review artifact](https://claude.ai/code/artifact/c591e7ef-61a9-4ac6-9b71-0b7ab891dee9).

---

## Description (1,645 / 4,000 characters)

```
Everything home. Protected, searchable, and private.

Point your phone at anything you own. Jackknife identifies it, builds its maintenance plan, and keeps the records an insurance claim requires. No manuals. No serial numbers. No guesswork. Just you, your camera, and your home.

KNOW YOUR HOME:
Every appliance, document, and receipt — organized by room, searchable in seconds, and ready for insurance, taxes, or resale.

PROTECT YOUR BIGGEST ASSET:
A claim gets paid on proof, not memory. Your inventory is time-stamped documentation of what you own and the condition it's in — built for the moment you hope never comes.

STOP CARRYING YOUR HOME IN YOUR HEAD:
Photograph your water heater, and its maintenance schedule lands in your reminders. Snap a receipt, and you'll get an alert before the warranty expires. If a recall is ever published, you'll know. No generic checklists — this is Home Intelligence, built from what you actually own and what your home actually needs.

WHEN SOMETHING BREAKS:
Go from panic to plan in seconds. Point your phone at the problem, and Jackknife identifies the cause and severity, then tells you whether it's a DIY fix or a job for a pro. DIY plans come with step-by-step instructions and a parts list.

HIRE WITH CONFIDENCE:
Jackknife Pros come recommended by your neighbors — every review is tied to a real home and a real project. You choose who to contact and what to share.

YOUR HOME, YOUR DATA:
We work for homeowners, not advertisers. No ads. We never sell your data. Export everything or delete your account anytime.

Jackknife is free for homeowners. 60-second setup. Now serving Essex County, MA.
```

---

## Subtitle (28 / 30 characters — indexed for search)

```
Home inventory & maintenance
```

Alternate with more voice (29/30): `Know, fix & protect your home`

## Promotional text (126 / 170 characters — updatable anytime, no release needed)

```
Now live in Essex County, MA. Point your camera at anything in your home — Jackknife takes it from there. Free for homeowners.
```

This field shows **above** the description and can be changed without shipping an app version — it's the expansion ticker. When a new county goes live, update it the same day.

## Keyword field (100 characters, hidden, indexed)

Spend it on terms the subtitle doesn't already cover, e.g.: `warranty,tracker,recall,alerts,receipts,repair,homeowner,appliance,organizer,records`
(The description itself carries **zero** search weight on Apple's store — it sells humans only.)

---

## Notes for future edits

- **The fold rule:** the first ~170 characters are all most visitors ever see. The opening must deliver the mechanism (point camera → identified → plan → insurance records) before the cut.
- **The skim test:** the six ALL-CAPS headers should read as a complete pitch on their own — know it, protect it, maintain it, fix it, hire for it, own the data. Keep that skeleton intact as copy accretes.
- **Length norm:** consumer-app sales copy runs ~1,500–2,500 characters (Airbnb ≈2.1k, Uber ≈2.5k; Acorns nears the 4,000 cap only because of required financial disclosures). Don't fill space toward the cap.
- **Geography lives in promotional text,** not the description — the description only updates with an app release.
- **Voice call, decided for consistency:** the privacy section uses the site's proven line ("We work for homeowners, not advertisers") instead of the draft's "not a tech bro in Silicon Valley." If the snark is wanted back, the grammatical form is: "belongs to you, not a tech bro in Silicon Valley."
- **Before paste day:** find-and-replace the product name — the source doc showed several "Jackkknife" (three k's) instances. Verify the fold on a real device after submission preview.

*Last updated: 2026-08-07. Companion to `site-copy-reference.md`.*
