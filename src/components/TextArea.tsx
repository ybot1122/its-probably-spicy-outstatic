import { libre_baskerville } from "@/app/fonts";

const TextArea = ({
  initialVal,
  inputName,
  label,
  placeholder,
}: {
  initialVal: string | undefined;
  label: string;
  inputName: string;
  placeholder: string;
}) => (
  <>
    <label htmlFor={inputName} className="block mb-2">
      {label}
    </label>
    <textarea
      className={`block border-2 border-silver p-5 w-full focus:outline-none focus:ring focus:border-blue-500 ${libre_baskerville.className}`}
      defaultValue={initialVal}
      placeholder={initialVal ? undefined : placeholder}
      name={inputName}
      id={inputName}
    />
  </>
);

export default TextArea;
