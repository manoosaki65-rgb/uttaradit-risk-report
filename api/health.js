export const access = 'member';
export const methods = ['GET'];

export default async function (_req, res) {
  res.json({ ok: true, module: 'risk-report-review' });
}