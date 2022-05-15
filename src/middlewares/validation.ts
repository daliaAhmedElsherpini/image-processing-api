import express from 'express'

const validation = (
  req: express.Request,
  res: express.Response,
  next: () => void
): void => {
  const errors: string[] = []

  // width is required ,, check if the user entered width
  if (!req.query.width) {
    errors.push('Please Enter Width')
  }

  // height is required ,, check if the user entered height
  if (!req.query.height) {
    errors.push('Please Enter Height')
  }

  // image  is required ,, check if the user entered image
  if (!req.query.image) {
    errors.push('Please Choose an Image')
  }

  // check if the width is a number
  if (req.query.width && isNaN(Number(req.query.width))) {
    errors.push('Enter Valid Width')
  }

  // check if the height is a number
  if (req.query.height && isNaN(Number(req.query.height))) {
    errors.push('Enter Valid Hight')
  }

  if (errors.length !== 0) {
    res.status(400).send(errors) // send bad request with the errors
  } else {
    next()
  }
}

export default validation
