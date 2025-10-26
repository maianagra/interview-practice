import { useEffect, useState } from "react";
import Card from "./Card";

type ToDoCard = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

function ToDoCards() {
  const [toDoCards, setToDoCards] = useState<ToDoCard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchToDos() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=10"
        );
        const toDos = await response.json();
        setToDoCards(toDos);
        setError(null);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        setError(error.message);
      }
    }
    fetchToDos();
  }, []);

  function itemCompletedChange(id: number) {
    setToDoCards((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : { ...item }
      )
    );
  }

  function itemTitleChange(id: number, newTitle: string) {
    setToDoCards((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, title: newTitle } : { ...item }
      )
    );
  }

  return (
    <>
      {loading ? (
        <>loading...</>
      ) : (
        <>
          {error ? (
            <>Error: {error}</>
          ) : (
            <>
              {toDoCards.length ? (
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexDirection: "column",
                  }}
                >
                  {toDoCards.map((todo) => (
                    <Card
                      key={todo.id}
                      id={todo.id}
                      title={todo.title}
                      completed={todo.completed}
                      userId={todo.userId}
                      onCompletedChange={() => itemCompletedChange(todo.id)}
                      onTitleChange = {itemTitleChange}
                    />
                  ))}
                </div>
              ) : (
                <>No Cards to Show.</>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default ToDoCards;
