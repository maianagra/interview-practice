type ButtonProps = {
  text: string;
  onClickAction: () => void;
};

function Button({ text, onClickAction }: ButtonProps) {
  return <button onClick={() => onClickAction()}>{text}</button>;
}

export default Button;
