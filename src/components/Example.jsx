import { styled } from "styled-components"

const Container = styled.div`
  background: var(--color-lightPrimary);
  width: 100%;
  border-radius: 20px;
  padding: 70px;
  text-align: center;
  position: relative;

  @media only screen and (max-width: 1320px) {
    padding: 50px;
  }

  @media only screen and (max-width: 1024px) {
    padding: 30px;
  }
`

const Avatar = styled.img`
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
`

const Name = styled.h2`
  font-size: 2rem;
  margin: 15px 0;
`

const Position = styled.h3`
  font-weight: 400;
  font-size: 1.8rem;
  font-style: italic;
  margin: 5px 0;
`

const Company = styled.h3`
  font-weight: 400;
  font-size: 1.4rem;
`

const Link = styled.a`
  display: inline-flex;
  gap: 5px;
  border: 2px solid;
  border-radius: 10px;
  padding: 10px;
  margin-top: 40px;
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: 700;
`

const Number = styled.span`
  position: absolute;
  left: 20px;
  top: 20px;
  font-style: italic;
  color: var(--color-darkSecondary);
  opacity: 0.7;
  font-size: 1.5rem;
`

function Example({ id, name, avatar, company, position, profile }) {
  return (
    <Container>
      <Number>Example #{id}</Number>
      <Avatar src={`/assets/${avatar}`} alt={name} />
      <Name>{name}</Name>
      <Position>{position}</Position>
      <Company>{company}</Company>
      <Link href={profile}>View profile</Link>
    </Container>
  )
}

export default Example