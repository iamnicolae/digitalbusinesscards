import { styled } from "styled-components"

import { MainButton } from "../styles/button"

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 30px;
  align-items: center;
  width: 100%;

  p {
    max-width: 400px;
    font-size: 1.5rem;
    font-style: italic;
    color: var(--color-primary);
  }

  @media only screen and (max-width: 750px) {
    display: block;

    p {
      margin-top: 10px;
    }
  }
`

function FormFooter({ isSubmitting, profileSubmitted }) {
  return (
    <Container>
      <MainButton type="submit" disabled={isSubmitting}>{profileSubmitted ? 'UPDATE PROFILE' : 'GET QR CODE'}</MainButton>
      {profileSubmitted && <p>You can still make updates while this page is still open, after you close this page you cannot edit your profile anymore.</p>}
    </Container>
  )
}

export default FormFooter