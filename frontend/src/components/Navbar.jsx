import { Link, NavLink } from 'react-router-dom';
import { Gift, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const item = ({ isActive }) => `px-3 py-2 rounded-xl text-sm font-semibold ${isActive ? 'bg-green-100 text-green-700' : 'text-slate-600 hover:bg-slate-100'}`;
  return (
    <nav className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 font-black text-xl text-slate-900">
          <span className="bg-green-600 text-white p-2 rounded-2xl"><Gift size={20}/></span>
          DONA APP
        </Link>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <NavLink className={item} to="/">Inicio</NavLink>
          <NavLink className={item} to="/orfanatos">Orfanatos</NavLink>
          <NavLink className={item} to="/necesidades">Necesidades</NavLink>
          {user && <NavLink className={item} to="/donar">Donar</NavLink>}
          {user && <NavLink className={item} to="/dashboard">Dashboard</NavLink>}
          {!user ? <NavLink className={item} to="/login">Ingresar</NavLink> : (
            <button onClick={logout} className="btn bg-red-50 text-red-600 flex items-center gap-2"><LogOut size={16}/> Salir</button>
          )}
        </div>
      </div>
    </nav>
  );
}
