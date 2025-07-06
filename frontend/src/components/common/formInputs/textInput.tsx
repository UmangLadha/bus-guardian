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
  autoComplete?: string;
  title?: string;
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
    autoComplete,
    title,
    onChange,
  } = props;

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
          required={required}
          autoComplete={autoComplete}
          minLength={minLength}
          maxLength={maxLength}
          pattern={pattern}
          title={title}
          className="border-[1px] border-yellow-300 outline-none py-2 px-4 rounded-lg w-full my-2 focus:border-yellow-500"
        />
      </label>
    </>
  );
}

export default TextInput;
