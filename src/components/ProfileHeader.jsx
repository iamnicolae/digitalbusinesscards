import { styled } from "styled-components"
import { BiSolidPhoneCall } from 'react-icons/bi'
import { RiSendPlaneFill } from 'react-icons/ri'

import generateAvatar from "../utils/generateAvatar"

const Header = styled.header`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

  @media only screen and (max-width: 750px) {
    font-size: 2.7rem;
  }
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

function ProfileHeader({ user, userAvatar }) {
  return (
    <Header>
      <AvatarName>
        <Avatar>
          {userAvatar ? <img src={userAvatar} alt={`${user.firstName} ${user.lastName}`} /> : generateAvatar(user.firstName, user.lastName)}
        </Avatar>
        <div>
          <Name>{user.firstName} {user.lastName}</Name>
          {(user.mobile || user.email) && <Links>
            {user.mobile && <a href={`tel:${user.mobile}`}><BiSolidPhoneCall /> Call</a>}
            {user.email && <a href={`mailto:${user.email}`}><RiSendPlaneFill /> Email</a>}
          </Links>}
        </div>
      </AvatarName>
    </Header>
  )
}

export default ProfileHeader