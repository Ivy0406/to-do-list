import ErrorMessage from "../shared/ErrorMessage";

const FormInput = ({ label, id, type, value, placeholder, onChange, error, autoComplete }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={id} className="text-text-main text-[14px] font-bold">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="bg-input-default rounded-[10px] px-4 py-3"
      />
      <ErrorMessage message={error} />
    </div>
  );
};

export default FormInput;