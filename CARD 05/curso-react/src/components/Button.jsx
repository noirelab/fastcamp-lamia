function Button({ className = "", children, ...props }) {
  return (
    <button
      {...props}
      className={`bg-slate-400 p-2 rounded-md text-white ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
