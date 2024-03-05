import { validateUrl } from '../schemas/shortener.js'

export class ShortenerControler {
  constructor ({ shortenerModel }) {
    this.shortenerModel = shortenerModel
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

    if (!result) {
      return res.status(400).json({ message: 'Invalid url' })
    }

    const shortenedUrl = await this.shortenerModel.create({ url })
    res.status(201).json(shortenedUrl)
  }
}
