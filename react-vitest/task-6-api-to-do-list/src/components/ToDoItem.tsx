// src/components/ToDoItem.tsx
type ToDoListItemProps = {
  title: string;
  completed: boolean;
  checkItem: React.ChangeEventHandler<HTMLInputElement>;
};

function ToDoItem({ title, completed, checkItem }: ToDoListItemProps) {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <input
        role="checkbox"
        type="checkbox"
        checked={completed}
        onChange={checkItem}
      />

      {/* To Do: make this clickable too */}
      <div>{title}</div>
    </div>
  );
}

export default ToDoItem;
