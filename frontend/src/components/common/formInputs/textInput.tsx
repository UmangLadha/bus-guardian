import { useState } from "react";

interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  minLength?: number;
  pattern?: string;
  required: boolean;
  maxLength?: number;
  value: string;
  setInputValid:(value: boolean) => void;
  onChange: (value: string) => void;
}

function TextInput(props: InputProps) {
  const {
    name,
    type,
    placeholder,
    label,
    required,
    minLength,
    maxLength,
    pattern,
    value,
    setInputValid,
    onChange,
  } = props;
  const [inputError, setInputError] = useState("");

  const handleBlur = () => {
    if (value.trim() === "") {
      setInputError("Input fields cannot be blank"); 
      setInputValid(false);
    } else {
      setInputError("");
      setInputValid(true);
    }
  };

  return (
    <>
    <label
      htmlFor={name}
      className="p-1.5 font-medium w-full text-left flex flex-col gap-1"
      >
      <span>{label}</span>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        required={required}
        autoComplete="on"
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        title="password must contain one uppercase, one lowercase, one number, and one special character"
        className="border-[1px] outline-none py-2 px-4 rounded-lg w-full my-2 focus:ring-1 focus:border-0 focus:ring-yellow-200"
        />
      {inputError && <span className="text-red-500 text-sm">{inputError}</span>}
    </label>
        </>
  );
}

export default TextInput;
