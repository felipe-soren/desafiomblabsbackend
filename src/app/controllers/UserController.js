const User = require('../models/User')
const Event = require('../models/Event')

class UserController{
  async store (req, res) {
    const { email } = req.body
    if ( await User.findOne({ email })) {
      return res.status(400).json({error: 'User already exists'})
    }

    const user = await User.create(req.body)

    return res.json({_id: user._id})
  }

  async show (req, res){
    const user = await User.findById(req.userId).populate('attendedEvents')
    res.send(user)
  }
}

module.exports = new UserController()