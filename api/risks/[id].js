import { db } from 'hatchable';

export const access = 'member';
export const methods = ['PUT'];

export default async function (req, res) {
  const id = req.params.id;
  const b = req.body || {};
  const review = b.review || {};
  if (!String(review.reviewer || '').trim() || !String(review.rootCause || '').trim() || !String(review.correctiveAction || '').trim()) {
    return res.status(400).json({ error: 'missing_review_fields' });
  }
  if (!['reviewing', 'monitoring', 'closed'].includes(b.status)) {
    return res.status(400).json({ error: 'invalid_status' });
  }
  const { rows } = await db.query(
    'UPDATE risks SET reviewer=$1, review_date=$2, root_cause=$3, contributing_factors=$4, corrective_action=$5, owner=$6, due_date=$7, outcome=$8, residual_severity=$9, follow_up_date=$10, lessons_learned=$11, status=$12, updated_at=NOW() WHERE id=$13 RETURNING id, seq, created_at, status',
    [String(review.reviewer).trim(), review.reviewDate || null, String(review.rootCause).trim(), String(review.contributingFactors || ''), String(review.correctiveAction).trim(), String(review.owner || ''), review.dueDate || null, String(review.outcome || ''), String(review.residualSeverity || ''), review.followUpDate || null, String(review.lessonsLearned || ''), b.status, id]
  );
  if (!rows.length) return res.status(404).json({ error: 'not_found' });
  const row = rows[0];
  const year = new Date(row.created_at).getFullYear() + 543;
  res.json({ id: row.id, caseNo: `RISK-${year}-${String(row.seq).padStart(3, '0')}`, status: row.status });
}