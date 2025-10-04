import { NextResponse } from "next/server";
import { z } from "zod";

const QuerySchema = z.object({
  q: z.string().optional(),
  year: z.string().optional(),
  region: z.string().optional(),
  comuna: z.string().optional(),
  cemetery: z.string().optional(),
  cause: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(100).default(10),
});

type BackendItem = {
  id: string;
  name: string;
  rut?: string;
  birthYear?: number;
  deathYear?: number;
  region?: string;
  comuna?: string;
  location: string;
  cemeterySlug?: string;
  cause?: string;
  epitaph: string;
  createdAt: string;
  updatedAt: string;
};

type BackendResponse = {
  items: BackendItem[];
  total: number;
  page: number;
  pageSize: number;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const parsed = QuerySchema.safeParse(Object.fromEntries(searchParams));

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { q, year, region, comuna, cemetery, cause, page, pageSize } = parsed.data;

  // Construir URL del backend
  const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:3002';
  const params = new URLSearchParams();

  if (q) params.append('q', q);
  if (year) params.append('year', year);
  if (region) params.append('region', region);
  if (comuna) params.append('comuna', comuna);
  if (cemetery) params.append('cemetery', cemetery);
  if (cause) params.append('cause', cause);
  params.append('page', String(page));
  params.append('pageSize', String(pageSize));

  try {
    // Hacer request al backend NestJS
    const response = await fetch(`${backendUrl}/fallecidos?${params.toString()}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }

    const data: BackendResponse = await response.json();

    // Transformar datos al formato esperado por el frontend
    const items = data.items.map((item) => ({
      name: item.name,
      dates: item.birthYear && item.deathYear
        ? `${item.birthYear} - ${item.deathYear}`
        : (item.deathYear ? `† ${item.deathYear}` : ""),
      location: item.location,
      epitaph: item.epitaph,
    }));

    return NextResponse.json({
      items,
      page: data.page,
      pageSize: data.pageSize,
      total: data.total,
    });
  } catch (error) {
    console.error('Error fetching from backend:', error);
    return NextResponse.json(
      { error: 'Error al conectar con el servidor', items: [], total: 0, page: 1, pageSize: 10 },
      { status: 500 }
    );
  }
}
