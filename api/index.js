import express, { json } from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'
import { corsMiddleware } from '../middleware/cors.js'
import { createShortenerRouter } from '../routes/shortener.js'
import { createRedirectRouter } from '../routes/redirect.js'
import { ShortenerModel } from '../models/firebase.js'

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

const staticPath = path.join(__dirname, './web')
app.use(express.static(staticPath))
app.use('/', createRedirectRouter({ shortenerModel: ShortenerModel }))
app.use('/api', createShortenerRouter({ shortenerModel: ShortenerModel }))

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
