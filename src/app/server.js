const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const databaseConfig = require('./config/database')
var cors = require('cors')

class App {
  constructor(){
    this.express = express()

    this.database()
    this.middlewares()
    this.routes()
  }

  database () {
    mongoose.connect(databaseConfig.uri, 
      { useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true 
      })
  }
  
  middlewares () {
    this.express.use(express.json())
    this.express.use(cors())
  }

  routes () {
    this.express.use(routes)
  }
}

module.exports = new App().express