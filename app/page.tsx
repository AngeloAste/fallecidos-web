"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import SearchSection from "@/components/search-section";
import ResultsTable from "@/components/results-table";

export default function Home() {
  const [results, setResults] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [lastParams, setLastParams] = useState<Record<string, string | number | undefined>>({});

  const fetchResults = useCallback(async (params: Record<string, any>) => {
    setLoading(true);
    try {
      const merged = { ...lastParams, ...params };
      const cleanEntries = Object.entries(merged).filter(([, v]) => v !== undefined && v !== "" && v !== null);
      const sp = new URLSearchParams(cleanEntries as any);
      const res = await fetch(`/api/search?${sp.toString()}`, { cache: "no-store" });
      const json = await res.json();
      setResults(json.items ?? []);
      setTotal(json.total ?? 0);
      setPage(json.page ?? 1);
      setLastParams(merged);
    } finally {
      setLoading(false);
    }
  }, [lastParams]);

  const handleSearch = (params: Record<string, any>) => fetchResults({ ...params, page: 1 });
  const handleClear = () => {
    setResults([]);
    setTotal(0);
    setPage(1);
    setLastParams({});
  };
  const handlePageChange = (nextPage: number) => fetchResults({ page: nextPage });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Hero />
        <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
          <SearchSection onSearch={handleSearch} onClear={handleClear} loading={loading} />
        </div>
        <h2 className="mt-10 text-2xl font-semibold">Resultados de la búsqueda</h2>
        <ResultsTable results={results} total={total} page={page} onPageChange={handlePageChange} loading={loading} />
      </main>
    </div>
  );
}
