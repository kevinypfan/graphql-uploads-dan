import {
  AuthenticationError,
  UserInputError,
  ApolloError
} from 'apollo-server';

export default {
  Query: {
    checkToken: async (root, args, ctx) => {
      console.log(ctx.user)
      if (await ctx.user === null) {
        return new AuthenticationError("You need to be authenticated to access this schema!")
      }
      return ctx.user
    }
  },
  Mutation: {
    signup: async (root, args, ctx) => {
      const { username, studentId, password, device } = args;
      const requestIp = ctx.req.connection.remoteAddress;
      const newUser = new ctx.db.User({ username, studentId, password, scope: 'student' })
      try {
        const saveUser = await newUser.save();
        const { token, user } = await saveUser.generateAuthToken(requestIp, device);
        ctx.res.header('x-access-token', token)
        return user;
      } catch (err) {
        throw new Error(err)
      }
    },
    login: async (root, args, { db, req, res }) => {
      const { studentId, password, device } = args;
      const requestIp = req.connection.remoteAddress;
      try {
        const authUser = await db.User.findByCredentials(studentId, password)
        const { token, user } = await authUser.generateAuthToken(requestIp, device)
        res.header('x-access-token', token)
        return user
      } catch (err) {
        throw new AuthenticationError(err)
      }
    },
    logout: (root, args, ctx) => {
      console.log(ctx.user)
      if (!ctx.user) { throw new Error("您尚未登入！") }
      return ctx.user.updateOne({
        $pull: {
          tokens: { token: ctx.token }
        }
      }).then((result) => {
        return { message: "logout success!" }
      }).catch(err => {
        throw new Error(err);
      })
    }
  }
}