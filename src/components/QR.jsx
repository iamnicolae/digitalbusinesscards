import QRCode from 'react-qr-code'

function QR({ slug }) {
  return (
    <a href={`${import.meta.env.VITE_APP_URL}/${slug}`} target="_blank">
      <QRCode value={`${import.meta.env.VITE_APP_URL}/${slug}`} size={200} fgColor="#222" id="qrcode" />
    </a>
  )
}

export default QR