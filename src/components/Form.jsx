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
import { styled, css } from "styled-components"

import FormErrors from "./FormErrors"

import { MainButton } from "../styles/button"

import Loading from "./Loading"

const FormContainer = styled.form`
  position: relative;
  grid-area: 1 / 2 / 3 / 3;

  @media only screen and (max-width: 1115px) {
    grid-area: 2 / 1 / 3 / 2;
  }
`

const FormFooter = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 30px;
  align-items: center;
  width: 100%;

  p {
    max-width: 400px;
    font-size: 1.5rem;
    font-style: italic;
    color: #695BD7;
  }

  @media only screen and (max-width: 750px) {
    display: block;

    p {
      margin-top: 10px;
    }
  }
`

const InputWrap = styled.div`
  display: flex;
  gap: 10px;

  @media only screen and (max-width: 750px) {
   

    ${props => props.$email && css`
    display: block;
  `}

  ${props => props.$street && css`
    display: block;
  `}
  }
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
      {isSubmitting ? <Loading /> : null}
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

      <InputWrap $email="true">
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

      <InputWrap $street="true">
        <Input
          name="street"
          type="text"
          label="Street"
          placeholder="e.g. 199 Bourke Avenue"
          value={profile.street}
          onChange={changeProfile}
        />
        <InputWrap>
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
      <FormFooter>
        <MainButton type="submit" disabled={isSubmitting}>{profileSubmitted ? 'UPDATE PROFILE' : 'GET QR CODE'}</MainButton>
        {profileSubmitted && <p>You can still make updates while this page is still open, after you close this page you cannot edit your profile anymore.</p>}
      </FormFooter>

    </FormContainer>
  )
}

export default Form