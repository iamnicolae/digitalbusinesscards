import Form from '../components/Form'
import QRCode from 'react-qr-code'

import { useContext } from 'react'
import ProfileContext from '../contexts/ProfileContext'

function Home() {
  const { profile } = useContext(ProfileContext)

  return (
    <>
      <h1>HOME</h1>
      <Form />

      <a href={`http://localhost:5173/${profile.slug}`}>
        <QRCode
          value={`http://localhost:5173/${profile.slug}`}
        />
      </a>
    </>
  )
}

export default Home