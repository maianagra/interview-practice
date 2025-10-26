import SearchableDropdown from "./components/SearchableDropdown";

function App() {
  return (
    <>
    <div style={{display:"flex", padding: "20px"}}>
      <SearchableDropdown
        items={[
          { id: 1, label: "banana" },
          { id: 2, label: "orange" },
          { id: 3, label: "apple" },
        ]}
      />
      </div>
    </>
  );
}

export default App;
