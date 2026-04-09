# No More Phone Tag — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the "No More Phone Tag" 3-frame animation sequence to the Hire With Confidence section, refactoring the controller from 2-frame to sequence-based with 3 dots.

**Architecture:** Single-file changes to `index.html`. The existing 2-frame crossfade becomes a multi-sequence controller where each dot owns a sequence of internal frames. Sequence 0 = Trust Animation (2 frames), Sequence 1 = Phone Tag (3 frames), Sequence 2 = placeholder (hidden, skipped).

**Tech Stack:** Vanilla HTML/CSS/JS, inline in a single static HTML file. No dependencies.

**Spec:** `docs/superpowers/specs/2026-04-08-no-more-phone-tag-design.md`

---

### Task 1: Update Trust Animation data (contractor names + diagnosis)

**Files:**
- Modify: `index.html` — lines 2120, 2121 (Card 1 name/rating), 2129-2130 (Card 2), 2138-2139 (Card 3), 2153 (diagnosis text), 2173-2174 (second specialist card)

- [ ] **Step 1: Update Frame 1 Card 2 name**

Change "Colonial Restoration Co." to "Essex County Restoration" on line 2129:

```html
<!-- OLD -->
<p style="font-size: 14px; font-weight: 600; color: #063340; margin: 0; line-height: 1.3;">Colonial Restoration Co.</p>
<!-- NEW -->
<p style="font-size: 14px; font-weight: 600; color: #063340; margin: 0; line-height: 1.3;">Essex County Restoration</p>
```

- [ ] **Step 2: Update Frame 1 Card 3 name**

Change "Coastline Painting & Repair" to "Merrimack General Contracting" on line 2138:

```html
<!-- OLD -->
<p style="font-size: 14px; font-weight: 600; color: #063340; margin: 0; line-height: 1.3;">Coastline Painting &amp; Repair</p>
<!-- NEW -->
<p style="font-size: 14px; font-weight: 600; color: #063340; margin: 0; line-height: 1.3;">Merrimack General Contracting</p>
```

- [ ] **Step 3: Update Frame 2 diagnosis text**

Change "Water Damage · Drywall Repair" to "Water Damage · Ceiling Stain" on line 2153:

```html
<!-- OLD -->
<p style="font-size: 15px; font-weight: 700; color: #063340; margin: 0 0 2px 0;">Water Damage · Drywall Repair</p>
<!-- NEW -->
<p style="font-size: 15px; font-weight: 700; color: #063340; margin: 0 0 2px 0;">Water Damage · Ceiling Stain</p>
```

- [ ] **Step 4: Update Frame 2 second specialist card**

Change "Colonial Restoration Co." / "Drywall & paint repair" to "Cape Ann General Contracting" / "Ceiling and drywall repair" on lines 2173-2174:

```html
<!-- OLD -->
<p style="font-size: 14px; font-weight: 600; color: #063340; margin: 0; line-height: 1.3;">Colonial Restoration Co.</p>
<p style="font-size: 11px; color: #4a6a75; margin: 2px 0 0 0;">★ 4.8 · Drywall &amp; paint repair</p>
<!-- NEW -->
<p style="font-size: 14px; font-weight: 600; color: #063340; margin: 0; line-height: 1.3;">Cape Ann General Contracting</p>
<p style="font-size: 11px; color: #4a6a75; margin: 2px 0 0 0;">★ 4.8 · Ceiling and drywall repair</p>
```

- [ ] **Step 5: Verify in browser**

Open preview at http://localhost:8090, scroll to Hire With Confidence section. Confirm:
- Frame 1 shows: North Shore Drywall & Paint, Essex County Restoration, Merrimack General Contracting
- Frame 2 shows: "Water Damage · Ceiling Stain", North Shore Drywall & Paint, Cape Ann General Contracting
- No console errors

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "chore: update HWC contractor names and diagnosis for water damage narrative"
```

---

### Task 2: Rename data attributes from frame-based to sequence-based

**Files:**
- Modify: `index.html` — frame divs (lines ~2110, ~2149), title spans (lines ~2082-2083), dot divs (lines ~2186-2187), JS controller (lines ~2239-2399)

- [ ] **Step 1: Rename frame data attributes in HTML**

Change `data-hwcframe="0"` to `data-hwcseqframe="0-0"` and `data-hwcframe="1"` to `data-hwcseqframe="0-1"`:

```html
<!-- Frame 1: was data-hwcframe="0" -->
<div data-hwcseqframe="0-0" style="position: absolute; inset: 0; opacity: 1; ...">

<!-- Frame 2: was data-hwcframe="1" -->
<div data-hwcseqframe="0-1" style="position: absolute; inset: 0; opacity: 0; ...">
```

- [ ] **Step 2: Rename title data attributes**

Change `data-hwctitle="0"` to `data-hwcseqtitle="0"` and `data-hwctitle="1"` to `data-hwcseqtitle="1"`:

```html
<span class="hwc-title" data-hwcseqtitle="0" style="...">Real jobs. Real neighbors.</span>
<span class="hwc-title" data-hwcseqtitle="1" style="...opacity: 0;...">No more phone tag.</span>
```

Note: The second title changes from "Smart Match." to "No more phone tag." — this is the sequence-level headline for Dot 2.

- [ ] **Step 3: Rename dot data attributes**

Change `data-hwcdot="0"` to `data-hwcseqdot="0"` and `data-hwcdot="1"` to `data-hwcseqdot="1"`:

```html
<div class="hwc-dot" data-hwcseqdot="0" style="...background: #00A385;..."></div>
<div class="hwc-dot" data-hwcseqdot="1" style="...background: #d1d5db;..."></div>
```

- [ ] **Step 4: Update JS controller selectors**

In the `<script>` block starting at line ~2239, update all querySelector calls to use new attribute names:

```javascript
// OLD
var frames = section.querySelectorAll('[data-hwcframe]');
var titles = section.querySelectorAll('.hwc-title');
var dots = section.querySelectorAll('.hwc-dot');

