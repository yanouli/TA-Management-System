import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import TAC, { ITAC } from './TAC';
const Schema = mongoose.Schema;

export interface ITACourse extends mongoose.Document {
    termYear: string,
    courseNum: string,
    TAName: string,
    studentID: string,
    assignedHours: string,
    work:ITAC
}

const TACourseSchema = new mongoose.Schema({

    termYear: {
        type: String,
        required: true,
    },

    courseNum: {
        type: String,
        required: true,
    },

    TAName: {
        type: String,
        required: true,
    },

    studentID: {
        type: String,
        required: true,
    },

    assignedHours: {
        type: String,
        required: true,
    },
    work: {
        type: Schema.Types.ObjectId,
        required: false,
    },
}, {
    timestamps: true
})

const TACourse = mongoose.model<ITACourse>("TACourse", TACourseSchema);

export default TACourse;

