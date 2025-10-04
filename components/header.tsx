export default function Header() {
  return (
    <header className="border-b bg-card/30 backdrop-blur">
      <div className="container mx-auto max-w-6xl px-4 py-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
          ER
        </div>
        <div>
          <h1 className="text-xl font-semibold leading-tight">Eternal Rest</h1>
          <p className="text-sm text-muted-foreground">Buscador de fallecidos • Demo</p>
        </div>
      </div>
    </header>
  );
}
