import Course from '../models/course'
import mongoose from 'mongoose'
import { generate } from 'shortid'
import { randomStudent } from './student-data'
import initApp from '../utilts/initApp'

function exit() {
    mongoose.disconnect();
}

mongoose.connect('mongodb://localhost/danUpload', { useNewUrlParser: true }).then(() => {
    console.log("Connected to Database!")
    return initApp()
}).then(({ admin, message }) => {
    console.log(message)
    var courses = [
        new Course({
            "name": "資料結構",
            "teacher": {
                "firstname": "周",
                "lastname": "念湘"
            },
            "class": "日資工二甲",
            "campus": "第二校區",
            "subject": "COMPULSORY",
            "room": "lab305",
            "subjectCode": "DEIE0014",
            "courseCode": generate(),
            "credit": 3,
            "createAt": Date.now(),
            "createBy": admin._id,
            "students": randomStudent()
        }),
        new Course({
            "name": "網頁前端設計",
            "teacher": {
                "firstname": "周",
                "lastname": "念湘"
            },
            "class": "日資工二甲",
            "campus": "第二校區",
            "subject": "COMPULSORY",
            "room": "lab305",
            "subjectCode": "DEIE0014",
            "courseCode": generate(),
            "credit": 3,
            "createAt": Date.now(),
            "createBy": admin._id,
            "students": randomStudent()
        }),
        new Course({
            "name": "視窗程式設計",
            "teacher": {
                "firstname": "周",
                "lastname": "念湘"
            },
            "class": "日資工二甲",
            "campus": "第二校區",
            "subject": "COMPULSORY",
            "room": "lab305",
            "subjectCode": "DEIE0014",
            "courseCode": generate(),
            "credit": 3,
            "createAt": Date.now(),
            "createBy": admin._id,
            "students": randomStudent()
        }),
        new Course({
            "name": "演算法",
            "teacher": {
                "firstname": "周",
                "lastname": "念湘"
            },
            "class": "日資工二甲",
            "campus": "第二校區",
            "subject": "ELECTIVE",
            "room": "lab305",
            "subjectCode": "DEIE0014",
            "courseCode": generate(),
            "credit": 3,
            "createAt": Date.now(),
            "createBy": admin._id,
            "students": randomStudent()
        }),
        new Course({
            "name": "Iot應用實務",
            "teacher": {
                "firstname": "周",
                "lastname": "念湘"
            },
            "class": "日資工二甲",
            "campus": "第二校區",
            "subject": "COMPULSORY",
            "room": "lab305",
            "subjectCode": "DEIE0014",
            "courseCode": generate(),
            "credit": 3,
            "createAt": Date.now(),
            "createBy": admin._id,
            "students": randomStudent()
        }),
        new Course({
            "name": "資料庫",
            "teacher": {
                "firstname": "周",
                "lastname": "念湘"
            },
            "class": "日資工二甲",
            "campus": "第二校區",
            "subject": "COMPULSORY",
            "room": "lab305",
            "subjectCode": "DEIE0014",
            "courseCode": generate(),
            "credit": 3,
            "createAt": Date.now(),
            "createBy": admin._id,
            "students": randomStudent()
        }),
        new Course({
            "name": "後端實驗室",
            "teacher": {
                "firstname": "周",
                "lastname": "念湘"
            },
            "class": "日資工二甲",
            "campus": "第二校區",
            "subject": "ELECTIVE",
            "room": "lab305",
            "subjectCode": "DEIE0014",
            "courseCode": generate(),
            "credit": 3,
            "createAt": Date.now(),
            "createBy": admin._id,
            "students": randomStudent()
        }),
        new Course({
            "name": "中央空調",
            "teacher": {
                "firstname": "周",
                "lastname": "念湘"
            },
            "class": "日資工二甲",
            "campus": "第二校區",
            "subject": "COMPULSORY",
            "room": "lab305",
            "subjectCode": "DEIE0014",
            "courseCode": generate(),
            "credit": 3,
            "createAt": Date.now(),
            "createBy": admin._id,
            "students": randomStudent()
        }),
        new Course({
            "name": "程式語言與實驗",
            "teacher": {
                "firstname": "周",
                "lastname": "念湘"
            },
            "class": "日資工二甲",
            "campus": "第二校區",
            "subject": "COMPULSORY",
            "room": "lab305",
            "subjectCode": "DEIE0014",
            "courseCode": generate(),
            "credit": 3,
            "createAt": Date.now(),
            "createBy": admin._id,
            "students": randomStudent()
        }),
    ];

    var done = 0;
    for (var i = 0; i < courses.length; i++) {
        courses[i].save(function (err, result) {
            done++;
            if (done === courses.length) {
                exit();
            }
        });
    }

}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});
mongoose.set('useCreateIndex', true);


