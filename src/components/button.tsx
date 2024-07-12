interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  selected?: boolean;
}

export default function Button({
  children,
  selected = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`text-white font-bold py-2 px-4 rounded h-fit w-fit ${
        selected ? "bg-blue-500" : "bg-red-500 hover:bg-red-700"
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