// NEW
var allFrames = section.querySelectorAll('[data-hwcseqframe]');
var titles = section.querySelectorAll('[data-hwcseqtitle]');
var dots = section.querySelectorAll('[data-hwcseqdot]');
```

Also update the dot click handler:
```javascript
// OLD
var target = parseInt(d.getAttribute('data-hwcdot'));
// NEW
var target = parseInt(d.getAttribute('data-hwcseqdot'));
```

- [ ] **Step 5: Verify in browser**

Reload preview. Confirm:
- Trust Animation still plays correctly (Frame 0 → shimmer → Frame 1 → reveals → loops)
- Dots still clickable
- Hover pause still works
- No console errors

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "refactor: rename HWC data attributes to sequence-based naming"
```

---

### Task 3: Add headline, detail text, and third dot for Sequence 1

**Files:**
- Modify: `index.html` — title crossfade area (line ~2081), detail text (line ~2087), dots (lines ~2185-2188)

- [ ] **Step 1: Expand title crossfade to 3 headlines**

Replace the title container content. Note the second title changes to the Sequence 1 headline, and a hidden third title is added:

```html
<!-- Step title crossfade -->
<div style="position: relative; height: 36px; width: 100%; margin-bottom: 24px;">
  <span class="hwc-title" data-hwcseqtitle="0" style="position: absolute; left: 0; right: 0; opacity: 1; transition: opacity 800ms ease; font-family: Montserrat, sans-serif; font-weight: 800; font-size: clamp(20px, 3vw, 28px); color: #0a4a5c;">Real jobs. Real neighbors.</span>
  <span class="hwc-title" data-hwcseqtitle="1" style="position: absolute; left: 0; right: 0; opacity: 0; transition: opacity 800ms ease; font-family: Montserrat, sans-serif; font-weight: 800; font-size: clamp(20px, 3vw, 28px); color: #0a4a5c;">No more phone tag.</span>
  <span class="hwc-title" data-hwcseqtitle="2" style="position: absolute; left: 0; right: 0; opacity: 0; display: none; transition: opacity 800ms ease; font-family: Montserrat, sans-serif; font-weight: 800; font-size: clamp(20px, 3vw, 28px); color: #0a4a5c;"></span>
</div>
```

- [ ] **Step 2: Convert detail text to crossfading pair**

Replace the single `<p>` with a container holding two detail texts (third hidden):

```html
<!-- Detail text (desktop only, crossfades with sequence) -->
<div class="hwc-detail-container" style="position: relative; min-height: 52px;">
  <p class="hwc-detail-text" data-hwcseqdetail="0" style="font-family: Montserrat, sans-serif; font-size: 17px; color: #6b7c85; margin: 0; max-width: 480px; line-height: 1.6; transition: opacity 800ms ease; opacity: 1;">Every review on Jackknife is tied to a real home and a real project. Anonymous for the homeowner. Verified for you.</p>
  <p class="hwc-detail-text" data-hwcseqdetail="1" style="font-family: Montserrat, sans-serif; font-size: 17px; color: #6b7c85; margin: 0; max-width: 480px; line-height: 1.6; transition: opacity 800ms ease; opacity: 0; position: absolute; top: 0; left: 0; right: 0;">Every message, update, and confirmation in one place. No callbacks. No runaround.</p>
  <p class="hwc-detail-text" data-hwcseqdetail="2" style="display: none;"></p>
</div>
```

- [ ] **Step 3: Add third dot (hidden)**

Add a third dot with `display: none`:

```html
<!-- Progress dots -->
<div style="display: flex; justify-content: center; gap: 8px; padding: 16px 0;">
  <div class="hwc-dot" data-hwcseqdot="0" style="width: 8px; height: 8px; border-radius: 50%; background: #00A385; transition: background 300ms ease; cursor: pointer;"></div>
  <div class="hwc-dot" data-hwcseqdot="1" style="width: 8px; height: 8px; border-radius: 50%; background: #d1d5db; transition: background 300ms ease; cursor: pointer;"></div>
  <div class="hwc-dot" data-hwcseqdot="2" style="width: 8px; height: 8px; border-radius: 50%; background: #d1d5db; transition: background 300ms ease; cursor: pointer; display: none;"></div>
</div>
```

- [ ] **Step 4: Verify in browser**

