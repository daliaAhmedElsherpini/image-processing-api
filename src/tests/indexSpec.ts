import supertest from 'supertest'
import checkIfImageExists from '../helpers/checkIfImageExists'
import imageProcessing from '../helpers/imageProcessing'
import app from '../index'
import ImageResizedBefore from '../helpers/ImageResizedBefore'

const request = supertest(app)
describe('Test endpoint responses ', (): void => {
  it('check if api is working', async (): Promise<void> => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })

  describe('Validate Image', (): void => {
    it('check if image is required', async (): Promise<void> => {
      const response = await request.get('/resize/?width=910&height=600')
      expect(response.status).toBe(400)
    })

    it('check if  image exists inside images folder using endpoint  ', async (): Promise<void> => {
      const response = await request.get(
        '/resize/?image=imggg.jpg&width=900&height=600'
      )
      expect(response.status).toBe(404)
    })
  })

  describe('Image Width', (): void => {
    it('check if width is required', async (): Promise<void> => {
      const response = await request.get('/resize/?image=img.jpg&height=400')
      expect(response.status).toBe(400)
    })

    it('check if has valid width as a number', async (): Promise<void> => {
      const response = await request.get(
        '/resize/?image=img.jpg&width=text&height=400'
      )
      expect(response.status).toBe(400)
    })
  })

  describe('Image Height', (): void => {
    it('check if height is required', async (): Promise<void> => {
      const response = await request.get('/resize/?image=img.jpg&width=410')
      expect(response.status).toBe(400)
    })

    it('check if has valid height as number', async (): Promise<void> => {
      const response = await request.get(
        '/resize/?image=img.jpg&width=500&height=text'
      )
      expect(response.status).toBe(400)
    })
  })

  describe('check the image ', (): void => {
    it('check if  image exists inside images folder using function ( not exists )', (): void => {
      const check = checkIfImageExists('imggg.jpg')
      expect(check).toBe(false)
    })

    it('check if  image exists inside images folder using function ( exists )', (): void => {
      const check = checkIfImageExists('img.jpg')
      expect(check).toBe(true)
    })

    it('check if  image exists inside thumbnails  folder', (): void => {
      const check = ImageResizedBefore(100, 100, 'img.jpg')
      expect(check).toBe(false)
    })

    it('image processing successfully', async (): Promise<void> => {
      const check = await imageProcessing(100, 300, 'img.jpg')
      expect(check).toBe(true)
    })

    it('Something went wrong while process image ', async (): Promise<void> => {
      const check = await imageProcessing(100, 0.000000005, 'img.jpg')
      expect(check).toBe(false)
    })
  })
})
