import { useContext } from 'react'
import { styled } from "styled-components"

import ProfileContext from '../contexts/ProfileContext'

import Form from '../components/Form'
import Download from '../components/Download';

const Container = styled.header`
  background: var(--color-lightPrimary);
  padding: 70px;
  border-radius: 20px;
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(2, auto);
  grid-column-gap: 50px;
  grid-row-gap: 60px;

  @media only screen and (max-width: 1115px) {
    padding: 30px;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, auto);
    grid-row-gap: 30px;
  }
`

const Title = styled.h1`
  font-size: 8rem;
  text-transform: uppercase;

  @media only screen and (max-width: 1320px) {
    font-size: 6.5rem;
  }

  @media only screen and (max-width: 1024px) {
    font-size: 5.5rem;
  }
`

const Subtitle = styled.p`
  font-size: 2.2rem;
  margin-top: 10px;
`

const Intro = styled.div`
  grid-area: 1 / 1 / 2 / 2;

  @media only screen and (max-width: 1115) {
    grid-area: 1 / 1 / 2 / 2;
  }
`

function Header() {
  const { profile, profileSubmitted } = useContext(ProfileContext)

  return (
    <Container>
      <Intro>
        <Title>Digital QR<br />Business<br />Cards</Title>
        <Subtitle>Ditch the paper clutter and effortlessly share your contact information via QR codes. Your business card, reimagined for the digital era.</Subtitle>
      </Intro>
      <Download profile={profile} profileSubmitted={profileSubmitted} />
      <Form />
    </Container>
  )

}

export default Header