const User = require('../models/User')

class LoginController {
  async store (req, res){
    const { email, password } = req.body

    let user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    if (!await user.compareHash(password)) {
      return res.status(400).json({ error: 'Invalid password'})
    }
    user = {id: user.id_, isOrganizer: user.isOrganizer}
    return res.json({ user , token: User.generateToken(user) })
  }
}

module.exports = new LoginController()