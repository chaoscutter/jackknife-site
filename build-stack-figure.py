"""Renders the stack-inversion barbell figure as a high-res PNG via PyMuPDF.
Deterministic drawing — no image-model text garbling."""
import fitz

W, H = 1000, 620
S = 3  # supersample
BG, NAVY, TEAL, GRAY, CORAL, GREYBAR = (
    (0.969, 0.961, 0.941),   # F7F5F0
    (0.024, 0.200, 0.251),   # 063340
    (0.0, 0.639, 0.522),     # 00A385
    (0.42, 0.49, 0.52),
    (0.78, 0.357, 0.29),     # C75B4A
    (0.875, 0.895, 0.90),
)

doc = fitz.open()
pg = doc.new_page(width=W, height=H)
pg.draw_rect(pg.rect, color=None, fill=BG)

def text(x, y, s, size, color, bold=True, align=0, width=None):
    fn = "hebo" if bold else "helv"
    if width is None:
        width = W
    r = fitz.Rect(x, y, x + width, y + size * 3)
    pg.insert_textbox(r, s, fontsize=size, fontname=fn, color=color, align=align)

# ---- panel geometry (no big header: the memo's section title carries it) ----
PAD = 64
panel_w = 380
gap = W - 2 * PAD - 2 * panel_w          # center corridor for arrows
lx, rx = PAD, PAD + panel_w + gap
top_y = 92
stack_h = 440

def panel_header(x, era, sub):
    text(x, top_y - 50, era, 19, NAVY, True, 1, panel_w)
    text(x, top_y - 26, sub, 11.5, GRAY, False, 1, panel_w)

panel_header(lx, "SAAS  ERA", "the app is the destination")
panel_header(rx, "AGENTIC  ERA", "the agent is the interface")

def bar(x, y, h, fill, label, sub=None, label_color=(1, 1, 1), outline=None, thin=False):
    r = fitz.Rect(x, y, x + panel_w, y + h)
    pg.draw_rect(r, color=outline, fill=fill, width=1.2 if outline else 0)
    if thin:
        return r
    ly = y + h / 2 - (13 if sub else 7)
    text(x, ly, label, 14.5, label_color, True, 1, panel_w)
    if sub:
        text(x + 14, ly + 19, sub, 9.5, label_color if fill == TEAL else GRAY, False, 1, panel_w - 28)
    return r

GAPY = 12
# ---- LEFT: SaaS era (bottom→top: ORIGINATION, RECORD, TRANSPORT, ATTESTATION) ----
heights_l = {"orig": 64, "rec": 64, "trans": 210, "att": 64}
y = top_y + stack_h
y -= heights_l["orig"]; bar(lx, y, heights_l["orig"], GREYBAR, "ORIGINATION", None, NAVY)
y -= GAPY + heights_l["rec"]; bar(lx, y, heights_l["rec"], GREYBAR, "RECORD", None, NAVY)
y -= GAPY + heights_l["trans"]; tl = bar(lx, y, heights_l["trans"], TEAL, "INTERFACE & TRANSPORT",
        "distribution · screens · data movement · where app value lived")
y -= GAPY + heights_l["att"]; bar(lx, y, heights_l["att"], GREYBAR, "ATTESTATION", None, NAVY)

# ---- RIGHT: Agentic era ----
heights_r = {"orig": 148, "rec": 64, "trans": 16, "att": 148}
y = top_y + stack_h
y -= heights_r["orig"]; ro = bar(rx, y, heights_r["orig"], TEAL, "ORIGINATION",
        "unscrapeable ground truth the agent must call")
y -= GAPY + heights_r["rec"]; bar(rx, y, heights_r["rec"], GREYBAR, "RECORD", None, NAVY)
y -= GAPY + heights_r["trans"]
rt = bar(rx, y, heights_r["trans"], CORAL, "", thin=True)
text(rx, y - 16, "INTERFACE & TRANSPORT   falls to 0 · absorbed by the OS agent", 9.5, CORAL, True, 1, panel_w)
y -= GAPY + 16 + heights_r["att"]; ra = bar(rx, y, heights_r["att"], TEAL, "ATTESTATION",
        "the signature a counterparty's agent trusts without re-checking")

# ---- center corridor arrows: value drains from middle to both ends ----
cx = lx + panel_w + gap / 2
mid_y = tl.y0 + tl.height / 2
up_y = ra.y0 + ra.height / 2
dn_y = ro.y0 + ro.height / 2

def arrow(x0, y0, x1, y1):
    pg.draw_line(fitz.Point(x0, y0), fitz.Point(x1, y1), color=TEAL, width=2.2)
    # arrowhead
    import math
    ang = math.atan2(y1 - y0, x1 - x0)
    for da in (math.pi - 0.45, math.pi + 0.45):
        pg.draw_line(fitz.Point(x1, y1),
                     fitz.Point(x1 + 13 * math.cos(ang + da), y1 + 13 * math.sin(ang + da)),
                     color=TEAL, width=2.2)

arrow(lx + panel_w + 8, mid_y, rx - 10, up_y)
arrow(lx + panel_w + 8, mid_y, rx - 10, dn_y)

# ---- footer (single line) ----
fy = top_y + stack_h + 30
pg.draw_line(fitz.Point(PAD, fy - 10), fitz.Point(W - PAD, fy - 10), color=(0.85, 0.85, 0.83), width=0.8)
text(PAD, fy, "Interchangeable endpoints get auctioned (Siri can call Uber or Lyft). Exclusive ground truth gets called. There is exactly one record of a given home.",
     10.5, NAVY, True, 1, W - 2 * PAD)

pix = pg.get_pixmap(matrix=fitz.Matrix(S, S))
pix.save("stack-inversion-figure.png")
print("figure written:", pix.width, "x", pix.height)
