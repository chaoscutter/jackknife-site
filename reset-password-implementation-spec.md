# Reset Password Screen — Complete Implementation Spec & Handoff

**Project:** Jackknife Homeowner app
**Screen:** Reset Password — "link sent" confirmation state
**Target repo:** `chaoscutter/jackknife-ui` (front end for the photo-first home management platform)
**Author of this spec:** prepared in `chaoscutter/jackknife-site`, branch `claude/jackknife-homeowner-screen-review-h8saoe`
**Visual reference:** `reset-password-mockup.html` + `reset-password-mockup.png` (same branch/repo as this file)
**Status:** Ready to implement

> **Read this first.** This document is self-contained. It tells you (1) how to start a fresh Claude Code session against the correct repo, (2) how to locate the exact screen, (3) the brand/design tokens, (4) every change down to the pixel, (5) recommended enhancements beyond the four core fixes, (6) accessibility targets with computed contrast ratios, (7) acceptance criteria + test plan, and (8) the full mockup source in the appendix. Hand the whole file to the new session.

---

## 0. TL;DR — the four core changes

| # | Element | Problem today | Target |
|---|---------|---------------|--------|
| 1 | Recipient email | Address clips at the card's right edge (`…gmail.com` cut off) | Wraps cleanly, full address always visible |
| 2 | "Resend Email" button | Outlined/ghost — reads as secondary, but it's the main action | Filled solid `#00A385`, white text |
| 3 | Back button (top-left) | Faint gray chevron on dark gradient — low contrast, small | Solid white circle, dark-teal chevron, ≥44×44pt, labeled |
| 4 | Brand icon (top of card) | Small, left-aligned | Centered above headline, larger (≈84px badge / 46px glyph) |

Plus recommended enhancements in §6 (resend cooldown, success toast, "Open email app", wrong-email escape hatch, a11y).

---

## 1. Start a new Claude Code session on the right codebase

This spec lives in the **marketing-site** repo (`jackknife-site`). The screen you're changing is in a **different** repo. A Claude Code session is locked to whatever repo/environment it was created against, so you must start a session that targets the app repo.

### 1a. Confirm the repo
The Jackknife org (`chaoscutter`) has four repos:

| Repo | Role | Notes |
|------|------|-------|
| `jackknife-site` | Marketing website | HTML only — **not** the app |
| **`jackknife-ui`** | **App front end** | *"front-end for Jackknife's photo-first home management platform"* — start here |
| `jackknife-home-helper-ai` | TypeScript service | Fallback if the screen isn't in `jackknife-ui` |
| `jackknifeinternal` | MVP prototypes / UX flows (Python) | Unlikely to hold the production screen |

**Primary target: `chaoscutter/jackknife-ui`.** If the screen isn't there, fall back to `jackknife-home-helper-ai`.

### 1b. Open a session (pick one)

**Claude Code on the web** (`claude.ai/code`)
1. Create a new environment/session and select the source repo **`chaoscutter/jackknife-ui`**.
2. Choose a network policy that allows package installs if the project needs `npm install` for a dev server/preview.
3. Ensure your GitHub is connected (the repo is private; you own the org, so access is automatic once connected).

**Claude Code desktop / CLI (local)**
```bash
git clone https://github.com/chaoscutter/jackknife-ui.git
cd jackknife-ui
git checkout -b feature/reset-password-polish
claude            # launch Claude Code in this repo
```

**Branch convention:** create a dedicated feature branch, e.g. `feature/reset-password-polish` (or match whatever the repo already uses — check `git branch -a` and existing PR names).

### 1c. First prompt to paste into the new session
> Read the attached implementation spec (`reset-password-implementation-spec.md`) and the screenshot. Then locate the Reset Password "link sent" confirmation screen in this repo and implement the four core changes plus any §6 enhancements I approve. Show me the diff before committing.

Attach: this MD file + the screenshot + (optionally) `reset-password-mockup.html`.

---

