import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: { type: String },
    course: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Course' },
    createAt: { type: Date, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    createBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
})


export default mongoose.model('Homework', schema);