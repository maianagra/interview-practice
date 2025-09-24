import React from "react";

type ToDoListItemProps = {
  item: ToDoListItemType;
  toggleDone: (id: number) => void;
};

type ToDoListItemType = {
  id: number;
  text: string;
  done: boolean;
};

function ToDoListItem({ item, toggleDone }: ToDoListItemProps): JSX.Element {
  return (
    <div>
      <label>
        <input
          data-testid={`${item.id}-checkbox`}
          type="checkbox"
          onChange={() => toggleDone(item.id)}
          checked={item.done}
        />
        {item.text}
      </label>
    </div>
  );
}

export { ToDoListItem, ToDoListItemType };
