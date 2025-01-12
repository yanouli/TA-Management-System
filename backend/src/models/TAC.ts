import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface ITAC extends mongoose.Document {
    termYear: string,
    TAName: string,
    studentID: string,
    legalName: string,
    Email: string,
    gradUgrad: string,
    supervisorName: string,
    Priority: string,
    Hours: string,
    dateApplied: string,
    Location: string,
    Phone: string,
    Degree: string,
    courseList: string,
    otherCourse: string,
    Notes: string
}

const TACSchema = new mongoose.Schema({

    termYear: {
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

    legalName: {
        type: String,
        required: true,
    },

    Email: {
        type: String,
        required: true,
    },
    gradUgrad: {
        type: String,
        required: true,
    },
    supervisorName: {
        type: String,
        required: true,
    },
    Priority: {
        type: String,
        required: true,
    },
    Hours: {
        type: String,
        required: true,
    },
    dateApplied: {
        type: String,
        required: true,
    },
    Location: {
        type: String,
        required: true,
    },
    Phone: {
        type: String,
        required: true,
    },
    Degree: {
        type: String,
        required: true,
    },
    courseList: {
        type: String,
        required: true,
    },
    otherCourse: {
        type: String,
        required: true,
    },
    Notes: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

const TAC = mongoose.model<ITAC>("TAC", TACSchema);

export default TAC;

