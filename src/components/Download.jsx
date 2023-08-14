import { styled, css } from 'styled-components'
import QRCode from 'react-qr-code'

import { GrDocumentPdf, GrDocumentImage } from 'react-icons/gr'
import { MdAddToHomeScreen } from 'react-icons/md'

import generatePDF from '../utils/generatePDF'
import generatePNG from '../utils/generatePNG'

import { MinimalButton } from '../styles/button';

const Container = styled.div`
  margin-top: 35px;
  display: flex;
  position: relative;
  
  &:after {
    content: "";
    display: block;
    width: 500px;
    height: 200px;
    background: linear-gradient(90deg, rgba(255,255,255,0.95) 15%, transparent);
    position: absolute;
    cursor: not-allowed;
  }

  ${props => props.$profileSubmitted && css`
    &:after {
      display: none;
      cursor: normal;
    }
  `}
`

const Actions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  margin-left: 30px;
`

function Download({ profile, profileSubmitted }) {
  return (
    <Container $profileSubmitted={profileSubmitted}>
      <a href={`http://localhost:5173/${profile.slug}`}>
        <QRCode value={`http://localhost:5173/${profile.slug}`} size={200} id="qrcode" />
      </a>
      <Actions>
        <MinimalButton onClick={generatePDF}><GrDocumentPdf /> <span>Download QR code as PDF</span></MinimalButton>
        <MinimalButton onClick={generatePNG}><GrDocumentImage /> <span>Download QR code as PNG</span></MinimalButton>
        <MinimalButton><MdAddToHomeScreen /> <span>Add QR code to home screen</span></MinimalButton>
      </Actions>
    </Container>
  )
}

export default Download