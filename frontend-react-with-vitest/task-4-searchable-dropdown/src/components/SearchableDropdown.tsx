import React, { useState } from "react";
import DropdownItem from "./DropdownItem";
import Button from "./Button";

type SearchableDropdownProps = {
  items: DropdownItemType[];
};

type DropdownItemType = {
  id: number;
  label: string;
};

function SearchableDropdown({ items }: SearchableDropdownProps) {
  const [matchedItems, setMatchedItems] = useState<DropdownItemType[]>(items);
  const [inputVal, setInputVal] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [inputFocused, setInputFocused] = useState<boolean>(false);

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setMatchedItems(items.filter((item) => item.label.includes(value)));
    setInputVal(value);
  }

  function resetButtonClick() {
    setInputVal("");
    setMatchedItems(items);
  }

  function handleBlur() {
    setTimeout(() => setInputFocused(false), 100);
  }

  return (
    <div>
      <div style={{ display: "flex", width: "100%", marginBottom: "15px" }}>
        Your Selected Item:
        <span data-testid="selected-item" style={{ paddingLeft: "5px" }}>
          {selectedItem}
        </span>
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <input
            data-testid="dropdown-input"
            aria-controls="dropdown-list"
            role="combobox"
            type="text"
            placeholder="search"
            value={inputVal}
            onChange={(e) => onInputChange(e)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => handleBlur()}
          ></input>
          {inputFocused && (
            <ul role="listbox" id="dropdown-list">
              {matchedItems.map((item) => (
                <DropdownItem
                  key={item.id}
                  label={item.label}
                  setSelectedItem={setSelectedItem}
                />
              ))}
            </ul>
          )}
        </div>
        <div style={{ marginLeft: "15px" }}>
          <Button text="Reset" onClickAction={resetButtonClick} />
        </div>
      </div>
    </div>
  );
}

export default SearchableDropdown;
