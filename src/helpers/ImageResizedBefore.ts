import fs from 'fs'

const ImageResizedBefore = (
  width: number,
  height: number,
  img: string
): boolean => {
  const imgName = width + '_' + height + '_' + img
  const imgUrl = `src/images/thumbnails/${imgName}`

  try {
    fs.accessSync(imgUrl, fs.constants.R_OK)
    return true
  } catch (err) {
    return false
  }
}

export default ImageResizedBefore
