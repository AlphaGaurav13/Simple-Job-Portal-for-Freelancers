const API_URL = import.meta.env.VITE_API_URL;

export async function fetchServices() {
  const res = await fetch(`${API_URL}/api/services`);
  if (!res.ok) throw new Error("Failed to fetch services");
  return res.json();
}
