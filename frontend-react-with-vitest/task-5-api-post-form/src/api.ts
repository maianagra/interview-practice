export async function fetchWithTimeout(
  endpoint: string,
  options: RequestInit = {},
  timeoutMs: number = 5000
) {
  //   try {
  //     // Fetch
  //     const response = await fetch(endpoint, {
  //       ...options,
  //       signal: AbortSignal.timeout(timeoutMs),
  //     });

  //     // Error Handling
  //     if (!response.ok) {
  //       throw new Error(`Error. Status Code: ${response.status}. Status Text: ${response.statusText}`);
  //     }

  //     return await response.json();
  //   } catch (error: any) {
  //     if (error.name === "AbortError") {
  //       throw new Error(`Request aborted (maybe timed out after ${timeoutMs}ms)`);
  //     } else {
  //       throw error;
  //     }
  //   }

  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve(); // resolves after timeoutMs
    }, timeoutMs);
  });
}
