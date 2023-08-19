import { createContext, useState } from "react"
import generateUniqueId from "../utils/generateUniqueId"

const ProfileContext = createContext()

export function ProfileProvider({ children }) {
  const [profileSubmitted, setProfileSubmitted] = useState(true)
  const [profile, setProfile] = useState({
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

  const changeProfile = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const changeProfileImage = (e) => {
    setProfile({ ...profile, avatarImage: e.target.files[0] })
  }

  return (
    <ProfileContext.Provider value={{ profile, changeProfile, changeProfileImage, profileSubmitted, setProfileSubmitted }}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileContext