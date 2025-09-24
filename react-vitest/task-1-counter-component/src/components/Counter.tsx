import React, { useState } from "react";
import Button from "./Button";

type CounterProps = {
    step: number;
}

function Counter({step}: CounterProps): JSX.Element {
  const [count, setCount] = useState<number>(0);

  return (
    <div data-testid="counter-component">
      <div>
        Your Count Is: <span data-testid="count">{count}</span>
      </div>
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <Button text="Increment" clickEvent={(e) => setCount(count + step)}/>
        <Button text="Decrement" clickEvent={(e) => setCount(count - step)}/>
      </div>
    </div>
  );
}

export default Counter;
