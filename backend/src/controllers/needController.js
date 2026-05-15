import { all, get, run } from '../config/db.js';

export async function listNeeds(_req, res) {
  const rows = await all(`SELECT n.*, o.nombre AS orphanage_nombre
    FROM needs n JOIN orphanages o ON o.id = n.orphanage_id
    ORDER BY n.created_at DESC`);
  res.json(rows);
}

export async function createNeed(req, res) {
  try {
    const { orphanage_id, tipo, descripcion, edad, talla, cantidad, prioridad = 'media' } = req.body;
    if (!orphanage_id || !tipo || !descripcion || !cantidad) return res.status(400).json({ message: 'Faltan datos obligatorios' });
    const result = await run(
      'INSERT INTO needs(orphanage_id,tipo,descripcion,edad,talla,cantidad,prioridad) VALUES (?,?,?,?,?,?,?)',
      [orphanage_id, tipo, descripcion, edad, talla, cantidad, prioridad]
    );
    const row = await get('SELECT * FROM needs WHERE id = ?', [result.lastID]);
    res.status(201).json(row);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear necesidad', error: err.message });
  }
}

export async function updateNeedStatus(req, res) {
  const { estado } = req.body;
  await run('UPDATE needs SET estado = ? WHERE id = ?', [estado, req.params.id]);
  const row = await get('SELECT * FROM needs WHERE id = ?', [req.params.id]);
  res.json(row);
}
