type TextInputProps = {
  text: string;
  value: string;
  onChangeAction: any;
};

function TextInput({ text, value, onChangeAction }: TextInputProps) {
  return (
    <div>
      <label style={{ display: "flex", width: "100%" }}>
        {text}:
        <input
          data-testid={`${text}-input`}
          style={{ width: "100%", marginLeft: "10px" }}
          id={text}
          onChange={onChangeAction}
          value={value}
        />
      </label>
    </div>
  );
}

export default TextInput;
