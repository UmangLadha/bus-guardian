import { useState } from "react";
import { Link } from "react-router-dom";
import TextInput from "../components/common/formInputs/textInput";

function SignUpPage() {
  const [inputValue, setInputValue] = useState({
    username: "",
    contactNo: "",
    password: "",
  });
  const { username, contactNo, password } = inputValue;
  const [inputValid, setInputValid] = useState({
    username: false,
    contactNo: false,
    password: false,
  });
  
  const handleInputChange = (field: string, value: string) => {
    setInputValue((prev) => ({ ...prev, [field]: value }));
  };

  const fieldValid = (field: string, valid: boolean) => {
    setInputValid((prev) => ({ ...prev, [field]: valid }));
  };

  const isFormValid = !inputValid.username || !inputValid.contactNo || !inputValid.password
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      alert("All fields are required");
      return;
    }
    console.log("Form Submitted:");
    console.log("Username:", username);
    console.log("Contact No:", contactNo);
    console.log("Password:", password);

    setInputValue({
    username: "",
    contactNo: "",
    password: "",
  });
    setInputValid({
    username: false,
    contactNo: false,
    password: false,
  });
  };

  return (
    <div className="flex py-8 items-center justify-center text-center w-full">
      <div className="shadow-xl w-full mx-4 border rounded-4xl p-8 sm:w-4/5 md:w-3/5 lg:w-2/5 xl:1/3">
        <h1 className=" text-2xl text-secondary">Sign Up</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between mx-auto items-start w-full md:w-4/5"
        >
          <TextInput
            name="username"
            label="Username"
            type="text"
            value={username}
            minLength={8}
            placeholder="Enter username"
            onChange={(val) => handleInputChange("username", val)}
            setInputValid={(isvalid) => fieldValid("username", isvalid)}
            required
          />
          <TextInput
            name="contactNo"
            label="Contact No"
            type="tel"
            value={contactNo}
            maxLength={10}
            minLength={10}
            placeholder="Enter contact number"
            onChange={(val) => handleInputChange("contactNo", val)}
            setInputValid={(isvalid) => fieldValid("contactNo", isvalid)}
            required
          />
          <TextInput
            name="password"
            label="Password"
            type="password"
            minLength={8}
            value={password}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            placeholder="Enter password"
            onChange={(val) => handleInputChange("password", val)}
            setInputValid={(isvalid) => fieldValid("password", isvalid)}
            required
          />
          <button
            type="submit"
            disabled={isFormValid}
            className={`bg-secondary mt-5 text-white py-2 px-4 mb-3 w-full rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Sign up
          </button>
        </form>
        <p className="mt-2 text-sm text-white-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="underline text-secondary hover:text-yellow-800"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
