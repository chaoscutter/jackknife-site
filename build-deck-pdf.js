// Generates a print-ready 16:9 PDF of the Jackknife × Trustpilot board deck.
// Browser rendering is blocked by the env network policy, so we draw with pdfkit.
const PDFDocument = require('pdfkit');
const fs = require('fs');

const W = 960, H = 540;
const C = {
  teal:'#00A385', navy:'#0a4a5c', deep:'#063340', light:'#f0f8fa',
  gray:'#6b7c85', coral:'#E85A4F', tp:'#00b67a', white:'#ffffff', ink:'#0a1416'
};
const F = { black:'Helvetica-Bold', bold:'Helvetica-Bold', reg:'Helvetica', obl:'Helvetica-Oblique' };

const OUT = process.env.DECK_OUT || 'jackknife-trustpilot-deck.pdf';
const LOGO = process.env.DECK_LOGO || 'images/jk-logo.png';
const doc = new PDFDocument({ size:[W,H], margins:{top:0,left:0,bottom:0,right:0} });
doc.pipe(fs.createWriteStream(OUT));

const PX = 64, PT = 60; // content padding
// Block pdfkit's automatic page breaks — we control pagination explicitly.
const realAddPage = doc.addPage.bind(doc);
let allowPage = false;
doc.addPage = (opts) => { if (allowPage) return realAddPage(opts); return doc; };
let first = true;
function page(bg){ allowPage=true; if(!first) doc.addPage({size:[W,H]}); allowPage=false; first=false; doc.rect(0,0,W,H).fill(bg); }
function eyebrow(txt,color=C.teal,x=PX,y=PT){
  doc.font(F.bold).fontSize(11).fillColor(color).text(txt.toUpperCase(),x,y,{characterSpacing:2.4});
}
function star(x,y,s,color){ // 5-point star
  const pts=[];for(let i=0;i<10;i++){const r=i%2?s*0.42:s;const a=-Math.PI/2+i*Math.PI/5;pts.push([x+Math.cos(a)*r,y+Math.sin(a)*r]);}
  doc.moveTo(pts[0][0],pts[0][1]);pts.slice(1).forEach(p=>doc.lineTo(p[0],p[1]));doc.closePath().fill(color);
}
function pageno(n,onDark){
  doc.font(F.bold).fontSize(9).fillColor(onDark?'rgba':C.gray)
     .fillColor(onDark?'#5b8089':C.gray)
     .text(String(n).padStart(2,'0')+'  /  09', PX, H-44, {characterSpacing:1.5});
}

/* 1 — TITLE */
page(C.white);
doc.image(LOGO, PX, PT+6, {height:30});
let lx = PX + 150;
doc.font(F.bold).fontSize(18).fillColor(C.teal).text('×', lx, PT+10);
star(lx+34, PT+19, 9, C.tp);
doc.font(F.bold).fontSize(17).fillColor(C.tp).text('Trustpilot', lx+50, PT+10);
doc.font(F.black).fontSize(52).fillColor(C.deep)
   .text('The trust fabric for the', PX, 200, {width:W-PX*2, lineGap:2});
doc.fillColor(C.teal).text('agentic home economy.', PX, doc.y, {width:W-PX*2});
doc.font(F.reg).fontSize(15).fillColor(C.gray)
   .text('Why Jackknife is the verification layer for home data — and where it clicks into Trustpilot’s world.', PX, 350, {width:560, lineGap:3});
doc.font(F.bold).fontSize(10).fillColor(C.gray)
   .text('BOARD CONVERSATION        JACKKNIFE · ESSEX COUNTY, MA        CONFIDENTIAL', PX, H-58, {characterSpacing:1.8});

