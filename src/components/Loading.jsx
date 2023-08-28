import { styled } from "styled-components"

const Container = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255,255,255,0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-weight: 700;
    font-size: 1.3rem;
    text-transform: uppercase;
    color: #695bd7;
    margin-top: -15px;
  }

  img {
    width: 80px;
    height: auto;
    margin-top: -25px;
  }
`

function Loading() {
  return (
    <Container>
      <img src="/assets/loading.gif" />
      <p>Loading</p>
    </Container>
  )
}

export default Loading