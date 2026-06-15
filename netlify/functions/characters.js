import { getStore } from "@netlify/blobs";

const BLOB_KEY = "all";

async function getAll(store) {
  return (await store.get(BLOB_KEY, { type: "json" })) ?? [];
}

export default async (req) => {
  const store = getStore({ name: "characters", consistency: "strong" });
  const url = new URL(req.url);

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (req.method === "GET") {
    const chars = await getAll(store);
    return new Response(JSON.stringify(chars), { status: 200, headers });
  }

  if (req.method === "POST") {
    const char = await req.json();
    const chars = await getAll(store);
    const idx = chars.findIndex((c) => c.id === char.id);
    const next = idx >= 0 ? chars.map((c) => (c.id === char.id ? char : c)) : [...chars, char];
    await store.setJSON(BLOB_KEY, next);
    return new Response(JSON.stringify(char), { status: idx >= 0 ? 200 : 201, headers });
  }

  if (req.method === "DELETE") {
    const id = url.searchParams.get("id");
    if (!id) return new Response(JSON.stringify({ error: "id required" }), { status: 400, headers });
    const chars = await getAll(store);
    await store.setJSON(BLOB_KEY, chars.filter((c) => c.id !== id));
    return new Response(null, { status: 204 });
  }

  return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405, headers });
};

export const config = { path: "/api/characters" };
