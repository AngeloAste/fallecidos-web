import { NextResponse } from "next/server";
import { z } from "zod";

type RecordItem = {
  name: string;
  rut?: string;
  birthYear?: number;
  deathYear?: number;
  region?: string;
  comuna?: string;
  location: string;        // cementerio
  cemeterySlug?: string;
  cause?: string;
  epitaph: string;
};

const QuerySchema = z.object({
  q: z.string().optional(),
  year: z.string().optional(),      // año de fallecimiento (deathYear)
  region: z.string().optional(),
  comuna: z.string().optional(),
  cemetery: z.string().optional(),
  cause: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(100).default(10),
});

const DATA: RecordItem[] = [
  { name: "Isabella Rossi", rut: "12.345.678-9", birthYear: 1935, deathYear: 2023, region: "metropolitana", comuna: "santiago", location: "Cementerio Metropolitano", cemeterySlug: "metropolitano", cause: "natural", epitaph: "Siempre en nuestros corazones" },
  { name: "Ricardo Silva",  rut: "7.654.321-0",  birthYear: 1950, deathYear: 2022, region: "metropolitana", comuna: "huechuraba", location: "Parque del Recuerdo",   cemeterySlug: "parque",         cause: "natural", epitaph: "Descansa en paz" },
  { name: "María López",    rut: "9.876.543-2",  birthYear: 1942, deathYear: 2019, region: "valparaiso",   comuna: "valparaiso", location: "Cementerio General",     cemeterySlug: "general",        cause: "otro", epitaph: "Luz eterna" },
  { name: "Juan Pérez",     rut: "11.223.344-5", birthYear: 1961, deathYear: 2020, region: "biobio",       comuna: "concepcion", location: "Parque del Recuerdo",   cemeterySlug: "parque",         cause: "accidente", epitaph: "Hasta siempre" },
  { name: "Elena García",   rut: "6.111.222-3",  birthYear: 1938, deathYear: 2017, region: "metropolitana", comuna: "maipu",      location: "Cementerio Católico",  cemeterySlug: "catolico",       cause: "natural", epitaph: "Amor infinito" },
  { name: "Pedro Torres",   rut: "17.888.999-1", birthYear: 1970, deathYear: 2024, region: "metropolitana", comuna: "santiago", location: "Cementerio Metropolitano", cemeterySlug: "metropolitano", cause: "otro", epitaph: "Te recordaremos" },
  { name: "Sofía Méndez",   rut: "18.111.222-3", birthYear: 1990, deathYear: 2021, region: "valparaiso",   comuna: "viña del mar", location: "Cementerio General",  cemeterySlug: "general",        cause: "accidente", epitaph: "Siempre presente" },
];

function normalizeRut(input?: string) {
  if (!input) return "";
  return input.replace(/[^0-9kK]/g, "").toLowerCase();
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const parsed = QuerySchema.safeParse(Object.fromEntries(searchParams));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { q, year, region, comuna, cemetery, cause, page, pageSize } = parsed.data;

  const qRut = normalizeRut(q);
  const qText = q?.toLowerCase();

  let filtered = DATA.filter((r) => {
    const byText = qText ? (r.name.toLowerCase().includes(qText) || r.location.toLowerCase().includes(qText)) : true;
    const byRut  = qRut ? normalizeRut(r.rut).includes(qRut) : true;
    const byYear = year ? String(r.deathYear ?? "").startsWith(year) : true;
    const byRegion = region ? (r.region === region) : true;
    const byComuna = comuna ? (r.comuna === comuna) : true;
    const byCemetery = cemetery ? (r.cemeterySlug === cemetery || r.location.toLowerCase().includes(cemetery.toLowerCase())) : true;
    const byCause = cause ? (r.cause === cause) : true;
    return byText && byRut && byYear && byRegion && byComuna && byCemetery && byCause;
  });

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize).map((r) => ({
    name: r.name,
    dates: r.birthYear && r.deathYear ? `${r.birthYear} - ${r.deathYear}` : (r.deathYear ? `† ${r.deathYear}` : ""),
    location: r.location,
    epitaph: r.epitaph,
  }));

  return NextResponse.json({ items, page, pageSize, total });
}
