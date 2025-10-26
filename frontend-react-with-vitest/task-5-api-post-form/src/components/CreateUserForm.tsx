import React, { useState } from "react";
import Button from "./Button";
import { fetchWithTimeout } from "../api";
import TextInput from "./TextInput";

type FormDataType = {
  name: string;
  email: string;
  username: string;
};

function CreateUserForm({}) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    username: "",
  });

  function handleInputChange(key: keyof FormDataType, value: string) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  async function submitForm() {
    try {
      setSuccess(false);
      setError(null);
      setLoading(true);

      if (formData.name === ""|| formData.email === ""|| formData.username === "") {
        throw Error(
          "Inputs cannot be empty. Please fill in all fields and try again."
        );
      }

      const requestBody = JSON.stringify(formData);

      console.log(requestBody);
      await fetchWithTimeout("/api/users", {
        method: "POST",
        body: requestBody,
      });

      setLoading(false);
      setSuccess(true);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  }

  return (
    <>
      {loading ? (
        <>loading ...</>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <TextInput
            text="Name"
            onChangeAction={(e: any) =>
              handleInputChange("name", e.target.value)
            }
            value={formData.name}
          />
          <TextInput
            text="Username"
            onChangeAction={(e: any) =>
              handleInputChange("username", e.target.value)
            }
            value={formData.username}
          />
          <TextInput
            text="Email"
            onChangeAction={(e: any) =>
              handleInputChange("email", e.target.value)
            }
            value={formData.email}
          />
          <Button text="submit" onClickAction={submitForm} />
        </div>
      )}

      {/* Error Message */}
      {error && <>{error}</>}

      {success && <>Successfully submitted your data.</>}
    </>
  );
}

export default CreateUserForm;
