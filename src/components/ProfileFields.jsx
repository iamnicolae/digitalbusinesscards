import { useState } from "react"
import { styled } from "styled-components"
import { HiOutlineGlobeAlt, HiOutlineMail, HiOutlineBriefcase } from 'react-icons/hi'
import { PiBuildingsBold } from 'react-icons/pi'
import { FiMapPin } from 'react-icons/fi'
import { BiPhone } from 'react-icons/bi'
import { RiCellphoneLine } from 'react-icons/ri'
import { BsGlobeAmericas } from 'react-icons/bs'
import { FaUserPlus } from 'react-icons/fa'

import Map from "../components/Map"
import generateVCard from "../utils/generateVCard"

import { MainButton } from "../styles/button"

const Fields = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`

const Field = styled.div`
  width: 100%;
  background: var(--color-lightPrimary);
  padding: 20px;
  border-radius: 20px;
  box-shadow: rgba(10, 11, 13, 0.025) 0px 1px 2px 0px;
  ${props => props.$relative ? "position: relative" : ""};
`

const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-darkTertiary);
  margin-bottom: 20px;

  svg {
    font-size: 1.5rem;
  }
`

const Info = styled.span`
  font-size: 2rem;

  @media only screen and (max-width: 750px) {
    font-size: 1.7rem;
  }
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
  position: absolute;
  top: 20px;
  right: 20px;
`

function ProfileFields({ user, userAvatar }) {
  const [showMap, setShowMap] = useState(false)

  return (
    <>
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

      <MainButton onClick={() => generateVCard(user, userAvatar)}><FaUserPlus /> Download vCard</MainButton>
    </>
  )
}

export default ProfileFields