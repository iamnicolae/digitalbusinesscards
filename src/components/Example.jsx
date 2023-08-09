import { styled } from "styled-components"

const Container = styled.div`
  background: white;
  width: 100%;
  border-radius: 20px;
  padding: 70px;
  text-align: center;
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
  margin-top: 30px;
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: 700;
`

function Example({ id, name, avatar, company, position, profile }) {
  return (
    <Container>
      <p>Example #{id}</p>
      <Avatar src={`/assets/${avatar}`} alt={name} />
      <Name>{name}</Name>
      <Position>{position}</Position>
      <Company>{company}</Company>
      <Link href={profile}>View card</Link>
    </Container>
  )
}

export default Example