const User = require('../models/User')
const Event = require('../models/Event')

class AttendenceController {
  async store (req, res) {
    const { attendant: participants } = req.body

    let eventParticipants = await Event.find({ participants: {$in: participants} })

    if (eventParticipants) {
      return res.status(400).json({ error: 'already participating' })
    }

    const event = await Event.findOneAndUpdate(req.params.eventId, {$push:{participants}}, {
      new: true
    })
    res.send(event)
  }
}

module.exports = new AttendenceController()