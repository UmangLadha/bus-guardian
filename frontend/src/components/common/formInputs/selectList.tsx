import type { SelectInputPropsTypes } from "../../../types/types";

function SelectList({
  label,
  name,
  value,
  onChange,
  options,
  required,
}: SelectInputPropsTypes) {
  return (
    <>
      <label
        className="p-1.5 font-medium text-left min-w-64 flex flex-col gap-1"
        htmlFor={name}
      >
        {label}
        <select
          name={name}
          id={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="border-[1px] border-yellow-300 outline-none py-2 px-4 rounded-lg w-full my-2 focus:border-yellow-500"
        >
          <option value="">Select a option</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}

export default SelectList;
