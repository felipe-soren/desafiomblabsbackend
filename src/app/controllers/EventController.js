const Event = require('../models/Event')
const User = require('../models/User')

class EventController {

  async index (req, res) {
    const filters = {}
    
    if(req.query.title) {
      filters.name = new RegExp(req.query.title, 'i')
    }
    const events = await Event.paginate(filters, {
      page: req.query.page || 1,
      limit: 20,
      populate: ['organizer'],
      sort: '-createdAt'
    })
    res.json(events)
  }

  async show (req, res) {
    const event = await Event.findById(req.params.id)
    res.send(event)
  }
  
  async store (req, res) {

    const { organizer: _id, name } = req.body

    const user = await User.findOne({ _id })

    if (!user.isOrganizer){
      return res.status(400).json({ error: 'user is not organizer' })
    }

    if (await Event.findOne({ name })) {
      return res.status(400).json({error: 'event already exists'})
    }

    let event = await Event.create(req.body)

    event = await event.populate('organizer').execPopulate()

    res.json(event)
  } 

  async update (req, res) {
    const event = await Event.findOneAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(event)
  }

  async destroy (req, res) {
    await Event.findByIdAndDelete(req.params.id)

    return res.send()
  }
}

module.exports = new EventController()