/* 2 — THESIS */
page(C.deep);
eyebrow('The one-line thesis');
const thesis=[['Trustpilot verifies the ',C.white],['counterparty.',C.teal]];
doc.font(F.black).fontSize(40).text('',PX,150);
function richLine(parts,y,size=40){
  let x=PX; doc.font(F.black).fontSize(size);
  parts.forEach(([t,c])=>{ doc.fillColor(c).text(t,x,y,{continued:false,lineBreak:false}); x+=doc.widthOfString(t); });
}
richLine([['Trustpilot verifies the ',C.white],['counterparty.',C.teal]],150);
richLine([['Jackknife verifies the ',C.white],['asset.',C.teal]],200);
doc.font(F.black).fontSize(40).fillColor(C.white)
   .text('In an agent-to-agent economy,',PX,265,{lineGap:6})
   .text('you can’t transact without both —',PX,doc.y)
   .fillColor('#aecdd3').fontSize(34).text('and almost nobody is building the asset side.',PX,doc.y+8,{width:W-PX*2});
pageno(2,true);

/* 3 — WHY VERIFICATION */
page(C.white);
eyebrow('Why this matters now');
doc.font(F.black).fontSize(34).fillColor(C.deep)
   .text('In an A2A economy, the bottleneck',PX,108)
   .text('isn’t intelligence. It’s trusted data.',PX,doc.y);
const colW=(W-PX*2-50)/2, lcol=PX, rcol=PX+colW+50, cy=235;
doc.font(F.reg).fontSize(14).fillColor(C.gray)
   .text('Models are cheap and getting cheaper. The entire risk surface of autonomous transactions is one question: ',lcol,cy,{width:colW,continued:true})
   .font(F.bold).fillColor(C.deep).text('“Can I trust this input?”');
doc.font(F.reg).fillColor(C.gray)
   .text('Whoever owns a verified data layer owns a toll booth in the agentic economy. Trustpilot already lives this — “trust as infrastructure” is the franchise.',lcol,doc.y+14,{width:colW});
function card(x,y,w,h,accent,title,body){
  doc.roundedRect(x,y,w,h,12).fill(C.light);
  doc.rect(x,y,4,h).fill(accent);
  doc.font(F.bold).fontSize(15).fillColor(C.deep).text(title,x+22,y+20,{width:w-40});
  doc.font(F.reg).fontSize(13).fillColor(C.gray).text(body,x+22,doc.y+4,{width:w-40});
}
card(rcol,cy,colW,96,C.teal,'What Trustpilot verifies','Who you’re dealing with. Is this business reputable? One axis.');
card(rcol,cy+112,colW,104,C.coral,'What’s still wide open','What’s actually true about the thing being transacted. For the home, that axis is Jackknife.');
pageno(3);

/* 4 — TWO-SIDED TRUST MAP */
page(C.white);
eyebrow('The two-sided trust map');
doc.font(F.black).fontSize(32).fillColor(C.deep)
   .text('Every home-services transaction needs',PX,104)
   .text('both sides to be machine-verifiable.',PX,doc.y);
const mY=215, mH=H-mY-70, mW=(W-PX*2)/2;
doc.roundedRect(PX,mY,W-PX*2,mH,16).fill(C.light);
doc.save().roundedRect(PX,mY,W-PX*2,mH,16).clip();
doc.rect(PX+mW,mY,mW,mH).fill(C.white); doc.restore();
doc.roundedRect(PX,mY,W-PX*2,mH,16).lineWidth(1).stroke('#d9e7ea');
doc.moveTo(PX+mW,mY).lineTo(PX+mW,mY+mH).stroke('#d9e7ea');
// left cell
let cxL=PX+34;
doc.font(F.bold).fontSize(10).fillColor(C.gray).text('COUNTERPARTY TRUST',cxL,mY+30,{characterSpacing:1.6});
star(cxL+8,mY+66,8,C.tp);
doc.font(F.black).fontSize(24).fillColor(C.tp).text('Trustpilot',cxL+22,mY+54);
doc.font(F.bold).fontSize(17).fillColor(C.deep).text('“Is this contractor / business legit?”',cxL,mY+100,{width:mW-60});
doc.font(F.reg).fontSize(12.5).fillColor(C.gray).text('Solved. A 15-year franchise built on reputation signals about companies.',cxL,mY+mH-58,{width:mW-60});
// right cell
let cxR=PX+mW+34;
doc.roundedRect(cxR+mW-150,mY+22,118,20,10).lineWidth(1.5).stroke(C.coral);
doc.font(F.bold).fontSize(9).fillColor(C.coral).text('OPEN / UNBUILT',cxR+mW-142,mY+28,{characterSpacing:1.3});
doc.font(F.bold).fontSize(10).fillColor(C.gray).text('ASSET TRUST',cxR,mY+30,{characterSpacing:1.6});
doc.font(F.black).fontSize(24).fillColor(C.teal).text('Jackknife',cxR,mY+54);
doc.font(F.bold).fontSize(17).fillColor(C.deep).text('“What’s actually in this home — make, age, condition, warranty, recall status?”',cxR,mY+100,{width:mW-70});
doc.font(F.reg).fontSize(12.5).fillColor(C.gray).text('Greenfield. The home is the largest, least-digitized consumer asset class.',cxR,mY+mH-58,{width:mW-70});
pageno(4);

