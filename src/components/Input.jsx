function Input(props) {
  const {
    icon,
    placeholder,
    type,
    value,
    onChange,
    badge,
    customClass,
    message,
  } = props;
  return (
    <div className="flex justify-center items-center gap-x-3 my-2">
      <div className="flex flex-row-reverse items-center group">
        <div className={`badge ${badge} badge-lg py-5 hover:scale-110 peer`}>
          <div>{icon}</div>
        </div>
        {message}
      </div>

      <input
        className={"input-field bg-slate-900 peer"+customClass}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;