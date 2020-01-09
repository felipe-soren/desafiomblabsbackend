const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
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
  numberOfParticipants: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
})

EventSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Event', EventSchema)