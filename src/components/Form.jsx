import { useState, useContext } from "react"
import { styled } from "styled-components"

import { db } from "../firebase/config"
import { storage } from "../firebase/config"
import { collection, addDoc, updateDoc, doc } from "firebase/firestore"
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
  const [profileId, setProfileId] = useState(null)
  const [fileName, setFileName] = useState(null)
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
      if (profileId) {
        const { avatarImage, avatar, slug, created_at, ...updatedProfile } = profile
        const profileDoc = doc(db, "profiles", profileId)

        if (avatarImage === null) {
          await updateDoc(profileDoc, updatedProfile)
          setIsSubmitting(false)
        } else {
          const avatarFilename = fileName ? fileName : `${generateUniqueId("image", 20)()}.${getFileExtension(avatarImage)}`
          setFileName(avatarFilename)
          const image = ref(storage, `avatars/${avatarFilename}`)
          uploadBytes(image, avatarImage).then(async () => {
            await updateDoc(profileDoc, { updatedProfile, avatar: avatarFilename })
            setIsSubmitting(false)
            alert("Avatar image uploaded.")
          })
        }

      } else {
        const { avatarImage, avatar, ...profileData } = profile;

        if (avatarImage === null) {
          const profile = await addDoc(profilesCollection, { ...profileData, avatar: "" })
          setProfileId(profile.id)
          setProfileSubmitted(true)
          setIsSubmitting(false)
        } else {
          const avatarFilename = `${generateUniqueId("image", 20)()}.${getFileExtension(avatarImage)}`
          setFileName(avatarFilename)
          const image = ref(storage, `avatars/${avatarFilename}`)
          uploadBytes(image, avatarImage).then(async () => {
            await addDoc(profilesCollection, { ...profileData, avatar: avatarFilename })
            setProfileSubmitted(true)
            setIsSubmitting(false)
            alert("Avatar image uploaded.")
          })
        }
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