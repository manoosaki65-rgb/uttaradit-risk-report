import { db } from 'hatchable';

export const access = 'member';
export const methods = ['GET'];

function shape(row) {
  const year = new Date(row.created_at).getFullYear() + 543;
  return {
    id: row.id,
    caseNo: `RISK-${year}-${String(row.seq).padStart(3, '0')}`,
    incidentDate: row.incident_date,
    incidentTime: row.incident_time || '',
    reporter: row.reporter,
    unit: row.unit,
    location: row.location,
    riskGroup: row.risk_group,
    safetyCategory: row.safety_category,
    riskCode: row.risk_code,
    eventTitle: row.event_title,
    eventDetail: row.event_detail,
    immediateAction: row.immediate_action,
    severity: row.severity,
    isPriority: row.is_priority,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    review: {
      reviewer: row.reviewer,
      reviewDate: row.review_date || '',
      rootCause: row.root_cause,
      contributingFactors: row.contributing_factors,
      correctiveAction: row.corrective_action,
      owner: row.owner,
      dueDate: row.due_date || '',
      outcome: row.outcome,
      residualSeverity: row.residual_severity,
      followUpDate: row.follow_up_date || '',
      lessonsLearned: row.lessons_learned
    }
  };
}

export default async function (_req, res) {
  const { rows } = await db.query('SELECT * FROM risks ORDER BY created_at DESC LIMIT 200');
  res.json({ items: rows.map(shape) });
}