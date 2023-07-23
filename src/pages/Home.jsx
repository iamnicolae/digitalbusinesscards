import styled from 'styled-components'

import Form from '../components/Form'
import QRCode from 'react-qr-code'

import { useContext } from 'react'
import ProfileContext from '../contexts/ProfileContext'

import Example from '../components/Example'

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
`

const Header = styled.header`
  background: white;
  padding: 70px;
  border-radius: 20px;
  display: flex;
  gap: 50px;
`

const Title = styled.h1`
  font-size: 8rem;
  text-transform: uppercase;
`

const Intro = styled.div`
  
`

const QR = styled.div`
  text-align: center;
  margin-top: 20px;
`

const Examples = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 50px;
`

const Footer = styled.footer`
  background: white;
  width: 100%;
  border-radius: 20px;
  padding: 70px;
`

function Home() {
  const { profile } = useContext(ProfileContext)

  return (
    <Background>
      <Container>
        <Header>
          <Intro>
            <Title>Digital QR<br />Business<br />Cards</Title>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quis perferendis reiciendis, ad in, est praesentium officiis ipsam error repellendus exercitationem deleniti facere neque reprehenderit tempora ut obcaecati? Nemo, placeat!</p>
            <QR>
              <a href={`http://localhost:5173/${profile.slug}`}>
                <QRCode value={`http://localhost:5173/${profile.slug}`} />
              </a>
            </QR>
          </Intro>

          <Form />
        </Header>

        <Examples>
          <Example
            name="Evangelina Cabrera"
            avatar="evangelina-cabrera.jpg"
            company="Pink Paper"
            position="Chief Editor"
            profile="http://localhost:5173/mwjwvc8"
          />
          <Example
            name="Wilford Horne"
            avatar="wilford-horne.jpg"
            company="Yellllow"
            position="UX Designer"
            profile="http://localhost:5173/mwjwvc8"
          />
          <Example
            name="Julius Kopp"
            avatar="julius-kopp.jpg"
            company="Bluesky Logistics"
            position="Logistics Analyst"
            profile="http://localhost:5173/mwjwvc8"
          />
        </Examples>

        <Footer>
          footer info
        </Footer>
      </Container>
    </Background>
  )
}

export default Home