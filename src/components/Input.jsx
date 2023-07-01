function Input({ onChange, placeholder, ...props }) {
  return (
    <div>
      <label htmlFor="">{placeholder}</label>
      <span></span>
      <input placeholder={placeholder} onChange={onChange} {...props} />
    </div>
  )
}

export default Input