## API calls
Fetch with try/catch + error handling

```ts
async function fetchData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    } 
    const data = await response.json();
    return data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
}
```

Using inside useEffect

```ts
useEffect(() => {
  async function loadPosts() {
    try {
      setLoading(true);
      const data = await fetchData();
      setPosts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  loadPosts();
}, []); // [] = run once on mount
```

fetchWithTimeout pattern (example)

```ts
export async function fetchWithTimeout<T = any>(
  endpoint: string,
  options: RequestInit = {},
  timeoutMs = 5000
): Promise<T> {
  const response = await fetch(endpoint, {
    ...options,
    signal: AbortSignal.timeout(timeoutMs),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}
```

## React state patterns
Controlled input

```ts
<input value={input} onChange={(e) => setInput(e.target.value)} />
```


Update nested state immutably
```ts
setUserInfo(prev => ({ ...prev, name: "new name" }));
```

```ts
setAllUsers((prev) =>
      prev.map((user) =>
        user.id == id ? { ...user, active: !user.active } : { ...user }
      )
    );
```

```ts
setFilteredUsers(
      allUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(filter.toLowerCase()) ||
          user.email.toLowerCase().includes(filter.toLowerCase())
      )
    );
```


## Mocking in tests (Vitest)
Mock a global fetch that resolves JSON

```ts
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve([{ id: 1, title: "Test" }]),
});
```

Mock fetch rejection

```ts
global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));
```

Mock internal module function (named import)

```ts
// mock ../api.ts which exports `fetchWithTimeout` or `apiCall`
vi.mock("../api", () => ({ fetchWithTimeout: vi.fn(), apiCall: vi.fn() }));

// later in a test file:
import { fetchWithTimeout } from "../api";
(fetchWithTimeout as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce([/* ... */]);
```

Tip: mockResolvedValueOnce() / mockRejectedValueOnce() are great for per-test behavior.

Clear mocks between tests
```ts
beforeEach(() => {
  vi.clearAllMocks();
});
```

## React Testing Library (RTL) — common patterns
Rendering and simple assertions
```ts
render(<MyComponent />);
expect(screen.getByText("Hello")).toBeVisible();
expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
```

Waiting for async UI updates

Use findBy* or waitFor when the UI updates after async actions:
```ts
// waits until the element appears (or times out)
expect(await screen.findByText("Loaded")).toBeVisible();

// or
await waitFor(() => {
  expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
});
```

Fire events (user interaction)
```ts
fireEvent.click(screen.getByText("Save"));
fireEvent.change(screen.getByRole("textbox"), { target: { value: "hello" }});
```

Query patterns

- getBy* — synchronous, throws if not found

- queryBy* — synchronous, returns null if not found

- findBy* — asynchronous, returns promise (waits until found)


Common matchers (@testing-library/jest-dom)

```ts
expect(element).toBeVisible();
expect(element).toHaveTextContent("Hello");
expect(element).toHaveAttribute("value", "test");
expect(screen.queryByText("Missing")).not.toBeInTheDocument();
expect(checkbox).toBeChecked();
```

## Test examples from your tasks
Mock apiCall and assert it was called on mount

```ts
vi.mock("../api", () => ({ apiCall: vi.fn() }));
import { apiCall } from "../api";

(apiCall as ReturnType<typeof vi.fn>).mockResolvedValueOnce([/* todos */]);
render(<ToDoList />);
expect(apiCall).toHaveBeenCalledOnce();
```

Assert list items rendered after async fetch
```ts
(apiCall as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockItems);
render(<ToDoList />);
const checkboxes = await screen.findAllByRole("checkbox");
expect(checkboxes).toHaveLength(mockItems.length);
```

Test form submission calls API with correct body
```ts
render(<CreateUserForm />);
fireEvent.change(screen.getByTestId("Name-input"), { target: { value: "Alice" } });
fireEvent.click(screen.getByText("submit"));

expect(fetchWithTimeout).toHaveBeenCalledWith("/api/users", {
  method: "POST",
  body: JSON.stringify({ name: "Alice", email: "", username: "" }),
});
```

## Vitest config & setup (quick)
setupTests.ts (enable jest-dom matchers)

```
// setupTests.ts
import "@testing-library/jest-dom";
```

vitest.config.ts example
```
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
  },
});
```

```
npm install -D @testing-library/react @testing-library/jest-dom
npm install @testing-library/react@14.1.2 @testing-library/jest-dom@6.1.3
npm uninstall @testing-library/react @testing-library/jest-dom

npm install --save-dev @testing-library/react@12.1.5 @testing-library/jest-dom@5.16.4

```