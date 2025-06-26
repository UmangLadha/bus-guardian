import { useState } from "react";
import TextInput from "../../../components/common/formInputs/textInput";

function LoginForm() {
  const [inputValue, setInputValue] = useState({
    adminId: "",
    password: "",
  });
  const { adminId, password } = inputValue;
  const [inputValid, setInputValid] = useState({
    adminId: false,
    password: false,
  });

  const handleInputChange = (field: string, value: string) => {
    setInputValue((prev) => ({ ...prev, [field]: value }));
  };

  const fieldValid = (field: string, valid: boolean) => {
    setInputValid((prev) => ({ ...prev, [field]: valid }));
  };

  const isFormValid = !inputValid.adminId || !inputValid.password;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      alert("All fields are required");
      return;
    }
    console.log("Form Submitted:");
    console.log("Username:", adminId);
    console.log("Password:", password);

    setInputValue({
      adminId: "",
      password: "",
    });
    setInputValid({
      adminId: false,
      password: false,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between mx-auto items-start w-full"
    >
      <TextInput
        name="adminId"
        label="Admin ID"
        type="text"
        value={adminId}
        minLength={8}
        placeholder="Enter admin ID"
        onChange={(val) => handleInputChange("adminId", val)}
        setInputValid={(isvalid) => fieldValid("adminId", isvalid)}
        required
      />
      <TextInput
        name="password"
        label="Password"
        type="password"
        minLength={8}
        value={password}
        autoComplete="on"
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more character"
        placeholder="Enter password"
        onChange={(val) => handleInputChange("password", val)}
        setInputValid={(isvalid) => fieldValid("password", isvalid)}
        required
      />
      <button
        type="submit"
        disabled={isFormValid}
        className={`bg-secondary mt-5 text-white py-2 px-4 mb-3 w-full rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        Login
      </button>
    </form>
  );
}
export default LoginForm;
