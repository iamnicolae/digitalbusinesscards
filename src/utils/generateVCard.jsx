import transformImageToBase64 from "./transformImageToBase64"

async function generateVCard(profile, avatar) {

  const base64Image = await transformImageToBase64('https://cors-anywhere.herokuapp.com/' + avatar)

  const vCardFile = new Blob([
    `BEGIN:VCARD
VERSION:3.0
N:${profile.lastName};${profile.firstName};;;
FN:${profile.firstName} ${profile.lastName}
TITLE:${profile.position}
PHOTO;ENCODING=b;TYPE=JPEG:${base64Image}
EMAIL;type=INTERNET;type=pref:${profile.email}
TEL;type=MAIN:${profile.phone}
TEL;type=CELL;type=VOICE;type=pref:${profile.mobile}
ADR;type=WORK;type=pref:;;;${profile.street + ", " + profile.city + ", " + profile.country};;;
URL:${profile.website}
END:VCARD`],
    { type: "text/vcard;charset=utf-8" }
  )

  const a = document.createElement('a')
  a.href = URL.createObjectURL(vCardFile)
  a.download = `${profile.firstName}.${profile.lastName}.vcf`
  a.click()

  URL.revokeObjectURL(a.href)

}

export default generateVCard