## 2. Locate the screen in the codebase

Run these searches in the app repo (the session can use Grep/ripgrep):

```bash
# Copy strings that are very likely unique to this screen
rg -n "Resend Email"
rg -n "password reset link has been sent"
rg -n "Back to Login"
rg -n "Reset password"
rg -ni "didn.t (get|receive) the email"
```

Likely file/folder patterns to expect (depending on stack):
- **React / React Native:** `src/screens/**`, `src/components/**`, `app/**`, files like `ResetPassword*.tsx`, `ForgotPassword*`, `*Confirm*`, `*EmailSent*`.
- **Routing:** look for an auth flow group — `auth/`, `(auth)/`, `onboarding/`, or a navigator that registers `ResetPassword`/`ForgotPassword`.
- **Styles:** co-located `*.styles.ts`, a `theme/`/`tokens/` dir, `tailwind.config.*`, or a design-system package.

**Detect the stack before editing** (this determines syntax — CSS/Tailwind vs React Native `StyleSheet`):
```bash
cat package.json | rg -i "react-native|expo|next|vite|react-dom|nativewind|tailwind|styled-components"
ls tailwind.config.* 2>/dev/null
```
- If you see `react-native`/`expo` → it's **React Native** (use §5b RN snippets, units are unitless density-independent points, no `px`).
- If you see `react-dom`/`next`/`vite` (+ maybe `tailwind`) → it's **React web** (use §5a CSS/Tailwind snippets).

---

## 3. Brand & design tokens

Pulled from the live Jackknife design system (`jackknife-site/demo.html`). **Reuse the app's existing tokens if they exist** — only fall back to these literals if there's no token.

```jsonc
{
  "color": {
    "primary":        "#00A385",   // Jackknife green — CTAs, accents, check icon
    "primaryPressed": "#00876E",   // suggested darker shade for pressed + AA text (see §7)
    "teal":           "#063340",    // darkest brand teal — headlines, chevrons, bg top
    "teal2":          "#0a3d4c",    // gradient mid
    "teal3":          "#0d4a55",    // gradient bottom (with green glow)
    "surface":        "#f0f8fa",    // light tinted panel (confirmation block)
    "ink":            "#111827",    // primary text
    "inkBody":        "#374151",    // body text inside panels
    "muted":          "#6b7280",    // helper/secondary text
    "white":          "#ffffff"
  },
  "font": {
    "headline": "Montserrat",       // weights 600/700/800
    "body":     "Inter",            // 400/500/600
    "label":    "Poppins"           // 500/600/700 — buttons
  },
  "radius": { "card": 28, "panel": 16, "button": 14, "iconBadge": 22 },
  "shadow": {
    "card":   "0 -10px 40px rgba(0,0,0,0.18)",
    "button": "0 8px 20px rgba(0,163,133,0.32)",
    "back":   "0 4px 14px rgba(0,0,0,0.18)"
  }
}
```

**Background gradient** (the dark teal → green-glow behind the card):
```css
background:
  radial-gradient(120% 90% at 90% 110%, rgba(0,163,133,.55) 0%, rgba(0,163,133,0) 55%),
  linear-gradient(165deg,#063340 0%,#0a3d4c 60%,#0d4a55 100%);
```

---

## 4. Current-state analysis (per element)

Reference the screenshot. From top to bottom:

