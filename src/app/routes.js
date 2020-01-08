const express = require('express')

const routes = express.Router()

const UserControler = require('./controllers/UserController')
const EventControler = require('./controllers/EventController')

routes.post('/users', UserControler.store)
routes.post('/events', EventControler.store)

module.exports = routes