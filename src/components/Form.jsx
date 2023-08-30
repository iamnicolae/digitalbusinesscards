import { useState, useContext } from "react"
import { styled } from "styled-components"

import { db } from "../firebase/config"
import { storage } from "../firebase/config"
import { collection, addDoc } from "firebase/firestore"
import { ref, uploadBytes } from "firebase/storage"

import generateUniqueId from "../utils/generateUniqueId"
import getFileExtension from "../utils/getFileExtension"
import validateForm from "../utils/validateForm"
import ProfileContext from "../contexts/ProfileContext"

import FormErrors from "./FormErrors"
import Loading from "./Loading"
import FormInputs from "./FormInputs"
import FormFooter from "./FormFooter"

const FormContainer = styled.form`
  position: relative;
  grid-area: 1 / 2 / 3 / 3;

  @media only screen and (max-width: 1115px) {
    grid-area: 2 / 1 / 3 / 2;
  }
`

function Form() {

  const { profile, changeProfile, changeProfileImage, profileSubmitted, setProfileSubmitted } = useContext(ProfileContext)

  const [validation, setValidation] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const profilesCollection = collection(db, "profiles")

  const validate = (e) => {
    const errors = validateForm(profile)
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
          alert("Avatar image uploaded.")
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

      <FormInputs profile={profile} changeProfile={changeProfile} changeProfileImage={changeProfileImage} validate={validate} />
      <FormFooter isSubmitting={isSubmitting} profileSubmitted={profileSubmitted} />
    </FormContainer>
  )
}

export default Form