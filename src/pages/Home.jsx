import styled from 'styled-components'

import { Background, Container } from '../styles/template'

import Example from '../components/Example'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Examples = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 50px;

  @media only screen and (max-width: 1024px) {
    flex-direction: column;
  }
`

function Home() {
  return (
    <Background>
      <Container>
        <Header />
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