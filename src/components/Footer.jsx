import styled from 'styled-components'

const Container = styled.footer`
  background: var(--color-lightPrimary);
  width: 100%;
  border-radius: 20px;
  padding: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 780px) {
    flex-direction: column;
    gap: 50px;
    padding: 30px;
  }
`

const Copyright = styled.span`
  font-weight: 700;
  font-size: 1.5rem;
  display: inline-block;
`

const Notice = styled.p`
  font-size: 1.3rem;
  font-weight: normal;
  display: inline-block;
`

const MenuContainer = styled.div`
  display: flex;
  gap: 50px;

  @media only screen and (max-width: 750px) {
    order: -1;
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
`

const LogoContainer = styled.div`
  @media only screen and (max-width: 750px) {
    width: 100%;
  }
`

const Logo = styled.img`
  display: block;
  max-width: 90px;
  width: 100%;
  height: auto;
  margin-bottom: 5px;
`

function Footer() {
  return (
    <Container>
      <LogoContainer>
        <Logo src="/assets/getqr-logo-light.png" alt="" />
        <Copyright>&copy;{new Date().getFullYear()} <Notice>This website uses cookies</Notice></Copyright>
      </LogoContainer>
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