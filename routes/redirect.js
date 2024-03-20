import { Router } from 'express'
import { ShortenerControler } from '../controlers/shortener.js'

export const createRedirectRouter = ({ shortenerModel }) => {
  const shortenerRouter = Router()
  const shortenerControler = new ShortenerControler({ shortenerModel })

  shortenerRouter.get('/:id', shortenerControler.getByIdRedirect)

  return shortenerRouter
}
