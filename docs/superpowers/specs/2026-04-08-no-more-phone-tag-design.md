# No More Phone Tag — Animation Design Spec

**Goal:** Add a 3-frame "No More Phone Tag" animation sequence to the Hire With Confidence section, refactoring the current 2-frame Trust Animation into a sequence-based system with 3 dots (third placeholder for future content).

**File:** `/Users/ryanmccarthy/Desktop/jackknife-site/index.html` (single static HTML file — all HTML, CSS, JS inline)

**Design system:** Navy `#063340`, Teal `#00A385`, Coral `#E85A4F` (problem states only), Montserrat font. Phone frame: `#063340` bezel, `border-radius: 40px`, `padding: 6px`, `34px` inner radius, `72x18px` notch.

---

## 1. Architecture

### Sequence-Based Controller

The current 2-frame, 2-dot crossfade controller becomes a multi-sequence system. Each dot represents a **sequence** containing multiple internal frames.

```
Sequence 0 (Dot 1): "Real jobs. Real neighbors."
  Frame 0: Trusted Pros + AI shimmer (4s)
  Frame 1: Smart Match reveals (4s)
  → auto-advance to Sequence 1

Sequence 1 (Dot 2): "No more phone tag."
  Frame 0: Contractor Selected — CTA pulse, tap, checkmark (3s)
  Frame 1: Messaging — typewriter chat thread (10s)
  Frame 2: Project Timeline — stepper with confirmed card (5s)
  → auto-advance to Sequence 2

Sequence 2 (Dot 3): placeholder — hidden, skipped
  → auto-advance to Sequence 0

Total cycle: ~26s + crossfade transitions
```

### Transition Mechanics

- **Between sequences**: All frames from old sequence fade out, first frame of new sequence fades in. 1s crossfade with 12px `translateY` slide (matching current pattern).
- **Within a sequence**: Same crossfade between internal frames — seamless since frames share the same phone screen container.
- Each sequence plays its internal frames **once** (no internal looping), then advances to the next dot.
- **Bridge note**: Trust Animation's Smart Match (Seq 0, Frame 1) and Phone Tag's Contractor Selected (Seq 1, Frame 0) show nearly identical content (same two contractor cards). The 1s crossfade + 12px slide creates a subtle "settling" transition. The CTA button on the Contractor Selected screen is the visual cue that something has changed. If this feels like a blink during testing, we can switch to an instant cut for this specific transition.

### Headline & Detail Text Crossfade

Three sequence-level headlines crossfade with the active dot:
- Dot 1: "Real jobs. Real neighbors."
- Dot 2: "No more phone tag."
- Dot 3: TBD (hidden)

Detail text (desktop only, hidden on mobile) also crossfades:
- Dot 1: "Every review on Jackknife is tied to a real home and a real project. Anonymous for the homeowner. Verified for you."
- Dot 2: "Every message, update, and confirmation in one place. No callbacks. No runaround."
- Dot 3: TBD (hidden)

### Controls

- **Dots**: Clickable. Jump to the first frame of that sequence.
- **Hover**: Pauses entire system (sequences + internal frames). Resumes from current position on mouse leave.
- **IntersectionObserver**: Starts playback when section is 30% visible.
- **`prefers-reduced-motion`**: Show Timeline frame (Sequence 1, Frame 2) statically. All steps visible, Service Date Confirmed expanded with checkmark. No animations.

### Dot 3 Placeholder

Third dot renders but is hidden (`display: none`) until content is defined. The controller skips Sequence 2 automatically, looping from Sequence 1 back to Sequence 0.

---

## 2. Data Updates to Trust Animation

Update contractor names and diagnosis to match the continuous water-damage narrative.

### Frame 0 — Trusted Local Pros (3 cards)

| # | Name | Rating | Reviews |
|---|------|--------|---------|
| 1 | North Shore Drywall & Paint | 4.9 | 19 neighbor reviews |
| 2 | Essex County Restoration | 4.8 | 24 neighbor reviews |
| 3 | Merrimack General Contracting | 4.7 | 31 neighbor reviews |

Icons: Same navy gradient square with paint roller SVG (unchanged).

### Frame 1 — Smart Match

- Diagnosis header: "SMART MATCH" / "Water Damage · Ceiling Stain" / "Based on your diagnosis"
- Best Match: North Shore Drywall & Paint — "4.9 · Water damage restoration specialist" + teal "Best Match" pill
- Second card: Cape Ann General Contracting — "4.8 · Ceiling and drywall repair"

---

## 3. Phone Tag Frame 0 — Contractor Selected (~3s)

### Purpose

Bridge from Trust Animation to Phone Tag. The homeowner selects their contractor.

### Screen Content

Separate HTML from Trust Animation's Smart Match — same visual style, different animation behavior. All elements are **immediately visible** (no staggered reveals — the user has already seen Smart Match).

