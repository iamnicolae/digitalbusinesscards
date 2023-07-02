function Input({ onChange, placeholder, label, validation, name, ...props }) {
  return (
    <div>
      <label htmlFor="">{label}</label>
      <div>{validation[name]}</div>
      <input name={name} placeholder={placeholder} onChange={onChange} {...props} />
    </div>
  )
}

export default Input