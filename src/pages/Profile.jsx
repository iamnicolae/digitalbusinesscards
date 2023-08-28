import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { styled } from "styled-components"
import { collection, getDocs, query, where } from "firebase/firestore"
import { ref, getDownloadURL } from "firebase/storage"

import { db, storage } from "../firebase/config"

import ProfileHeader from "../components/ProfileHeader"
import ProfileFields from "../components/ProfileFields"
import ProfileQR from "../components/ProfileQR"
import Loading from "../components/Loading"

const Background = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 100px 0;
  background: #eee;
  position: relative;
`

const Container = styled.section`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

function Profile() {
  const { slug } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({})
  const [userAvatar, setUserAvatar] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const q = query(collection(db, "profiles"), where("slug", "==", slug))

      const querySnapshot = await getDocs(q);

      console.log(querySnapshot.empty)//reedirect to some upsell page

      if (querySnapshot.empty) {
        navigate('/notfound', { replace: true })
      }

      querySnapshot.forEach((doc) => {//only one doc
        // doc.data() is never undefined for query doc snapshots
        console.log(doc)
        console.log(doc.id, " => ", doc.data());
        setUser(doc.data())
        //setIsLoading(false)
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
    <Background>
      {isLoading ? <Loading /> :
        <Container>
          <ProfileHeader user={user} userAvatar={userAvatar} />
          <ProfileFields user={user} userAvatar={userAvatar} />
          <ProfileQR user={user} />
        </Container>
      }
    </Background>
  )
}

export default Profile