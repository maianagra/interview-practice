import "./App.css";
import ToDoList from "./components/ToDoList";

function App() {
  return (
    <>
      <ToDoList
        items={[
          { id: 1, text: "item 1", done: false },
          { id: 2, text: "item 2", done: true },
          { id: 3, text: "item 3", done: true },
          { id: 4, text: "item 4", done: false },
          { id: 5, text: "item 5", done: false },
        ]}
      />
    </>
  );
}

export default App;
