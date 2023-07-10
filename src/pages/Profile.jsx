import { useParams } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { ref, getDownloadURL } from "firebase/storage"

import { db, storage } from "../firebase/config"
import Map from "../components/Map"
import { styled } from "styled-components"

//import { IoCall } from "react-icons/io"
import { HiOutlineGlobeAlt, HiOutlineMail, HiOutlineBriefcase } from 'react-icons/hi'
import { PiBuildingsBold } from 'react-icons/pi'
import { FiMapPin } from 'react-icons/fi'
import { BiPhone, BiSolidPhoneCall } from 'react-icons/bi'
import { RiCellphoneLine, RiSendPlaneFill } from 'react-icons/ri'
import generateAvatar from "../utils/generateAvatar"

const Background = styled.main`
  width: 100%;
  min-height: 100%;
  padding: 100px 0;
  background: #eee;
`

const Container = styled.section`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Header = styled.header`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Links = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;

  a {
    font-weight: 700;
    font-size: 1.4rem;
    background: white;
    color: #4d4d4d;
    padding: 5px 7px;
    border-radius: 20px;
    display: flex;
    gap: 4px;
  }
`

const AvatarName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 5px solid white;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    dispaly: block;
    width: 100%;
    height: auto;
  }

`

const Name = styled.h1`
  font-size: 3.2rem;
  text-align: center;
`

const Fields = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`

const Field = styled.div`
  width: 100%;
  background: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: rgba(10, 11, 13, 0.025) 0px 1px 2px 0px;
`

const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 1.3rem;
  font-weight: 700;
  color: #4d4d4d;
  margin-bottom: 20px;

  svg {
    font-size: 1.5rem;
  }
`

const Info = styled.span`
  font-size: 2rem;
`

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
    <Background>
      <Container>




        <Header>
          <AvatarName>
            <Avatar>
              {userAvatar ? <img src={userAvatar} alt={`${user.firstName} ${user.lastName}`} /> : generateAvatar(user.firstName, user.lastName)}
            </Avatar>
            <div>
              <Name>{user.firstName} {user.lastName}</Name>
              <Links>
                <a href=""><BiSolidPhoneCall /> Call</a>
                <a href=""><RiSendPlaneFill /> Email</a>
              </Links>
            </div>

          </AvatarName>

        </Header>

        <Fields>
          <Field>
            <Label><RiCellphoneLine /> Mobile</Label>
            <Info>{user.mobile}</Info>
          </Field>

          <Field>
            <Label><BiPhone /> Telephone</Label>
            <Info>{user.phone}</Info>
          </Field>
        </Fields>

        <Field>
          <Label><HiOutlineMail /> Email</Label>
          <Info>{user.email}</Info>
        </Field>

        <Fields>
          <Field>
            <Label><PiBuildingsBold /> Company</Label>
            <Info>{user.company}</Info>
          </Field>

          <Field>
            <Label><HiOutlineBriefcase /> Position</Label>
            <Info>{user.position}</Info>
          </Field>
        </Fields>

        <Field>
          <Label><FiMapPin /> Address</Label>
          <Info>{user.street}, {user.city}, {user.country}</Info>
        </Field>

        {/* <Field>
          <Map street="267 5th Avenue" city="New York City" country="United States" />
        </Field> */}

        <Field>
          <Label><HiOutlineGlobeAlt /> Website</Label>
          <Info>{user.website}</Info>
        </Field>

      </Container>
    </Background>
  )
}

export default Profile