const express = require('express')

const routes = express.Router()

const authMiddleaware = require('../app/middlewares/auth')

const UserControler = require('./controllers/UserController')
const EventControler = require('./controllers/EventController')
const LoginController = require('./controllers/LoginController')
const AttendenceController = require('./controllers/AttendenceController')

routes.post('/users', UserControler.store)
routes.post('/login', LoginController.store)

routes.use(authMiddleaware)

routes.post('/events', EventControler.store)
routes.get('/events', EventControler.index)
routes.get('/events/:id', EventControler.show)
routes.delete('/events/:id', EventControler.destroy)
routes.put('/events/:id', EventControler.update)

routes.post('/attendence/:eventId', AttendenceController.store)

module.exports = routes