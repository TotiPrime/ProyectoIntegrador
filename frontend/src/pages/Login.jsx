import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');
  const [form, setForm] = useState({ nombre: '', email: 'admin@donaapp.com', password: '123456', rol: 'donante' });
  const { login, register } = useAuth();
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError('');
    try {
      if (mode === 'login') await login(form.email, form.password);
      else await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo completar la acción');
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <form onSubmit={submit} className="card space-y-4">
        <h1 className="text-3xl font-black">{mode === 'login' ? 'Ingresar' : 'Crear cuenta'}</h1>
        {mode === 'register' && <input className="input" placeholder="Nombre" value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})}/>} 
        <input className="input" placeholder="Correo" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
        <input className="input" type="password" placeholder="Contraseña" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
        {mode === 'register' && <select className="input" value={form.rol} onChange={e=>setForm({...form,rol:e.target.value})}><option value="donante">Donante</option><option value="orfanato">Orfanato</option></select>}
        {error && <p className="bg-red-50 text-red-600 p-3 rounded-xl text-sm">{error}</p>}
        <button className="btn btn-primary w-full">{mode === 'login' ? 'Ingresar' : 'Registrarme'}</button>
        <button type="button" className="text-sm text-green-700 font-bold" onClick={()=>setMode(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? 'Crear una cuenta' : 'Ya tengo cuenta'}</button>
      </form>
    </div>
  );
}
