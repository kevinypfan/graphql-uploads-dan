import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Course' },
    homework: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Homework' },
    createBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    file: {
        path: String,
        filename: String,
        mimetype: String,
        encoding: String,
        timestamp: Date
    },
    score: Number,
    oldFile: [{
        path: String,
        filename: String,
        mimetype: String,
        encoding: String,
        timestamp: Date
    }]
})


export default mongoose.model('Assignment', schema);
