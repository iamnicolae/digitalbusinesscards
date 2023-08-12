import { jsPDF } from 'jspdf'
import transformSVGtoDataURL from './transformSVGtoDataURL'

async function generatePDF() {
  let pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [250, 250]
  })

  transformSVGtoDataURL().then(dataUrl => {
    pdf.addImage(dataUrl, 'PNG', 0, 0, 200, 200)
    pdf.save('QR.pdf');
  })
}

export default generatePDF