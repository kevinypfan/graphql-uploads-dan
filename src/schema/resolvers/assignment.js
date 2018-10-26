export default {
    Query: {
        assignments: () => {
            const home = {
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
            const user = {
                id: "sodkfo54541gjghj",
                username: "kevinypfan",
                studentId: "V0224031",
                password: "gsdfg54fds64h6fg6h4d1gh6d1h6d65g1h6d1h6",
                scope: "Admin"
            }
            const data = {
                id: "sadjiasjd+5+65yt65j",
                homework: home,
                user: user,
                score: 30
            }
            return [data]
        }
    }
}