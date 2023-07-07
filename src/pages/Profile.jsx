import { useParams } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { ref, getDownloadURL } from "firebase/storage"

import { db, storage } from "../firebase/config"
import Map from "../components/Map"

function Profile() {
  const { slug } = useParams()
  const [user, setUser] = useState({})
  const [userAvatar, setUserAvatar] = useState("")

  useEffect(() => {
    const getUser = async () => {
      const q = query(collection(db, "profiles"), where("slug", "==", slug))

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setUser(doc.data())
      });
    }

    getUser()

  }, [])

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      getDownloadURL(ref(storage, `avatars/${user.avatar}`)).then((url) => {
        setUserAvatar(url)
      })
    }
  }, [user])


  return (
    <>
      <h1>PROFILE</h1>
      <p>business card stuff for {user.firstName} / {user.lastName}</p>
      <img src={userAvatar} alt="" />

      <Map street="267 5th Avenue" city="New York City" country="United States" />

    </>
  )
}

export default Profile