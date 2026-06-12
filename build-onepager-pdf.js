// Renders agentic-stack-onepager.md to a single portrait Letter page.
// Hard one-page constraint: auto page breaks are suppressed; overflow is a build error.
const PDFDocument = require('pdfkit');
const fs = require('fs');

const SRC = 'agentic-stack-onepager.md';
const OUT = 'agentic-stack-onepager.pdf';
const C = { teal:'#00A385', deep:'#063340', gray:'#3f4c52', light:'#6b7c85', rule:'#d9e7ea' };

const M = 46;
const doc = new PDFDocument({ size:'LETTER', margins:{top:M,left:M,right:M,bottom:M} });
const realAddPage = doc.addPage.bind(doc);
doc.addPage = () => doc; // never paginate
doc.pipe(fs.createWriteStream(OUT));
const CW = doc.page.width - M*2;
const BOTTOM = doc.page.height - M;

function rich(text, size, color, opts={}){
  doc.fontSize(size).fillColor(color);
  const parts = text.split(/(\*\*[^*]+\*\*)/).filter(s=>s.length);
  parts.forEach((seg,i)=>{
    const bold = seg.startsWith('**') && seg.endsWith('**');
    doc.font(bold?'Helvetica-Bold':'Helvetica')
       .text(bold?seg.slice(2,-2):seg, { width:CW, lineGap:1.6, continued:i<parts.length-1, ...opts });
  });
}

const lines = fs.readFileSync(SRC,'utf8').split('\n').filter(l=>l.trim().length);
for (const line of lines){
  if (line.startsWith('# ')){
    doc.font('Helvetica-Bold').fontSize(19).fillColor(C.deep)
       .text(line.slice(2).toUpperCase(), M, M, {width:CW, characterSpacing:0.2});
    const y = doc.y + 6;
    doc.moveTo(M,y).lineTo(M+150,y).lineWidth(2.5).stroke(C.teal);
    doc.y = y + 12;
    continue;
  }
  const img = line.match(/^!\[.*\]\((.*)\)$/);
  if (img){
    const w = CW * 0.88, h = w * (1860/3000);
    doc.image(img[1], M + (CW-w)/2, doc.y + 2, {width:w});
    doc.y += h + 8;
    continue;
  }
  if (/^\*[^*].*\*$/.test(line) && !line.includes('**')){
    doc.moveDown(0.15);
    doc.font('Helvetica-Oblique').fontSize(9.6).fillColor(C.teal)
       .text(line.slice(1,-1), M, doc.y, {width:CW, lineGap:1.6});
    continue;
  }
  rich(line, 9.3, C.gray, {align:'left'});
  doc.moveDown(0.34);
  doc.x = M;
}

if (doc.y > BOTTOM) { console.error(`OVERFLOW: content ends at ${Math.round(doc.y)} > ${BOTTOM}`); process.exitCode = 1; }
else console.log(`fits: content ends at ${Math.round(doc.y)} of ${BOTTOM}`);
doc.end();
