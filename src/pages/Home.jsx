import styled from 'styled-components'

import Form from '../components/Form'
import QRCode from 'react-qr-code'

import { useContext } from 'react'
import ProfileContext from '../contexts/ProfileContext'

import Example from '../components/Example'
import Footer from '../components/Footer'

import { GrDocumentPdf } from 'react-icons/gr'

const Background = styled.main`
  width: 100%;
  padding: 100px 0;
  background-image: url("/assets/background.jpg");
  background-size: cover;
  background-position: bottom left;
  background-attachment: fixed;
`

const Container = styled.section`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 50px;
  
  @media only screen and (max-width: 1350px) {
    width: 95%;
  }
`

const Header = styled.header`
  background: white;
  padding: 70px;
  border-radius: 20px;
  display: flex;
  gap: 50px;

  @media only screen and (max-width: 1350px) {
    flex-direction: column;
    padding: 40px;
  }
`

const Title = styled.h1`
  font-size: 8rem;
  text-transform: uppercase;

  @media only screen and (max-width: 1350px) {
    font-size: 5rem;
  }
`

const Subtitle = styled.p`
  font-size: 2.2rem;
  margin-top: 10px;
`

const Intro = styled.div`
  
`

const QR = styled.div`
  margin-top: 35px;
  display: flex;
`

const Examples = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 50px;

  @media only screen and (max-width: 1350px) {
    flex-direction: column;
  }
`
const Download = styled.div`
  background: pink;
`


function Home() {
  const { profile } = useContext(ProfileContext)

  return (
    <Background>
      <Container>
        <Header>
          <Intro>
            <Title>Digital QR<br />Business<br />Cards</Title>
            <Subtitle>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quis perferendis reiciendis</Subtitle>
            <QR>
              <a href={`http://localhost:5173/${profile.slug}`}>
                <QRCode value={`http://localhost:5173/${profile.slug}`} size={200} />
              </a>
              <Download>
                <button><GrDocumentPdf /> Download QR code as PDF</button>
                <button>Download QR code as PNG</button>
                <button>Add QR code to homescreen</button>
              </Download>
            </QR>
          </Intro>

          <Form />
        </Header>
        <Examples>
          <Example
            id={1}
            name="Evangelina Cabrera"
            avatar="evangelina-cabrera.jpg"
            company="Pink Paper"
            position="Chief Editor"
            profile="http://localhost:5173/mwjwvc8"
          />
          <Example
            id={2}
            name="Wilford Horne"
            avatar="wilford-horne.jpg"
            company="Yellllow"
            position="UX Designer"
            profile="http://localhost:5173/mwjwvc8"
          />
          <Example
            id={3}
            name="Julius Kopp"
            avatar="julius-kopp.jpg"
            company="Bluesky Logistics"
            position="Logistics Analyst"
            profile="http://localhost:5173/mwjwvc8"
          />
        </Examples>

        <Footer />
      </Container>
    </Background>
  )
}

export default Home