export default function Navbar() {
  return (
    <nav className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white font-bold">ER</div>
          <span className="font-semibold">Eternal Rest</span>
          <ul className="ml-6 hidden md:flex items-center gap-5 text-sm text-slate-600">
            <li className="hover:text-slate-900 cursor-pointer">Inicio</li>
            <li className="hover:text-slate-900 cursor-pointer">Buscar</li>
            <li className="hover:text-slate-900 cursor-pointer">Recursos</li>
            <li className="hover:text-slate-900 cursor-pointer">Contacto</li>
          </ul>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <input placeholder="Buscar..." className="h-9 w-56 rounded-md border px-3 text-sm" />
          <button aria-label="Idioma" className="h-9 w-9 rounded-full border" />
          <div className="h-9 w-9 rounded-full bg-slate-200" />
        </div>
      </div>
    </nav>
  );
}
