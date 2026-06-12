"""Three-bucket 'how the agent sorts every app' figure for the investor memo.
Portrait, traffic-light bands (die / auction / gain power), test + Jackknife climax.
Code-rendered for crisp, legible type. ASCII-only (base-14 fonts lack -, arrows, middots)."""
import fitz

W, H = 1040, 1010
S = 3
BG    = (0.969, 0.961, 0.941)
NAVY  = (0.024, 0.200, 0.251)
TEAL  = (0.0,   0.639, 0.522)
GRAY  = (0.40,  0.47,  0.50)
CORAL = (0.78,  0.357, 0.29)
AMBER = (0.80,  0.56,  0.16)
WHITE = (1, 1, 1)
TINT_CORAL = (0.975, 0.93, 0.915)
TINT_AMBER = (0.98,  0.955, 0.90)
TINT_TEAL  = (0.905, 0.957, 0.945)

doc = fitz.open()
pg = doc.new_page(width=W, height=H)
pg.draw_rect(pg.rect, color=None, fill=BG)

def text(x, y, s, size, color, bold=True, align=0, width=None, font=None):
    fn = font or ("hebo" if bold else "helv")
    if width is None:
        width = W - x
    pg.insert_textbox(fitz.Rect(x, y, x + width, y + size * 3 + 8),
                      s, fontsize=size, fontname=fn, color=color, align=align)

def tlen(s, size, bold=True):
    return fitz.get_text_length(s, fontname=("hebo" if bold else "helv"), fontsize=size)

PAD = 48
CW = W - 2 * PAD

# ---- title ----
text(PAD, 36, "WHEN THE INTERFACE COMMODITIZES, EVERY APP SORTS INTO THREE FATES.",
     21, NAVY, True, 0, CW)
text(PAD, 68, "WWDC 2026 starts the sort. Whether you survive depends on one thing: what the agent cannot get without you.",
     15.5, GRAY, False, 0, CW)

# ---- bucket bands ----
def chips(x, y, items, accent, highlight=None):
    cx = x
    for i, it in enumerate(items):
        w = tlen(it, 16) + 26
        hl = (highlight is not None and i == highlight)
        fill = accent if hl else WHITE
        pg.draw_rect(fitz.Rect(cx, y, cx + w, y + 36), color=accent, fill=fill, width=1.3)
        text(cx, y + 9, it, 16, WHITE if hl else NAVY, True, 1, w)
        cx += w + 12

def band(y, h, accent, tint, tag, fate, definition, examples, hl=None, note=None):
    pg.draw_rect(fitz.Rect(PAD, y, PAD + CW, y + h), color=None, fill=tint)
    pg.draw_rect(fitz.Rect(PAD, y, PAD + 9, y + h), color=None, fill=accent)
    ix = PAD + 30
    text(ix, y + 18, tag, 14.5, accent, True, 0, CW - 60)
    text(ix, y + 38, fate, 30, accent, True, 0, CW - 60)
    text(ix, y + 80, definition, 16.5, NAVY, False, 0, CW - 60)
    cy = y + h - 50
    chips(ix, cy, examples, accent, hl)
    if note:
        text(ix, y + h - 92, note, 13.5, accent, False, 0, CW - 60)

by = 104
bh = 178
gap = 16

band(by, bh, CORAL, TINT_CORAL,
     "BUCKET 1   -   THE INTERFACE WAS THE VALUE",
     "THEY DIE",
     "Destinations built over public or commodity data. The agent answers on its own surface; there is no reason to visit.",
     ["Yelp", "TripAdvisor", "Kayak", "Weather apps", "Allrecipes"])

by += bh + gap
band(by, bh, AMBER, TINT_AMBER,
     "BUCKET 2   -   INTERCHANGEABLE SUPPLY",
     "SURVIVE, THEN AUCTIONED",
     "A real network underneath, but substitutable. The OS routes the intent to the cheapest and keeps the pricing power.",
     ["Uber / Lyft", "DoorDash", "Spotify", "Instacart"])

by += bh + gap
band(by, bh + 18, TEAL, TINT_TEAL,
     "BUCKET 3   -   EXCLUSIVE, UNSCRAPEABLE GROUND TRUTH",
     "THEY GAIN POWER",
     "The model cannot crawl it, synthesize it, or buy it from a substitute. The agent does not auction them; it needs them.",
     ["Plaid", "Bloomberg", "Visa / Mastercard", "Epic (health records)"],
     hl=0,
     note="Plaid is the literal analog: it owns the consented pipe into your bank data. The agent must call the rail.")

# ---- boundary note ----
by += bh + 18 + 20
text(PAD, by, "THE TRAP:  Bucket 2 in a Bucket 3 costume", 14, GRAY, True, 0, CW)
text(PAD, by + 20, "AllTrails (crawlable trails)   /   Expedia (aggregated inventory it does not own)   /   Strava (reproducible routes)   /   Spotify catalog (licensed from the labels)",
     13.5, GRAY, False, 0, CW)

# ---- the test ----
by += 60
pg.draw_rect(fitz.Rect(PAD, by, PAD + CW, by + 62), color=None, fill=NAVY)
text(PAD + 26, by + 13, "THE TEST, IN ONE LINE", 13, TEAL, True, 0, CW - 52)
text(PAD + 26, by + 32, "Can the model crawl it, synthesize it, or get it from a substitute supplier?   Any \"yes\"  =  not Bucket 3.",
     16.5, WHITE, True, 0, CW - 52)

# ---- Jackknife landing ----
by += 78
jh = 150
pg.draw_rect(fitz.Rect(PAD, by, PAD + CW, by + jh), color=None, fill=TEAL)
text(PAD + 26, by + 16, "WHERE JACKKNIFE LANDS", 18, WHITE, True, 0, CW - 52)
text(PAD + 26, by + 42, "The home interior fails all three escape routes:", 15, WHITE, False, 0, CW - 52)
col = PAD + 26
cw3 = (CW - 52) / 3
for i, (hd, bd) in enumerate([
        ("Can't be crawled", "no API; it is behind drywall"),
        ("Can't be synthesized", "it is private to the home"),
        ("Can't be substituted", "only the homeowner can originate it")]):
    x = col + i * cw3
    text(x, by + 70, hd, 15.5, WHITE, True, 0, cw3 - 12)
    text(x, by + 92, bd, 13.5, (0.85, 0.95, 0.92), False, 0, cw3 - 12)
pg.draw_line(fitz.Point(PAD + 26, by + jh - 32), fitz.Point(PAD + CW - 26, by + jh - 32),
             color=(0.3, 0.78, 0.68), width=0.8)
text(PAD + 26, by + jh - 26, "Bucket 3 by structure, not branding.", 16, WHITE, True, 0, CW - 52)

print("content bottom:", by + jh, "of", H)
pix = pg.get_pixmap(matrix=fitz.Matrix(S, S))
pix.save("three-bucket-figure.png")
print("figure written:", pix.width, "x", pix.height)
