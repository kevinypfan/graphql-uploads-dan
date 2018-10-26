import User from '../models/user'

const initApp = async () => {
    const user = await User.findOne({ scope: "ADMIN" })
    if (!user) {
        const newUser = new User({
            username: "Chou",
            studentId: "Boss",
            password: "abc123",
            scope: "ADMIN"
        })
        return newUser.save()
    }
    return {
        message: "Already have ADMIN account!"
    }
}

export default initApp;