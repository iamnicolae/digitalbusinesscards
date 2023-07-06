import Form from '../components/Form'
import QRCode from 'react-qr-code'

function Home() {
  return (
    <>
      <h1>HOME</h1>
      <Form />
      <QRCode
        value={"http://localhost:5173/"}
      />
    </>
  )
}

export default Home