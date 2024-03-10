const TextArea = ({
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
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => (
  <>
    <label htmlFor={inputName} className="block mb-2">
      {label}
    </label>
    <textarea
      className={`block border-2 border-silver p-5 w-full focus:outline-none focus:ring focus:border-blue-500`}
      defaultValue={initialVal}
      placeholder={initialVal ? undefined : placeholder}
      name={inputName}
      id={inputName}
      onChange={onChange}
    />
  </>
);

export default TextArea;
