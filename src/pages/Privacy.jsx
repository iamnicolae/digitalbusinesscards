import styled from 'styled-components'

import { Background, Container } from '../components/Template'

const Section = styled.section`
  background: white;
  padding: 70px;
  border-radius: 20px;
`

function Privacy() {
  return (
    <Background>
      <Container>
        <Section>
          <h1>Privacy</h1>
        </Section>
      </Container>
    </Background>
  )
}

export default Privacy