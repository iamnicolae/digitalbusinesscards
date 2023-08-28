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

function Pro() {
  return (
    <Background>
      <Container>
        <Section>
          <h1>PRO</h1>
          <p>Coming soon</p>
        </Section>
      </Container>
    </Background>
  )
}

export default Pro