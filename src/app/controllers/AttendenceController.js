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

    await User.findByIdAndUpdate(req.userId, {$push:{attendedEvents: req.params.eventId}})

    const event = await Event.findByIdAndUpdate(req.params.eventId, {$push:{participants: attendant}}, {
      new: true
    })
    res.send(event)
  }
  
  async destroy (req, res) {
    const { attendant } = req.body
    const user = await User.findByIdAndUpdate(attendant, {$pull: {attendedEvents: req.params.eventId}}, {
      new: true} )
      console.log(user)

    const event = await Event.findByIdAndUpdate( req.params.eventId , { $pull: { participants: attendant }}, {
      new: true} )
    res.send(event)
  }
}

module.exports = new AttendenceController()