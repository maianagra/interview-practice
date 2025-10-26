export async function fetchFromApi(
  endpoint: string,
  options: RequestInit = {}
) {
  try {
    // Fetch
    const response = await fetch(endpoint, { ...options });

    // Error Handling
    if (!response.ok) {
      const error: any = new Error(`Failed to fetch: ${response.statusText}`);
      error.status = response.status;
      throw error;
    }

    return await response.json();
  } catch (error: any) {
    throw error;
  }
}
