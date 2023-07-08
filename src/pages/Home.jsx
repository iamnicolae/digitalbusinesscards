import styled from 'styled-components'

import Form from '../components/Form'
import QRCode from 'react-qr-code'

import { useContext } from 'react'
import ProfileContext from '../contexts/ProfileContext'

const Header = styled.div`
  width: 80%;
  margin: 5%;
  background: white;
  padding: 80px;
  border-radius: 20px;
`

const Title = styled.h1`
  font-size: 10rem;
`

function Home() {
  const { profile } = useContext(ProfileContext)

  return (
    <>
      <Header>
        <Title>Digital QR Business Cards</Title>
        <Form />
      </Header>



      <a href={`http://localhost:5173/${profile.slug}`}>
        <QRCode value={`http://localhost:5173/${profile.slug}`} />
      </a>
    </>
  )
}

export default Home