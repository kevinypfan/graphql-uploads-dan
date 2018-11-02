import {
    AuthenticationError,
    UserInputError,
    ApolloError,
    ForbiddenError
} from 'apollo-server-express';
import { xlsxParse } from '../../utilts/xlsxParse'
export default {
    Query: {
        courses: (root, args, ctx) => {
            return ctx.db.Course.find().populate('createBy')
        }
    },
    Mutation: {
        newCourse: async (root, args, ctx) => {
            if (!ctx.user) return new AuthenticationError('You must be logged in to create the course!')
            if (ctx.user.scope === 'ADMIN') {
                const xlsxJson = xlsxParse(args.data.studentsExcel)
                if (xlsxJson) delete args.data.studentsExcel
                const students = []
                xlsxJson.forEach(stu => {
                    data = {
                        studentId: stu['學號'],
                        name: stu['姓名'],
                        class: stu['班級']
                    }
                    students.push(data)
                })
                const course = new ctx.db.Course({
                    ...args.data,
                    createAt: Date.now(),
                    createBy: ctx.user._id,
                    students
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