import { db } from 'hatchable';

export const access = 'member';
export const methods = ['GET'];

export default async function (req, res) {
  const type = String(req.query.type || '').trim();
  const params = [];
  let sql = `SELECT id, doc_type AS "docType", doc_no AS "docNo", budget_year AS "budgetYear", month_name AS "monthName", title, form_data AS "formData", status, author_name AS "authorName", reviewer_name AS "reviewerName", reviewer_note AS "reviewerNote", reviewed_at AS "reviewedAt", signed_by AS "signedBy", signed_at AS "signedAt", created_at AS "createdAt", updated_at AS "updatedAt" FROM quality_documents`;
  if (type) {
    sql += ' WHERE doc_type = $1';
    params.push(type);
  }
  sql += ' ORDER BY created_at DESC LIMIT 200';
  const { rows } = await db.query(sql, params);
  res.json({ items: rows });
}