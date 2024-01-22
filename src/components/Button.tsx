interface ButtonProps {
  small?: boolean;
  grey?: boolean;
  className?: string;
  text: string;
  disabled?: boolean;
}

const Button = ({
  small = false,
  grey = false,
  className = "",
  text,
  disabled = false,
}: ButtonProps) => {
  const sizeClasses = small ? "px-2 py-1" : "px-4 py-2 font-bold";
  const colorClasses = grey
    ? "bg-gray-400 hover:bg-gray-300 focus-visible:bg-gray-300"
    : "bg-blue-500 hover:bg-blue-400 focus-visible:bg-blue-400";

  return (
    <>
      <button
        className={`rounded-full text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses} ${colorClasses} ${className}`}
        disabled={disabled}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
