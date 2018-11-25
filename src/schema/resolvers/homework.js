import {
    AuthenticationError,
    UserInputError,
    ApolloError,
    ForbiddenError
} from 'apollo-server-express';
import pubsub from '../../utilts/pubsub'


export default {
    Subscription: {
        homeworkAddedData: {
            subscribe: () => pubsub.asyncIterator('homeworkAddedData'),
        }
    },
    Query: {
        homeworks: (root, args, ctx) => {
            return ctx.db.Homework.find().populate(['course', 'createBy'])
        },
        homeworkByCourse: (root, args, ctx) => {
            return ctx.db.Homework.find({ course: args.course }).populate(['course', 'createBy'])
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
                return homework.save().then(result => {
                    pubsub.publish('homeworkAddedData', { homeworkAddedData: result })
                    pubsub.publish('addedNotify', {
                        addedNotify: {
                            icon: 'description',
                            message: `${result.course.name}課程，作業"${result.title}"，已經新增了，同學們已經通知了請記得繳交`,
                            timestamp: Date.now()
                        }
                    })
                    return result
                })
            }
        }
    }
}

