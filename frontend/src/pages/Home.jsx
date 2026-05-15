import { Link } from 'react-router-dom';
import { HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main>
      <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="badge bg-green-100 text-green-700 mb-4 inline-block">Proyecto social tecnológico</p>
            <h1 className="text-4xl md:text-6xl font-black leading-tight text-slate-950">Donaciones más ordenadas, transparentes y útiles.</h1>
            <p className="text-slate-600 text-lg mt-5">DONA APP conecta donantes con orfanatos de Cochabamba, clasificando necesidades y registrando donaciones con trazabilidad.</p>
            <div className="flex gap-3 mt-8 flex-wrap">
              <Link to="/necesidades" className="btn btn-primary">Ver necesidades</Link>
              <Link to="/donar" className="btn btn-dark">Registrar donación</Link>
            </div>
          </div>
          <div className="card bg-slate-950 text-white p-8">
            <div className="grid gap-4">
              <div className="bg-white/10 rounded-2xl p-5"><HeartHandshake/> <h3 className="font-bold mt-3">Donantes</h3><p className="text-white/70">Registran ropa, alimentos y apoyo.</p></div>
              <div className="bg-white/10 rounded-2xl p-5"><ShieldCheck/> <h3 className="font-bold mt-3">Orfanatos</h3><p className="text-white/70">Publican necesidades reales.</p></div>
              <div className="bg-white/10 rounded-2xl p-5"><Sparkles/> <h3 className="font-bold mt-3">IA inicial</h3><p className="text-white/70">Evalúa el estado de prendas donadas.</p></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
