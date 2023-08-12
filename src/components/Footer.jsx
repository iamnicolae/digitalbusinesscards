import styled from 'styled-components'

const Container = styled.footer`
  background: white;
  width: 100%;
  border-radius: 20px;
  padding: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 780px) {
    flex-direction: column;
    gap: 50px;
  }
`

const Logo = styled.p`
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: 1px;
`

const Copyright = styled.span`
  font-weight: 700;
  font-size: 1.5rem;
  margin-top: 15px;
  display: block;
`

const Notice = styled.p`
  font-size: 1.3rem;
  margin-top: 5px;
`

const MenuContainer = styled.div`
  display: flex;
  gap: 50px;

  @media only screen and (max-width: 780px) {
    flex-direction: column;
    order: -1;
    gap: 30px;
  }
`

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Link = styled.a`
  display: flex;
  align-items: center;
  gap: 5px;

  span {
    font-size: 1.2rem;
    font-style: italic;
  }

  svg {
   
  }
`

function Footer() {
  return (
    <Container>
      <div>
        <Logo>getqr.cc</Logo>
        <Copyright>{new Date().getFullYear()}</Copyright>
        <Notice>This website uses cookies.</Notice>
      </div>
      <MenuContainer>
        <Menu>
          <Link href="https://getqr.cc/pro">TRY Pro <span>(Coming soon)</span></Link>
          <Link href="https://getqr.cc/privacy">Privacy</Link>
          <Link href="mailto:nicolae@nicolae.xyz">Get in touch</Link>
        </Menu>
        <Menu>
          <Link target="_blank" href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fgetqr.cc%2F">Share on Twitter</Link>
          <Link target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fgetqr.cc%2F">Share on Facebook</Link>
          <Link target="_blank" href="https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fgetqr.cc%2F">Share on LinkedIn</Link>
        </Menu>
      </MenuContainer>
    </Container >
  )
}

export default Footer