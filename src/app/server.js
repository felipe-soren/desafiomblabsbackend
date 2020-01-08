const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const databaseConfig = require('./config/database')

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
  }

  routes () {
    this.express.use(routes)
  }
}

module.exports = new App().express