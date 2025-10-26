type DropdownItemProps = {
  label: string;
  setSelectedItem: (label: string) => void;
};

function DropdownItem({ label, setSelectedItem }: DropdownItemProps) {
    
  return (
    <li
      style={{ display: "flex", backgroundColor: "#CFCFCF", color: "black"}}
      onClick={() => setSelectedItem(label)}
      role="option"
    >
      {label}
    </li>
  );
}

export default DropdownItem;
