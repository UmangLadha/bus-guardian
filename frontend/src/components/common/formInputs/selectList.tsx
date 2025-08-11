import type { SelectInputPropsTypes } from "../../../types/types";

function SelectList({
  label,
  name,
  value,
  onChange,
  options,
  required,
  disabled,
}: SelectInputPropsTypes) {
  return (
    <>
      <label
        className="p-1.5 text-left w-full flex flex-col gap-1"
        htmlFor={name}
      >
        <span className="font-medium">{label}</span>
        <select
          name={name}
          id={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          className="border border-yellow-300 outline-none py-2 px-4 rounded-lg w-full focus:border-yellow-500"
        >
          <option value="">Select a option</option>
          {options.map((option) => (
            <option key={option.id} value={option.id || option.name}>
              {option.name}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}

export default SelectList;
