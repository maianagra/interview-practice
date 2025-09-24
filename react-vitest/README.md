# ⚛️ Front-End React and Vitest Interview Practice Tasks

This folder contains a series of **React + TypeScript** practice tasks, each designed to simulate common interview-style problems.  
Every task lives in its own folder and comes with requirements and suggested tests written using **Vitest** and **React Testing Library**.  

---

## ▶️ Getting Started

1. Install dependencies (only once):
```bash
  cd react-vitest
  cd <the chosen task folder>
  npm install
```
2. Run the development server (using Vite):

```bash
npm run dev
```

3. Run tests:
```
npm run test
```
---

## 📋 Tasks

### Task 1: Counter Component
- Build a `<Counter />` component:
  - Shows a number with **Increment** and **Decrement** buttons.
  - Accepts optional `step` prop (default 1).
- **Tests**:
  - Default value renders correctly.
  - Increment/decrement works with `step`.
  - Buttons trigger the correct state change.


### Task 2: Todo List
- Build `<ToDoList />` and `<ToDoListItem />`:
  - Accepts `items: { id: number; text: string; done: boolean }[]`.
  - Toggles completion with checkbox.
  - Shows count of completed items.
- **Tests**:
  - Renders correct number of items.
  - Checkbox toggle updates completion count.
  - Completed count updates correctly when toggled.
- Optional:
  - Accessibility improvements (`label` association).
  - Default vs dynamic props.



### Task 3: User List (API GET)
- Build `<UserList />` component:
  - Fetches users from `GET https://jsonplaceholder.typicode.com/users`.
  - Shows **loading**, **error**, and **empty state**.
  - Displays users in a list (`<ul>`/`<li>`).
- **Tests**:
  - Loading state renders initially.
  - API call is made once with correct URL.
  - Error state renders if fetch fails.
  - List renders correctly when users are returned.
  - Empty list renders “No users found” message.



### Task 4: Searchable Dropdown
- `<SearchableDropdown />` component:
  - Accepts `items: { id: number; label: string }[]`.
  - Filters list based on input.
  - Clicking an item selects it; selected value displayed above input.
- **Tests**:
  - Filters items as typed.
  - Selection works correctly.
  - Reset button clears selection.

---

### Task 5: Create User Form (API POST)
- `<CreateUserForm />` component:
  - Fields: `name`, `email`, `username`.
  - Submit button sends `POST /api/users` with JSON body.
  - Shows **loading**, **success**, and **error** states.
- **Tests**:
  - Submission calls API with correct body.
  - Loading and error states render correctly.
  - Success message renders on successful submission.


### Task 6: Todo App with API Integration
- Extend Task 2 with API:
  - Fetch todos from `GET https://jsonplaceholder.typicode.com/todos` on mount.
  - Toggle completion calls `PUT https://jsonplaceholder.typicode.com/todos/:id`.
  - Add new todos with `POST https://jsonplaceholder.typicode.com/todos`.
  - Handles **loading**, **error**, and **empty state**.
- **Tests**:
  - Todos fetched and rendered correctly.
  - Toggle calls `PUT` with correct data.
  - Adding todo calls `POST` correctly.



### Task 7: Searchable API List
- `<SearchableApiList />` component:
  - Fetch a list of items from `https://jsonplaceholder.typicode.com/posts` or `users`.
  - Search input filters displayed items.
  - Shows **loading**, **error**, and **empty state**.
- **Tests**:
  - Items render after fetch.
  - Filter works correctly.
  - Loading and error states display appropriately.



### Task 8: Editable User Card
- `<EditableUserCard />` component:
  - Shows user info: `name`, `email`, `username`.
  - Toggle between view and edit mode with an **Edit** button.
  - **Save** updates state; **Cancel** discards changes.
- **Tests**:
  - Card renders in view mode initially.
  - Edit mode displays input fields.
  - Save updates state correctly.
  - Cancel reverts changes.



### Task 9: Toggleable Theme Component
- `<ThemeToggle />` component:
  - Button toggles between **light** and **dark** themes.
  - Applies different styles for each theme.
  - Persists theme in `localStorage`.
- **Tests**:
  - Theme toggles correctly.
  - Theme persists on reload.


### Task 10: Simple Pagination Component
- `<PaginatedList />` component:
  - Accepts a list of items as props.
  - Displays a fixed number per page (e.g., 5 items).
  - Buttons to navigate pages.
  - Shows current page / total pages.
- **Tests**:
  - Correct items per page render.
  - Navigation buttons work.
  - Handles first/last page edge cases.



### Task 11: Countdown Timer Component
- `<CountdownTimer />` component:
  - Accepts `initialSeconds` prop.
  - Buttons: **Start**, **Pause**, **Reset**.
  - Displays “Time’s up!” when timer reaches 0.
- **Tests**:
  - Timer counts down correctly.
  - Buttons behave correctly.
  - Timer stops at 0.



### Task 12: Infinite Scroll / Pagination
- `<InfiniteUserList />` component:
  - Fetches paginated users from `GET /api/users?page=1`.
  - Appends next page when scrolled to bottom.
  - Shows **loading indicator** for page fetches.
  - Shows “No more users” when done.
- **Tests**:
  - Initial page renders correctly.
  - Appending pages works.
  - Loading and end-of-list states render properly.


### Task 13: Editable Table
- `<EditableTable />` component:
  - Accepts `rows: { id: number; name: string; age: number }[]`.
  - Inline editing of `name` and `age`.
  - Each row has **Save** button → `PUT /api/rows/:id`.
  - Shows saving and error states per row.
- **Tests**:
  - Editing triggers correct API calls.
  - Saving indicator shows and hides.
  - Error state shows per row when API fails.


### Task 14: Filterable User Table
- `<UserTable />` component:
  - Fetch users from `GET https://jsonplaceholder.typicode.com/users`.
  - Display users in a table with columns: Name, Email, Active.
  - Include a **search input** to filter by name or email.
  - Include a **checkbox** per user to mark as "active" (stored locally).
  - Show **loading**, **error**, and **empty state**.
- **Tests**:
  - API call is made and table renders users.
  - Filtering updates displayed rows correctly.
  - Toggling “active” checkbox updates state correctly.
  - Loading, error, and empty states render properly.
- Optional Enhancements:
  - Sort by name or email.
  - Select all / deselect all active checkboxes.


### Task 15: Expandable Todo Cards
- `<TodoCards />` component:
  - Fetch todos from `GET https://jsonplaceholder.typicode.com/todos?_limit=10`.
  - Render each todo as a card showing `title` and `completed`.
  - Clicking a card expands it to show additional details (like `userId`) and an **inline edit mode** for title.
  - Save changes locally (no real API update needed for simplicity).
  - Show **loading**, **error**, and **empty state**.
- **Tests**:
  - API call is made and cards render.
  - Expanding/collapsing cards works.
  - Editing a todo updates the local state correctly.
  - Loading, error, and empty states render properly.
- Optional Enhancements:
  - Add a toggle to mark as completed inside the expanded card.
  - Animate expand/collapse for visual feedback.
