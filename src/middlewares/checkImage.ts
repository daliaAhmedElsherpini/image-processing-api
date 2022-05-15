import express from 'express'
import checkIfImageExists from '../helpers/checkIfImageExists'
const checkImage = (
  req: express.Request,
  res: express.Response,
  next: () => void
): void => {
  // check if image exists inside images folder
  if (checkIfImageExists(req.query.image as string) === false) {
    res.status(404).send('The file does not exist.') // send bad request with the error
  } else {
    next()
  }
}

export default checkImage
