import { Router } from 'express'
import { ShortenerControler } from '../controlers/shortener.js'

export const createShortenerRouter = ({ shortenerModel }) => {
  const shortenerRouter = Router()
  const shortenerControler = new ShortenerControler({ shortenerModel })

  shortenerRouter.get('/shortener', shortenerControler.getById)
  shortenerRouter.post('/shortener', shortenerControler.create)

  return shortenerRouter
}
