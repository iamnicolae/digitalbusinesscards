import { useState } from "react"
import { styled } from "styled-components"
import { BsQrCodeScan } from 'react-icons/bs'

const QRContent = styled.div`
  background: pink;
  width: 100%;
  height: 50vh;
  position: fixed;
  bottom: 0;
  left: 0;
`

const QRbutton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 3.5rem;
`

function ProfileQR() {
  const [showQR, setShowQR] = useState(false)
  return (
    <>
      <QRbutton onClick={() => setShowQR(!showQR)}><BsQrCodeScan /></QRbutton>

      {showQR && <QRContent>
        qr code content
      </QRContent>}
    </>
  )
}

export default ProfileQR