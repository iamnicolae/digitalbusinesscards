import { styled, css } from 'styled-components'

import { GrDocumentPdf, GrDocumentImage } from 'react-icons/gr'
import { MdAddToHomeScreen } from 'react-icons/md'

import { MinimalButton } from '../styles/button'

import generatePDF from '../utils/generatePDF'
import generatePNG from '../utils/generatePNG'
import installAsApp from '../utils/installAsApp'
import QR from './QR'

import { useEffect, useState } from 'react'

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

  @media only screen and (max-width: 1115px) {
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
`

function Download({ profile, profileSubmitted }) {

  const [deferredPrompt, setDeferredPrompt] = useState(null)

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    });
  }, [])

  return (
    <Container $profileSubmitted={profileSubmitted}>
      <QR slug={profile.slug} />
      <Actions>
        <MinimalButton onClick={generatePDF}><GrDocumentPdf /> <span>Download QR code as PDF</span></MinimalButton>
        <MinimalButton onClick={generatePNG}><GrDocumentImage /> <span>Download QR code as PNG</span></MinimalButton>
        <MinimalButton onClick={() => installAsApp(deferredPrompt, setDeferredPrompt)}><MdAddToHomeScreen /> <span>Add QR code to home screen</span></MinimalButton>
      </Actions>
    </Container>
  )
}

export default Download