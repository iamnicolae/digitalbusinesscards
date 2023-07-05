import { customAlphabet } from 'nanoid'

function generateUniqueId(type, noOfChars) {
  const alphabets = {
    image: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    slug: "0123456789abcdefghijklmnopqrstuvwxyz"
  }

  return customAlphabet(alphabets[type], noOfChars)
}

export default generateUniqueId