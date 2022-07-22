const express = require('express')
const moment = require('moment-timezone')
const morgan = require('morgan')
const path = require('path')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const { uuid } = require('uuidv4')
const port = process.env.PORT || 800

// Error handler
require('express-async-errors')

// Server configuration
app.set('etag', false)
app.enable('trust proxy')
app.disable('x-powered-by')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('common'))

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.engine('ejs', require('ejs').__express)
moment.locale('id')
app.locals.moment = moment

// Routes
app.get('/', async (_, res) => {
  res.render('index', {
    fingerprint: uuid()
  })
})

app.post('/', async (_, res) => {
  const { fingerprint } = _.body
  const momentTime = moment().format('YYYY-MM-DDTHH:mm:ss')
  io.emit(fingerprint, `[${momentTime}] Pesan Dari Backend`)
  return res.json({ success: true })
})

// Socket.io
io.on('connection', function(socket) { })

// 404 middleware express
app.use('*', function (req, res) {
  return res.redirect(301, '/')
})

// Listen port
http.listen(port, async () => {
  console.log(`Server is running on port ${port}!`)
})