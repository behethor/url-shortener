import { validateUrl } from '../schemas/shortener.js'

export class ShortenerControler {
  constructor ({ shortenerModel }) {
    this.shortenerModel = shortenerModel
  }

  getByIdRedirect = async (req, res) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
    const data = await this.shortenerModel.getById({ id: fullUrl })

    if (data?.url) {
      return res.redirect(data.url)
    }

    res.redirect('/')
  }

  getById = async (req, res) => {
    const { id } = req.query

    const url = await this.shortenerModel.getById({ id })

    if (url) {
      return res.status(201).json(url)
    }

    res.status(404).json({ message: 'Url not found' })
  }

  create = async (req, res) => {
    const { url } = req.body
    const result = await validateUrl({ url })
    const baseUrl = req.protocol + '://' + req.get('host')

    if (!result) {
      return res.status(400).json({ message: 'Invalid url' })
    }

    const shortenedUrl = await this.shortenerModel.create({ url, baseUrl })
    res.status(201).json(shortenedUrl)
  }
}
