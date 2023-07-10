import { styled } from "styled-components"

const Avatar = styled.span`
  text-transform: uppercase;
  font-size: 3rem;
  font-weight: 700;
  color: #4d4d4d;
  user-select: none;
`

function generateAvatar(firstName, lastName) {
  const firstLetter = firstName ? firstName[0] : ""
  const lastLetter = lastName ? lastName[0] : ""

  return <Avatar>{firstLetter + lastLetter}</Avatar>
}

export default generateAvatar