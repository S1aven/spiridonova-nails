/**
 * Базовый URL Strapi API (без завершающего слеша).
 * Локально: http://localhost:1337
 * На VPS: https://api.yourdomain.com или http://localhost:1337 при прокси
 */
export function getStrapiUrl(): string {
  return process.env.STRAPI_URL?.replace(/\/$/, '') ?? '';
}

export function isStrapiEnabled(): boolean {
  return Boolean(process.env.STRAPI_URL);
}

const defaultHeaders: RequestInit['headers'] = {
  'Content-Type': 'application/json',
  ...(process.env.STRAPI_API_TOKEN && {
    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
  }),
};

/**
 * Запрос к Strapi REST API.
 * @param path - путь без ведущего слеша, например "api/services"
 * @param params - query-параметры (populate, sort, filters и т.д.)
 */
export async function fetchStrapi<T = unknown>(
  path: string,
  params: Record<string, string | string[] | number | boolean | undefined> = {}
): Promise<T> {
  const base = getStrapiUrl();
  if (!base) {
    throw new Error('STRAPI_URL is not set');
  }

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === '') return;
    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, String(v)));
    } else {
      searchParams.set(key, String(value));
    }
  });

  const url = `${base}/${path.replace(/^\//, '')}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  const res = await fetch(url, {
    headers: defaultHeaders,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Strapi API error ${res.status}: ${text}`);
  }

  return res.json() as Promise<T>;
}
