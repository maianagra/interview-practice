import React, { useState } from "react";
import { ToDoListItem, ToDoListItemType } from "./ToDoListItem";

type ToDoListProps = {
  items: ToDoListItemType[];
};

function ToDoList({ items }: ToDoListProps): JSX.Element {
  const [toDoItems, setToDoItems] = useState<ToDoListItemType[]>(items);

  const toggleDone = (id: number) => {
    setToDoItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const doneCount = toDoItems.filter((item) => item.done).length;

  return (
    <>
      <div>To Do:</div>
      {toDoItems.map((item) => (
        <ToDoListItem key={item.id} item={item} toggleDone={toggleDone} />
      ))}
      <div>
        Completed Items: <span data-testid="done-count">{doneCount}</span>
      </div>
    </>
  );
}

export default ToDoList;
