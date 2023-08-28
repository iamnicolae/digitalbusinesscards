import { styled } from 'styled-components'
import { Background, Container, Section } from '../styles/template'

const Title = styled.h1`
  color: white;
  font-size: 3rem;
`

const Link = styled.a`
  color: rgba(255,255,255,0.7);
  font-weight: 700;
  display: inline-block;
  margin: 10px 0;
`

function NotFound() {
  return (
    <Background>
      <Container>
        <Title>Error 404! 😩<br />Page not found.</Title>
        <div>
          <Link href={import.meta.env.VITE_APP_URL}>Go to homepage →</Link>
          <br />
          <Link href="mailto:nicolae@nicolae.xyz">Get in touch →</Link>
        </div>
      </Container>
    </Background>
  )
}

export default NotFound