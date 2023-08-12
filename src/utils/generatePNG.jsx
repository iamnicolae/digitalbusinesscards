import transformSVGtoDataURL from './transformSVGtoDataURL'

function generatePNG() {

  transformSVGtoDataURL().then(dataUrl => {
    let downloadLink = document.createElement("a");
    downloadLink.href = dataUrl;
    downloadLink.download = "qr.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  })



}

export default generatePNG