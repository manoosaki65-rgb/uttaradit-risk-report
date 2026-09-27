const QAPI=(window.__HATCHABLE__&&window.__HATCHABLE__.api)||'/api';
let qualityDocs=[];
const seedQualityDocs=[{
  id:'seed-monthly-2569-09',seed:true,docNo:'เสนอหัวหน้า ก.ย.69',docType:'monthly',status:'sent_review',
  title:'การบริหารจัดการจัดซื้อจัดจ้างและการเบิกจ่ายให้เสร็จสิ้นภายในปีงบประมาณ (ภายในวันที่ 30 กันยายน 2569)',
  monthName:'กันยายน',budgetYear:2569,authorName:'นายมนูศักดิ์ อยู่บาง',
  reviewerNote:'',
  formData:{monthName:'กันยายน',reviewDate:'2026-09-14',authorName:'นายมนูศักดิ์ อยู่บาง',count:'-',riskType:'4',
    title:'การบริหารจัดการจัดซื้อจัดจ้างและการเบิกจ่ายให้เสร็จสิ้นภายในปีงบประมาณ (ภายในวันที่ 30 กันยายน 2569)',
    correction:'ปัญหาที่พบ: ปริมาณงานในเดือนกันยายนมีปริมาณมาก เนื่องจากเป็นช่วงสิ้นปีงบประมาณ มีการเร่งใช้เงินให้ทันตามแผน และยังมีการขอปรับแผนกะทันหันช่วงปลายปี ระยะเวลาที่งานจัดซื้อต้องดำเนินการใช้เวลาประมาณ 20 วัน ทำให้เสี่ยงออก PO และจองเงินในระบบ GF ไม่ทัน\n\nวิธีการแก้ไขเบื้องต้น\n1. เร่งรัดรายการจัดซื้อจัดจ้างปี 2569 ในมือทั้งหมดเพื่อออก PO และจองเงินในระบบ GF ให้ทันก่อนวันที่ 30 กันยายน 2569\n2. ติดตามและกระตุ้นการทำงานของคณะกรรมการตรวจรับอย่างใกล้ชิด เพื่อเคลียร์งานค้างและนำส่งเรื่องเข้าระบบ GF\n3. แจ้งฝ่ายแผนให้ยกเลิกการปรับแผนจัดซื้อจัดจ้างปี 2569 ในช่วงกระชั้นชิดปลายปีงบประมาณ ซึ่งควรใช้แผนในปี 2570 มาดำเนินการแทน',
    prevention:'1. กำหนดกรอบเวลาส่งเรื่องจัดซื้อจัดจ้างล่วงหน้าอย่างน้อย 20 วันก่อนสิ้นปีงบประมาณ (ต้องส่งไม่เกินวันที่ 14 กันยายน)\n2. รายการงานซ่อมที่ไม่สามารถดำเนินการได้ทันปี 2569 ให้รวบรวมส่งคืนฝ่ายแผน เพื่อนำไปวนเข้าแผนงบประมาณปี 2570 แทน โดยไม่เก็บสะสมไว้\n3. หากมีความจำเป็นต้องจัดซื้อพัสดุเพิ่มช่วงปลายปี ให้ใช้แผนหรือวงเงินงบประมาณปี 2570 ดำเนินการแทนการขอปรับแผนปีเดิม\n4. บริหารลำดับความสำคัญ โดยชะลอการดำเนินงานปี 2570 ที่ไม่เร่งด่วนไว้ชั่วคราว เพื่อมุ่งเคลียร์งานปี 2569 ให้เสร็จสิ้น',
    result:'1. สามารถออก PO และจองเงินในระบบ GF ได้ทันตามกำหนดสิ้นปีงบประมาณ\n2. เคลียร์งานตกค้างข้ามปีอย่างเป็นระบบโดยการยกยอดไปปี 2570 ทำให้งานไม่สะสมค้างปี\n3. ลดภาระงานล้นมือของเจ้าหน้าที่พัสดุและรักษาวินัยการบริหารจัดการงบประมาณ',
    sourceXlsxUrl:'https://docs.google.com/spreadsheets/d/1_uL7eCZXqet3kYysg_afjZcl9eZ9HDGK/edit',
    sourcePdfUrl:'https://drive.google.com/file/d/1AleQxkdN7QK_TLFDI1jH6NwVGHMgWLdL/view',
    sourceAudioUrl:'https://drive.google.com/file/d/1nXYwgEx_ZudvgjA_fLN1eZ-ED9bn0ehc/view'}
}];
const qStatus={draft:'ร่าง',sent_review:'รอหัวหน้าตรวจ',needs_edit:'ส่งกลับแก้ไข',approved:'ตรวจแล้ว / ลงชื่อแล้ว',ready_ha:'พร้อมส่ง HA'};
const typeName={monthly:'ทบทวนความเสี่ยงประจำเดือน',rca:'RCA',aar:'AAR',profile:'Risk Profile รายเดือน'};
const reviewer='นางวราพร จันทร์ศรีทอง';
const author='นายมนูศักดิ์ อยู่บาง';
const Q=(s)=>document.querySelector(s);const QA=(s)=>[...document.querySelectorAll(s)];
const E=(v='')=>String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
function today(){const d=new Date(),o=d.getTimezoneOffset()*60000;return new Date(d-o).toISOString().slice(0,10)}
function thaiDateTime(v){if(!v)return '';return new Intl.DateTimeFormat('th-TH',{dateStyle:'medium',timeStyle:'short'}).format(new Date(v))}
function openModule(type){QA('.workspace').forEach(x=>x.classList.remove('active'));Q('#homeBtn').classList.toggle('hidden',type==='home');const id=type==='home'?'haHome':`${type}Workspace`;Q('#'+id).classList.add('active');if(['monthly','rca','aar'].includes(type))renderDocList(type);window.scrollTo({top:0,behavior:'smooth'})}
QA('[data-open-module]').forEach(b=>b.onclick=()=>openModule(b.dataset.openModule));Q('#homeBtn').onclick=()=>openModule('home');
const months=['ตุลาคม','พฤศจิกายน','ธันวาคม','มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน'];
const calendarMonths=['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
const shortMonths=['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
const haStart=new Date(2026,8,1);
let activeHaMonth=null;
Q('[name="monthName"]').innerHTML=months.map(m=>`<option>${m}</option>`).join('');
function haBudgetYear(d){return d.getFullYear()+543+(d.getMonth()>=9?1:0)}
function haMonthItems(){
  const now=new Date();
  const current=new Date(now.getFullYear(),now.getMonth(),1);
  const end=new Date(2027,8,1); // แสดงล่วงหน้าถึง ก.ย. 2570
  const items=[];
  for(let d=new Date(haStart);d<=end;d.setMonth(d.getMonth()+1)){
    const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    items.push({
      year:d.getFullYear(),month:d.getMonth(),name:calendarMonths[d.getMonth()],
      short:`${shortMonths[d.getMonth()]} ${String(d.getFullYear()+543).slice(-2)}`,
      budgetYear:haBudgetYear(d),key,
      isCurrent:d.getFullYear()===current.getFullYear()&&d.getMonth()===current.getMonth(),
      isFuture:d>current
    });
  }
  if(!activeHaMonth)activeHaMonth=items.find(m=>m.isCurrent)||items[0];
  return items;
}
function docForMonth(type,m){return qualityDocs.filter(d=>{if(d.docType!==type)return false;const y=Number(d.budgetYear||0)===Number(m.budgetYear);if(!y)return false;if(d.monthName===m.name)return true;/* RCA is analysis of the previous reporting month; show it in the following HA review round too. */if(type==='rca'){const prev=new Date(m.year,m.month-1,1);return d.monthName===calendarMonths[prev.getMonth()]}return false})}
function matrixStatus(type,m){
  if(type==='risk')return{count:null,label:m.isFuture?'—':'เปิดทะเบียน',cls:m.isFuture?'matrix-empty future':'matrix-open'};
  if(type==='profile'&&m.key==='2026-09')return{count:1,label:'MASTER 2569',cls:'matrix-has ready_ha'};
  const list=docForMonth(type,m);if(!list.length)return{count:0,label:'—',cls:`matrix-empty ${m.isFuture?'future':''}`};
  const rank={draft:1,needs_edit:2,sent_review:3,approved:4,ready_ha:5};const best=[...list].sort((a,b)=>(rank[b.status]||0)-(rank[a.status]||0))[0];
  return{count:list.length,label:list.length>1?`${list.length} รายการ`:(qStatus[best.status]||'มีเอกสาร'),cls:`matrix-has ${best.status||'draft'}`};
}
function previousReportMonthLabel(m){
  const d=new Date(m.year,m.month-1,1);
  return `${shortMonths[d.getMonth()]} ${String(d.getFullYear()+543).slice(-2)}`;
}
function bestDocForMonth(type,m){
  const rank={draft:1,needs_edit:2,sent_review:3,approved:4,ready_ha:5};
  return [...docForMonth(type,m)].sort((a,b)=>(rank[b.status]||0)-(rank[a.status]||0))[0]||null;
}
function openHaWidget(type,m){
  if(['monthly','aar','rca'].includes(type)){
    const doc=bestDocForMonth(type,m);
    if(doc){openDoc(type,doc.id);return}
  }
  openModule(type);
}
function renderHaWorkMatrix(){
  const box=Q('#haWorkMatrix');if(!box)return;
  const items=haMonthItems();
  const m=activeHaMonth||items.find(x=>x.isCurrent)||items[0];
  const review=bestDocForMonth('monthly',m),aar=bestDocForMonth('aar',m),rca=bestDocForMonth('rca',m);
  const riskPeriod=previousReportMonthLabel(m);
  const reviewStatus=review?(qStatus[review.status]||'มีเอกสาร'):'ยังไม่มีเอกสาร';
  const reviewTitle=review?.title||'ยังไม่มีหัวข้อทบทวนในรอบนี้';
  const pdfLink=m.key==='2026-09'?'https://drive.google.com/file/d/1AleQxkdN7QK_TLFDI1jH6NwVGHMgWLdL/view':'';
  box.innerHTML=`
    <div class="ha-bento">
      <article class="ha-widget ha-widget-risk">
        <button type="button" class="ha-widget-main" data-widget-module="risk">
          <span class="ha-widget-icon">⚠</span>
          <span class="ha-widget-kicker">รายงานประจำรอบ</span>
          <h3>รายงานความเสี่ยง</h3>
          <strong class="ha-widget-value">ข้อมูล ${riskPeriod}</strong>
          <p>รวมความเสี่ยงที่หน่วยงานรายงานเอง และรายการที่ดึงจาก HA เพื่อสรุปในรอบ ${m.short}</p>
          <span class="ha-widget-cta">เปิดอ่านรายงาน →</span>
        </button>
      </article>
      <article class="ha-widget ha-widget-profile">
        <button type="button" class="ha-widget-main" data-widget-module="profile">
          <span class="ha-widget-icon">▥</span>
          <span class="ha-widget-kicker">ฐานข้อมูลกลาง</span>
          <h3>Risk Profile</h3>
          <strong class="ha-widget-value">MASTER 2569</strong>
          <p>ใช้ไฟล์ Master เดิมต่อเนื่อง ไม่ต้องสร้างใหม่ทุกเดือน</p>
          <span class="ha-widget-cta">เปิดดู Risk Profile →</span>
        </button>
        <a class="ha-widget-link" href="https://docs.google.com/spreadsheets/d/1D35j021AG5trb6IBqMCT6DkyFMdlqF6Q/edit" target="_blank" rel="noopener">เปิด Master ใน Drive</a>
      </article>
      <article class="ha-widget ha-widget-review">
        <button type="button" class="ha-widget-main" data-widget-module="monthly">
          <span class="ha-widget-icon">▤</span>
          <span class="ha-widget-kicker">ทบทวนประจำเดือน</span>
          <h3>ทบทวนความเสี่ยง</h3>
          <strong class="ha-widget-value">${E(reviewStatus)}</strong>
          <p class="ha-widget-doc-title">${E(reviewTitle)}</p>
          <span class="ha-widget-cta">${review?'เปิดอ่านเอกสาร →':'สร้างเรื่องใหม่ →'}</span>
        </button>
        ${pdfLink?'<a class="ha-widget-link review-pdf-link" href="'+pdfLink+'" target="_blank" rel="noopener">▣ PDF เสนอหัวหน้า</a>':''}
      </article>
      <article class="ha-widget ha-widget-small ha-widget-aar">
        <button type="button" class="ha-widget-main" data-widget-module="aar">
          <span class="ha-widget-icon">↻</span>
          <span class="ha-widget-kicker">After Action Review</span>
          <h3>AAR</h3>
          <strong class="ha-widget-value">${aar?'1 รายการ':'ยังไม่มี'}</strong>
          <p>${aar?E(aar.title):'จะแสดงเมื่อมีเหตุการณ์ที่ต้องทบทวน'}</p>
          <span class="ha-widget-cta">${aar?'เปิดอ่าน →':'เปิดแบบฟอร์ม →'}</span>
        </button>
      </article>
      <article class="ha-widget ha-widget-small ha-widget-rca">
        <button type="button" class="ha-widget-main" data-widget-module="rca">
          <span class="ha-widget-icon">◎</span>
          <span class="ha-widget-kicker">Root Cause Analysis</span>
          <h3>RCA</h3>
          <strong class="ha-widget-value">${rca?'1 รายการ':'ยังไม่มี'}</strong>
          <p>${rca?E(rca.title):'จะแสดงเฉพาะรอบที่มีเรื่องต้องวิเคราะห์สาเหตุ'}</p>
          <span class="ha-widget-cta">${rca?'เปิดอ่าน →':'เปิดแบบฟอร์ม →'}</span>
        </button>
      </article>
    </div>`;
  box.querySelectorAll('[data-widget-module]').forEach(b=>b.onclick=()=>openHaWidget(b.dataset.widgetModule,m));
  const strip=Q('#haMonthStrip');
  if(strip){
    strip.innerHTML=items.map(x=>`<button type="button" class="ha-month-chip ${x.key===m.key?'selected':''}" data-ha-key="${x.key}" data-ha-name="${x.name}" data-ha-fy="${x.budgetYear}"><b>${x.short}</b><small>ปีงบ ${x.budgetYear}</small></button>`).join('');
    strip.querySelectorAll('.ha-month-chip').forEach(b=>b.onclick=()=>selectHaMonth(b.dataset.haKey,b.dataset.haName,Number(b.dataset.haFy)));
  }
  const title=Q('#haPeriodTitle'),sub=Q('#haPeriodSub');
  if(title)title.textContent=m.short;if(sub)sub.textContent=`ปีงบประมาณ ${m.budgetYear}`;
  applyHaMonthSelection();
}
function selectHaMonth(key,name,budgetYear){
  const item=haMonthItems().find(m=>m.key===key);
  activeHaMonth=item||{key,name,budgetYear};
  renderHaWorkMatrix();
  renderRecent();
}
function applyHaMonthSelection(){
  if(!activeHaMonth)return;
  const label=Q('#haMonthCurrentLabel');if(label)label.textContent=`• ${activeHaMonth.name} / ปีงบประมาณ ${activeHaMonth.budgetYear}`;
  const mf=Q('#monthlyForm');if(mf){if(mf.elements.monthName)mf.elements.monthName.value=activeHaMonth.name;if(mf.elements.budgetYear)mf.elements.budgetYear.value=activeHaMonth.budgetYear}
  const pm=Q('#profileMonth'),py=Q('#profileYear');if(pm)pm.value=activeHaMonth.name;if(py)py.value=activeHaMonth.budgetYear;
}
async function loadQuality(){try{const r=await fetch(QAPI+'/quality/list');const d=await r.json();qualityDocs=d.items||[];seedQualityDocs.forEach(s=>{if(!qualityDocs.some(d=>d.docType===s.docType&&d.monthName===s.monthName&&Number(d.budgetYear)===Number(s.budgetYear)&&d.title===s.title))qualityDocs.push(s)});renderRecent();renderHaWorkMatrix();['monthly','rca','aar'].forEach(renderDocList)}catch(e){qualityDocs=[...seedQualityDocs];renderRecent();renderHaWorkMatrix();['monthly','rca','aar'].forEach(renderDocList);console.warn(e)}}
function renderRecent(){
  const box=Q('#qualityRecent');if(!box)return;
  const m=activeHaMonth||haMonthItems().find(x=>x.isCurrent)||haMonthItems()[0];
  const monthDocs=qualityDocs.filter(d=>d.monthName===m.name&&Number(d.budgetYear||0)===Number(m.budgetYear));
  const list=monthDocs.length?monthDocs:qualityDocs.slice(0,4);
  if(!list.length){box.className='empty';box.textContent='ยังไม่มีเอกสาร HA';return}
  box.className='recent-doc-grid';
  box.innerHTML=list.slice(0,6).map(d=>`<button type="button" class="recent-doc-card" data-recent-id="${d.id}" data-recent-type="${d.docType}"><span class="recent-doc-type">${E(typeName[d.docType]||d.docType)}</span><b>${E(d.title)}</b><small>${E(d.monthName||'-')} • <span class="doc-status ${d.status}">${qStatus[d.status]||d.status}</span></small></button>`).join('');
  box.querySelectorAll('.recent-doc-card').forEach(b=>b.onclick=()=>{const d=qualityDocs.find(x=>String(x.id)===String(b.dataset.recentId));if(!d)return;if(['monthly','rca','aar'].includes(d.docType))openDoc(d.docType,d.id);else openModule(d.docType)});
}
function renderDocList(type){const box=Q(`#${type}List`);if(!box)return;const list=qualityDocs.filter(d=>d.docType===type);box.innerHTML=list.length?list.map(d=>`<button type="button" class="doc-item" data-doc-id="${d.id}" data-doc-type="${type}"><strong>${E(d.docNo)}</strong><b>${E(d.title)}</b><small>${E(d.monthName||'')} • ${qStatus[d.status]||d.status}</small></button>`).join(''):'<div class="empty small-empty">ยังไม่มีเอกสาร</div>';box.querySelectorAll('.doc-item').forEach(b=>b.onclick=()=>openDoc(type,b.dataset.docId))}
function formFor(type){return Q(`#${type}Form`)}
function resetDoc(type){const f=formFor(type);f.reset();f.elements.docId.value='';if(f.elements.authorName)f.elements.authorName.value=author;if(f.elements.reviewDate)f.elements.reviewDate.value=today();if(f.elements.budgetYear)f.elements.budgetYear.value=activeHaMonth?.budgetYear||2569;if(type==='monthly'){if(f.elements.monthName&&activeHaMonth)f.elements.monthName.value=activeHaMonth.name;if(f.elements.count)f.elements.count.value='-';f.elements.riskType.value='4'}setStatus(type,'draft',null);f.querySelectorAll('textarea').forEach(t=>{if(t.name!=='reviewerNote')t.value=''})}
QA('.new-doc').forEach(b=>b.onclick=()=>{resetDoc(b.dataset.type);openModule(b.dataset.type)})
function setStatus(type,status,doc){const el=Q(`#${type}Status`);el.textContent=qStatus[status]||status;el.className=`doc-status ${status}`;const signed=Q(`#${type}Signed`);signed.textContent=doc?.signedAt?`ยืนยันเมื่อ ${thaiDateTime(doc.signedAt)}`:''}
function openDoc(type,id){const doc=qualityDocs.find(d=>d.id===id);if(!doc)return;const f=formFor(type),data=doc.formData||{};f.reset();f.elements.docId.value=doc.seed?'':doc.id;Object.entries(data).forEach(([k,v])=>{if(f.elements[k])f.elements[k].value=v??''});if(f.elements.title)f.elements.title.value=doc.title||data.title||'';if(f.elements.monthName)f.elements.monthName.value=doc.monthName||data.monthName||'';if(f.elements.budgetYear)f.elements.budgetYear.value=doc.budgetYear||2569;if(f.elements.authorName)f.elements.authorName.value=doc.authorName||author;if(f.elements.reviewerNote)f.elements.reviewerNote.value=doc.reviewerNote||'';setStatus(type,doc.status,doc);openModule(type)}
function collect(type){const f=formFor(type),fd=new FormData(f);const all=Object.fromEntries(fd.entries());const id=all.docId;delete all.docId;const title=String(all.title||'').trim();const monthName=type==='monthly'?String(all.monthName||''):(['rca','aar'].includes(type)?String(activeHaMonth?.name||''):'');const budgetYear=Number(all.budgetYear||activeHaMonth?.budgetYear||2569);delete all.budgetYear;return{id,title,monthName,budgetYear,formData:all}}
async function saveQuality(type,status){const payload=collect(type);if(!payload.title){alert('กรุณากรอกเรื่องก่อนบันทึก');return}const isUpdate=!!payload.id;const body={docType:type,title:payload.title,monthName:payload.monthName,budgetYear:payload.budgetYear,formData:payload.formData,status,authorName:author};if(['needs_edit','approved','ready_ha'].includes(status)){body.reviewerName=reviewer;body.reviewerNote=formFor(type).elements.reviewerNote?.value||''}if(['approved','ready_ha'].includes(status))body.signedBy=reviewer;const url=isUpdate?QAPI+'/quality/'+payload.id:QAPI+'/quality/create';try{const r=await fetch(url,{method:isUpdate?'PUT':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});const d=await r.json();if(!r.ok)throw new Error(d.error||'save_failed');if(!isUpdate)formFor(type).elements.docId.value=d.id;await loadQuality();openDoc(type,d.id||payload.id)}catch(e){alert('บันทึกไม่สำเร็จ กรุณาลองใหม่')}}
QA('.quality-form[data-type]').forEach(f=>{const type=f.dataset.type;const saved=()=>!!f.elements.docId.value;f.querySelector('.save-draft').onclick=()=>saveQuality(type,'draft');f.querySelector('.send-review').onclick=()=>saveQuality(type,'sent_review');f.querySelector('.need-edit').onclick=()=>saved()?saveQuality(type,'needs_edit'):alert('กรุณาบันทึกและส่งหัวหน้าตรวจก่อน');f.querySelector('.approve-doc').onclick=()=>{if(!saved()){alert('กรุณาบันทึกและส่งหัวหน้าตรวจก่อน');return}if(confirm(`ยืนยันว่าหัวหน้ากลุ่มงานตรวจเอกสารแล้ว และให้แสดงชื่อ ${reviewer} เป็นการลงชื่อรับรอง?`))saveQuality(type,'approved')};f.querySelector('.ready-ha').onclick=()=>saved()?saveQuality(type,'ready_ha'):alert('กรุณาบันทึกเอกสารก่อน');f.querySelector('.print-doc').onclick=()=>printDoc(type)})
function val(f,n){return E(f.elements[n]?.value||'')}
function para(v){return E(v||'').replace(/\n/g,'<br>')}
function printDoc(type){const f=formFor(type);if(!String(f.elements.title?.value||'').trim()){alert('กรุณากรอกเรื่องก่อนพิมพ์');return}const statusDoc=qualityDocs.find(d=>d.id===f.elements.docId.value);const signature=statusDoc?.signedAt?`<div class="signed-mark">ลงชื่ออิเล็กทรอนิกส์ / ตรวจแล้ว<br><b>${reviewer}</b><br><small>${thaiDateTime(statusDoc.signedAt)}</small></div>`:'<div class="sign-line">ลงชื่อ ............................................................</div>';
let html='';if(type==='monthly'){html=`<div class="print-sheet"><h2>ตารางสรุปการทบทวนความเสี่ยง (Risk Review Summary Table)</h2><p class="center">ประจำเดือน <b>${val(f,'monthName')} ${val(f,'budgetYear')}</b></p><table class="print-table monthly-print-six"><thead><tr><th>เรื่อง</th><th>จำนวนครั้ง</th><th>ประเภท</th><th>วิธีแก้ไข (อุบัติการณ์)</th><th>วิธีป้องกัน (อุบัติการณ์)</th><th>ผลการแก้ไขป้องกัน</th></tr></thead><tbody><tr><td>${para(f.elements.title.value)}</td><td>${val(f,'count')}</td><td>${val(f,'riskType')}</td><td>${para(f.elements.correction.value)}</td><td>${para(f.elements.prevention.value)}</td><td>${para(f.elements.result.value)}</td></tr></tbody></table><p class="center small-note">ประเภทของความเสี่ยง 1. ตาม Risk Profile 2. ความเสี่ยงทางคลินิก 3. ความเสี่ยงทางคลินิกเฉพาะโรค 4. ความเสี่ยงทั่วไป</p><p>วันที่ทบทวน: ${val(f,'reviewDate')}</p>${signatureBlock(signature)}</div>`}else if(type==='rca'){html=`<div class="print-sheet"><h2>การวิเคราะห์หาสาเหตุที่แท้จริง (Root Cause Analysis; RCA)</h2><p>เลขที่ความเสี่ยง ${val(f,'riskNo')} &nbsp;&nbsp; หน่วยงาน ${val(f,'unit')}</p><p>วันที่เกิดเหตุ ${val(f,'incidentDate')} &nbsp;&nbsp; วันที่ทบทวน ${val(f,'reviewDate')}</p><h3>เรื่อง ${val(f,'title')}</h3><p>ระดับคลินิก: ${val(f,'clinicalSeverity')} &nbsp;&nbsp; ระดับไม่ใช่คลินิก: ${val(f,'generalSeverity')}</p><p>รูปแบบการวิเคราะห์: ${val(f,'analysisScope')}</p>${printSection('ผู้ร่วมวิเคราะห์',f.elements.participants.value)}${printSection('1. Story & Timeline',f.elements.story.value)}${printSection('2. Potential change / Unsafe act / สาเหตุที่แท้จริง',f.elements.rootCause.value)}${printSection('3. Listen to voice of staff',f.elements.staffVoice.value)}${printSection('4. Creative Solution',f.elements.solution.value)}${printSection('5. Swiss cheese — โชคดี',f.elements.lucky.value)}${printSection('5. Swiss cheese — โชคร้าย',f.elements.unlucky.value)}${printSection('6. สรุปผลการวิเคราะห์ / แนวทางที่แก้ไขนำไปใช้',f.elements.conclusion.value)}${f.elements.causeComment?.value?printSection('ประเด็นข้อผิดพลาดที่พบ / ความเห็นเพิ่มเติม',f.elements.causeComment.value):''}${signatureBlock(signature)}</div>`}else{html=`<div class="print-sheet"><h2>การทบทวนภายหลังการเกิดอุบัติการณ์/ความเสี่ยง<br>(After Action Review : AAR)</h2><p>เลขที่ความเสี่ยง ${val(f,'riskNo')} &nbsp;&nbsp; หน่วยงาน ${val(f,'unit')}</p><p>วันที่เกิดเหตุ ${val(f,'incidentDate')} &nbsp;&nbsp; วันที่ทบทวน ${val(f,'reviewDate')}</p><h3>เรื่อง ${val(f,'title')}</h3><p>ระดับคลินิก/ข้อร้องเรียน: ${val(f,'clinicalSeverity')} &nbsp;&nbsp; ระดับไม่ใช่คลินิก: ${val(f,'generalSeverity')}</p>${printSection('ผู้เข้าร่วมทบทวน',f.elements.participants.value)}${printSection('ประเด็นปัญหา / ความเสี่ยง',f.elements.issue.value)}${printSection('สรุปแนวทางการปรับเปลี่ยน / พัฒนา',f.elements.development.value)}${printSection('ผลการพัฒนา',f.elements.result.value)}${signatureBlock(signature)}</div>`}Q('#qualityPrint').innerHTML=html;document.body.classList.add('printing-quality');window.print()}
function printSection(title,text){return `<section class="print-section"><h4>${E(title)}</h4><p>${para(text)}</p></section>`}
function signatureBlock(signature){return `<div class="print-signatures"><div><p>ผู้จัดทำ</p><div class="sign-line">ลงชื่อ ............................................................</div><b>(${author})</b><br><span>เจ้าพนักงานพัสดุ</span></div><div><p>ตรวจสอบ / รับทราบ</p>${signature}<b>(${reviewer})</b><br><span>หัวหน้ากลุ่มงานพัสดุ</span></div></div>`}
window.onafterprint=()=>document.body.classList.remove('printing-quality');Q('#refreshBtn').addEventListener('click',loadQuality);qualityDocs=[...seedQualityDocs];renderHaWorkMatrix();renderRecent();['monthly','rca','aar'].forEach(resetDoc);loadQuality();