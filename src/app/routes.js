const express = require('express')

const routes = express.Router()

const UserControler = require('./controllers/UserControler')

routes.post('/users', UserControler.store)

module.exports = routes