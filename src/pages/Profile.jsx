import { useParams } from "react-router-dom"

function Profile() {
  const { slug } = useParams()

  return (
    <>
      <h1>PROFILE</h1>
      <p>business card stuff for {slug}</p>
    </>
  )
}

export default Profile