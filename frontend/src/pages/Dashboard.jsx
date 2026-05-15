import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [donations, setDonations] = useState([]);
  const { user } = useAuth();
  async function load(){
    const [s,d]=await Promise.all([api.get('/dashboard/stats'), api.get('/donations')]);
    setStats(s.data); setDonations(d.data);
  }
  useEffect(()=>{ load(); },[]);
  async function status(id, estado){ await api.patch(`/donations/${id}/status`, { estado }); load(); }
  if(!stats) return <div className="p-8">Cargando...</div>;
  const cards = [
    ['Usuarios', stats.users], ['Orfanatos', stats.orphanages], ['Necesidades pendientes', stats.pendingNeeds], ['Donaciones', stats.donations], ['Por verificar', stats.pendingDonations]
  ];
  return <div className="max-w-6xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-black">Dashboard</h1>
    <p className="text-slate-600 mb-6">Bienvenido, {user?.nombre} · Rol: {user?.rol}</p>
    <div className="grid md:grid-cols-5 gap-4 mb-8">{cards.map(([k,v])=><div className="card" key={k}><p className="text-sm text-slate-500">{k}</p><h2 className="text-3xl font-black">{v}</h2></div>)}</div>
    <div className="card mb-8">
      <h2 className="text-xl font-black mb-3">Donaciones por tipo</h2>
      <div className="grid md:grid-cols-4 gap-3">{stats.byType.map(x=><div className="bg-slate-50 rounded-xl p-4" key={x.tipo}><b>{x.tipo}</b><p>{x.total} registradas</p></div>)}</div>
    </div>
    <div className="card overflow-x-auto">
      <h2 className="text-xl font-black mb-4">Últimas donaciones</h2>
      <table className="w-full text-sm">
        <thead><tr className="text-left border-b"><th className="py-3">Donante</th><th>Orfanato</th><th>Tipo</th><th>IA</th><th>Estado</th><th>Acción</th></tr></thead>
        <tbody>{donations.map(d=><tr className="border-b" key={d.id}>
          <td className="py-3">{d.donor_nombre || 'N/A'}</td><td>{d.orphanage_nombre || 'N/A'}</td><td>{d.tipo}</td><td>{d.ai_condition}</td><td>{d.estado}</td>
          <td>{user?.rol !== 'donante' && <div className="flex gap-2"><button onClick={()=>status(d.id,'aprobada')} className="badge bg-green-100 text-green-700">Aprobar</button><button onClick={()=>status(d.id,'rechazada')} className="badge bg-red-100 text-red-700">Rechazar</button></div>}</td>
        </tr>)}</tbody>
      </table>
    </div>
  </div>
}
