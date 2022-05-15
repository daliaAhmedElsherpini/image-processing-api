import fs from 'fs'

const checkIfImageExists = (imgName: string): boolean => {
  const imgUrl = `src/images/${imgName}`
  try {
    fs.accessSync(imgUrl, fs.constants.R_OK)
    return true
  } catch (err) {
    return false
  }
}

export default checkIfImageExists
