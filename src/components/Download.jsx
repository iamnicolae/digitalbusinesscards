import { styled, css } from 'styled-components'
import QRCode from 'react-qr-code'

import { GrDocumentPdf, GrDocumentImage } from 'react-icons/gr'
import { MdAddToHomeScreen } from 'react-icons/md'

import generatePDF from '../utils/generatePDF'
import generatePNG from '../utils/generatePNG'

import { MinimalButton } from '../styles/button';

const Container = styled.div`
  display: flex;
  gap: 30px;
  position: relative;
  grid-area: 2 / 1 / 3 / 2;
  
  &:after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
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

  a {
    display: block;
  }

  @media only screen and (max-width: 750px) {
    grid-area: 3 / 1 / 4 / 2;
    flex-direction: column;
  }
`

const Actions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;

  @media only screen and (max-width: 1350px) {

  }
`

function Download({ profile, profileSubmitted }) {
  return (
    <Container $profileSubmitted={profileSubmitted}>
      <a href={`http://localhost:5173/${profile.slug}`} target="_blank">
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