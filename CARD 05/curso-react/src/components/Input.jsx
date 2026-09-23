function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`border border-slate-300 outline-slate-400 px-4 py-2 rounded-md ${className}`}
    />
  );
}

export default Input;