- **Header**: "SMART MATCH" (11px, teal uppercase) + "Water Damage · Ceiling Stain" (15px bold navy) + "Based on your diagnosis" (11px gray `#6b7c85`)
- **Best Match card**: North Shore Drywall & Paint, "4.9 · Water damage restoration specialist", teal "Best Match" pill, teal left border (3px). **CTA button below card text**: "Share your issue" — `#00A385` bg, white text, 12px font, `border-radius: 200px`, centered, full-width within card.
- **Second card**: Cape Ann General Contracting, "4.8 · Ceiling and drywall repair" — no left border accent.

### Animation Sequence

| Time | Action |
|------|--------|
| +0ms | Screen crossfades in from Sequence 0. All elements visible. |
| +1000ms | CTA button pulses once: `scale(1.0 → 1.03 → 1.0)`, 400ms ease. |
| +1500ms | CTA "tapped": `scale(0.96)` + `brightness(0.9)` for 150ms. Best Match card elevates `translateY(-2px)` with increased shadow. Second card fades out: `opacity: 0; transform: translateY(8px)`, 400ms. |
| +2000ms | Teal checkmark circle appears on Best Match card. SVG checkmark in teal circle, fades in 300ms. Positioned at right edge of card. |
| +3000ms | Crossfade to Frame 1 (Messaging). |

---

## 4. Phone Tag Frame 1 — Messaging (~10s)

### Purpose

Show that the contractor already has full context from Jackknife's diagnosis. No explaining the problem twice.

### Screen Layout

- **Header bar**: Back arrow left (chevron-left SVG, 16px, `#6b7c85`). "North Shore Drywall & Paint" center (14px, weight 500, navy). "29:42" right (12px, `#4a6a75`, monospace feel — static snapshot, not counting down).
- **Info bar**: Full-width below header. `#E1F5EE` background. "Pro has 30 min to respond or we move to your next pick" (12px, `#0F6E56`).
- **Message thread**: Light background (`#f5f7f8`), padding 12px.

### Messages

**Message 1 — Contractor** (left-aligned):
- Label above bubble: "North Shore Drywall & Paint" (11px, `#6b7c85`)
- Bubble: `#ffffff` bg, navy text, `border-radius: 12px`, padding 10px 12px
- Text: "Hey — saw the photos of the ceiling. That's a straightforward patch and repaint, maybe 2 hours once it's dry."
- Typewriter: ~40ms/char, thin teal blinking cursor. Container fades in 200ms before text starts.

**Message 2 — Homeowner** (right-aligned):
- No label
- Bubble: `#00A385` bg, white text, same radius/padding
- Text: "Great, anything else you need from me?"
- Instant pop-in: 200ms fade + slight scale.

**Message 3 — Contractor** (left-aligned):
- Same label and style as Message 1
- Text: "Nope — everything I need is in the Jackknife project. See you Monday the 26th at 3."
- Typewriter: same 40ms/char pattern.

### Animation Timeline

| Time | Action |
|------|--------|
| +0ms | Screen fades in: header + info bar + empty thread. |
| +800ms | Message 1 bubble container fades in, typewriter starts (~3600ms for text). |
| +4400ms | Typewriter complete. Hold. |
| +5600ms | Message 2 pops in instantly. |
| +7000ms | Message 3 bubble container fades in, typewriter starts (~2800ms for text). |
| +9800ms | Typewriter complete. Hold. |
| +10000ms | Crossfade to Frame 2 (Timeline). |

### Typewriter Spec

- Character reveal: ~40ms per character
- Thin teal blinking cursor (`@keyframes hwcCursorBlink { 0%,100% { opacity:1 } 50% { opacity:0 } }`, 530ms interval)
- Each bubble container fades in (200ms) before text begins typing
- Cursor disappears after typing completes

---

## 5. Phone Tag Frame 2 — Project Timeline (~5s)

### Purpose

Everything tracked. Dates match the conversation. Full lifecycle visible.

### Screen Layout

- **Header bar**: Back arrow left (chevron-left SVG, 16px, `#6b7c85`). "Water Damage · Ceiling Repair" center (14px, weight 500, navy).
- **Vertical stepper**: Teal `#00A385` vertical line (2px wide) running down left side, connecting circular step indicators (20px diameter).

### Step Cards

| # | Title | State | Detail |
|---|-------|-------|--------|
| 1 | Issue Analyzed & Documented | Completed | Wed, May 14, 2026 · 10 AM |
| 2 | Select Your Pro | Completed | North Shore Drywall & Paint (teal, link-style) |
| 3 | Service Date Confirmed | **Animates in** | Mon, May 26, 2026 · 3 PM. Card with teal left border, description, "Reschedule" button. |
| 4 | Confirm Completion | Future/muted | Gray text, unfilled circle |
| 5 | Rate Your Pro | Future/muted | Gray text, unfilled circle |

