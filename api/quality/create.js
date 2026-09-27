import { db } from 'hatchable';

export const access = 'member';
export const methods = ['POST'];

const allowed = new Set(['monthly', 'rca', 'aar', 'profile']);

export default async function (req, res) {
  const body = req.body || {};
  const docType = String(body.docType || '').trim();
  if (!allowed.has(docType)) return res.status(400).json({ error: 'invalid_type' });
  const budgetYear = Number(body.budgetYear || 2569);
  const title = String(body.title || '').trim();
  if (!title) return res.status(400).json({ error: 'title_required' });
  const { rows: countRows } = await db.query('SELECT count(*)::int AS count FROM quality_documents WHERE doc_type = $1 AND budget_year = $2', [docType, budgetYear]);
  const next = Number(countRows[0]?.count || 0) + 1;
  const prefix = docType === 'monthly' ? 'REV' : docType === 'profile' ? 'RISK-PROFILE' : docType.toUpperCase();
  const docNo = `${prefix}-${budgetYear}-${String(next).padStart(3, '0')}`;
  const { rows } = await db.query(
    `INSERT INTO quality_documents (doc_type, doc_no, budget_year, month_name, title, form_data, status, author_name) VALUES ($1,$2,$3,$4,$5,$6::jsonb,$7,$8) RETURNING id, doc_no AS "docNo", status`,
    [docType, docNo, budgetYear, String(body.monthName || ''), title, JSON.stringify(body.formData || {}), String(body.status || 'draft'), String(body.authorName || 'นายมนูศักดิ์ อยู่บาง')]
  );
  res.status(201).json(rows[0]);
}