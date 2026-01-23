
const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <p className="text-accent font-bold text-[14px] pt-1.5">
      {message}
    </p>
  );
};

export default ErrorMessage;