Reload preview. Confirm:
- "Real jobs. Real neighbors." displays as first headline
- Detail text shows Sequence 0 text
- 2 visible dots (third hidden)
- No layout shifts or overflow issues

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add sequence-level headlines, detail text, and third dot placeholder"
```

---

### Task 4: Add Phone Tag Frame 0 HTML — Contractor Selected

**Files:**
- Modify: `index.html` — insert new frame div after the existing Smart Match frame (after line ~2177, before the closing `</div>` of the screen content area)

- [ ] **Step 1: Insert Contractor Selected frame HTML**

Insert after the closing `</div>` of `data-hwcseqframe="0-1"` (the Smart Match frame), before the closing `</div>` of the screen content area:

```html
              <!-- SEQUENCE 1, FRAME 0: Contractor Selected -->
              <div data-hwcseqframe="1-0" style="position: absolute; inset: 0; opacity: 0; transform: translateY(12px); visibility: hidden; transition: opacity 1s ease, transform 1s ease; padding: 16px 14px; font-family: Montserrat, sans-serif;">
                <!-- Screen header with diagnosis context -->
                <div style="margin-bottom: 12px; text-align: left;">
                  <p style="font-size: 11px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; color: #00A385; margin: 0 0 2px 0;">Smart Match</p>
                  <p style="font-size: 15px; font-weight: 700; color: #063340; margin: 0 0 2px 0;">Water Damage · Ceiling Stain</p>
                  <p style="font-size: 11px; font-weight: 400; color: #6b7c85; margin: 0;">Based on your diagnosis</p>
                </div>

                <!-- Best Match card with CTA -->
                <div class="hwc-pt-bestmatch" style="background: #ffffff; border-radius: 12px; padding: 12px; margin-bottom: 8px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); border-left: 3px solid #00A385; transition: transform 0.3s ease, box-shadow 0.3s ease; position: relative;">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 36px; height: 36px; border-radius: 10px; background: linear-gradient(135deg, #063340, #0a4a5c); display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="5" rx="1"/><path d="M4 8v3a2 2 0 0 0 2 2h1v7a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-7h1a2 2 0 0 0 2-2V8"/></svg></div>
                    <div style="flex: 1; min-width: 0; text-align: left;">
                      <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px; flex-wrap: wrap;">
                        <p style="font-size: 14px; font-weight: 600; color: #063340; margin: 0;">North Shore Drywall &amp; Paint</p>
                        <span style="font-size: 10px; font-weight: 600; color: #0F6E56; background: #E1F5EE; padding: 2px 8px; border-radius: 20px; white-space: nowrap;">Best Match</span>
                      </div>
                      <p style="font-size: 11px; color: #4a6a75; margin: 0;">★ 4.9 · Water damage restoration specialist</p>
                    </div>
                  </div>
                  <!-- CTA button -->
                  <div class="hwc-pt-cta" style="background: #00A385; color: white; border-radius: 200px; padding: 8px; text-align: center; font-family: Montserrat, sans-serif; font-weight: 600; font-size: 12px; margin-top: 10px; transition: transform 150ms ease, filter 150ms ease;">Share your issue</div>
                  <!-- Checkmark (hidden initially) -->
                  <div class="hwc-pt-check" style="position: absolute; top: 12px; right: 12px; width: 22px; height: 22px; border-radius: 50%; background: #00A385; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease;">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                </div>

                <!-- Second specialist card (fades out on selection) -->
                <div class="hwc-pt-second" style="background: #ffffff; border-radius: 12px; padding: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); display: flex; align-items: center; gap: 10px; transition: opacity 0.4s ease, transform 0.4s ease;">
                  <div style="width: 36px; height: 36px; border-radius: 10px; background: linear-gradient(135deg, #063340, #0a4a5c); display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="5" rx="1"/><path d="M4 8v3a2 2 0 0 0 2 2h1v7a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-7h1a2 2 0 0 0 2-2V8"/></svg></div>
                  <div style="flex: 1; min-width: 0; text-align: left;">
                    <p style="font-size: 14px; font-weight: 600; color: #063340; margin: 0; line-height: 1.3;">Cape Ann General Contracting</p>
                    <p style="font-size: 11px; color: #4a6a75; margin: 2px 0 0 0;">★ 4.8 · Ceiling and drywall repair</p>
                  </div>
                </div>
              </div>
```

- [ ] **Step 2: Verify HTML renders (hidden frame)**

Reload preview. The new frame should be invisible (opacity: 0, visibility: hidden). Confirm no layout shifts, no console errors. Use browser devtools or preview eval to verify the element exists:

```javascript
document.querySelector('[data-hwcseqframe="1-0"]') !== null  // should be true
```

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add Phone Tag Frame 0 (Contractor Selected) HTML"
```

---

### Task 5: Add Phone Tag Frame 1 HTML — Messaging

**Files:**
- Modify: `index.html` — insert after the Contractor Selected frame (after `data-hwcseqframe="1-0"`)

- [ ] **Step 1: Insert Messaging frame HTML**

Insert after the closing `</div>` of `data-hwcseqframe="1-0"`:

```html
              <!-- SEQUENCE 1, FRAME 1: Messaging -->
              <div data-hwcseqframe="1-1" style="position: absolute; inset: 0; opacity: 0; transform: translateY(12px); visibility: hidden; transition: opacity 1s ease, transform 1s ease; font-family: Montserrat, sans-serif; display: flex; flex-direction: column;">
                <!-- Header bar -->
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: white; border-bottom: 1px solid #e8edf0;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7c85" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                  <p style="font-size: 14px; font-weight: 500; color: #063340; margin: 0;">North Shore Drywall &amp; Paint</p>
                  <span style="font-size: 12px; color: #4a6a75; font-family: 'Courier New', monospace; letter-spacing: 0.5px;">29:42</span>
                </div>

                <!-- Info bar -->
                <div style="background: #E1F5EE; padding: 8px 14px;">
                  <p style="font-size: 11px; font-weight: 500; color: #0F6E56; margin: 0; line-height: 1.4;">Pro has 30 min to respond or we move to your next pick</p>
                </div>

                <!-- Message thread -->
                <div class="hwc-msg-thread" style="flex: 1; padding: 12px 14px; overflow: hidden; display: flex; flex-direction: column; gap: 12px;">
                  <!-- Message 1: Contractor -->
                  <div class="hwc-msg-row hwc-msg-left" style="display: flex; justify-content: flex-start; opacity: 0;">
                    <div style="max-width: 85%;">
                      <p class="hwc-msg-label" style="font-size: 11px; color: #6b7c85; margin: 0 0 4px 0;">North Shore Drywall &amp; Paint</p>
                      <div class="hwc-msg-bubble hwc-msg-contractor" style="background: #ffffff; color: #063340; padding: 10px 12px; border-radius: 12px; font-size: 12px; line-height: 1.5;">
                        <span class="hwc-msg-text" data-fulltext="Hey — saw the photos of the ceiling. That's a straightforward patch and repaint, maybe 2 hours once it's dry."></span>
                      </div>
                    </div>
                  </div>

                  <!-- Message 2: Homeowner -->
                  <div class="hwc-msg-row hwc-msg-right" style="display: flex; justify-content: flex-end; opacity: 0;">
                    <div style="max-width: 85%;">
                      <div class="hwc-msg-bubble hwc-msg-homeowner" style="background: #00A385; color: #ffffff; padding: 10px 12px; border-radius: 12px; font-size: 12px; line-height: 1.5;">Great, anything else you need from me?</div>
                    </div>
                  </div>

                  <!-- Message 3: Contractor -->
                  <div class="hwc-msg-row hwc-msg-left" style="display: flex; justify-content: flex-start; opacity: 0;">
                    <div style="max-width: 85%;">
                      <p class="hwc-msg-label" style="font-size: 11px; color: #6b7c85; margin: 0 0 4px 0;">North Shore Drywall &amp; Paint</p>
                      <div class="hwc-msg-bubble hwc-msg-contractor" style="background: #ffffff; color: #063340; padding: 10px 12px; border-radius: 12px; font-size: 12px; line-height: 1.5;">
                        <span class="hwc-msg-text" data-fulltext="Nope — everything I need is in the Jackknife project. See you Monday the 26th at 3."></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
```

Note: Messages 1 and 3 use `data-fulltext` on a `<span>` — the typewriter function will read this and progressively reveal text. Message 2 has its text inline (instant pop-in, no typewriter).

- [ ] **Step 2: Verify element exists**

```javascript
document.querySelector('[data-hwcseqframe="1-1"]') !== null  // should be true
```

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add Phone Tag Frame 1 (Messaging) HTML"
```

---

### Task 6: Add Phone Tag Frame 2 HTML — Project Timeline

**Files:**
- Modify: `index.html` — insert after the Messaging frame (after `data-hwcseqframe="1-1"`)

- [ ] **Step 1: Insert Timeline frame HTML**

Insert after the closing `</div>` of `data-hwcseqframe="1-1"`:

```html
              <!-- SEQUENCE 1, FRAME 2: Project Timeline -->
              <div data-hwcseqframe="1-2" style="position: absolute; inset: 0; opacity: 0; transform: translateY(12px); visibility: hidden; transition: opacity 1s ease, transform 1s ease; font-family: Montserrat, sans-serif; display: flex; flex-direction: column;">
                <!-- Header bar -->
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: white; border-bottom: 1px solid #e8edf0;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7c85" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                  <p style="font-size: 14px; font-weight: 500; color: #063340; margin: 0;">Water Damage · Ceiling Repair</p>
                  <div style="width: 16px;"></div>
                </div>

                <!-- Stepper container -->
                <div class="hwc-stepper" style="position: relative; padding: 20px 14px 14px 46px; flex: 1; overflow: hidden;">
                  <!-- Teal vertical line -->
                  <div class="hwc-stepper-line" style="position: absolute; left: 23px; top: 30px; width: 2px; background: #00A385; height: 80px; transition: height 400ms ease-out;"></div>

                  <!-- Step 1: Issue Analyzed (completed) -->
                  <div class="hwc-stepper-step" style="position: relative; padding-bottom: 20px;">
                    <div class="hwc-stepper-circle completed" style="position: absolute; left: -32px; top: 0; width: 20px; height: 20px; border-radius: 50%; background: #00A385; display: flex; align-items: center; justify-content: center;">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <p style="font-size: 13px; font-weight: 600; color: #063340; margin: 0 0 2px 0;">Issue Analyzed &amp; Documented</p>
                    <p style="font-size: 12px; color: #4a6a75; margin: 0;">Wed, May 14, 2026 · 10 AM</p>
                  </div>

                  <!-- Step 2: Select Your Pro (completed) -->
                  <div class="hwc-stepper-step" style="position: relative; padding-bottom: 20px;">
                    <div class="hwc-stepper-circle completed" style="position: absolute; left: -32px; top: 0; width: 20px; height: 20px; border-radius: 50%; background: #00A385; display: flex; align-items: center; justify-content: center;">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <p style="font-size: 13px; font-weight: 600; color: #063340; margin: 0 0 2px 0;">Select Your Pro</p>
                    <p style="font-size: 12px; color: #00A385; margin: 0;">North Shore Drywall &amp; Paint</p>
                  </div>

                  <!-- Step 3: Service Date Confirmed (animates in) -->
                  <div class="hwc-stepper-step" style="position: relative; padding-bottom: 20px;">
                    <div class="hwc-stepper-circle hwc-step3-circle" style="position: absolute; left: -32px; top: 0; width: 20px; height: 20px; border-radius: 50%; background: #f5f7f8; border: 2px solid #d1d5db; display: flex; align-items: center; justify-content: center; transition: background 0.3s ease, border-color 0.3s ease;">
                      <svg class="hwc-step3-check" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0; transition: opacity 0.3s ease;"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <!-- Expandable card -->
                    <div class="hwc-confirm-card" style="background: #ffffff; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); border-left: 3px solid #00A385; overflow: hidden; max-height: 0; opacity: 0; transition: max-height 400ms ease-out, opacity 300ms ease, box-shadow 0.6s ease;">
                      <div style="padding: 12px;">
                        <p style="font-size: 13px; font-weight: 600; color: #063340; margin: 0 0 4px 0;">Service Date Confirmed</p>
                        <p class="hwc-confirm-date" style="font-size: 13px; color: #a0aeb5; margin: 0 0 4px 0; transition: color 0.4s ease;">Mon, May 26, 2026 · 3 PM</p>
                        <p style="font-size: 12px; color: #4a6a75; margin: 0 0 10px 0; line-height: 1.4;">Your appointment is confirmed for the selected date and time.</p>
                        <div style="background: #00A385; color: white; border-radius: 200px; padding: 8px; text-align: center; font-family: Montserrat, sans-serif; font-weight: 600; font-size: 12px;">Reschedule</div>
                      </div>
                    </div>
                  </div>

                  <!-- Step 4: Confirm Completion (future) -->
                  <div class="hwc-stepper-step" style="position: relative; padding-bottom: 20px;">
                    <div class="hwc-stepper-circle future" style="position: absolute; left: -32px; top: 0; width: 20px; height: 20px; border-radius: 50%; background: #e0e5e8;"></div>
                    <p style="font-size: 13px; font-weight: 500; color: #a0aeb5; margin: 0;">Confirm Completion</p>
                  </div>

                  <!-- Step 5: Rate Your Pro (future) -->
                  <div class="hwc-stepper-step" style="position: relative; padding-bottom: 0;">
                    <div class="hwc-stepper-circle future" style="position: absolute; left: -32px; top: 0; width: 20px; height: 20px; border-radius: 50%; background: #e0e5e8;"></div>
                    <p style="font-size: 13px; font-weight: 500; color: #a0aeb5; margin: 0;">Rate Your Pro</p>
                  </div>
                </div>
              </div>
```

- [ ] **Step 2: Verify element exists**

```javascript
document.querySelector('[data-hwcseqframe="1-2"]') !== null  // should be true
```

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add Phone Tag Frame 2 (Project Timeline) HTML"
```

---

### Task 7: Add new CSS for messaging, typewriter, CTA pulse, and confirm glow

**Files:**
- Modify: `index.html` — the `<style>` block after the section (lines ~2195-2235)

- [ ] **Step 1: Add new CSS rules**

Insert before the closing `</style>` tag of the HWC CSS block (before line ~2235):

```css
    /* Typewriter cursor */
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

    /* CTA pulse */
    @keyframes hwcCtaPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.03); }
    }

    /* Confirm card glow */
    @keyframes hwcConfirmGlow {
      0% { box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
      50% { box-shadow: 0 1px 4px rgba(0,0,0,0.06), 0 0 12px rgba(0,163,133,0.3); }
      100% { box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
    }

    /* Detail text crossfade positioning */
    .hwc-detail-container { position: relative; }
```

- [ ] **Step 2: Update reduced motion rules**

Expand the existing `@media (prefers-reduced-motion: reduce)` block to cover new elements:

```css
    @media (prefers-reduced-motion: reduce) {
      [data-hwcseqframe], .hwc-diagnosis, .hwc-best-match,
      .hwc-second-card, .hwc-title, .hwc-dot,
      .hwc-cursor, .hwc-msg-bubble, .hwc-stepper-circle,
      .hwc-confirm-card, .hwc-pt-cta, .hwc-pt-check,
      .hwc-pt-second, .hwc-stepper-line, .hwc-detail-text {
        transition: none !important;
        animation: none !important;
      }
    }
```

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add CSS for typewriter cursor, CTA pulse, confirm glow animations"
```

---

### Task 8: Rewrite JS controller — sequence-based architecture

**Files:**
- Modify: `index.html` — replace the entire `<script>` block for HWC (lines ~2238-2400)

This is the largest task. The entire IIFE is replaced with the new sequence-based controller.

- [ ] **Step 1: Replace the HWC JS controller**

Replace the entire `<script>` block (from `<!-- Hire With Confidence JS Controller -->` through the closing `</script>`) with:

```html
  <!-- Hire With Confidence JS Controller -->
  <script>
  (function() {
    var section = document.getElementById('hire-with-confidence');
    if (!section) return;

    // === DOM refs ===
    var allFrames = section.querySelectorAll('[data-hwcseqframe]');
    var titles = section.querySelectorAll('[data-hwcseqtitle]');
    var details = section.querySelectorAll('[data-hwcseqdetail]');
    var dots = section.querySelectorAll('[data-hwcseqdot]');

    // Seq 0 refs
    var shimmer = section.querySelector('.hwc-shimmer');
    var shimmerLine = section.querySelector('.hwc-shimmer-line');
    var diagnosis = section.querySelector('.hwc-diagnosis');
    var bestMatch = section.querySelector('.hwc-best-match');
    var secondCard = section.querySelector('.hwc-second-card');

    // Seq 1, Frame 0 refs
    var ptBestMatch = section.querySelector('.hwc-pt-bestmatch');
    var ptCta = section.querySelector('.hwc-pt-cta');
    var ptCheck = section.querySelector('.hwc-pt-check');
    var ptSecond = section.querySelector('.hwc-pt-second');

    // Seq 1, Frame 1 refs
    var msgThread = section.querySelector('.hwc-msg-thread');
    var msgRows = msgThread ? msgThread.querySelectorAll('.hwc-msg-row') : [];

    // Seq 1, Frame 2 refs
    var stepperLine = section.querySelector('.hwc-stepper-line');
    var confirmCard = section.querySelector('.hwc-confirm-card');
    var confirmDate = section.querySelector('.hwc-confirm-date');
    var step3Circle = section.querySelector('.hwc-step3-circle');
    var step3Check = section.querySelector('.hwc-step3-check');

    // === Constants ===
    var CROSSFADE = 1000;
    var SEQ_CONFIG = [
      { frames: ['0-0', '0-1'], holds: [4000, 4000] },
      { frames: ['1-0', '1-1', '1-2'], holds: [3000, 10000, 5000] },
      // Seq 2 placeholder: skipped
    ];
    var NUM_SEQS = SEQ_CONFIG.length;

    // === State ===
    var currentSeq = 0;
    var currentFrame = 0;
    var paused = false;
    var allTimers = [];
    var typewriterInterval = null;

    // === Timer management ===
    function clearAllTimers() {
      allTimers.forEach(function(t) { clearTimeout(t); });
      allTimers = [];
      if (typewriterInterval) { clearInterval(typewriterInterval); typewriterInterval = null; }
    }

    function addTimer(fn, delay) {
      var t = setTimeout(fn, delay);
      allTimers.push(t);
      return t;
    }

    // === Frame visibility ===
    function showFrameEl(frameId) {
      allFrames.forEach(function(f) {
        var id = f.getAttribute('data-hwcseqframe');
        if (id === frameId) {
          f.style.visibility = 'visible';
          f.style.opacity = '1';
          f.style.transform = 'translateY(0)';
        } else {
          f.style.opacity = '0';
          f.style.transform = 'translateY(12px)';
          (function(el) {
            addTimer(function() {
              if (el.style.opacity === '0') el.style.visibility = 'hidden';
            }, CROSSFADE);
          })(f);
        }
      });
    }

    // === Sequence-level UI ===
    function updateSeqUI(seqIdx) {
      titles.forEach(function(t, j) {
        t.style.opacity = j === seqIdx ? '1' : '0';
      });
      details.forEach(function(d, j) {
        d.style.opacity = j === seqIdx ? '1' : '0';
      });
      dots.forEach(function(d, j) {
        d.style.background = j === seqIdx ? '#00A385' : '#d1d5db';
      });
    }

    // === Typewriter utility ===
    function typewrite(textSpan, text, speed, onDone) {
      textSpan.textContent = '';
      var cursor = document.createElement('span');
      cursor.className = 'hwc-cursor';
      textSpan.parentNode.appendChild(cursor);

      var i = 0;
      typewriterInterval = setInterval(function() {
        if (i < text.length) {
          textSpan.textContent = text.substring(0, i + 1);
          i++;
        } else {
          clearInterval(typewriterInterval);
          typewriterInterval = null;
          if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
          if (onDone) onDone();
        }
      }, speed);
    }

    // === Reset functions ===
    function resetSeq0() {
      if (diagnosis) diagnosis.classList.remove('hwc-visible');
      if (bestMatch) { bestMatch.classList.remove('hwc-visible', 'hwc-glow'); }
      if (secondCard) secondCard.classList.remove('hwc-visible');
      if (shimmer) {
        shimmer.classList.remove('hwc-shimmer-active');
        if (shimmerLine) { shimmerLine.style.transition = 'none'; shimmerLine.style.top = '-50px'; }
      }
    }

    function resetSeq1Frame0() {
      if (ptCta) { ptCta.style.transform = ''; ptCta.style.filter = ''; ptCta.style.animation = ''; }
      if (ptBestMatch) { ptBestMatch.style.transform = ''; ptBestMatch.style.boxShadow = ''; }
      if (ptCheck) ptCheck.style.opacity = '0';
      if (ptSecond) { ptSecond.style.opacity = '1'; ptSecond.style.transform = 'translateY(0)'; }
    }

    function resetSeq1Frame1() {
      if (typewriterInterval) { clearInterval(typewriterInterval); typewriterInterval = null; }
      msgRows.forEach(function(row) { row.style.opacity = '0'; });
      // Reset typewriter text spans
      var textSpans = section.querySelectorAll('.hwc-msg-text');
      textSpans.forEach(function(s) { s.textContent = ''; });
      // Remove any leftover cursors
      var cursors = section.querySelectorAll('.hwc-cursor');
      cursors.forEach(function(c) { if (c.parentNode) c.parentNode.removeChild(c); });
    }

    function resetSeq1Frame2() {
      if (confirmCard) { confirmCard.style.maxHeight = '0'; confirmCard.style.opacity = '0'; confirmCard.style.boxShadow = ''; }
      if (confirmDate) confirmDate.style.color = '#a0aeb5';
      if (step3Circle) { step3Circle.style.background = '#f5f7f8'; step3Circle.style.borderColor = '#d1d5db'; }
      if (step3Check) step3Check.style.opacity = '0';
      if (stepperLine) stepperLine.style.height = '80px';
    }

    // === Frame animation functions ===

    // Seq 0, Frame 0: Trusted Pros + shimmer
    function animSeq0Frame0(onDone) {
      resetSeq0();
      // Trigger shimmer after 1s
      addTimer(function() {
        if (shimmer && shimmerLine) {
          void shimmerLine.offsetHeight;
          shimmerLine.style.transition = '';
          shimmer.classList.add('hwc-shimmer-active');
        }
      }, 1000);
      // Clean up shimmer
      addTimer(function() {
        if (shimmer) shimmer.classList.remove('hwc-shimmer-active');
      }, 3200);
      // Advance
      if (!paused) addTimer(onDone, SEQ_CONFIG[0].holds[0]);
    }

    // Seq 0, Frame 1: Smart Match reveals
    function animSeq0Frame1(onDone) {
      // Staggered reveals
      addTimer(function() { if (diagnosis) diagnosis.classList.add('hwc-visible'); }, 100);
      addTimer(function() {
        if (bestMatch) bestMatch.classList.add('hwc-visible');
        addTimer(function() { if (bestMatch) bestMatch.classList.add('hwc-glow'); }, 300);
      }, 900);
      addTimer(function() { if (secondCard) secondCard.classList.add('hwc-visible'); }, 1500);
      // Advance
      if (!paused) addTimer(onDone, SEQ_CONFIG[0].holds[1]);
    }

    // Seq 1, Frame 0: Contractor Selected
    function animSeq1Frame0(onDone) {
      resetSeq1Frame0();
      // CTA pulse at +1s
      addTimer(function() {
        if (ptCta) ptCta.style.animation = 'hwcCtaPulse 400ms ease';
        addTimer(function() { if (ptCta) ptCta.style.animation = ''; }, 400);
      }, 1000);
      // CTA tap at +1.5s
      addTimer(function() {
        if (ptCta) { ptCta.style.transform = 'scale(0.96)'; ptCta.style.filter = 'brightness(0.9)'; }
        if (ptBestMatch) { ptBestMatch.style.transform = 'translateY(-2px)'; ptBestMatch.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)'; }
        if (ptSecond) { ptSecond.style.opacity = '0'; ptSecond.style.transform = 'translateY(8px)'; }
        // Release CTA tap
        addTimer(function() {
          if (ptCta) { ptCta.style.transform = ''; ptCta.style.filter = ''; }
        }, 150);
      }, 1500);
      // Checkmark at +2s
      addTimer(function() {
        if (ptCheck) ptCheck.style.opacity = '1';
      }, 2000);
      // Advance
      if (!paused) addTimer(onDone, SEQ_CONFIG[1].holds[0]);
    }

    // Seq 1, Frame 1: Messaging with typewriter
    function animSeq1Frame1(onDone) {
      resetSeq1Frame1();
      var msg1 = msgRows[0];
      var msg2 = msgRows[1];
      var msg3 = msgRows[2];
      var text1 = msg1 ? msg1.querySelector('.hwc-msg-text') : null;
      var text3 = msg3 ? msg3.querySelector('.hwc-msg-text') : null;
      var fullText1 = text1 ? text1.getAttribute('data-fulltext') : '';
      var fullText3 = text3 ? text3.getAttribute('data-fulltext') : '';

      // +800ms: Show msg1 container, start typewriter
      addTimer(function() {
        if (msg1) msg1.style.opacity = '1';
        if (text1) {
          addTimer(function() {
            typewrite(text1, fullText1, 40, function() {
              // +1200ms hold after typing
              addTimer(function() {
                // Show msg2 (instant pop-in)
                if (msg2) {
                  msg2.style.opacity = '1';
                  msg2.style.transition = 'opacity 200ms ease';
                }
                // +1400ms hold, then msg3
                addTimer(function() {
                  if (msg3) msg3.style.opacity = '1';
                  if (text3) {
                    addTimer(function() {
                      typewrite(text3, fullText3, 40, null);
                    }, 200);
                  }
                }, 1400);
              }, 1200);
            });
          }, 200);
        }
      }, 800);

      // Advance at hold time
      if (!paused) addTimer(onDone, SEQ_CONFIG[1].holds[1]);
    }

    // Seq 1, Frame 2: Project Timeline
    function animSeq1Frame2(onDone) {
      resetSeq1Frame2();
      // +500ms: expand card
      addTimer(function() {
        if (confirmCard) { confirmCard.style.maxHeight = '200px'; confirmCard.style.opacity = '1'; }
        if (stepperLine) stepperLine.style.height = '180px';
      }, 500);
      // +900ms: glow + date color
      addTimer(function() {
        if (confirmCard) confirmCard.style.animation = 'hwcConfirmGlow 600ms ease';
        if (confirmDate) confirmDate.style.color = '#00A385';
        addTimer(function() { if (confirmCard) confirmCard.style.animation = ''; }, 600);
      }, 900);
      // +1500ms: checkmark
      addTimer(function() {
        if (step3Circle) { step3Circle.style.background = '#00A385'; step3Circle.style.borderColor = '#00A385'; }
        if (step3Check) step3Check.style.opacity = '1';
      }, 1500);
      // Advance
      if (!paused) addTimer(onDone, SEQ_CONFIG[1].holds[2]);
    }

    // === Animation function lookup ===
    var ANIM_FNS = {
      '0-0': animSeq0Frame0,
      '0-1': animSeq0Frame1,
      '1-0': animSeq1Frame0,
      '1-1': animSeq1Frame1,
      '1-2': animSeq1Frame2,
    };

    // === Main playback ===
    function playSequence(seqIdx) {
      if (seqIdx >= NUM_SEQS) seqIdx = 0;
      currentSeq = seqIdx;
      currentFrame = 0;
      updateSeqUI(seqIdx);
      playFrame(seqIdx, 0);
    }

    function playFrame(seqIdx, frameIdx) {
      clearAllTimers();
      currentSeq = seqIdx;
      currentFrame = frameIdx;

      var config = SEQ_CONFIG[seqIdx];
      var frameId = config.frames[frameIdx];
      showFrameEl(frameId);

      var animFn = ANIM_FNS[frameId];
      if (animFn) {
        animFn(function() {
          if (paused) return;
          var nextFrame = frameIdx + 1;
          if (nextFrame < config.frames.length) {
            playFrame(seqIdx, nextFrame);
          } else {
            playSequence((seqIdx + 1) % NUM_SEQS);
          }
        });
      }
    }

    // === Dot click handlers ===
    dots.forEach(function(d) {
      d.addEventListener('click', function(e) {
        e.stopPropagation();
        var target = parseInt(d.getAttribute('data-hwcseqdot'));
        if (target !== currentSeq) {
          // Reset all sequence states
          resetSeq0();
          resetSeq1Frame0();
          resetSeq1Frame1();
          resetSeq1Frame2();
          playSequence(target);
        }
      });
    });

    // === Hover pause/resume ===
    section.addEventListener('mouseenter', function() {
      paused = true;
      clearAllTimers();
    });
    section.addEventListener('mouseleave', function() {
      paused = false;
      var config = SEQ_CONFIG[currentSeq];
      var remaining = config.holds[currentFrame];
      addTimer(function() {
        var nextFrame = currentFrame + 1;
        if (nextFrame < config.frames.length) {
          playFrame(currentSeq, nextFrame);
        } else {
          playSequence((currentSeq + 1) % NUM_SEQS);
        }
      }, remaining);
    });

    // === Reduced motion ===
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Show timeline frame static
      resetSeq1Frame2();
      showFrameEl('1-2');
      updateSeqUI(1);
      // Expand card immediately
      if (confirmCard) { confirmCard.style.maxHeight = '200px'; confirmCard.style.opacity = '1'; }
      if (confirmDate) confirmDate.style.color = '#00A385';
      if (step3Circle) { step3Circle.style.background = '#00A385'; step3Circle.style.borderColor = '#00A385'; }
      if (step3Check) step3Check.style.opacity = '1';
      if (stepperLine) stepperLine.style.height = '180px';
      paused = true;
      return;
    }

    // === IntersectionObserver ===
    var started = false;
    var obs = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting && !started) {
        started = true;
        playSequence(0);
      }
    }, { threshold: 0.3 });
    obs.observe(section);
  })();
  </script>
