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

import FormErrors from "./FormErrors"

import { MainButton } from "../styles/button"

const FormContainer = styled.form`
  background: lightgreen;

`

const InputWrap = styled.div`
  display: flex;
  gap: 10px;

  @media only screen and (max-width: 1350px) {
    flex-direction: column;
  }
`

const Loading = styled.span`
  position: absolute;
  background: red;
`

function Form() {

  const { profile, changeProfile, changeProfileImage, profileSubmitted, setProfileSubmitted } = useContext(ProfileContext)

  const [validation, setValidation] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const profilesCollection = collection(db, "profiles")

  const validate = (e) => {
    const errors = validateForm(profile)
    console.log(errors)
    setValidation({ [e.target.name]: errors[e.target.name] })
  }

  const submit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const errors = validateForm(profile)

    if (Object.keys(errors).length === 0) {
      const { avatarImage, avatar, ...profileData } = profile;

      if (avatarImage === null) {
        await addDoc(profilesCollection, { ...profileData, avatar: "" })
        setProfileSubmitted(true)
        setIsSubmitting(false)
      } else {
        const avatarFilename = `${generateUniqueId("image", 20)()}.${getFileExtension(avatarImage)}`
        const image = ref(storage, `avatars/${avatarFilename}`)
        uploadBytes(image, avatarImage).then(async () => {
          await addDoc(profilesCollection, { ...profileData, avatar: avatarFilename })
          setProfileSubmitted(true)
          setIsSubmitting(false)
          alert("image up")
        })
      }



    } else {
      setValidation({ ...errors })
      setIsSubmitting(false)
      return
    }

  }

  return (
    <FormContainer onSubmit={submit}>
      {isSubmitting ? <Loading>loading..............</Loading> : null}
      {Object.keys(validation).length != 0 && <FormErrors validation={validation} />}

      <InputWrap>
        <Input
          name="firstName"
          type="text"
          label="First Name (required)"
          placeholder="e.g. Michael"
          value={profile.firstName}
          onChange={changeProfile}
          onBlur={validate}
        />
        <Input
          name="lastName"
          type="text"
          label="Last Name (required)"
          placeholder="e.g. Anderson"
          value={profile.lastName}
          onChange={changeProfile}
          onBlur={validate}
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
        />
        <Input
          name="phone"
          type="tel"
          label="Phone"
          placeholder="e.g. (000) 1234 4321"
          value={profile.phone}
          onChange={changeProfile}
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
        />
        <Input
          name="position"
          type="text"
          label="Position"
          placeholder="e.g. Technical Director"
          value={profile.position}
          onChange={changeProfile}
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
        />

        <Input
          name="website"
          type="url"
          label="Website"
          placeholder="e.g. https://getqr.cc"
          value={profile.website}
          onChange={changeProfile}
          onBlur={validate}
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
        />
        <Input
          name="city"
          type="text"
          label="City"
          placeholder="e.g. Berlin"
          value={profile.city}
          onChange={changeProfile}
          $halfwidth="true"
        />
        <Input
          name="country"
          type="text"
          label="Country"
          placeholder="e.g. Spain"
          value={profile.country}
          onChange={changeProfile}
          $halfwidth="true"
        />
      </InputWrap>

      <Input
        name="avatarImage"
        type="file"
        accept=".png, .jpg, .jpeg"
        label="Avatar"
        onChange={changeProfileImage}
        onBlur={validate}
        $fullwidth="true"
      />
      <br /><br />
      <MainButton type="submit" disabled={isSubmitting}>GET QR CODE</MainButton>
      {profileSubmitted && <p>hey check the profile and edit now while this page still open, because after you close this page you cannot edit anymore</p>}
    </FormContainer>
  )
}

export default Form