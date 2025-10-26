type ButtonProps = {
  text: string;
  onClickAction: any;
};

function Button({ text, onClickAction }: ButtonProps) {
  return <button onClick={onClickAction}>{text}</button>;
}

export default Button