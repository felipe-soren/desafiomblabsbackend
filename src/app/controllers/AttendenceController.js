const User = require('../models/User')
const Event = require('../models/Event')

class AttendenceController {
  async store (req, res) {
    const { participants } = await Event.findById(req.params.eventId)
    const { attendant } = req.body
    let paticipantFounded = participants.find(participant => participant == attendant)
    if (paticipantFounded) {
      return res.status(400).json({ error: 'already participating' })
    }
    console.log(attendant)

    const event = await Event.findByIdAndUpdate(req.params.eventId, {$push:{participants: attendant}}, {
      new: true
    })
    res.send(event)
  }
  
  async destroy (req, res) {
    const { attendant } = req.body
    const event = await Event.findByIdAndUpdate( req.params.eventId , { $pull: { participants: attendant }}, {
      new: true} )
    res.send(event)
  }
}

module.exports = new AttendenceController()