import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';

sqlite3.verbose();
export const db = new sqlite3.Database('./dona_app.sqlite');

const run = (sql, params = []) => new Promise((resolve, reject) => {
  db.run(sql, params, function (err) {
    if (err) reject(err);
    else resolve(this);
  });
});

export const get = (sql, params = []) => new Promise((resolve, reject) => {
  db.get(sql, params, (err, row) => err ? reject(err) : resolve(row));
});

export const all = (sql, params = []) => new Promise((resolve, reject) => {
  db.all(sql, params, (err, rows) => err ? reject(err) : resolve(rows));
});

export async function initDb() {
  await run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    rol TEXT NOT NULL CHECK(rol IN ('admin','donante','orfanato')),
    estado TEXT DEFAULT 'activo',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  await run(`CREATE TABLE IF NOT EXISTS orphanages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    direccion TEXT,
    telefono TEXT,
    responsable TEXT,
    descripcion TEXT,
    capacidad INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  await run(`CREATE TABLE IF NOT EXISTS needs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orphanage_id INTEGER NOT NULL,
    tipo TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    edad TEXT,
    talla TEXT,
    cantidad INTEGER NOT NULL,
    prioridad TEXT DEFAULT 'media',
    estado TEXT DEFAULT 'pendiente',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(orphanage_id) REFERENCES orphanages(id)
  )`);

  await run(`CREATE TABLE IF NOT EXISTS donations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    donor_id INTEGER,
    orphanage_id INTEGER,
    need_id INTEGER,
    tipo TEXT NOT NULL,
    descripcion TEXT,
    cantidad INTEGER DEFAULT 1,
    estado TEXT DEFAULT 'registrada',
    image_url TEXT,
    ai_score INTEGER,
    ai_condition TEXT,
    ai_recommendation TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(donor_id) REFERENCES users(id),
    FOREIGN KEY(orphanage_id) REFERENCES orphanages(id),
    FOREIGN KEY(need_id) REFERENCES needs(id)
  )`);

  const admin = await get('SELECT id FROM users WHERE email = ?', ['admin@donaapp.com']);
  if (!admin) {
    const hash = await bcrypt.hash('123456', 10);
    await run('INSERT INTO users(nombre,email,password,rol) VALUES (?,?,?,?)', ['Administrador Dona App', 'admin@donaapp.com', hash, 'admin']);
    await run('INSERT INTO users(nombre,email,password,rol) VALUES (?,?,?,?)', ['Donante Demo', 'donante@donaapp.com', hash, 'donante']);
    await run('INSERT INTO users(nombre,email,password,rol) VALUES (?,?,?,?)', ['Orfanato Demo', 'orfanato@donaapp.com', hash, 'orfanato']);
    await run(`INSERT INTO orphanages(nombre,direccion,telefono,responsable,descripcion,capacidad)
      VALUES ('Hogar Esperanza', 'Cercado, Cochabamba', '70707070', 'María López', 'Orfanato de apoyo a niñas, niños y adolescentes.', 45)`);
    await run(`INSERT INTO orphanages(nombre,direccion,telefono,responsable,descripcion,capacidad)
      VALUES ('Casa Luz', 'Sacaba, Cochabamba', '60606060', 'Juan Pérez', 'Centro de acogida con necesidades de ropa y alimentos.', 32)`);
    await run(`INSERT INTO needs(orphanage_id,tipo,descripcion,edad,talla,cantidad,prioridad)
      VALUES (1,'Ropa','Chamarras y buzos para invierno','8 a 14 años','M/L',20,'alta')`);
    await run(`INSERT INTO needs(orphanage_id,tipo,descripcion,edad,talla,cantidad,prioridad)
      VALUES (2,'Alimentos','Arroz, fideo, aceite y leche','General','N/A',35,'media')`);
  }
}

export { run };
