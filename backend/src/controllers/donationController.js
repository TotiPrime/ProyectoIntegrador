import { all, get, run } from '../config/db.js';

function evaluateClothing(file, descripcion = '') {
  const text = `${file?.originalname || ''} ${descripcion}`.toLowerCase();
  let score = 82;
  if (text.includes('roto') || text.includes('mancha') || text.includes('sucio')) score = 48;
  if (text.includes('nuevo') || text.includes('excelente')) score = 95;

  const condition = score >= 85 ? 'Excelente' : score >= 65 ? 'Aceptable' : 'Requiere revisión';
  const recommendation = score >= 65
    ? 'Apta para donación. Se recomienda lavar, doblar y clasificar por talla.'
    : 'No entregar directamente. Debe revisarse, lavarse o repararse antes de donar.';
  return { score, condition, recommendation };
}

export async function listDonations(_req, res) {
  const rows = await all(`SELECT d.*, u.nombre AS donor_nombre, o.nombre AS orphanage_nombre
    FROM donations d
    LEFT JOIN users u ON u.id = d.donor_id
    LEFT JOIN orphanages o ON o.id = d.orphanage_id
    ORDER BY d.created_at DESC`);
  res.json(rows);
}

export async function createDonation(req, res) {
  try {
    const { orphanage_id, need_id, tipo, descripcion, cantidad = 1 } = req.body;
    if (!tipo) return res.status(400).json({ message: 'El tipo de donación es obligatorio' });
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const ai = tipo.toLowerCase().includes('ropa') || req.file ? evaluateClothing(req.file, descripcion) : {
      score: null,
      condition: 'No aplica',
      recommendation: 'Donación registrada sin evaluación de prenda.'
    };
    const result = await run(`INSERT INTO donations
      (donor_id,orphanage_id,need_id,tipo,descripcion,cantidad,image_url,ai_score,ai_condition,ai_recommendation)
      VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [req.user.id, orphanage_id || null, need_id || null, tipo, descripcion, cantidad, imageUrl, ai.score, ai.condition, ai.recommendation]
    );
    const row = await get('SELECT * FROM donations WHERE id = ?', [result.lastID]);
    res.status(201).json(row);
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar donación', error: err.message });
  }
}

export async function updateDonationStatus(req, res) {
  const { estado } = req.body;
  await run('UPDATE donations SET estado = ? WHERE id = ?', [estado, req.params.id]);
  const row = await get('SELECT * FROM donations WHERE id = ?', [req.params.id]);
  res.json(row);
}
