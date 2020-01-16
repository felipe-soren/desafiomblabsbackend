const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
    state: {
      type: String,
      required: true
  },
   city: {
      type: String,
      required: true
    },
    institute: {
      type: String,
      required: true
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }],
  eventType: {
    type: String,
    required: true,
    default: 'Free'
  },
  numberOfParticipants: {
    type: Number,
    required: true
  },
  urlImage: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: false
  },
  date: {
    type: Date,
    required: true
  }
})

EventSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Event', EventSchema)