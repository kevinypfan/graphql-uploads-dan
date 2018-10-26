export default {
    Query: {
        homeworks: () => {
            const data = {
                id: "asdafijgifd5373jgfd",
                title: "作業1",
                description: "七彩霓虹燈",
                course: {
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
                },
                createAt: 1540524273471,
                start: 1540524273471,
                end: 1540524273471
            }
            return [data]
        }
    }
}