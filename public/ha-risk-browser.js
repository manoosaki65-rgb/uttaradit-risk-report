(function(){
  const data=Array.isArray(window.HA_AUGUST_RISKS)?window.HA_AUGUST_RISKS:[];
  let filter='all', search='', selected='';

  const $=s=>document.querySelector(s);
  const esc=(v='')=>String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const fmtDate=(v)=>{
    if(!v)return '-';
    const d=new Date(String(v).replace(' ','T'));
    if(Number.isNaN(d.getTime()))return esc(v);
    return new Intl.DateTimeFormat('th-TH',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(d);
  };
  const filtered=()=>data.filter(r=>{
    const dirOk=filter==='all'||(filter==='incoming'&&r.direction==='หน่วยงานอื่นรายงานถึง')||(filter==='self'&&r.direction==='หน่วยงานรายงานเอง');
    const k=search.trim().toLowerCase();
    const txt=`${r.riskNo} ${r.title} ${r.reporterUnit} ${r.relatedUnits} ${r.description}`.toLowerCase();
    return dirOk&&(!k||txt.includes(k));
  });

  function renderList(){
    const box=$('#haRiskList'), count=$('#haRiskListCount'); if(!box)return;
    const list=filtered();
    if(count)count.textContent=`${list.length} รายการ`;
    if(!list.length){box.innerHTML='<div class="empty">ไม่พบรายการที่ตรงกับเงื่อนไข</div>';return}
    box.innerHTML=list.map(r=>`
      <button type="button" class="ha-risk-row ${selected===r.riskNo?'selected':''}" data-risk-no="${esc(r.riskNo)}">
        <div class="ha-risk-row-top">
          <span class="ha-risk-no">#${esc(r.riskNo)}</span>
          <span class="ha-risk-direction ${r.direction==='หน่วยงานรายงานเอง'?'self':'incoming'}">${r.direction==='หน่วยงานรายงานเอง'?'พัสดุรายงานเอง':'ถึงพัสดุ'}</span>
        </div>
        <b>${esc(r.title)}</b>
        <small>${esc(r.reporterUnit)} • รายงาน ${fmtDate(r.reportDate)}</small>
      </button>`).join('');
    box.querySelectorAll('.ha-risk-row').forEach(b=>b.onclick=()=>{
      selected=b.dataset.riskNo;
      renderList();
      renderDetail(data.find(r=>String(r.riskNo)===String(selected)));
    });
  }

  function renderDetail(r){
    const box=$('#haRiskDetail');if(!box)return;
    if(!r){box.innerHTML='<div class="empty">เลือกชื่อเรื่องทางซ้ายเพื่ออ่านรายละเอียด</div>';return}
    const statusClass=String(r.status||'').includes('ยังไม่ได้')?'pending':'done';
    box.innerHTML=`
      <div class="ha-risk-detail-head">
        <div><span class="badge">Risk #${esc(r.riskNo)}</span><h2>${esc(r.title)}</h2></div>
        <span class="ha-risk-status ${statusClass}">${esc(r.status||'ไม่ระบุสถานะ')}</span>
      </div>
      <div class="ha-risk-meta">
        <div><span>วันที่รายงาน</span><strong>${fmtDate(r.reportDate)}</strong></div>
        <div><span>วันที่เกิดเหตุ</span><strong>${fmtDate(r.incidentDate)}</strong></div>
        <div><span>หน่วยงานที่รายงาน</span><strong>${esc(r.reporterUnit||'-')}</strong></div>
        <div><span>ระดับ</span><strong>${esc(r.severity||'-')}</strong></div>
      </div>
      <section class="ha-risk-text"><h3>ประเภทความเสี่ยง</h3><p>${esc(r.type||'-')}</p></section>
      <section class="ha-risk-text"><h3>หน่วยงานที่เกี่ยวข้อง</h3><p>${esc(r.relatedUnits||'-')}</p></section>
      <section class="ha-risk-text emphasis"><h3>รายละเอียดเหตุการณ์</h3><p>${esc(r.description||'-')}</p></section>
      <section class="ha-risk-text solution"><h3>แนวทางการแก้ไขเบื้องต้น</h3><p>${esc(r.solution||'-')}</p></section>
      <div class="ha-risk-source-note">ข้อมูลจากไฟล์ HA: Form Risk (1 ต.ค. 68 - 16 ก.ย. 69).xlsx</div>`;
    if(window.innerWidth<900)box.scrollIntoView({behavior:'smooth',block:'start'});
  }

  function init(){
    if(!$('#haRiskList'))return;
    const total=data.length;
    const incoming=data.filter(x=>x.direction==='หน่วยงานอื่นรายงานถึง').length;
    const self=data.filter(x=>x.direction==='หน่วยงานรายงานเอง').length;
    const accounting=data.filter(x=>x.reporterUnit==='กลุ่มงานบัญชี').length;
    [['#haRiskTotal',total],['#haRiskIncoming',incoming],['#haRiskSelf',self],['#haRiskAccounting',accounting]].forEach(([id,v])=>{const e=$(id);if(e)e.textContent=v});
    document.querySelectorAll('.ha-risk-filter').forEach(b=>b.onclick=()=>{
      filter=b.dataset.riskFilter||'all';
      document.querySelectorAll('.ha-risk-filter').forEach(x=>x.classList.toggle('active',x===b));
      selected='';renderList();renderDetail(null);
    });
    const s=$('#haRiskSearch');if(s)s.oninput=()=>{search=s.value;selected='';renderList();renderDetail(null)};
    renderList();
  }
  init();
})();