```

- [ ] **Step 2: Verify full animation loop in browser**

Reload preview. Scroll to Hire With Confidence. Verify the complete sequence:

1. Dot 1 active (teal). "Real jobs. Real neighbors." headline.
2. Frame 0-0: Trusted Pros cards visible. Shimmer sweeps at +1s.
3. Crossfade to Frame 0-1: Smart Match. Diagnosis reveals, Best Match glows.
4. Auto-advance to Dot 2. "No more phone tag." headline.
5. Frame 1-0: Contractor Selected. CTA pulses, taps. Second card fades. Checkmark appears.
6. Frame 1-1: Messaging. Typewriter types contractor message. Homeowner pops in. Second contractor message types.
7. Frame 1-2: Timeline. Card expands, glows, date turns teal, checkmark fills.
8. Loops back to Dot 1.

Check for: no console errors, no layout overflow, dots reflect correct sequence.

- [ ] **Step 3: Test hover pause**

Hover over section during animation. Confirm all animation pauses. Move mouse away. Confirm animation resumes.

- [ ] **Step 4: Test dot clicks**

Click Dot 2 while Dot 1 is playing. Confirm immediate jump to Sequence 1, Frame 0.
Click Dot 1 while Dot 2 is playing. Confirm immediate jump to Sequence 0, Frame 0.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: rewrite HWC controller to sequence-based architecture with Phone Tag animation"
```