/* 5 — VERIFICATION LAYER (navy) */
page(C.navy);
eyebrow('Not an inventory app — a verification layer');
doc.font(F.black).fontSize(32).fillColor(C.white)
   .text('Three properties turn data from',PX,104)
   .text('self-reported into ',PX,doc.y,{continued:true}).fillColor(C.teal).text('attested.');
const nodes=[
  ['01 · PROVENANCE','Evidence-grounded capture','Starts from a photo, not a typed claim. Timestamped, hard to fake — an attestation, not an assertion.'],
  ['02 · RECONCILED','Cross-referenced to ground truth','Make/model resolved against manufacturer specs, warranty terms, and the federal CPSC recall database.'],
  ['03 · ACCEPTED','Records third parties act on','Insurance-claim export already produces documentation insurers accept. The literal definition of a verification layer.']
];
const nY=230, gap=22, nW=(W-PX*2-gap*2)/3, nH=H-nY-70;
nodes.forEach((n,k)=>{
  const x=PX+k*(nW+gap);
  doc.roundedRect(x,nY,nW,nH,14).fillOpacity(1).fill('#0d3d4a');
  doc.roundedRect(x,nY,nW,nH,14).lineWidth(1).stroke('#1c5563');
  doc.font(F.bold).fontSize(10).fillColor(C.teal).text(n[0],x+20,nY+22,{characterSpacing:1.2});
  doc.font(F.bold).fontSize(17).fillColor(C.white).text(n[1],x+20,nY+46,{width:nW-40});
  doc.font(F.reg).fontSize(12.5).fillColor('#aecdd3').text(n[2],x+20,doc.y+8,{width:nW-40});
});
pageno(5,true);

/* 6 — ANALOGY (deep) */
page(C.deep);
eyebrow('The analogy for the room',C.teal,0,90); doc.text('',0,0); // recolor center below
doc.font(F.bold).fontSize(11).fillColor(C.teal).text('THE ANALOGY FOR THE ROOM',0,90,{width:W,align:'center',characterSpacing:2.4});
doc.font(F.black).fontSize(78).fillColor(C.white).text('Carfax,',0,150,{width:W,align:'center'});
doc.fillColor(C.white).text('for the home.',0,doc.y-6,{width:W,align:'center'});
doc.font(F.reg).fontSize(16).fillColor('#aecdd3').text('A trusted record that buyers, sellers, insurers — and increasingly, agents — query before they transact. Far larger asset class. Far less digitized.',W/2-260,360,{width:520,align:'center'});
doc.font(F.obl).fontSize(15).fillColor('#7fb9c4').text('“Stop managing your most important asset with a junk drawer and a prayer.”',W/2-260,doc.y+12,{width:520,align:'center'});
pageno(6,true);

