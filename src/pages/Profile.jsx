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
import { FaUserPlus } from 'react-icons/fa'
import { BsGlobeAmericas } from 'react-icons/bs'
import generateAvatar from "../utils/generateAvatar"
import generateVCard from "../utils/generateVCard"

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
  ${props => props.$relative ? "position: relative" : ""};
`

const MapField = styled(Field)`
  ${props => props.$display ? `
    height: 635px;
    padding: 20px;
    margin-top: 0;
    overflow: visible;
  ` : `
    height: 0;
    padding: 0;
    margin-top: -20px;
    overflow: hidden;
  `};

  
`;

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

const Download = styled.button`
  width: 220px;
  background: #695BD7;
  color: #fff;
  border-radius: 30px;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.5rem;
  padding: 15px 0;
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

const ShowMapButton = styled.button`
  background: none;
  padding: 0;
  font-size: 1.4rem;
  font-style: italic;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  line-height: 0;
  margin-top: 5px;
  /* position: absolute;
  top: 20px;
  right: 20px; */
`

function Profile() {
  const { slug } = useParams()
  const [user, setUser] = useState({})
  const [userAvatar, setUserAvatar] = useState("")
  const [showMap, setShowMap] = useState(false)

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


  const downloadVCard = () => {
    console.log("download vcard")


  }


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
              {(user.mobile || user.email) && <Links>
                {user.mobile && <a href=""><BiSolidPhoneCall /> Call</a>}
                {user.email && <a href=""><RiSendPlaneFill /> Email</a>}
              </Links>}
            </div>

          </AvatarName>

        </Header>

        {(user.mobile || user.phone) && <Fields>
          {user.mobile && <Field>
            <Label><RiCellphoneLine /> Mobile</Label>
            <Info>{user.mobile}</Info>
          </Field>}

          {user.phone && <Field>
            <Label><BiPhone /> Telephone</Label>
            <Info>{user.phone}</Info>
          </Field>}
        </Fields>}

        {user.email && <Field>
          <Label><HiOutlineMail /> Email</Label>
          <Info>{user.email}</Info>
        </Field>}

        {(user.company || user.position) && <Fields>
          {user.company && <Field>
            <Label><PiBuildingsBold /> Company</Label>
            <Info>{user.company}</Info>
          </Field>}

          {user.position && <Field>
            <Label><HiOutlineBriefcase /> Position</Label>
            <Info>{user.position}</Info>
          </Field>}
        </Fields>}

        {(user.street || user.city || user.country) && <Field $relative={true}>
          <Label><FiMapPin /> Address</Label>
          <Info>{user.street && `${user.street}, `}{user.city && `${user.city}, `}{user.country && `${user.country}`} <ShowMapButton onClick={() => setShowMap(!showMap)}><BsGlobeAmericas />Show map</ShowMapButton></Info>
        </Field>}

        <MapField $display={showMap}>
          <Map street="267 5th Avenue" city="New York City" country="United States" />
        </MapField>

        {user.website && <Field>
          <Label><HiOutlineGlobeAlt /> Website</Label>
          <Info><a href={user.website} target="_blank">{user.website}</a></Info>
        </Field>}

        <Download onClick={() => generateVCard(user)}><FaUserPlus /> Download vCard</Download>

      </Container>
    </Background>
  )
}

export default Profile