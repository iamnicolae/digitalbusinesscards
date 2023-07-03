import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { collection, doc, getDocs, query, where } from "firebase/firestore"

import { db } from "../firebase/db"

function Profile() {
  const { slug } = useParams()
  const [user, setUser] = useState({})
  const cardsCollection = collection(db, "cards")




  useEffect(() => {
    const getUser = async () => {
      const q = query(collection(db, "cards"), where("slug", "==", slug))

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setUser(doc.data())
      });
    }

    getUser()
  }, [])

  return (
    <>
      <h1>PROFILE</h1>
      <p>business card stuff for {user.firstName} / {user.lastName}</p>

    </>
  )
}

export default Profile