import { useState, useContext } from "react"
import Input from "./Input"

import { db } from "../firebase/config"
import { storage } from "../firebase/config"
import { collection, addDoc } from "firebase/firestore"
import { ref, uploadBytes } from "firebase/storage"
import validateForm from "../utils/validateForm"

import generateUniqueId from "../utils/generateUniqueId"
import getFileExtension from "../utils/getFileExtension"

import ProfileContext from "../contexts/ProfileContext"
import { styled } from "styled-components"

const FormContainer = styled.form`
  //background: lightgreen;

`

const InputWrap = styled.div`
  display: flex;
  gap: 10px;
`

const Button = styled.button`
  background: #695BD7;
  color: #fff;
  border-radius: 30px;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.5rem;
  padding: 20px;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  line-height: 0;

  svg {
    font-size: 1.7rem;
  }
`

function Form() {

  const { profile, changeProfile, changeProfileImage } = useContext(ProfileContext)

  const [validation, setValidation] = useState({})
  const profilesCollection = collection(db, "profiles")

  const validate = (e) => {
    const errors = validateForm(profile)
    setValidation({ [e.target.name]: errors[e.target.name] })
  }

  const submit = async (e) => {
    e.preventDefault();

    const errors = validateForm(profile)

    if (Object.keys(errors).length === 0) {
      const { avatarImage, avatar, ...profileData } = profile;

      if (avatarImage === null) {
        await addDoc(profilesCollection, { ...profileData, avatar: "" })
      } else {
        const avatarFilename = `${generateUniqueId("image", 20)()}.${getFileExtension(avatarImage)}`
        const image = ref(storage, `avatars/${avatarFilename}`)
        uploadBytes(image, avatarImage).then(async () => {
          await addDoc(profilesCollection, { ...profileData, avatar: avatarFilename })
          alert("image up")
        })
      }



    } else {
      setValidation({ ...errors })
      return
    }

  }

  return (
    <FormContainer onSubmit={submit}>

      <InputWrap>
        <Input
          name="firstName"
          type="text"
          label="First Name (required)"
          placeholder="e.g. Michael"
          value={profile.firstName}
          onChange={changeProfile}
          onBlur={validate}
          validation={validation}
        />
        <Input
          name="lastName"
          type="text"
          label="Last Name (required)"
          placeholder="e.g. Anderson"
          value={profile.lastName}
          onChange={changeProfile}
          onBlur={validate}
          validation={validation}
        />
      </InputWrap>

      <InputWrap>
        <Input
          name="mobile"
          type="tel"
          label="Mobile (required)"
          placeholder="e.g. 07911 123456"
          value={profile.mobile}
          onChange={changeProfile}
          onBlur={validate}
          validation={validation}
        />
        <Input
          name="phone"
          type="tel"
          label="Phone"
          placeholder="e.g. (000) 1234 4321"
          value={profile.phone}
          onChange={changeProfile}
          onBlur={validate}
          validation={validation}
        />
      </InputWrap>

      <InputWrap>
        <Input
          name="company"
          type="text"
          label="Company"
          placeholder="e.g. TheCompany"
          value={profile.company}
          onChange={changeProfile}
          onBlur={validate}
          validation={validation}
        />
        <Input
          name="position"
          type="text"
          label="Position"
          placeholder="e.g. Technical Director"
          value={profile.position}
          onChange={changeProfile}
          onBlur={validate}
          validation={validation}
        />
      </InputWrap>

      <InputWrap>
        <Input
          name="email"
          type="text"
          label="Email"
          placeholder="e.g. michael@anderson.com"
          value={profile.email}
          onChange={changeProfile}
          onBlur={validate}
          validation={validation}
        />

        <Input
          name="website"
          type="url"
          label="Website"
          placeholder="e.g. https://getqr.cc"
          value={profile.website}
          onChange={changeProfile}
          onBlur={validate}
          validation={validation}
        />
      </InputWrap>

      <InputWrap>
        <Input
          name="street"
          type="text"
          label="Street"
          placeholder="e.g. 199 Bourke Avenue"
          value={profile.street}
          onChange={changeProfile}
          onBlur={validate}
          validation={validation}
        />
        <Input
          name="city"
          type="text"
          label="City"
          placeholder="e.g. Berlin"
          value={profile.city}
          onChange={changeProfile}
          onBlur={validate}
          validation={validation}
          halfWidth
        />
        <Input
          name="country"
          type="text"
          label="Country"
          placeholder="e.g. Spain"
          value={profile.country}
          onChange={changeProfile}
          onBlur={validate}
          validation={validation}
          halfWidth
        />
      </InputWrap>

      <Input
        name="avatarImage"
        type="file"
        accept=".png, .jpg, .jpeg"
        label="Avatar"
        onChange={changeProfileImage}
        onBlur={validate}
        validation={validation}
        fullWidth
      />
      <br /><br />
      <Button type="submit">GET QR CODE</Button>
    </FormContainer>
  )
}

export default Form