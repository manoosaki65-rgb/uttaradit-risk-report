import { neon } from '@neondatabase/serverless';

const j=(x,s=200)=>new Response(JSON.stringify(x),{status:s,headers:{"content-type":"application/json; charset=utf-8"}});
const now=()=>new Date().toISOString(),uid=()=>crypto.randomUUID(),caseNo=r=>`RISK-${new Date(r.created_at).getUTCFullYear()+543}-${String(r.seq).padStart(3,"0")}`;
const riskOut=r=>({...r,caseNo:caseNo(r),incidentDate:r.incident_date,incidentTime:r.incident_time,riskGroup:r.risk_group,safetyCategory:r.safety_category,riskCode:r.risk_code,eventTitle:r.event_title,eventDetail:r.event_detail,immediateAction:r.immediate_action,isPriority:!!r.is_priority,review:{reviewer:r.reviewer,reviewDate:r.review_date,rootCause:r.root_cause,contributingFactors:r.contributing_factors,correctiveAction:r.corrective_action,owner:r.owner,dueDate:r.due_date,outcome:r.outcome,residualSeverity:r.residual_severity,followUpDate:r.follow_up_date,lessonsLearned:r.lessons_learned}});

export default{async fetch(req,env){const u=new URL(req.url),p=u.pathname,m=req.method;try{
const sql=env.DATABASE_URL?neon(env.DATABASE_URL):null;
if(p==="/api/health")return j({ok:true,backend:sql?"neon":"d1"});

if(p==="/api/migration-status"&&m==="GET"){
  if(!sql)return j({error:"DATABASE_URL not configured"},500);
  const nr=await sql`SELECT COUNT(*)::int n FROM risks`, nq=await sql`SELECT COUNT(*)::int n FROM quality_documents`;
  const dr=await env.DB.prepare("SELECT COUNT(*) n FROM risks").first(),dq=await env.DB.prepare("SELECT COUNT(*) n FROM quality_documents").first();
  return j({backend:"comparison",neon:{risks:Number(nr?.[0]?.n||0),quality_documents:Number(nq?.[0]?.n||0)},d1:{risks:Number(dr?.n||0),quality_documents:Number(dq?.n||0)}});
}

if(p==="/api/migrate-d1-to-neon"&&m==="GET"){
  if(!sql)return j({error:"DATABASE_URL not configured"},500);
  const {results:risks}=await env.DB.prepare("SELECT * FROM risks ORDER BY seq").all();
  const {results:docs}=await env.DB.prepare("SELECT * FROM quality_documents ORDER BY created_at").all();
  let risksInserted=0,qualityInserted=0;
  if(risks.length){
    const rr=await sql.query(
      `WITH src AS (
        SELECT * FROM jsonb_to_recordset($1::jsonb) AS x(
          id uuid,seq bigint,incident_date date,incident_time time,reporter text,unit text,location text,risk_group text,safety_category text,risk_code text,event_title text,event_detail text,immediate_action text,severity text,is_priority boolean,status text,reviewer text,review_date date,root_cause text,contributing_factors text,corrective_action text,owner text,due_date date,outcome text,residual_severity text,follow_up_date date,lessons_learned text,created_by text,created_at timestamptz,updated_at timestamptz
        )
      )
      INSERT INTO risks(id,seq,incident_date,incident_time,reporter,unit,location,risk_group,safety_category,risk_code,event_title,event_detail,immediate_action,severity,is_priority,status,reviewer,review_date,root_cause,contributing_factors,corrective_action,owner,due_date,outcome,residual_severity,follow_up_date,lessons_learned,created_by,created_at,updated_at)
      SELECT id,seq,incident_date,incident_time,COALESCE(reporter,''),unit,COALESCE(location,''),risk_group,COALESCE(safety_category,''),COALESCE(risk_code,''),event_title,event_detail,COALESCE(immediate_action,''),severity,COALESCE(is_priority,false),COALESCE(status,'reported'),COALESCE(reviewer,''),review_date,COALESCE(root_cause,''),COALESCE(contributing_factors,''),COALESCE(corrective_action,''),COALESCE(owner,''),due_date,COALESCE(outcome,''),COALESCE(residual_severity,''),follow_up_date,COALESCE(lessons_learned,''),COALESCE(created_by,''),created_at,updated_at
      FROM src ON CONFLICT(id) DO NOTHING RETURNING id`,
      [JSON.stringify(risks)]
    );
    risksInserted=rr.length;
  }
  if(docs.length){
    const normalized=docs.map(d=>({...d,form_data:(()=>{try{return typeof d.form_data==="string"?JSON.parse(d.form_data):d.form_data||{}}catch{return {}}})()}));
    const dd=await sql.query(
      `WITH src AS (
        SELECT * FROM jsonb_to_recordset($1::jsonb) AS x(
          id uuid,doc_type text,doc_no text,budget_year int,month_name text,title text,form_data jsonb,status text,author_name text,reviewer_name text,reviewer_note text,reviewed_at timestamptz,signed_by text,signed_at timestamptz,created_at timestamptz,updated_at timestamptz
        )
      )
      INSERT INTO quality_documents(id,doc_type,doc_no,budget_year,month_name,title,form_data,status,author_name,reviewer_name,reviewer_note,reviewed_at,signed_by,signed_at,created_at,updated_at)
      SELECT id,doc_type,doc_no,budget_year,month_name,COALESCE(title,''),COALESCE(form_data,'{}'::jsonb),COALESCE(status,'draft'),author_name,reviewer_name,reviewer_note,reviewed_at,signed_by,signed_at,created_at,updated_at
      FROM src ON CONFLICT(id) DO NOTHING RETURNING id`,
      [JSON.stringify(normalized)]
    );
    qualityInserted=dd.length;
  }
  const nr=await sql`SELECT COUNT(*)::int n FROM risks`, nq=await sql`SELECT COUNT(*)::int n FROM quality_documents`;
  return j({ok:true,backend:"neon",migrated:{risksInserted,qualityInserted},neon:{risks:Number(nr?.[0]?.n||0),quality_documents:Number(nq?.[0]?.n||0)},d1:{risks:risks.length,quality_documents:docs.length}});
}

if(p==="/api/risks/list"&&m==="GET"){
  if(!sql)return j({error:"DATABASE_URL not configured"},500);
  const results=await sql`SELECT * FROM risks ORDER BY seq DESC`;
  return j({items:results.map(riskOut),risks:results.map(riskOut),backend:"neon"});
}

if(p==="/api/risks/create"&&m==="POST"){
  if(!sql)return j({error:"DATABASE_URL not configured"},500);
  const b=await req.json();
  if(!b.incidentDate||!String(b.unit||"").trim()||!String(b.eventTitle||"").trim()||!String(b.eventDetail||"").trim())return j({error:"missing_required_fields"},400);
  if(!["clinical","general"].includes(b.riskGroup)||(b.riskGroup==="clinical"?!/^[A-I]$/.test(b.severity||""):!/^[1-5]$/.test(b.severity||"")))return j({error:"invalid_risk_classification"},400);
  const n=await sql`SELECT COALESCE(MAX(seq),0)+1 n FROM risks`,id=uid(),t=now(),seq=Number(n?.[0]?.n||1);
  const rows=await sql`INSERT INTO risks(id,seq,incident_date,incident_time,reporter,unit,location,risk_group,safety_category,risk_code,event_title,event_detail,immediate_action,severity,is_priority,status,created_by,created_at,updated_at)
    VALUES(${id},${seq},${b.incidentDate}::date,${b.incidentTime||null}::time,${String(b.reporter||"")},${String(b.unit).trim()},${String(b.location||"")},${b.riskGroup},${String(b.safetyCategory||"")},${String(b.riskCode||"")},${String(b.eventTitle).trim()},${String(b.eventDetail).trim()},${String(b.immediateAction||"")},${String(b.severity)},${!!b.isPriority},'reported','',${t}::timestamptz,${t}::timestamptz) RETURNING *`;
  return j({id,caseNo:caseNo(rows[0]),backend:"neon"},201);
}

let x=p.match(/^\/api\/risks\/([^/]+)$/);
if(x&&m==="PUT"){
  if(!sql)return j({error:"DATABASE_URL not configured"},500);
  const b=await req.json(),v=b.review||{};
  if(!String(v.reviewer||"").trim()||!String(v.rootCause||"").trim()||!String(v.correctiveAction||"").trim())return j({error:"missing_review_fields"},400);
  if(!["reviewing","monitoring","closed"].includes(b.status))return j({error:"invalid_status"},400);
  const t=now();
  const rows=await sql`UPDATE risks SET reviewer=${String(v.reviewer).trim()},review_date=${v.reviewDate||null}::date,root_cause=${String(v.rootCause).trim()},contributing_factors=${String(v.contributingFactors||"")},corrective_action=${String(v.correctiveAction).trim()},owner=${String(v.owner||"")},due_date=${v.dueDate||null}::date,outcome=${String(v.outcome||"")},residual_severity=${String(v.residualSeverity||"")},follow_up_date=${v.followUpDate||null}::date,lessons_learned=${String(v.lessonsLearned||"")},status=${b.status},updated_at=${t}::timestamptz WHERE id=${x[1]}::uuid RETURNING *`;
  if(!rows.length)return j({error:"not_found"},404);
  return j({id:rows[0].id,caseNo:caseNo(rows[0]),status:rows[0].status,backend:"neon"});
}

if(p==="/api/quality/list"&&m==="GET"){
  if(!sql)return j({error:"DATABASE_URL not configured"},500);
  let results=await sql`SELECT * FROM quality_documents ORDER BY updated_at DESC`;
  results=results.map(r=>({...r,docNo:r.doc_no,budgetYear:r.budget_year,monthName:r.month_name,formData:r.form_data||{},authorName:r.author_name,reviewerName:r.reviewer_name,reviewerNote:r.reviewer_note,reviewedAt:r.reviewed_at,signedBy:r.signed_by,signedAt:r.signed_at}));
  return j({items:results,documents:results,backend:"neon"});
}

if(p==="/api/quality/create"&&m==="POST"){
  if(!sql)return j({error:"DATABASE_URL not configured"},500);
  const b=await req.json(),typ=String(b.docType||"");
  if(!["monthly","rca","aar","profile"].includes(typ))return j({error:"invalid_type"},400);
  const by=Number(b.budgetYear||2569),title=String(b.title||"").trim();
  if(!title)return j({error:"title_required"},400);
  const n=await sql`SELECT COUNT(*)::int n FROM quality_documents WHERE doc_type=${typ} AND budget_year=${by}`;
  const prefix=typ==="monthly"?"REV":typ==="profile"?"RISK-PROFILE":typ.toUpperCase(),docNo=`${prefix}-${by}-${String(Number(n?.[0]?.n||0)+1).padStart(3,"0")}`,id=uid(),t=now(),st=String(b.status||"draft");
  await sql`INSERT INTO quality_documents(id,doc_type,doc_no,budget_year,month_name,title,form_data,status,author_name,created_at,updated_at)
    VALUES(${id},${typ},${docNo},${by},${String(b.monthName||"")},${title},${JSON.stringify(b.formData||{})}::jsonb,${st},${String(b.authorName||"นายมนูศักดิ์ อยู่บาง")},${t}::timestamptz,${t}::timestamptz)`;
  return j({id,docNo,status:st,backend:"neon"},201);
}

x=p.match(/^\/api\/quality\/([^/]+)$/);
if(x&&m==="PUT"){
  if(!sql)return j({error:"DATABASE_URL not configured"},500);
  const b=await req.json(),cur=await sql`SELECT * FROM quality_documents WHERE id=${x[1]}::uuid`;
  if(!cur.length)return j({error:"not_found"},404);
  const r=cur[0],allowed=new Set(["draft","sent_review","needs_edit","approved","ready_ha"]),st=allowed.has(String(b.status||""))?String(b.status):r.status,t=now(),reviewed=["needs_edit","approved","ready_ha"].includes(st)?t:r.reviewed_at,signed=["approved","ready_ha"].includes(st)?t:r.signed_at,fd=b.formData??r.form_data??{};
  await sql`UPDATE quality_documents SET month_name=${String(b.monthName??r.month_name??"")},title=${String(b.title??r.title??"")},form_data=${JSON.stringify(fd||{})}::jsonb,status=${st},reviewer_name=${b.reviewerName??r.reviewer_name},reviewer_note=${b.reviewerNote??r.reviewer_note},reviewed_at=${reviewed}::timestamptz,signed_by=${b.signedBy??r.signed_by},signed_at=${signed}::timestamptz,updated_at=${t}::timestamptz WHERE id=${x[1]}::uuid`;
  return j({id:x[1],docNo:r.doc_no,status:st,reviewerName:b.reviewerName??r.reviewer_name,signedBy:b.signedBy??r.signed_by,signedAt:signed,backend:"neon"});
}

return env.ASSETS.fetch(req)}catch(e){return j({error:e.message},500)}}};