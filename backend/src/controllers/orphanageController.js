import { all, get, run } from '../config/db.js';

export async function listOrphanages(_req, res) {
  const rows = await all('SELECT * FROM orphanages ORDER BY created_at DESC');
  res.json(rows);
}

export async function getOrphanage(req, res) {
  const row = await get('SELECT * FROM orphanages WHERE id = ?', [req.params.id]);
  if (!row) return res.status(404).json({ message: 'Orfanato no encontrado' });
  res.json(row);
}

export async function createOrphanage(req, res) {
  try {
    const { nombre, direccion, telefono, responsable, descripcion, capacidad = 0 } = req.body;
    if (!nombre) return res.status(400).json({ message: 'El nombre es obligatorio' });
    const result = await run(
      'INSERT INTO orphanages(nombre,direccion,telefono,responsable,descripcion,capacidad) VALUES (?,?,?,?,?,?)',
      [nombre, direccion, telefono, responsable, descripcion, capacidad]
    );
    const row = await get('SELECT * FROM orphanages WHERE id = ?', [result.lastID]);
    res.status(201).json(row);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear orfanato', error: err.message });
  }
}

export async function updateOrphanage(req, res) {
  const { nombre, direccion, telefono, responsable, descripcion, capacidad = 0 } = req.body;
  await run(
    'UPDATE orphanages SET nombre=?,direccion=?,telefono=?,responsable=?,descripcion=?,capacidad=? WHERE id=?',
    [nombre, direccion, telefono, responsable, descripcion, capacidad, req.params.id]
  );
  const row = await get('SELECT * FROM orphanages WHERE id = ?', [req.params.id]);
  res.json(row);
}

export async function deleteOrphanage(req, res) {
  await run('DELETE FROM orphanages WHERE id = ?', [req.params.id]);
  res.json({ message: 'Orfanato eliminado' });
}
