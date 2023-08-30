import { useState } from "react"
import { styled } from "styled-components"
import { BsQrCodeScan } from 'react-icons/bs'

import QR from "./QR"

const QRContent = styled.div`
  background: linear-gradient(0deg, #fff, 80%, transparent);
  width: 100%;
  height: 100vh;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`

const QRbutton = styled.button`
  position: absolute;
  z-index: 99;
  top: 20px;
  right: 20px;
  font-size: 3.5rem;
  background: none;
`

const Container = styled.div`
  padding: 50px 20px;
  text-align: center;

  p {
    margin-top: 10px;
    font-weight: 700;
    width: 200px;
  }
`

function ProfileQR({ user }) {
  const [showQR, setShowQR] = useState(false)
  return (
    <>
      <QRbutton onClick={() => setShowQR(!showQR)}><BsQrCodeScan /></QRbutton>

      {showQR && <QRContent className="requires-no-scroll">
        <Container>
          <QR slug={user.slug} />
          <p>Scan this QR code to open up the profile</p>
        </Container>
      </QRContent>}
    </>
  )
}

export default ProfileQR