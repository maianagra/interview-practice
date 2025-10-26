import React from "react";

type ButtonProps = {
  text: string;
  clickEvent: React.MouseEventHandler<HTMLButtonElement>;
};

function Button({ text, clickEvent }: ButtonProps): JSX.Element {
  const buttonStyles: React.CSSProperties = {
    borderRadius: "15px",
    backgroundColor: "#6665a4",
    color: "white",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "8px",
    paddingRight: "8px",
    border: "none",
  };

  return (
    <button onClick={clickEvent} style={buttonStyles}>
      {text}
    </button>
  );
}

export default Button;
