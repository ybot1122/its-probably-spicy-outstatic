export const style = `block border-2 border-silver p-5 w-full focus:outline-none focus:ring focus:border-blue-500`;

const TextInput = ({
  initialVal,
  inputName,
  label,
  placeholder,
  onChange,
}: {
  initialVal: string | undefined;
  label: string;
  inputName: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <>
    <label htmlFor={inputName} className="block mb-2">
      {label}
    </label>
    <input
      className={style}
      type="text"
      defaultValue={initialVal}
      placeholder={initialVal ? undefined : placeholder}
      onChange={onChange}
      name={inputName}
      id={inputName}
    />
  </>
);

export default TextInput;
