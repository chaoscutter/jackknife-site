"""Stack-inversion figure — sized so type stays legible when embedded small
in a portrait memo (~0.46x). Fewer words, larger type, same footprint."""
import fitz, math

W, H = 1000, 620
S = 3
BG, NAVY, TEAL, GRAY, CORAL, GREYBAR = (
    (0.969, 0.961, 0.941),
    (0.024, 0.200, 0.251),
    (0.0, 0.639, 0.522),
    (0.42, 0.49, 0.52),
    (0.78, 0.357, 0.29),
    (0.875, 0.895, 0.90),
)

doc = fitz.open()
pg = doc.new_page(width=W, height=H)
pg.draw_rect(pg.rect, color=None, fill=BG)

def text(x, y, s, size, color, bold=True, align=0, width=W):
    fn = "hebo" if bold else "helv"
    pg.insert_textbox(fitz.Rect(x, y, x + width, y + size * 3 + 6),
                      s, fontsize=size, fontname=fn, color=color, align=align)

PAD = 56
panel_w = 392
gap = W - 2 * PAD - 2 * panel_w
lx, rx = PAD, PAD + panel_w + gap
top_y = 116
stack_h = 430

# era headers (bold 27 / sub 17  ->  ~12.3 / 7.8 effective)
def header(x, era, sub):
    text(x, top_y - 66, era, 27, NAVY, True, 1, panel_w)
    text(x, top_y - 32, sub, 17, GRAY, False, 1, panel_w)
header(lx, "SAAS  ERA", "the app is the destination")
header(rx, "AGENTIC  ERA", "the agent is the interface")

def bar(x, y, h, fill, label, sub=None, label_color=(1, 1, 1), thin=False):
    pg.draw_rect(fitz.Rect(x, y, x + panel_w, y + h), color=None, fill=fill)
    if thin:
        return fitz.Rect(x, y, x + panel_w, y + h)
    lc = label_color if fill == TEAL else NAVY
    if sub:
        ty = y + h / 2 - 22
        text(x, ty, label, 24, lc, True, 1, panel_w)          # ~11 effective
        text(x + 16, ty + 32, sub, 18, lc, False, 1, panel_w - 32)  # ~8.2 effective
    else:
        text(x, y + h / 2 - 15, label, 24, lc, True, 1, panel_w)
    return fitz.Rect(x, y, x + panel_w, y + h)

GAPY = 12
# LEFT — value sits in the middle
y = top_y + stack_h
y -= 60;  bar(lx, y, 60, GREYBAR, "ORIGINATION")
y -= GAPY + 60;  bar(lx, y, 60, GREYBAR, "RECORD")
y -= GAPY + 196; tl = bar(lx, y, 196, TEAL, "INTERFACE & TRANSPORT", "where app value lived")
y -= GAPY + 60;  bar(lx, y, 60, GREYBAR, "ATTESTATION")

# RIGHT — value barbells to both ends
y = top_y + stack_h
y -= 150; ro = bar(rx, y, 150, TEAL, "ORIGINATION", "ground truth the agent must call")
y -= GAPY + 60; bar(rx, y, 60, GREYBAR, "RECORD")
y -= GAPY + 14
rt = bar(rx, y, 14, CORAL, "", thin=True)
text(rx, y - 26, "INTERFACE & TRANSPORT   FALLS TO 0", 18, CORAL, True, 1, panel_w)
y -= GAPY + 26 + 150; ra = bar(rx, y, 150, TEAL, "ATTESTATION", "a signature agents trust on sight")

# arrows: value drains from the middle to both ends
def arrow(x0, y0, x1, y1):
    pg.draw_line(fitz.Point(x0, y0), fitz.Point(x1, y1), color=TEAL, width=2.6)
    a = math.atan2(y1 - y0, x1 - x0)
    for da in (math.pi - 0.4, math.pi + 0.4):
        pg.draw_line(fitz.Point(x1, y1),
                     fitz.Point(x1 + 15 * math.cos(a + da), y1 + 15 * math.sin(a + da)),
                     color=TEAL, width=2.6)
mid = tl.y0 + tl.height / 2
arrow(lx + panel_w + 6, mid, rx - 12, ra.y0 + ra.height / 2)
arrow(lx + panel_w + 6, mid, rx - 12, ro.y0 + ro.height / 2)

# footer
fy = top_y + stack_h + 18
pg.draw_line(fitz.Point(PAD, fy - 8), fitz.Point(W - PAD, fy - 8), color=(0.85, 0.85, 0.83), width=0.8)
text(PAD, fy, "Interchangeable supply gets auctioned. Exclusive ground truth gets called.",
     18, NAVY, True, 1, W - 2 * PAD)
text(PAD, fy + 28, "There is exactly one record of a given home - it cannot be crawled or multi-homed.",
     16, TEAL, True, 1, W - 2 * PAD)

pix = pg.get_pixmap(matrix=fitz.Matrix(S, S))
pix.save("stack-inversion-figure.png")
print("figure written:", pix.width, "x", pix.height)