1. **Status bar** — OS chrome, not ours. Ignore.
2. **Back button** — gray chevron inside a barely-darker gray circle, sitting on the dark teal. Contrast of glyph vs circle and circle vs background are both low; the control is easy to miss and the hit area looks ~40px. *(Fix #3)*
3. **Card** — white, rounded top corners, anchored to the bottom ~⅔ of the screen. Layout is fine; radii/shadow can be standardized to tokens.
4. **Brand icon** — small jackknife glyph, top-left inside the card padding. Low prominence; competes awkwardly with the headline. *(Fix #4)*
5. **Headline "Reset password"** — left-aligned, large, dark teal. Good; ensure it uses Montserrat 800.
6. **Confirmation panel** — light tinted block, green check + message. **The email `ryan.michael.mccarthy@gmail.com` runs into the right edge and the trailing `.com` is clipped.** This is a real layout bug, not cosmetic. *(Fix #1)*
7. **Helper text** — "Didn't receive the email? Check your spam folder or try resending." Centered gray. Slightly redundant with the button; can tighten copy.
8. **"Resend Email"** — outlined button (white fill, green border, green text). It's the screen's primary action but styled as secondary. *(Fix #2)*
9. **"Ready to log in? Back to Login"** — left-aligned, underlined link. Fine.

---

## 5. The four core changes — exact spec

Target values below are the canonical numbers; the mockup (`reset-password-mockup.html`, full source in Appendix A) renders exactly these.

### Change 1 — Email must not clip

**Intent:** the full recipient address is always legible, regardless of length, on the narrowest supported device.

**Spec:**
- The email is an inline emphasized span inside the confirmation sentence (keep it bold, color `#063340`).
- Allow breaking inside the token so long addresses wrap instead of overflowing.
- The confirmation panel must never horizontally scroll or clip text.

**React web / CSS:**
```css
.confirm__email {
  font-weight: 700;
  color: #063340;
  overflow-wrap: anywhere;   /* break long unbroken strings */
  word-break: break-word;    /* legacy fallback */
}
.confirm__text { min-width: 0; }   /* if inside a flex row, prevents overflow */
```

**React Native:** RN `<Text>` wraps by default; the bug is usually a parent with a fixed width or `numberOfLines`, or a row without `flex:1`/`flexShrink:1` on the text container.
```tsx
<View style={{ flexDirection: 'row', gap: 13 }}>
  <CheckIcon />
  <Text style={{ flex: 1 }}>            {/* flex:1 lets it wrap */}
    A password reset link has been sent to{' '}
    <Text style={{ fontWeight: '700', color: '#063340' }}>{email}</Text>.
    {' '}Check your inbox and follow the link to set a new password.
  </Text>
</View>
```
Remove any `numberOfLines` / `ellipsizeMode` on this text. Ensure no ancestor sets a hard `width`.

**Acceptance:** On a 320pt-wide device, the entire address renders with zero clipping and the panel height grows to fit.

---

### Change 2 — "Resend Email" becomes a filled primary button

**Intent:** the primary action is unmistakable and matches brand CTA styling.

**Target spec:**
| Property | Value |
|----------|-------|
| Background | `#00A385` (pressed: `#00876E`) |
| Text color | `#ffffff` |
| Font | Poppins 600, 17px |
| Padding | 17px vertical (full-width block) |
| Border radius | 14px |
| Width | 100% of card content width |
| Shadow | `0 8px 20px rgba(0,163,133,0.32)` |
| Border | none |
| Min height | 48px (touch target) |
| States | default / pressed (`#00876E`) / disabled (see §6.1) / loading |

**React web:**
```tsx
<button className="btn-primary" onClick={onResend} disabled={cooldown > 0}>
  {cooldown > 0 ? `Resend available in ${cooldown}s` : 'Resend Email'}
</button>
```
```css
.btn-primary{
  display:block; width:100%; border:none; cursor:pointer;
  background:#00A385; color:#fff;
  font-family:Poppins,sans-serif; font-weight:600; font-size:17px;
  padding:17px; border-radius:14px; min-height:48px;
  box-shadow:0 8px 20px rgba(0,163,133,.32);
}
.btn-primary:active{ background:#00876E; }
.btn-primary:disabled{ opacity:.55; box-shadow:none; cursor:default; }
```

**React Native:**
```tsx
<Pressable
  onPress={onResend}
  disabled={cooldown > 0}
  style={({ pressed }) => [styles.btnPrimary, pressed && styles.btnPrimaryPressed, cooldown > 0 && styles.btnDisabled]}
>
  <Text style={styles.btnPrimaryText}>
    {cooldown > 0 ? `Resend available in ${cooldown}s` : 'Resend Email'}
  </Text>
</Pressable>
```
```ts
const styles = StyleSheet.create({
  btnPrimary: {
    backgroundColor: '#00A385', borderRadius: 14, paddingVertical: 17,
    alignItems: 'center', minHeight: 48, justifyContent: 'center',
    shadowColor: '#00A385', shadowOpacity: 0.32, shadowRadius: 20, shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  btnPrimaryPressed: { backgroundColor: '#00876E' },
  btnDisabled: { opacity: 0.55, elevation: 0, shadowOpacity: 0 },
  btnPrimaryText: { color: '#fff', fontFamily: 'Poppins-SemiBold', fontSize: 17, fontWeight: '600' },
});
```

**Acceptance:** button is solid green with white text, visually the dominant action; "Back to Login" remains a plain text link below it.

---

### Change 3 — High-contrast back button with proper tap target

**Target spec:**
| Property | Value |
|----------|-------|
| Shape | Circle |
| Size | 48×48 (≥44 minimum hit area) |
| Background | `rgba(255,255,255,0.92)` (solid white reads cleanest on the dark gradient) |
| Shadow | `0 4px 14px rgba(0,0,0,0.18)` |
| Glyph | Chevron-left, stroke `#063340`, stroke-width 2.5, ~22×22 |
| Position | Top-left, inset ~22px from left, below the status bar/safe area |
| A11y | `aria-label="Go back"` (web) / `accessibilityRole="button"` + `accessibilityLabel="Go back"` (RN) |

**React web:**
```tsx
<button className="back" aria-label="Go back" onClick={goBack}>
  <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#063340" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
</button>
```
```css
.back{
  width:48px;height:48px;border-radius:50%;border:none;cursor:pointer;
  background:rgba(255,255,255,.92);
  box-shadow:0 4px 14px rgba(0,0,0,.18);
  display:flex;align-items:center;justify-content:center;
}
.back svg{width:22px;height:22px;}
```

**React Native:**
```tsx
<Pressable onPress={goBack} accessibilityRole="button" accessibilityLabel="Go back"
  hitSlop={8} style={styles.back}>
  <ChevronLeft width={22} height={22} stroke="#063340" strokeWidth={2.5} />
</Pressable>
```
```ts
back: {
  width: 48, height: 48, borderRadius: 24,
  backgroundColor: 'rgba(255,255,255,0.92)',
  alignItems: 'center', justifyContent: 'center',
  shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 14, shadowOffset: { width: 0, height: 4 }, elevation: 3,
}
```
Wrap the screen in `SafeAreaView` (RN) so the button clears the notch.

**Acceptance:** the back affordance is obvious at a glance; glyph-on-circle and circle-on-background both clearly exceed 3:1; hit area ≥44pt; screen reader announces "Go back, button".

---

### Change 4 — Brand icon centered and larger

**Target spec:**
| Property | Value |
|----------|-------|
| Container (badge) | 84×84, border-radius 22, centered (`margin: 0 auto 22px`) |
| Badge fill | subtle green wash: `radial-gradient(circle at 30% 25%, rgba(0,163,133,.16), rgba(0,163,133,.07))` (RN: flat `rgba(0,163,133,0.10)`) |
| Glyph size | ~46×46 |
| Glyph color | brand teal `#063340` blades + `#00A385` accents (match existing app logo asset if one exists) |
| Position | Centered, directly above the headline, top of card content |

> **Prefer the real asset.** If the app already ships a Jackknife logo/mark component or SVG, use that asset centered at ~46px inside the 84px badge instead of re-drawing the glyph. The Appendix glyph is only a stand-in.

**React web:**
```tsx
<div className="brandmark"><JackknifeMark width={46} height={46} /></div>
```
```css
.brandmark{
  width:84px;height:84px;border-radius:22px;margin:0 auto 22px;
  display:flex;align-items:center;justify-content:center;
  background:radial-gradient(circle at 30% 25%,rgba(0,163,133,.16),rgba(0,163,133,.07));
}
```

**React Native:**
```tsx
<View style={styles.brandmark}><JackknifeMark width={46} height={46} /></View>
```
```ts
brandmark: {
  width: 84, height: 84, borderRadius: 22, alignSelf: 'center', marginBottom: 22,
  alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,163,133,0.10)',
}
```

**Decision needed:** the headline — keep it left-aligned (current) or center it to match the now-centered icon? **Recommendation: center the headline too** for a cleaner symmetric stack (the mockup centers it). Confirm with the requester if unsure.

**Acceptance:** icon is horizontally centered, noticeably larger than today, with clear breathing room above the headline.

---

## 6. Recommended enhancements (beyond the four)

These were flagged in review and materially improve the screen. Get sign-off before building, but they're spec'd and ready.

### 6.1 Resend cooldown + loading state
Prevent duplicate sends and dead-air taps.
- On tap: set button to **loading** (spinner / disabled) while the request is in flight.
- On success: start a **30s countdown**; button label → `Resend available in 30s`, disabled, ticking down each second; re-enable at 0 → label back to `Resend Email`.
- Persist/clear the timer on unmount; don't leak intervals.
```tsx
const [cooldown, setCooldown] = useState(0);
useEffect(() => {
  if (cooldown <= 0) return;
  const id = setInterval(() => setCooldown(c => c - 1), 1000);
  return () => clearInterval(id);
}, [cooldown]);
async function onResend() {
  await api.resendResetEmail(email);
  setCooldown(30);
  showToast('Email sent ✓');
}
```

### 6.2 Success toast / inline confirmation
After a resend, surface a brief confirmation ("Email sent ✓"). Reuse the app's existing toast component if present; a reference visual pattern exists in `jackknife-site/toast-mockup.html`.

### 6.3 "Open email app" deep link
A meaningful drop-off reducer on a screen whose whole job is "go check your inbox."
- Add a secondary action that opens the default mail client.
- **React Native:** `Linking.openURL('message://')` (iOS Mail) with a fallback; on Android, launch the `MAIN`/`APP_EMAIL` intent or `mailto:`.
- **Web/PWA:** `mailto:` or a "Open Gmail/Outlook" affordance.
- **Hierarchy option:** make "Open email app" the filled primary and demote "Resend Email" to the outlined/secondary slot — arguably the better hierarchy. Confirm with requester.

### 6.4 Wrong-email escape hatch
Add a small `Wrong email? Start over` link that routes back to the request-reset form, so a typo isn't a dead end.

### 6.5 Copy tightening
Replace "Didn't receive the email? Check your spam folder or try resending." with the shorter "**Didn't get it? Check your spam folder, then resend.**" (used in the mockup).

---

## 7. Accessibility (WCAG 2.1 AA) — with computed ratios

| Pair | Ratio | AA normal (4.5:1) | AA large/UI (3:1) | Action |
|------|-------|-------------------|--------------------|--------|
| White text on `#00A385` | **≈3.19:1** | ❌ | ✅ | Button text is 17px 600 (borderline "large"). To be safe for AA-normal, **either** bump text to ≥18.66px bold **or** darken button to `~#00876E` (≈4.0:1) / `#007A63` (≈4.6:1). |
| `#00A385` text on white (old outlined button) | ≈3.19:1 | ❌ | ✅ | Another reason to fill the button (white-on-green) rather than green-text-on-white. |
| `#063340` headline on white | ≈14.6:1 | ✅ | ✅ | Pass. |
| `#374151` body on `#f0f8fa` | ≈9.7:1 | ✅ | ✅ | Pass. |
| `#6b7280` helper on white | ≈4.8:1 | ✅ | ✅ | Pass (was borderline at lighter grays — keep ≥`#6b7280`). |
| Chevron `#063340` on white circle | ≈14.6:1 | — | ✅ | Pass. |

Additional a11y requirements:
- All touch targets ≥44×44pt (back button, resend button, links).
- Back button + "Back to Login" have programmatic labels/roles.
- Logical focus/reading order: back → icon → headline → confirmation → helper → resend → login link.
- Don't encode state by color alone (cooldown shows a text label, not just a color change).
- Respect Dynamic Type / font scaling — the email-wrap fix (§5.1) must still hold at 200% text size.

---

## 8. Acceptance criteria (definition of done)

- [ ] Full recipient email is visible with no clipping at 320pt width and at 200% font scale.
- [ ] "Resend Email" is a filled `#00A385` button, white Poppins-600 17px text, radius 14, full-width, ≥48px tall.
- [ ] Back button: solid white circle, dark-teal chevron, ≥44×44pt, accessible label, clears the safe area/notch.
- [ ] Brand icon centered above the headline, ~84px badge / ~46px glyph, using the real logo asset if available.
- [ ] (If approved) resend disables + shows 30s cooldown and a success toast; no timer leaks.
- [ ] (If approved) "Open email app" and "Wrong email? Start over" present and functional.
- [ ] All §7 contrast pairs meet AA (button darkened or text enlarged as needed).
- [ ] No regression to the request-reset screen or the login screen it links to.
- [ ] Matches `reset-password-mockup.png` within reason (spacing, hierarchy, color).

---

## 9. Test & verify

1. **Static:** run the repo's linter/formatter/type-check (`npm run lint`, `tsc --noEmit`, etc. — check `package.json` scripts).
2. **Manual, narrow device:** render at the smallest supported width; paste a long email (`ryan.michael.mccarthy@gmail.com`) and an even longer one; confirm no clip.
3. **States:** tap resend → loading → cooldown counts 30→0 → re-enables; toast appears once.
4. **Back:** tap back / swipe-back both work; VoiceOver/TalkBack announces the control.
5. **Font scaling:** set OS text size to max; re-check wrap + no overlap.
6. **Contrast:** verify final button color with a contrast checker if you kept `#00A385` vs darkened it.
7. **Snapshot/visual test** if the repo has one; update goldens intentionally.
8. If the repo has a Storybook/preview, add or update a story for the confirmation state (default + cooldown).

---

## 10. Git workflow

```bash
# in jackknife-ui
git checkout -b feature/reset-password-polish
# ...implement...
git add -A
git commit -m "Polish Reset Password confirmation: fix email wrap, primary resend button, back button contrast, centered icon"
git push -u origin feature/reset-password-polish
# open a PR only if requested; include before/after screenshots
```
- Keep the commit focused on this screen.
- In the PR description, embed before (screenshot) / after, and link this spec.
- Do **not** open a PR unless the requester asks.

---

## Appendix A — Full mockup source (`reset-password-mockup.html`)

This is the exact, self-contained HTML/CSS that produced `reset-password-mockup.png`. Open it in a browser to inspect computed values, or port the numbers directly. **It is a static visual reference, not production code** — the production screen is React/React Native in `jackknife-ui`.

> The complete file is committed alongside this spec at:
> `chaoscutter/jackknife-site` → branch `claude/jackknife-homeowner-screen-review-h8saoe` → `reset-password-mockup.html`

Key measurements are already transcribed into §3–§5 above, so you can implement entirely from this document. If you want the literal markup, pull that file from the branch.

---

## Appendix B — Open decisions to confirm with the requester

1. Center the **headline** too (to match the centered icon), or keep it left-aligned? *(Spec recommends centering.)*
2. Should **"Open email app"** be the primary CTA (demoting Resend to secondary), or keep Resend primary? *(§6.3)*
3. Darken the button to `#00876E` for AA-normal text, or keep `#00A385` and rely on large-text exemption? *(§7 — spec recommends darkening.)*
4. Build the §6 enhancements now, or ship the four core fixes first and follow up?
