import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { get, run } from '../config/db.js';

const sign = user => jwt.sign(
  { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol },
  process.env.JWT_SECRET || 'dona_app_secret',
  { expiresIn: '8h' }
);

export async function register(req, res) {
  try {
    const { nombre, email, password, rol = 'donante' } = req.body;
    if (!nombre || !email || !password) return res.status(400).json({ message: 'Faltan datos obligatorios' });
    if (!['donante', 'orfanato'].includes(rol)) return res.status(400).json({ message: 'Rol inválido para registro público' });
    const hash = await bcrypt.hash(password, 10);
    const result = await run('INSERT INTO users(nombre,email,password,rol) VALUES (?,?,?,?)', [nombre, email, hash, rol]);
    const user = await get('SELECT id,nombre,email,rol FROM users WHERE id = ?', [result.lastID]);
    res.status(201).json({ user, token: sign(user) });
  } catch (err) {
    res.status(400).json({ message: 'No se pudo registrar. Revisa si el correo ya existe.', error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) return res.status(401).json({ message: 'Credenciales incorrectas' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Credenciales incorrectas' });
    const safe = { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol };
    res.json({ user: safe, token: sign(safe) });
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: err.message });
  }
}

export async function me(req, res) {
  res.json({ user: req.user });
}
