import styled from 'styled-components'

import Form from '../components/Form'
import QRCode from 'react-qr-code'

import { useContext } from 'react'
import ProfileContext from '../contexts/ProfileContext'

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

const Examples = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 50px;
`

const Example = styled.div`
  background: white;
  width: 100%;
  border-radius: 20px;
  padding: 70px;
  height: 400px;
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
            <a href={`http://localhost:5173/${profile.slug}`}>
              <QRCode value={`http://localhost:5173/${profile.slug}`} />
            </a>
          </Intro>

          <Form />
        </Header>

        <Examples>
          <Example>exemplu 1</Example>
          <Example>exemplu 2</Example>
          <Example>exemplu 3</Example>
        </Examples>

        <Footer>
          footer info
        </Footer>
      </Container>
    </Background>
  )
}

export default Home