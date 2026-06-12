// Renders trustpilot-verification-memo.md to a clean, paginated Letter-size PDF.
const PDFDocument = require('pdfkit');
const fs = require('fs');

const SRC = process.env.MEMO_SRC || 'trustpilot-verification-memo.md';
const OUT = process.env.MEMO_OUT || 'trustpilot-verification-memo.pdf';
const C = { teal:'#00A385', navy:'#0a4a5c', deep:'#063340', gray:'#3f4c52', light:'#6b7c85', rule:'#d9e7ea' };

const M = 72; // 1" margins
const doc = new PDFDocument({ size:'LETTER', margins:{top:M,left:M,right:M,bottom:M} });
doc.pipe(fs.createWriteStream(OUT));
const CW = doc.page.width - M*2;

// inline **bold** renderer for a single paragraph
function rich(text, opts){
  const parts = text.split(/(\*\*[^*]+\*\*)/).filter(s=>s.length);
  parts.forEach((seg,i)=>{
    const bold = seg.startsWith('**') && seg.endsWith('**');
    const t = bold ? seg.slice(2,-2) : seg;
    doc.font(bold?'Helvetica-Bold':'Helvetica')
       .text(t, { continued: i < parts.length-1, ...opts });
  });
}

const lines = fs.readFileSync(SRC,'utf8').split('\n');
let prevBlank = true;

for (let raw of lines){
  const line = raw.replace(/\s+$/,'');
  if (line === '' ){ prevBlank = true; continue; }
  if (line === '---'){ // thin divider rule
    doc.moveDown(0.4);
    const y = doc.y; doc.moveTo(M,y).lineTo(M+CW,y).lineWidth(0.7).stroke(C.rule);
    doc.moveDown(0.6); prevBlank = true; continue;
  }
  if (line.startsWith('# ')){
    doc.moveDown(0.2);
    doc.font('Helvetica-Bold').fontSize(24).fillColor(C.deep)
       .text(line.slice(2), { width:CW, lineGap:1 });
    doc.moveDown(0.3); prevBlank = true; continue;
  }
  if (line.startsWith('## ')){
    if (!prevBlank) doc.moveDown(0.4);
    doc.moveDown(0.5);
    doc.font('Helvetica-Bold').fontSize(13.5).fillColor(C.teal)
       .text(line.slice(3).toUpperCase(), { width:CW, characterSpacing:0.6, lineGap:1 });
    doc.moveDown(0.35); prevBlank = false; continue;
  }
  if (line.startsWith('### ')){
    doc.moveDown(0.3);
    doc.font('Helvetica-Bold').fontSize(11.5).fillColor(C.navy).text(line.slice(4), {width:CW});
    doc.moveDown(0.2); prevBlank=false; continue;
  }
  // numbered list  "1. "
  const num = line.match(/^(\d+)\.\s+(.*)$/);
  if (num){
    doc.fontSize(10.5).fillColor(C.gray);
    const indent = 22;
    doc.font('Helvetica-Bold').fillColor(C.teal).text(num[1]+'.', M, doc.y, {continued:true, width:CW});
    doc.fillColor(C.gray);
    rich(' '+num[2], { width:CW-indent, lineGap:2, indent:0 });
    doc.moveDown(0.35); prevBlank=false; continue;
  }
  // bullet "- "
  if (line.startsWith('- ')){
    doc.fontSize(10.5).fillColor(C.gray);
    const x0 = M;
    doc.font('Helvetica-Bold').fillColor(C.teal).text('•', x0, doc.y, {continued:true, width:CW});
    doc.fillColor(C.gray);
    rich(' '+line.slice(2), { width:CW-14, lineGap:2 });
    doc.moveDown(0.3); prevBlank=false; continue;
  }
  // italic-only line (subtitle / sources) wrapped in *...*
  if (/^\*[^*].*\*$/.test(line) && !line.includes('**')){
    doc.font('Helvetica-Oblique').fontSize(9.5).fillColor(C.light)
       .text(line.slice(1,-1), {width:CW, lineGap:1.5});
    doc.moveDown(0.2); prevBlank=false; continue;
  }
  // body paragraph
  doc.fontSize(10.5).fillColor(C.gray);
  rich(line, { width:CW, lineGap:2.5, align:'left' });
  doc.moveDown(0.45); prevBlank=false;
}

doc.end();
console.log('Memo PDF written:', OUT);
