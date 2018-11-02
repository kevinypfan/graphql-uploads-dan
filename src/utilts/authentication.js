import User from '../models/user'

export const authentication = async (req) => {
  if (req.headers.hasOwnProperty('authorization')) {
    var token = req.headers['authorization'];
    if (token) {
      const user = await User.findByToken(token)
      return { user, token };
    }
  }
  return false
}

