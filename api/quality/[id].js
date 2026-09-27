import { db } from 'hatchable';

export const access = 'member';
export const methods = ['PUT'];

const statuses = new Set(['draft', 'sent_review', 'needs_edit', 'approved', 'ready_ha']);

export default async function (req, res) {
  const id = String(req.params.id || '');
  const body = req.body || {};
  const { rows } = await db.query('SELECT * FROM quality_documents WHERE id = $1 LIMIT 1', [id]);
  if (!rows.length) return res.status(404).json({ error: 'not_found' });
  const current = rows[0];
  const status = statuses.has(String(body.status || '')) ? String(body.status) : current.status;
  const formData = body.formData ?? current.form_data;
  const reviewerName = body.reviewerName ?? current.reviewer_name;
  const reviewerNote = body.reviewerNote ?? current.reviewer_note;
  const signedBy = body.signedBy ?? current.signed_by;
  const reviewedAt = ['needs_edit', 'approved', 'ready_ha'].includes(status) ? new Date().toISOString() : current.reviewed_at;
  const signedAt = status === 'approved' || status === 'ready_ha' ? new Date().toISOString() : current.signed_at;
  const { rows: updated } = await db.query(
    `UPDATE quality_documents SET month_name=$2, title=$3, form_data=$4::jsonb, status=$5, reviewer_name=$6, reviewer_note=$7, reviewed_at=$8, signed_by=$9, signed_at=$10, updated_at=now() WHERE id=$1 RETURNING id, doc_no AS "docNo", status, reviewer_name AS "reviewerName", signed_by AS "signedBy", signed_at AS "signedAt"`,
    [id, String(body.monthName ?? current.month_name ?? ''), String(body.title ?? current.title ?? ''), JSON.stringify(formData || {}), status, reviewerName, reviewerNote, reviewedAt, signedBy, signedAt]
  );
  res.json(updated[0]);
}