---

### Task 9: Mobile verification and polish

**Files:**
- Modify: `index.html` — may need minor CSS tweaks

- [ ] **Step 1: Test at 375px width**

Resize preview to mobile (375px). Verify:
- Phone centered
- Detail text hidden
- Headlines centered
- No horizontal overflow
- Messaging frame text fits within phone (no truncation)
- Timeline stepper fits (no overflow)

- [ ] **Step 2: Test at 768px width**

Resize to tablet. Verify layout transitions cleanly from two-column to single-column.

- [ ] **Step 3: Fix any overflow or layout issues**

If messaging text is too long for 280px phone width, adjust font-size or max-width constraints.
If timeline stepper overflows, reduce padding or font-size.

- [ ] **Step 4: Commit (if changes needed)**

```bash
git add index.html
git commit -m "fix: mobile layout adjustments for Phone Tag animation"
```

---

### Task 10: Final verification and regression check

- [ ] **Step 1: Full page regression**

Scroll through entire page top to bottom. Verify:
- Hero animation unchanged and working
- Carousel ("From panic to plan") unchanged and working
- Hire With Confidence section plays full loop
- Save Money section unchanged
- No visual regressions anywhere

- [ ] **Step 2: Console check**

Open browser console. Confirm zero errors or warnings related to HWC section.

- [ ] **Step 3: Orphan check**

Search codebase for old attribute names that should no longer exist:
- `data-hwcframe=` (should be `data-hwcseqframe=` now)
- `data-hwctitle=` (should be `data-hwcseqtitle=` now)
- `data-hwcdot=` (should be `data-hwcseqdot=` now)

```bash
grep -n 'data-hwcframe=' index.html
grep -n 'data-hwctitle=' index.html
grep -n 'data-hwcdot=' index.html
```

All three should return zero results.

- [ ] **Step 4: Acceptance criteria checklist**

Run through spec acceptance criteria 1-15. Mark each as pass/fail. Fix any failures.

- [ ] **Step 5: Final commit**

```bash
git add index.html
git commit -m "feat: complete No More Phone Tag animation — verified"
```
