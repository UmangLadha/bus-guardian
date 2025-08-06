import type { InputPropsTypes } from "../../../types/types";

function TextInput(props: InputPropsTypes) {
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
    autoComplete,
    title,
    min,
    max,
    onChange,
  } = props;

  return (
    <>
      <label
        htmlFor={name}
        className="p-1.5 text-left min-w-64 w-full flex flex-col gap-1"
      >
        <span className="font-medium">
          {label}
          {required && "*"}
        </span>
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          autoComplete={autoComplete}
          minLength={minLength}
          maxLength={maxLength}
          pattern={pattern}
          title={title}
          className="border border-yellow-300 outline-none py-2 px-4 rounded-lg w-full my-1 focus:border-yellow-500"
        />
      </label>
    </>
  );
}

export default TextInput;
