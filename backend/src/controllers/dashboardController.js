import { get, all } from '../config/db.js';

export async function stats(_req, res) {
  const users = await get('SELECT COUNT(*) AS total FROM users');
  const orphanages = await get('SELECT COUNT(*) AS total FROM orphanages');
  const needs = await get("SELECT COUNT(*) AS total FROM needs WHERE estado = 'pendiente'");
  const donations = await get('SELECT COUNT(*) AS total FROM donations');
  const byType = await all('SELECT tipo, COUNT(*) AS total FROM donations GROUP BY tipo ORDER BY total DESC');
  const pendingDonations = await get("SELECT COUNT(*) AS total FROM donations WHERE estado = 'registrada'");
  res.json({
    users: users.total,
    orphanages: orphanages.total,
    pendingNeeds: needs.total,
    donations: donations.total,
    pendingDonations: pendingDonations.total,
    byType
  });
}
