import styled from 'styled-components'

export const Background = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 100px 0;
  background-image: url("/assets/background.jpg");
  background-size: cover;
  background-position: bottom left;
  background-attachment: fixed;
`

export const Container = styled.section`
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