import { useState } from "react"
import Input from "./Input"

import { db } from "../firebase/db"
import { collection, addDoc } from "firebase/firestore"

function Form() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    phone: "",
    email: "",
    company: "",
    position: "",
    street: "",
    city: "",
    country: "",
    website: ""
  })

  const cardsCollectionRef = collection(db, "cards")

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = async (e) => {
    e.preventDefault();

    await addDoc(cardsCollectionRef, { ...form })

  }

  return (
    <form onSubmit={submit}>
      <Input
        name="firstName"
        type="text"
        required={true}
        pattern="^[A-Za-z\s\-]+$"
        placeholder="First Name"
        value={form.firstName}
        onChange={change}
      />
      <Input
        name="lastName"
        type="text"
        required={true}
        pattern="^[A-Za-z\s\-]+$"
        placeholder="Last Name"
        value={form.lastName}
        onChange={change}
      />
      <Input
        name="mobile"
        type="tel"
        required={true}
        placeholder="Mobile"
        value={form.mobile}
        onChange={change}
      />
      <Input name="phone" type="tel" placeholder="Phone" value={form.phone} onChange={change} />
      <Input name="email" type="text" placeholder="Email" value={form.email} onChange={change} />
      <Input name="company" type="text" placeholder="Company" value={form.company} onChange={change} />
      <Input name="position" type="text" placeholder="Position" value={form.position} onChange={change} />
      <Input name="street" type="text" placeholder="Street" value={form.street} onChange={change} />
      <Input name="city" type="text" placeholder="City" value={form.city} onChange={change} />
      <Input name="country" type="text" placeholder="Country" value={form.country} onChange={change} />
      <Input name="website" type="url" placeholder="Website" value={form.website} onChange={change} />

      <button type="submit">submit</button>
    </form>
  )
}

export default Form