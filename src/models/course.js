import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    teacher: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        }
    },
    class: { type: String },
    subject: {
        type: String,
        enum: ["COMPULSORY", "ELECTIVE"],
        required: true
    },
    campus: { type: String },
    time: {
        start: Number,
        end: Number
    },
    room: { type: String, required: true },
    subjectCode: { type: String, required: true },
    courseCode: { type: String, required: true },
    accessNumber: { type: Number, required: true },
    selectNumber: { type: Number, required: true },
    credit: { type: Number, required: true },
    students: [{
        studentId: String,
        name: String,
        class: String
    }],
    createBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    createAt: {
        type: Date,
        required: true
    }
})


export default mongoose.model('Course', schema);