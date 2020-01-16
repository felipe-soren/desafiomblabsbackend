const Event = require('../models/Event')
const User = require('../models/User')

class EventController {

  async index (req, res) {
    const filters = {}
    
    if(req.query.title) {
      filters.name = new RegExp(req.query.title, 'i')
    }
    if (req.query.city) {
      filters.city = new RegExp(req.query.city, 'i')
    }
    if (req.query.type) {
      filters.eventType = new RegExp(req.query.type, 'i')
      console.log(filters)
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

    const { organizer: name } = req.body

    const user = await User.findOne({ _id: req.userId })

    if (!user.isOrganizer){
      return res.status(400).json({ error: 'user is not organizer' })
    }

    if (await Event.findOne({ name })) {
      return res.status(400).json({error: 'event already exists'})
    }

    let event = await Event.create({...req.body, organizer: req.userId})

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