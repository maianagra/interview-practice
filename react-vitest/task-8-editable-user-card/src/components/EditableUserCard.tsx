import { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";

type UserInfo = {
  name: string;
  email: string;
  username: string;
};

function EditableUserCard() {
  // make this only allow edit or view
  const [mode, setMode] = useState<string>("view");
  const [typedUserInfo, setTypedUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    username: "",
  });
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    username: "",
  });

  function modeSwitch() {
    if (mode === "view") {
      setMode("edit");
    } else {
      setMode("view");
    }
  }

  function onInfoChange(value: string, field: string) {
    setTypedUserInfo((prev) => ({ ...prev, [field]: value }));
  }

  function onSave() {
    setUserInfo(typedUserInfo);
    setMode("view");
  }

  function onCancel() {
    setTypedUserInfo(userInfo);
    setMode("view");
  }

  return (
    <div>
      {mode === "view" ? (
        <div>
          <h1>View Mode</h1>
          <div> Name: {userInfo.name}</div>
          <div> Email: {userInfo.email}</div>
          <div> Username: {userInfo.username}</div>
          <div style={{ marginTop: "20px" }}>
            <Button text="Edit" onClickAction={modeSwitch} />
          </div>
        </div>
      ) : (
        <>
          <h1>Edit Mode</h1>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "15px",
            }}
          >
            <InputField
              title="Name"
              value={typedUserInfo.name}
              onChangeAction={(e: any) => onInfoChange(e.target.value, "name")}
            />
            <InputField
              title="Email"
              value={typedUserInfo.email}
              onChangeAction={(e: any) => onInfoChange(e.target.value, "email")}
            />
            <InputField
              title="Username"
              value={typedUserInfo.username}
              onChangeAction={(e: any) =>
                onInfoChange(e.target.value, "username")
              }
            />
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <Button text="Save" onClickAction={() => onSave()} />
            <Button text="Cancel" onClickAction={() => onCancel()} />
          </div>
        </>
      )}
    </div>
  );
}

export default EditableUserCard;
