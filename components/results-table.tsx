"use client";

import { Button } from "@/components/ui/button";

type Row = { name: string; dates: string; location: string; epitaph: string };

type Props = {
  results: Row[];
  loading: boolean;
  total: number;
  page: number;
  onPageChange: (p: number) => void;
  pageSize?: number;
};

export default function ResultsTable({ results, loading, total, page, onPageChange, pageSize = 10 }: Props) {
  if (loading) return <div className="mt-6 text-sm text-slate-500">Buscando…</div>;
  if (!results?.length) return <div className="mt-6 text-sm text-slate-500">Sin resultados</div>;

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <section className="mt-4 space-y-4">
      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left">NOMBRE COMPLETO</th>
              <th className="px-4 py-3 text-left">FECHAS</th>
              <th className="px-4 py-3 text-left">LUGAR DE ENTIERRO</th>
              <th className="px-4 py-3 text-left">EPITAFIO</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={`${r.name}-${i}`} className="border-t">
                <td className="px-4 py-3">{r.name}</td>
                <td className="px-4 py-3">{r.dates}</td>
                <td className="px-4 py-3">{r.location}</td>
                <td className="px-4 py-3 text-slate-500 italic">“{r.epitaph}”</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-slate-500">Página {page} de {totalPages} — {total} resultados</div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onPageChange(page - 1)} disabled={!canPrev}>Anterior</Button>
          <Button onClick={() => onPageChange(page + 1)} disabled={!canNext}>Siguiente</Button>
        </div>
      </div>
    </section>
  );
}
