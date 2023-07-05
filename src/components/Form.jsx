import { useState } from "react"
import Input from "./Input"

import { db } from "../firebase/config"
import { storage } from "../firebase/config"
import { collection, addDoc } from "firebase/firestore"
import { ref, uploadBytes } from "firebase/storage"
import validateForm from "../utils/validateForm"

import generateUniqueId from "../utils/generateUniqueId"
import getFileExtension from "../utils/getFileExtension"

function Form() {
  const [validation, setValidation] = useState({})
  const profilesCollection = collection(db, "profiles")
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
    website: "",
    avatar: "",
    avatarImage: null,
    slug: generateUniqueId("slug", 7)(),
    created_at: new Date()
  })

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const changeImage = (e) => {
    setForm({ ...form, avatarImage: e.target.files[0] })
  }

  const validate = (e) => {
    const errors = validateForm(form)
    setValidation({ [e.target.name]: errors[e.target.name] })
  }

  const submit = async (e) => {
    e.preventDefault();

    const errors = validateForm(form)

    if (Object.keys(errors).length === 0) {
      const { avatarImage, ...profile } = form;

      console.log(errors)
      console.log(form)

      await addDoc(profilesCollection, { ...profile })

      if (avatarImage === null) return;

      const image = ref(storage, `avatars/${generateUniqueId("image", 20)()}.${getFileExtension(avatarImage)}`)
      uploadBytes(image, avatarImage).then(() => {
        alert("image up")
      })

    } else {
      setValidation({ ...errors })
      return
    }

  }

  return (
    <form onSubmit={submit}>
      <Input
        name="firstName"
        type="text"
        label="First Name"
        placeholder="e.g. Michael"
        value={form.firstName}
        onChange={change}
        onBlur={validate}
        validation={validation}
      />
      <Input
        name="lastName"
        type="text"
        label="Last Name"
        placeholder="e.g. Anderson"
        value={form.lastName}
        onChange={change}
        onBlur={validate}
        validation={validation}
      />
      <Input
        name="mobile"
        type="tel"
        label="Mobile"
        placeholder="e.g. 07911 123456"
        value={form.mobile}
        onChange={change}
        onBlur={validate}
        validation={validation}
      />
      <Input
        name="phone"
        type="tel"
        label="Phone"
        placeholder="e.g. (000) 1234 4321"
        value={form.phone}
        onChange={change}
        onBlur={validate}
        validation={validation}
      />
      <Input
        name="email"
        type="text"
        label="Email"
        placeholder="e.g. michael@anderson.com"
        value={form.email}
        onChange={change}
        onBlur={validate}
        validation={validation}
      />
      <Input
        name="company"
        type="text"
        label="Company"
        placeholder="e.g. TheCompany"
        value={form.company}
        onChange={change}
        onBlur={validate}
        validation={validation}
      />
      <Input
        name="position"
        type="text"
        label="Position"
        placeholder="e.g. Technical Director"
        value={form.position}
        onChange={change}
        onBlur={validate}
        validation={validation}
      />
      <Input
        name="street"
        type="text"
        label="Street"
        placeholder="e.g. 199 Bourke Avenue"
        value={form.street}
        onChange={change}
        onBlur={validate}
        validation={validation}
      />
      <Input
        name="city"
        type="text"
        label="City"
        placeholder="e.g. Berlin"
        value={form.city}
        onChange={change}
        onBlur={validate}
        validation={validation}
      />
      <Input
        name="country"
        type="text"
        label="Country"
        placeholder="e.g. Spain"
        value={form.country}
        onChange={change}
        onBlur={validate}
        validation={validation}
      />
      <Input
        name="website"
        type="url"
        label="Website"
        placeholder="e.g. https://getqr.cc"
        value={form.website}
        onChange={change}
        onBlur={validate}
        validation={validation}
      />
      <Input
        name="avatarImage"
        type="file"
        accept=".png, .jpg, .jpeg"
        label="Avatar"
        onChange={changeImage}
        onBlur={validate}
        validation={validation}
      />
      <br /><br />
      <button type="submit">submit</button>
    </form>
  )
}

export default Form