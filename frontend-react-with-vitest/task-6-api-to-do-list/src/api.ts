export async function apiCall(url: string, options: RequestInit = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return await response.json();
}
