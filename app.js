import express, { json } from 'express'
import 'dotenv/config'
import { corsMiddleware } from './middleware/cors.js'
import { createShortenerRouter } from './routes/shortener.js'
import { ShortenerModel } from './models/firebase.js'

const app = express()

app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.use('/api', createShortenerRouter({ shortenerModel: ShortenerModel }))

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
