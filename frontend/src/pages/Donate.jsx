import { useEffect, useState } from 'react';
import { api } from '../api/api';

export default function Donate() {
  const [orphanages, setOrphanages] = useState([]);
  const [result, setResult] = useState(null);
  const [form, setForm] = useState({ orphanage_id:'', tipo:'Ropa', descripcion:'', cantidad:1, imagen:null });
  useEffect(()=>{ api.get('/orphanages').then(({data})=>{ setOrphanages(data); if(data[0]) setForm(f=>({...f,orphanage_id:data[0].id})); }); },[]);
  async function submit(e){
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k,v])=>{ if(v) fd.append(k,v); });
    const { data } = await api.post('/donations', fd, { headers:{'Content-Type':'multipart/form-data'} });
    setResult(data);
    setForm({...form, descripcion:'', cantidad:1, imagen:null});
  }
  return <div className="max-w-3xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-black mb-6">Registrar donación</h1>
    <form onSubmit={submit} className="card space-y-4">
      <select className="input" value={form.orphanage_id} onChange={e=>setForm({...form,orphanage_id:e.target.value})}>{orphanages.map(o=><option key={o.id} value={o.id}>{o.nombre}</option>)}</select>
      <select className="input" value={form.tipo} onChange={e=>setForm({...form,tipo:e.target.value})}><option>Ropa</option><option>Alimentos</option><option>Útiles escolares</option><option>Juguetes</option><option>Otros</option></select>
      <textarea className="input" placeholder="Describe la donación. Ej: chamarra nueva talla M" value={form.descripcion} onChange={e=>setForm({...form,descripcion:e.target.value})}/>
      <input className="input" type="number" min="1" value={form.cantidad} onChange={e=>setForm({...form,cantidad:e.target.value})}/>
      <input className="input" type="file" accept="image/*" onChange={e=>setForm({...form,imagen:e.target.files[0]})}/>
      <button className="btn btn-primary w-full">Registrar donación</button>
    </form>
    {result && <div className="card mt-6 border-green-200 bg-green-50">
      <h2 className="font-black text-xl">Donación registrada</h2>
      <p><b>Estado IA:</b> {result.ai_condition}</p>
      {result.ai_score !== null && <p><b>Puntaje:</b> {result.ai_score}/100</p>}
      <p><b>Recomendación:</b> {result.ai_recommendation}</p>
    </div>}
  </div>
}
