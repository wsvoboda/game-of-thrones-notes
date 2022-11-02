const express = require('express')
const pg = require('pg')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 8000

pg.defaults.ssl = true

app.use(cors({ origin: (orig, cb) => cb(null, true), credentials: true }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userRoutes = require('./routes/userRoutes')
app.use('/users', userRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})

app.get('/test', (req, res) => {
  res.send('Hello World')
})
