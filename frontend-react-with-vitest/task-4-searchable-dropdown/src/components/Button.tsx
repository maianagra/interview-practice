type ButtonProps = {
  text: string;
  onClickAction: any;
};

function Button({ text, onClickAction }: ButtonProps) {
  return (
    <button style={{ height: "25px" }} onClick={() => onClickAction()}>
      {text}
    </button>
  );
}

export default Button;
