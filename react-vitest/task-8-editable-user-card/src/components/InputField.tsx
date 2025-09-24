type InputField = {
  title: string;
  value: string;
  onChangeAction: any;
};

function InputField({ title, value, onChangeAction }: InputField) {
  return (
    <label>
      {title}
      <input
        data-testid={`${title}-input`}
        role="textbox"
        value={value}
        onChange={onChangeAction}
      ></input>
    </label>
  );
}

export default InputField;
