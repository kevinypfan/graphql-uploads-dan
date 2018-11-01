import {
    AuthenticationError,
    UserInputError,
    ApolloError,
    ForbiddenError
} from 'apollo-server-express';

export default {
    Query: {
        courses: (root, args, ctx) => {
            return ctx.db.Course.find().populate('createBy')
        }
    },
    Mutation: {
        newCourse: (root, args, ctx) => {
            if (!ctx.user) return new AuthenticationError('You must be logged in to create the course!')
            if (ctx.user.scope === 'ADMIN') {
                const course = new ctx.db.Course({
                    ...args.data,
                    createAt: Date.now(),
                    createBy: ctx.user._id
                })
                course.populate('createBy').execPopulate();
                return course.save().then(result => {
                    return result
                })
            }
            return new ForbiddenError("You must be an administrator to create the course!")
        }
    },
    Course: {
        selectNumber: (root) => root.students.length
    }
}