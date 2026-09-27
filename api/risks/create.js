import { db } from 'hatchable';

export const access = 'member';
export const methods = ['POST'];

function validSeverity(group, severity) {
  return group === 'clinical' ? /^[A-I]$/.test(severity || '') : /^[1-5]$/.test(severity || '');
}

export default async function (req, res) {
  const b = req.body || {};
  if (!b.incidentDate || !String(b.unit || '').trim() || !String(b.eventTitle || '').trim() || !String(b.eventDetail || '').trim()) {
    return res.status(400).json({ error: 'missing_required_fields' });
  }
  if (!['clinical', 'general'].includes(b.riskGroup) || !validSeverity(b.riskGroup, b.severity)) {
    return res.status(400).json({ error: 'invalid_risk_classification' });
  }
  const { rows } = await db.query(
    'INSERT INTO risks (incident_date, incident_time, reporter, unit, location, risk_group, safety_category, risk_code, event_title, event_detail, immediate_action, severity, is_priority, created_by) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *',
    [b.incidentDate, b.incidentTime || null, String(b.reporter || ''), String(b.unit).trim(), String(b.location || ''), b.riskGroup, String(b.safetyCategory || ''), String(b.riskCode || ''), String(b.eventTitle).trim(), String(b.eventDetail).trim(), String(b.immediateAction || ''), String(b.severity), Boolean(b.isPriority), req.member?.id || '']
  );
  const row = rows[0];
  const year = new Date(row.created_at).getFullYear() + 543;
  res.status(201).json({ id: row.id, caseNo: `RISK-${year}-${String(row.seq).padStart(3, '0')}` });
}