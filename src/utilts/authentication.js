import User from '../models/user'

export const authentication = async (req) => {
  if (req == undefined || req == null) return false
  var token = req.headers['authorization'];
  if (!token) return false
  if (token) {
    const user = await User.findByToken(token)
    return { user, token };
  }
}

