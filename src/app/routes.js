const express = require('express')

const routes = express.Router()

const UserControler = require('./controllers/UserController')
const EventControler = require('./controllers/EventController')

routes.post('/users', UserControler.store)

routes.post('/events', EventControler.store)
routes.get('/events', EventControler.index)
routes.get('/events/:id', EventControler.show)
routes.delete('/events/:id', EventControler.destroy)
routes.put('/events/:id', EventControler.update)

module.exports = routes