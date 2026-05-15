import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function Orphanages() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ nombre:'', direccion:'', telefono:'', responsable:'', descripcion:'', capacidad:0 });
  const { user } = useAuth();
  const isAdmin = user?.rol === 'admin';

  async function load(){ const {data}=await api.get('/orphanages'); setItems(data); }
  useEffect(()=>{ load(); },[]);
  async function create(e){ e.preventDefault(); await api.post('/orphanages', form); setForm({ nombre:'', direccion:'', telefono:'', responsable:'', descripcion:'', capacidad:0 }); load(); }
  async function remove(id){ await api.delete(`/orphanages/${id}`); load(); }

  return <div className="max-w-6xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-black mb-6">Orfanatos registrados</h1>
    {isAdmin && <form onSubmit={create} className="card grid md:grid-cols-3 gap-3 mb-8">
      <input className="input" placeholder="Nombre" value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})}/>
      <input className="input" placeholder="Dirección" value={form.direccion} onChange={e=>setForm({...form,direccion:e.target.value})}/>
      <input className="input" placeholder="Teléfono" value={form.telefono} onChange={e=>setForm({...form,telefono:e.target.value})}/>
      <input className="input" placeholder="Responsable" value={form.responsable} onChange={e=>setForm({...form,responsable:e.target.value})}/>
      <input className="input" type="number" placeholder="Capacidad" value={form.capacidad} onChange={e=>setForm({...form,capacidad:e.target.value})}/>
      <button className="btn btn-primary">Agregar</button>
      <textarea className="input md:col-span-3" placeholder="Descripción" value={form.descripcion} onChange={e=>setForm({...form,descripcion:e.target.value})}/>
    </form>}
    <div className="grid md:grid-cols-2 gap-5">{items.map(o=><div className="card" key={o.id}>
      <h2 className="text-xl font-black">{o.nombre}</h2>
      <p className="text-slate-600 mt-2">{o.descripcion}</p>
      <p className="text-sm mt-3"><b>Dirección:</b> {o.direccion || 'No registrada'}</p>
      <p className="text-sm"><b>Responsable:</b> {o.responsable || 'No registrado'}</p>
      <p className="text-sm"><b>Capacidad:</b> {o.capacidad}</p>
      {isAdmin && <button onClick={()=>remove(o.id)} className="btn bg-red-50 text-red-600 mt-4">Eliminar</button>}
    </div>)}</div>
  </div>
}
