# 🧠 JavaScript Fundamentals — Vitest Practice Tasks

This project contains focused JavaScript & TypeScript coding exercises — designed to improve my ability to transform, combine, and test data.

## 🚀 Getting Started
Run all tests:
```
npm run test
```

## 🧩 Task 1 — Group posts by user

### Goal

Group an array of posts by userId.

### Function signature
```
groupPostsByUser(posts: Post[]): Record<number, Post[]>
```

### Example
```
const posts = [
    { id: 1, userId: 1, title: 'A' },
    { id: 2, userId: 2, title: 'B' },
    { id: 3, userId: 1, title: 'C' },
];
```

### Output:
```
{
    1: [
        { id: 1, userId: 1, title: 'A' },
        { id: 3, userId: 1, title: 'C' }
    ],
    2: [
        { id: 2, userId: 2, title: 'B' }
    ]
}
```

## 🧩 Task 2 — Flatten nested comments
### Goal

Convert a nested comment tree into a flat array.

### Function signature
```
flattenComments(comments: Comment[]): FlatComment[]
```
### Example
```
const comments = [
    {
        id: 1,
        text: 'Root',
        replies: [
            { id: 2, text: 'Child 1', replies: [] },
            { id: 3, text: 'Child 2', replies: [{ id: 4, text: 'Nested', replies: [] }] },
        ],
    },
];
```

### Output:
```
[
    { id: 1, text: 'Root' },
    { id: 2, text: 'Child 1' },
    { id: 3, text: 'Child 2' },
    { id: 4, text: 'Nested' },
]
```

## 🧩 Task 3 — Merge users with their posts
### Goal

Combine two arrays — users and posts — into a single array where each user includes a list of their posts.

### Function signature
```
mergeUsersWithPosts(users: User[], posts: Post[]): UserWithPosts[]
```

### Example
```
const users = [{ id: 1, name: 'Alice' }];
const posts = [
    { id: 1, userId: 1, title: 'Post 1' },
    { id: 2, userId: 1, title: 'Post 2' },
];
```

### Output:
```
[
    {
        id: 1,
        name: 'Alice',
        posts: [
            { id: 1, title: 'Post 1' },
            { id: 2, title: 'Post 2' },
        ],
    },
]
```

## 🧩 Task 4 — Rank users by post count
### Goal

Given a list of users with posts, return the top users ranked by number of posts.

### Function signature
```
rankUsersByPostCount(users: UserWithPosts[]): RankedUser[]
```

### Example
```
[
    { id: 1, name: 'Alice', posts: [{}, {}] },
    { id: 2, name: 'Bob', posts: [{}] },
]
```

### Output:
```
[
    { id: 1, name: 'Alice', postCount: 2 },
    { id: 2, name: 'Bob', postCount: 1 },
]
```

## 🧩 Task 5 — Transform user API response
### Goal

Normalize a raw API payload of users to a consistent internal format.

### Function signature
```
transformUserApiResponse(apiUsers: any[]): NormalizedUser[]
```

### Example

Input:
```
[
    { user_id: 1, full_name: 'Alice Example', mail: 'alice@test.com' },
    { user_id: 2, full_name: 'Bob Builder', mail: 'bob@test.com' },
]
```

### Output:
```
[
    { id: 1, name: 'Alice Example', email: 'alice@test.com' },
    { id: 2, name: 'Bob Builder', email: 'bob@test.com' },
]
```

## 🧩 Task 6 — String utilities
### Goal

Implement the following utilities (each should have its own test):

### Function signatures
```
a) truncate(str: string, maxLength: number): string

Shorten text and append … if it exceeds maxLength.

b) capitalizeWords(str: string): string

Capitalize each word in a sentence.

c) camelToTitle(str: string): string

Convert "firstName" → "First Name".
```

## 🧩 Task 7 — Find missing IDs
### Goal

Given an array of IDs, return the list of missing numbers in sequence.

### Example
```
findMissingIds([1, 2, 4, 6]); // [3, 5]
```


## 🧩 Task 8 — Compose multiple transformations
### Goal

Given an array of posts, apply multiple transformations using functional composition:

Filter posts with title length > 10

Sort by title alphabetically

Return only { id, shortTitle }

### Function signature
```
transformPosts(posts: Post[]): SimplifiedPost[]
```

This task encourages functional programming patterns — e.g., compose, map, and filter.



## 🧩 Task 9 — Deep clone objects

Goal

Write a function to deep clone an object or array, ensuring nested objects/arrays are copied, not referenced.

Function signature

```ts
deepClone<T>(obj: T): T
```

Example

```ts
const obj = { a: 1, b: { c: 2 } };
const clone = deepClone(obj);
clone.b.c = 42;
console.log(obj.b.c); // 2
```

## 🧩 Task 10 — Group and count by property

Goal

Given an array of objects, group them by a property and count how many items in each group.

Function signature

```ts
groupAndCount<T>(items: T[], key: keyof T): Record<string, number>
```

Example

```ts
const data = [
    { type: "fruit", name: "apple" },
    { type: "fruit", name: "banana" },
    { type: "vegetable", name: "carrot" }
];
groupAndCount(data, "type"); 
// { fruit: 2, vegetable: 1 }
```

## 🧩 Task 11 — Sum nested values

Goal

Sum all numeric values in a nested array of objects.

Function signature

```ts
sumNestedValues(items: { value: number, children?: any[] }[]): number
```

Example

```ts
const data = [
    { value: 1, children: [{ value: 2 }, { value: 3 }] },
    { value: 4 }
];
sumNestedValues(data); // 10
```

## 🧩 Task 12 — Unique by key

Goal

Return unique items from an array based on a given key.

Function signature

```ts
uniqueBy<T>(items: T[], key: keyof T): T[]
```

Example

```ts
const data = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 1, name: "Alice" }
];
uniqueBy(data, "id"); 
// [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]
```

## 🧩 Task 13 — Pivot array

Goal

Transform an array of objects into a pivoted object by key.

Function signature

```ts
pivotArray<T>(items: T[], key: keyof T): Record<string, T[]>
```

Example

```ts
const data = [
    { category: "A", value: 10 },
    { category: "B", value: 20 },
    { category: "A", value: 30 }
];
pivotArray(data, "category"); 
// { A: [{ category: "A", value: 10 }, { category: "A", value: 30 }], B: [{ category: "B", value: 20 }] }
```

## 🧩 Task 14 — Functional compose / pipe

Goal

Implement a compose or pipe utility for functional transformations.

Function signatures

```ts
compose(...fns: Function[]): Function
pipe(...fns: Function[]): Function
```

Example

```ts
const double = (x: number) => x * 2;
const square = (x: number) => x * x;

const fn = compose(square, double);
fn(3); // (3*2)^2 = 36

const fn2 = pipe(double, square);
fn2(3); // (3*2)^2 = 36
```