/* 7 — KILLER SYNERGY (navy) */
page(C.navy);
eyebrow('The point to land');
doc.font(F.black).fontSize(30).fillColor(C.white)
   .text('Jackknife sits ',PX,104,{continued:true}).fillColor(C.teal).text('upstream',{continued:true}).fillColor(C.white).text(' of Trustpilot’s')
   .fillColor(C.white).text('oldest problem: review authenticity.',PX,doc.y);
const syn=[
  [C.tp,'TRUSTPILOT’S GAP','Unverified, gameable prose','Reviews are self-reported and hard to authenticate — and in an agentic world, prose agents don’t want to parse anyway.'],
  [C.teal,'JACKKNIFE’S BYPRODUCT','Verified transactions','Tracks every repair diagnosis→completion: real job, real outcome, on a real asset. The highest-grade trust signal in home services.'],
  [C.tp,'THE FIT','Complementary, not competitive','JK supplies verified-outcome signals; Trustpilot is the reputation oracle JK’s matching layer consumes. Each fills the other’s blind spot.']
];
const sY=235, sgap=42, sW=(W-PX*2-sgap*2)/3, sH=H-sY-70;
syn.forEach((n,k)=>{
  const x=PX+k*(sW+sgap);
  doc.roundedRect(x,sY,sW,sH,14).fill('#0c5566');
  doc.roundedRect(x,sY,sW,sH,14).lineWidth(1).stroke('#1c6577');
  doc.font(F.bold).fontSize(9.5).fillColor(n[0]).text(n[1],x+18,sY+20,{characterSpacing:1.2});
  doc.font(F.bold).fontSize(16).fillColor(C.white).text(n[2],x+18,sY+42,{width:sW-36});
  doc.font(F.reg).fontSize(12).fillColor('#bcd9df').text(n[3],x+18,doc.y+8,{width:sW-36});
  if(k<2){doc.font(F.black).fontSize(26).fillColor(C.teal).text('→',x+sW+8,sY+sH/2-16);}
});
pageno(7,true);

/* 8 — QUESTIONS (navy) */
page(C.navy);
eyebrow('Turn the pitch into a dialogue');
doc.font(F.black).fontSize(32).fillColor(C.white).text('Three questions to put to the board.',PX,104);
const qs=[
  'As agents start transacting, does Trustpilot’s product evolve from human-readable reviews toward machine-consumable trust primitives — and what’s the unit of trust in that world?',
  'Trustpilot verifies the counterparty. Who verifies the asset? Have they thought about the demand-side of the trust fabric at all?',
  'Would a stream of verified-completion signals be valuable to them — and is that a partnership or a build-vs-buy question?'
];
let qy=200;
qs.forEach((q,k)=>{
  doc.font(F.black).fontSize(34).fillColor(C.teal).text(String(k+1),PX,qy);
  doc.font(F.reg).fontSize(17).fillColor(C.white).text(q,PX+48,qy+4,{width:W-PX*2-60,lineGap:2});
  qy = doc.y + 22;
});
pageno(8,true);

/* 9 — CLOSER (deep) */
page(C.deep);
eyebrow('Walk in with this');
doc.font(F.black).fontSize(40).fillColor(C.white)
   .text('Trust is a ',PX,150,{continued:true}).fillColor(C.teal).text('two-sided fabric.')
   .fillColor(C.white).text('You own the counterparty side.',PX,doc.y+4)
   .text('The asset side is unbuilt.',PX,doc.y)
   .text('The agentic economy makes both mandatory.',PX,doc.y,{width:W-PX*2});
doc.font(F.reg).fontSize(15).fillColor('#aecdd3')
   .text('That positions Jackknife as adjacent infrastructure to Trustpilot — not a downstream app. A much stronger seat at the table.',PX,doc.y+22,{width:600,lineGap:2});
doc.font(F.bold).fontSize(14).fillColor(C.teal).text('Jackknife — the verification layer of home data.',PX,H-58);

doc.end();
console.log('PDF written: jackknife-trustpilot-deck.pdf');
