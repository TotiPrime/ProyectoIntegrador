import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function Needs() {
  const [needs, setNeeds] = useState([]);
  const [orphanages, setOrphanages] = useState([]);
  const [form, setForm] = useState({ orphanage_id:'', tipo:'Ropa', descripcion:'', edad:'', talla:'', cantidad:1, prioridad:'media' });
  const { user } = useAuth();
  const canCreate = user && ['admin','orfanato'].includes(user.rol);
  async function load(){ const [n,o]=await Promise.all([api.get('/needs'), api.get('/orphanages')]); setNeeds(n.data); setOrphanages(o.data); if(!form.orphanage_id && o.data[0]) setForm(f=>({...f, orphanage_id:o.data[0].id})); }
  useEffect(()=>{ load(); },[]);
  async function create(e){ e.preventDefault(); await api.post('/needs', form); setForm({...form, descripcion:'', cantidad:1}); load(); }
  async function closeNeed(id){ await api.patch(`/needs/${id}/status`, { estado:'cubierta' }); load(); }

  return <div className="max-w-6xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-black mb-6">Necesidades activas</h1>
    {canCreate && <form onSubmit={create} className="card grid md:grid-cols-4 gap-3 mb-8">
      <select className="input" value={form.orphanage_id} onChange={e=>setForm({...form, orphanage_id:e.target.value})}>{orphanages.map(o=><option key={o.id} value={o.id}>{o.nombre}</option>)}</select>
      <select className="input" value={form.tipo} onChange={e=>setForm({...form,tipo:e.target.value})}><option>Ropa</option><option>Alimentos</option><option>Útiles escolares</option><option>Medicamentos</option><option>Otros</option></select>
      <input className="input" placeholder="Edad" value={form.edad} onChange={e=>setForm({...form,edad:e.target.value})}/>
      <input className="input" placeholder="Talla" value={form.talla} onChange={e=>setForm({...form,talla:e.target.value})}/>
      <input className="input" type="number" placeholder="Cantidad" value={form.cantidad} onChange={e=>setForm({...form,cantidad:e.target.value})}/>
      <select className="input" value={form.prioridad} onChange={e=>setForm({...form,prioridad:e.target.value})}><option value="baja">Baja</option><option value="media">Media</option><option value="alta">Alta</option></select>
      <input className="input md:col-span-1" placeholder="Descripción" value={form.descripcion} onChange={e=>setForm({...form,descripcion:e.target.value})}/>
      <button className="btn btn-primary">Publicar</button>
    </form>}
    <div className="grid md:grid-cols-3 gap-5">{needs.map(n=><div className="card" key={n.id}>
      <div className="flex justify-between gap-3"><h2 className="text-xl font-black">{n.tipo}</h2><span className={`badge ${n.prioridad==='alta'?'bg-red-100 text-red-700':'bg-green-100 text-green-700'}`}>{n.prioridad}</span></div>
      <p className="text-slate-600 mt-2">{n.descripcion}</p>
      <p className="text-sm mt-3"><b>Orfanato:</b> {n.orphanage_nombre}</p>
      <p className="text-sm"><b>Edad:</b> {n.edad || 'General'} · <b>Talla:</b> {n.talla || 'N/A'}</p>
      <p className="text-sm"><b>Cantidad:</b> {n.cantidad}</p>
      <p className="text-sm"><b>Estado:</b> {n.estado}</p>
      {canCreate && n.estado !== 'cubierta' && <button onClick={()=>closeNeed(n.id)} className="btn bg-blue-50 text-blue-700 mt-4">Marcar cubierta</button>}
    </div>)}</div>
  </div>
}
