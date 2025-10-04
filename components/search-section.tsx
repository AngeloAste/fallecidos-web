"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  onSearch: (params: { q?: string; year?: string; region?: string; comuna?: string; cemetery?: string; cause?: string }) => void;
  onClear: () => void;
  loading: boolean;
};

export default function SearchSection({ onSearch, onClear, loading }: Props) {
  const [q, setQ] = useState("");              // nombre o RUT
  const [year, setYear] = useState<string | undefined>(undefined);
  const [region, setRegion] = useState<string | undefined>(undefined);
  const [comuna, setComuna] = useState<string | undefined>(undefined);
  const [cemetery, setCemetery] = useState<string | undefined>(undefined);
  const [cause, setCause] = useState<string | undefined>(undefined);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSearch();
  }

  function handleSearch() {
    onSearch({ q, year, region, comuna, cemetery, cause });
  }

  function handleClear() {
    setQ(""); setYear(undefined); setRegion(undefined); setComuna(undefined); setCemetery(undefined); setCause(undefined);
    onClear();
  }

  return (
    <div className="space-y-6">
      {/* Buscador grande */}
      <div className="relative">
        <Input
          value={q}
          onChange={(e)=>setQ(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Buscar por nombre completo o RUT"
          className="h-12 pl-10 text-base"
        />
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔎</span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label>Año de fallecimiento</Label>
            <select value={year ?? ""} onChange={(e)=>setYear(e.target.value || undefined)} className="mt-1 h-10 w-full rounded-md border bg-white px-3 text-sm">
              <option value="">Seleccionar año</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>

          <div>
            <Label>Cementerio</Label>
            <select value={cemetery ?? ""} onChange={(e)=>setCemetery(e.target.value || undefined)} className="mt-1 h-10 w-full rounded-md border bg-white px-3 text-sm">
              <option value="">Seleccionar cementerio</option>
              <option value="general">Cementerio General</option>
              <option value="parque">Parque del Recuerdo</option>
              <option value="metropolitano">Cementerio Metropolitano</option>
              <option value="catolico">Cementerio Católico</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Región/Comuna</Label>
            <div className="grid grid-cols-2 gap-3">
              <select value={region ?? ""} onChange={(e)=>setRegion(e.target.value || undefined)} className="h-10 w-full rounded-md border bg-white px-3 text-sm">
                <option value="">Todas</option>
                <option value="metropolitana">Metropolitana</option>
                <option value="valparaiso">Valparaíso</option>
                <option value="biobio">Biobío</option>
              </select>
              <select value={comuna ?? ""} onChange={(e)=>setComuna(e.target.value || undefined)} className="h-10 w-full rounded-md border bg-white px-3 text-sm">
                <option value="">Todas</option>
                <option value="santiago">Santiago</option>
                <option value="maipu">Maipú</option>
                <option value="huechuraba">Huechuraba</option>
                <option value="valparaiso">Valparaíso</option>
                <option value="viña del mar">Viña del Mar</option>
                <option value="concepcion">Concepción</option>
              </select>
            </div>
          </div>

          <div>
            <Label>Causa de muerte</Label>
            <select value={cause ?? ""} onChange={(e)=>setCause(e.target.value || undefined)} className="mt-1 h-10 w-full rounded-md border bg-white px-3 text-sm">
              <option value="">Seleccionar causa</option>
              <option value="natural">Muerte natural</option>
              <option value="accidente">Accidente</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={handleSearch} disabled={loading} className="bg-slate-900 text-white">{loading ? "Buscando..." : "Buscar"}</Button>
        <Button onClick={handleClear} variant="outline">Limpiar filtros</Button>
      </div>
    </div>
  );
}
