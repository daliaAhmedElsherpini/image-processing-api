import express from 'express'
const resize = express.Router()
import validation from '../../middlewares/validation'
import checkImage from '../../middlewares/checkImage'
import imageProcessing from '../../helpers/imageProcessing'

resize.get(
  '/',
  [validation, checkImage],
  async (req: express.Request, res: express.Response): Promise<void> => {
    const width = Number(req.query.width)
    const height = Number(req.query.height)
    const image = req.query.image as string
    const process = await imageProcessing(width, height, image)

    if (process === true) {
      res.sendFile(width + '_' + height + '_' + image, {
        root: 'src/images/thumbnails',
      })
    } else {
      res.status(500).send('Something Wend Error')
    }
  }
)
export default resize
