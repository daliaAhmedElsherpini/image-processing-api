import fs from 'fs'
import ImageResizedBefore from './ImageResizedBefore'
const sharp = require('sharp')

const imageProcessing = async (
  width: number,
  height: number,
  imgName: string
): Promise<boolean> => {
  const resizedImage = width + '_' + height + '_' + imgName
  let status = true

  // check if thumbnail folder exists
  if (!fs.existsSync('src/images/thumbnails')) {
    fs.mkdirSync('src/images/thumbnails')
  }
  if (ImageResizedBefore(width, height, imgName) === false) {
    try {
      await sharp(`src/images/${imgName}`)
        .resize(width, height, {
          fit: 'contain',
        })
        .toFile(`src/images/thumbnails/${resizedImage}`)
    } catch (err) {
      status = false
    }
  }
  return status
}

export default imageProcessing
