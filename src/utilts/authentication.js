import User from '../models/user'

export const authentication = async (req) => {
  var token = req.header('x-access-token');
  const user = await User.findByToken(token)
  return { user, token };
}