### Step Visual Specs

- **Completed circle**: 20px, `#00A385` fill, white checkmark SVG (10px)
- **Future circle**: 20px, `#e0e5e8` fill, no icon
- **Teal line**: 2px wide, connects circle centers
- **Card (step 3)**: White bg, `border-radius: 12px`, `box-shadow: 0 1px 4px rgba(0,0,0,0.06)`, teal left border (3px `#00A385`), padding 12px
- **Reschedule button**: `#00A385` bg, white text, full-width, `border-radius: 200px`, 12px font, padding 8px

### Animation Sequence

| Time | Action |
|------|--------|
| +0ms | Screen fades in. Steps 1-2 completed (checkmarks visible, no animation). Steps 4-5 visible but muted. Step 3 card collapsed (height: 0, overflow hidden). |
| +500ms | Step 3 card expands to full height (400ms `ease-out`). Teal line extends down to meet it. |
| +900ms | Card left border gets teal glow pulse (single, 600ms): `box-shadow: 0 0 12px rgba(0,163,133,0.3)`. Date text transitions from muted `#a0aeb5` to teal `#00A385`. |
| +1500ms | Step 3 circle fills teal + white checkmark (300ms fade). |
| +1800ms | Hold for 3200ms. Future steps visible below. |
| +5000ms | Crossfade back to Sequence 0, Frame 0 (Trust Animation). Full loop restarts. |

---

## 6. New CSS

### Message Bubbles

```css
.hwc-msg-row { display: flex; margin-bottom: 8px; }
.hwc-msg-row.hwc-msg-left { justify-content: flex-start; }
.hwc-msg-row.hwc-msg-right { justify-content: flex-end; }

.hwc-msg-bubble {
  max-width: 85%;
  padding: 10px 12px;
  border-radius: 12px;
  font-family: Montserrat, sans-serif;
  font-size: 12px;
  line-height: 1.5;
}
.hwc-msg-contractor { background: #ffffff; color: #063340; }
.hwc-msg-homeowner { background: #00A385; color: #ffffff; }
.hwc-msg-label {
  font-size: 11px; color: #6b7c85; margin: 0 0 4px 0;
  font-family: Montserrat, sans-serif;
}
```

### Typewriter Cursor

```css
@keyframes hwcCursorBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.hwc-cursor {
  display: inline-block;
  width: 1.5px;
  height: 1em;
  background: #00A385;
  margin-left: 1px;
  vertical-align: text-bottom;
  animation: hwcCursorBlink 530ms step-end infinite;
}
```

### CTA Pulse

```css
@keyframes hwcCtaPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.03); }
}
```

### Timeline Stepper

```css
.hwc-stepper { position: relative; padding-left: 32px; }
.hwc-stepper-line {
  position: absolute; left: 9px; top: 10px;
  width: 2px; background: #00A385;
  transition: height 400ms ease-out;
}
.hwc-stepper-step { position: relative; padding-bottom: 16px; }
.hwc-stepper-circle {
  position: absolute; left: -32px; top: 0;
  width: 20px; height: 20px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}
.hwc-stepper-circle.completed { background: #00A385; }
.hwc-stepper-circle.future { background: #e0e5e8; }
.hwc-stepper-circle.pending { background: #f5f7f8; border: 2px solid #d1d5db; }
```

### Confirmed Card Glow

```css
@keyframes hwcConfirmGlow {
  0% { box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
  50% { box-shadow: 0 1px 4px rgba(0,0,0,0.06), 0 0 12px rgba(0,163,133,0.3); }
  100% { box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .hwc-cursor { animation: none !important; opacity: 1; }
  [data-hwcseqframe], .hwc-msg-bubble, .hwc-stepper-circle,
  .hwc-confirm-card { transition: none !important; animation: none !important; }
}
```

---

## 7. JS Controller Structure

