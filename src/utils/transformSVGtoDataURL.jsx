function transformSVGtoDataURL() {
  return new Promise(function (resolve, reject) {
    let svgElement = document.getElementById('qrcode')
    let svgString = new XMLSerializer().serializeToString(svgElement)
    let svgData = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString)

    const image = new Image()
    image.onload = function () {
      const width = 200
      const height = 200
      const canvas = document.createElement('canvas')

      canvas.setAttribute('width', width)
      canvas.setAttribute('height', height)

      const context = canvas.getContext('2d')
      context.drawImage(image, 0, 0, width, height)

      const dataUrl = canvas.toDataURL('image/png')

      resolve(dataUrl)
    }
    image.onerror = (e) => reject(e)
    image.src = svgData
  })


}

export default transformSVGtoDataURL