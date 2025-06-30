import { useState } from "react";
import TextInput from "../../../components/common/formInputs/textInput";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface AdminCredentials {
  adminId: string;
  phoneNo: number;
  password: string;
}

function SignupForm() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    adminId: "",
    contactNo: "",
    password: "",
  });
  const { adminId, contactNo, password } = inputValue;
  const [inputValid, setInputValid] = useState({
    adminId: false,
    contactNo: false,
    password: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setInputValue((prev) => ({ ...prev, [field]: value }));
  };

  const fieldValid = (field: string, valid: boolean) => {
    setInputValid((prev) => ({ ...prev, [field]: valid }));
  };

  const resetForm = () => {
    setInputValue({ adminId: "", contactNo: "", password: "" });
    setInputValid({ adminId: false, contactNo: false, password: false });
  };

  const sendingDataToServer = async (adminCred: AdminCredentials) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/register`,
        adminCred
      );
      toast.success(response.data.message || "Signup successful!");
      localStorage.setItem("token",response.data.accessToken);
      resetForm();
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("error in sending adminCred: ", error);
        toast.error(
          error.response?.data?.message || "Admin Registration failed"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isFormFilled =
    !inputValid.adminId || !inputValid.contactNo || !inputValid.password;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormFilled) {
      toast.error("All fields are required");
      return;
    }
    setIsLoading(true);
    const adminCred = {
      adminId,
      phoneNo: Number(contactNo),
      password,
    };
    sendingDataToServer(adminCred);
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
        placeholder="Enter admin Id"
        onChange={(val) => handleInputChange("adminId", val)}
        setInputValid={(isvalid) => fieldValid("adminId", isvalid)}
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
        autoComplete="on"
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        placeholder="Enter password"
        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more character"
        onChange={(val) => handleInputChange("password", val)}
        setInputValid={(isvalid) => fieldValid("password", isvalid)}
        required
      />
      <button
        type="submit"
        disabled={isFormFilled}
        className={`bg-secondary mt-5 text-white py-2 px-4 mb-3 w-full rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isLoading ? "Creating..." : "Create Account"}
      </button>
    </form>
  );
}

export default SignupForm;
