
# Express + TypeScript Backend Practice Tasks

This folder contains a set of Node.js + Express + TypeScript backend practice tasks. Each task focuses on a core skill (routing, external API calls, data transformation, validation, and testing with Vitest + Supertest).

## Getting started

Quick setup (if you don't already have a project):

```bash
mkdir express-ts-backend && cd express-ts-backend
npm init -y
npm install express axios
npm install -D typescript ts-node-dev @types/node @types/express vitest supertest @types/supertest
npx tsc --init
```

Add scripts to `package.json`:

```json
"scripts": {
  "dev": "ts-node-dev --respawn src/app.ts",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

Minimal folder structure:

```
src/
 ├── app.ts
 ├── index.ts
 ├── routes/
 ├── controllers/
 ├── services/
 ├── utils/
 └── types/
```

Run the server:

```bash
npm run dev
```

Run tests:

```bash
npm run test
```

---

## Task 1 — Basic Express setup

### Goal

Create a minimal Express + TypeScript server with a health endpoint.

### Endpoint

GET /status

Response shape (TypeScript interface):

```ts
interface StatusResponse {
  status: 'ok';
  time: string; // ISO timestamp
}
```

Behaviour

- Return HTTP 200 with body: `{ status: 'ok', time: '<current_time>' }`.

### Example test (src/tests/status.test.ts)

```ts
import request from 'supertest';
import app from '../app';
import { describe, it, expect } from 'vitest';

describe('GET /status', () => {
  it('returns server status', async () => {
    const res = await request(app).get('/status');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('time');
  });
});
```

---

## Task 2 — Fetch & transform external API data

### Goal

Fetch posts from an external API and return a transformed list.

### Endpoint

GET /posts

### Behaviour

- Fetch `https://jsonplaceholder.typicode.com/posts`.
- Return only the first 5 posts.
- Each item must include: `{ id, title, shortTitle }` where `shortTitle` is the first 20 characters of `title`.

### Implementation hints

- Use `axios` to fetch data.
- Use `.slice(0, 5).map(...)` to transform results.
- Add a TypeScript type for the returned post shape.

### Test ideas

- Mock Axios with `vi.mock('axios')`.
- Assert 5 items are returned and each has `shortTitle`.

---

## Task 3 — Parameterized routes & filtering

### Goal

Support fetching posts for a specific user.

### Endpoint

GET /posts/:userId

### Behaviour

- Fetch all posts and filter by `userId`.
- If no posts found for the user, return 404 with `{ error: 'No posts found for this user' }`.

### Test ideas

- Mock posts with multiple userIds.
- Assert only posts matching the param are returned.
- Assert 404 when none exist.

---

## Task 4 — Combine multiple APIs

### Goal

Combine users and posts to produce user objects with a `postCount`.

### Endpoint

GET /userPosts

### Behaviour

- Fetch `/users` and `/posts` from jsonplaceholder.
- Return an array of users with shape: `{ id, name, email, postCount }`.
- Sort users by `postCount` descending.

### Implementation hints

- Use `.reduce()` to count posts per user, then `.map()` users to include the count, then `.sort()`.

### Test ideas

- Mock both endpoints and verify `postCount` exists and sorting is correct.

---

## Task 5 — Validation, error handling & tests

### Goal

Handle invalid input and missing resources for the posts endpoint.

### Endpoint

GET /posts/:id

### Behaviour

- Validate `id` is a number; if not, return 400 with `{ error: 'Invalid ID' }`.

### Test ideas

- Test valid numeric `id` returns expected shape.
- Test non-numeric `id` returns 400.
- Test nonexistent `id` returns 404.

---

