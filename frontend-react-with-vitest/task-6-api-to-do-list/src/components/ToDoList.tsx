// src/components/ToDoList.tsx
import { useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";
import { apiCall } from "../api";

type ToDoListItem = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

function ToDoList() {
  const [error, setError] = useState<string | null>(null);
  const [toDoList, setToDoList] = useState<ToDoListItem[]>([]);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiCall(
          "https://jsonplaceholder.typicode.com/todos?_limit=10"
        );
        console.log(data);
        setToDoList(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  async function checkItem(id: number) {
    try {
      await apiCall(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "PUT",
      });

      setToDoList((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, completed: !item.completed } : item
        )
      );
    } catch (error: any) {
      setError(
        `Failed to update checked item on server, please try again. Error: ${error}`
      );
    }
  }

  async function addItem(title: string) {
    try {
      const requestBody = JSON.stringify({ title: title });
      const response = await apiCall(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          body: requestBody,
        }
      );

      setToDoList((prev) =>
        prev.concat({
          title: title,
          completed: false,
          id: response.id,
          userId: 123,
        })
      );
    } catch (error: any) {
      setError(`Failed to add new item, please try again. Error: ${error}`);
    }
  }

  return (
    <>
      <h1>To Do</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          marginBottom: "15px",
        }}
      >
        {toDoList.map((toDo) => (
          <ToDoItem
            key={toDo.id}
            title={toDo.title}
            completed={toDo.completed}
            checkItem={() => checkItem(toDo.id)}
          />
        ))}
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <>
        <input value={value} onChange={(e) => setValue(e.target.value)}></input>
        <button onClick={() => addItem(value)}>Add</button>
      </>
    </>
  );
}

export default ToDoList;
