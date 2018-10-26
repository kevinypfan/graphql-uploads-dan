export default {
    Query: {
        Courses: () => {
            const data = {
                id: "21312eqweqwe123123",
                name: "創意科技",
                teacher: { hello: "world" },
                class: "資工二甲",
                subject: "COMPULSORY",
                campus: "八甲",
                time: {
                    start: 1,
                    end: 3
                },
                room: "lab305",
                subjectCode: "abc123",
                courseCode: "def456",
                accessNumber: 55,
                selectNumber: 42,
                credit: 3
            }
            return [data]
        }
    },
    Mutation: {
        newCourse: (root, args, ctx) => {
            const data = {
                id: "21312eqweqwe123123",
                name: "創意科技",
                teacher: { hello: "world" },
                class: "資工二甲",
                subject: "COMPULSORY",
                campus: "八甲",
                time: {
                    start: 1,
                    end: 3
                },
                room: "lab305",
                subjectCode: "abc123",
                courseCode: "def456",
                accessNumber: 55,
                selectNumber: 42,
                credit: 3
            }
            return data
        }
    }
}