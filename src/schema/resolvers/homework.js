import {
    AuthenticationError,
    UserInputError,
    ApolloError,
    ForbiddenError
} from 'apollo-server-express';


export default {
    Query: {
        homeworks: (root, args, ctx) => {
            return ctx.db.Homework.find().populate(['course', 'createBy'])
        }
    },
    Mutation: {
        newHomework: (root, args, ctx) => {
            if (!ctx.user) return new AuthenticationError('You must be logged in to create the course!')
            if (ctx.user.scope === 'ADMIN' || ctx.user.scope === 'TA') {
                const homework = new ctx.db.Homework({
                    ...args.data,
                    createAt: Date.now(),
                    createBy: ctx.user._id
                })
                homework.populate(['course', 'createBy']).execPopulate();
                return homework.save()
            }
        }
    }
}