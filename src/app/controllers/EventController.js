const Event = require('../models/Event')
const User = require('../models/User')

class EventController {

  async store (req, res) {

    const { organizer } = req.body

    const user = await User.findOne({ _id: organizer })

    if (!user.isOrganizer){
      return res.status(400).json({ error: 'user is not organizer' })
    }

    let event = await Event.create(req.body)

    event = await event.populate('organizer').execPopulate()

    res.json(event)
  }
}

module.exports = new EventController()