```
IIFE:
  Constants:
    SEQ0_FRAME0_HOLD = 4000  (Trusted Pros)
    SEQ0_FRAME1_HOLD = 4000  (Smart Match)
    SEQ1_FRAME0_HOLD = 3000  (Contractor Selected)
    SEQ1_FRAME1_HOLD = 10000 (Messaging)
    SEQ1_FRAME2_HOLD = 5000  (Timeline)
    CROSSFADE = 1000

  State:
    currentSeq = 0
    currentFrame = 0
    paused = false
    allTimers = []

  playSequence(seqIndex):
    - Update dots (active = teal, others = gray)
    - Crossfade headlines + detail text
    - Hide all frames from other sequences
    - Call playFrame(seqIndex, 0)

  playFrame(seqIndex, frameIndex):
    - Clear all timers
    - Crossfade: hide current frame, show target frame
    - Run frame-specific animation function
    - When frame completes: if more frames in sequence → playFrame(seq, frame+1)
      else → playSequence(nextSeq)

  Frame animation functions:
    seq0_frame0(): shimmer at +1s, schedule advance at SEQ0_FRAME0_HOLD
    seq0_frame1(): diagnosis reveal +100ms, bestmatch +900ms, glow +1200ms,
                   secondcard +1500ms, advance at SEQ0_FRAME1_HOLD
    seq1_frame0(): CTA pulse +1s, tap +1.5s, card fade +1.5s, checkmark +2s,
                   advance at SEQ1_FRAME0_HOLD
    seq1_frame1(): typewriter chain (see timing table), advance at SEQ1_FRAME1_HOLD
    seq1_frame2(): card expand +500ms, glow +900ms, checkmark +1500ms,
                   advance at SEQ1_FRAME2_HOLD

  typewriter(element, text, speed, callback):
    - Reveals text character by character
    - Shows blinking cursor during typing
    - Removes cursor on completion
    - Calls callback when done

  Dot click → playSequence(targetSeq)
  Hover → pause/resume
  IntersectionObserver → start on 30% visible
  prefers-reduced-motion → show seq1_frame2 static, paused=true
```

---

## 8. HTML Structure Summary

Inside the existing `<div style="position: relative; height: 485px; overflow: hidden;">`:

```
[data-hwcseqframe="0-0"]  Trust: Trusted Pros (existing, updated data)
[data-hwcseqframe="0-1"]  Trust: Smart Match (existing, updated data)
[data-hwcseqframe="1-0"]  PhoneTag: Contractor Selected (NEW)
[data-hwcseqframe="1-1"]  PhoneTag: Messaging (NEW)
[data-hwcseqframe="1-2"]  PhoneTag: Timeline (NEW)
```

Existing `data-hwcframe="0"` and `data-hwcframe="1"` attributes get renamed to `data-hwcseqframe="0-0"` and `data-hwcseqframe="0-1"`.

Headlines: `data-hwcseqtitle="0"`, `data-hwcseqtitle="1"`, `data-hwcseqtitle="2"` (hidden).
Detail texts: `data-hwcseqdetail="0"`, `data-hwcseqdetail="1"`, `data-hwcseqdetail="2"` (hidden).
Dots: `data-hwcseqdot="0"`, `data-hwcseqdot="1"`, `data-hwcseqdot="2"` (hidden).

---

## 9. What Changes vs What Stays

### Changes
- Trust Animation contractor names + diagnosis text updated
- `data-hwcframe` attributes renamed to `data-hwcseqframe`
- Step title area expanded to 3 headlines
- Detail text area expanded to 2 texts (3rd hidden)
- Dots expanded to 3 (3rd hidden)
- JS controller completely rewritten to sequence-based
- New CSS for messaging, typewriter, stepper, CTA pulse, confirm glow
- 3 new frame divs added to phone screen container

### Untouched
- Phone frame markup (bezel, notch, screen container, logo header)
- Section layout (two-column flex, hwc-layout, hwc-text-col, hwc-phone-col)
- H2 "Vetted by your street. Not an algorithm."
- Section label "HIRE WITH CONFIDENCE"
- Mobile responsive rules (column stack, center text, hide detail)
- All other sections on the page (hero, carousel, save money, etc.)

---

## 10. Acceptance Criteria

1. Three dots visible (third hidden until content exists). Active dot = teal, others = gray.
2. Dot 1 plays Trust Animation: Trusted Pros (shimmer) → Smart Match (staggered reveals) → auto-advance.
3. Dot 2 plays Phone Tag: Contractor Selected (CTA pulse → tap → checkmark) → Messaging (typewriter chat) → Timeline (stepper expand) → auto-advance back to Dot 1.
4. Contractor names consistent across all frames (North Shore, Essex County, Merrimack, Cape Ann per spec).
5. Messaging: typewriter at ~40ms/char with teal blinking cursor. Homeowner messages instant pop-in.
6. Messaging: "29:42" static timer in header. Info bar with 30-min rule.
7. Messaging: contractor references ceiling photos and gives "2 hours" estimate. Final message date matches Timeline.
8. Timeline: Steps 1-2 pre-completed. Step 3 expands, glows, confirms. Steps 4-5 muted.
9. Timeline: "Mon, May 26, 2026 · 3 PM" matches messaging.
10. Headline crossfades with sequence changes. Detail text crossfades (desktop only).
11. Hover pauses entire system. Resume on mouse leave.
12. `prefers-reduced-motion`: Timeline frame shown static.
13. Mobile (375px): detail text hidden, phone centered, no overflow.
14. No console errors. No regression to other sections.
15. Total loop ~26s.
