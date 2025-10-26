import { useState } from "react";

type CardProps = {
  title: string;
  id: number;
  completed: boolean;
  userId: number;
  onCompletedChange: React.ChangeEventHandler<HTMLInputElement>;
  onTitleChange: any;
};

function Card({
  title,
  id,
  completed,
  userId,
  onCompletedChange,
  onTitleChange,
}: CardProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <div
      style={{
        backgroundColor: "#8e8e8eff",
        display: "flex",
        flexDirection: "row",
        gap: "10px",
      }}
    >
      <input
        role="checkbox"
        type="checkbox"
        checked={completed}
        onChange={onCompletedChange}
      ></input>
      <div
        style={{
          display: "flex",
          gap: "5px",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div>
          {expanded ? (
            <input
              value={title}
              onChange={(e) => onTitleChange(id, e.target.value)}
              style={{
                display: "flex",
                width: "95%",
              }}
            />
          ) : (
            <div onClick={() => setExpanded(!expanded)}>{title}</div>
          )}
        </div>

        {expanded && (
          <div onClick={() => setExpanded(!expanded)}> User Id: {userId}</div>
        )}
      </div>
    </div>
  );
}

export default Card;
