import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface ICourseQ extends mongoose.Document {
    termYear: string,
    courseNum: string,
    courseType: string,
    courseName: string,
    instructorName: string,
    courseEnrollment: string,
    TAQuota: string
}

const CourseQSchema = new mongoose.Schema({

    termYear: {
        type: String,
        required: true,
    },

    courseNum: {
        type: String,
        required: true,
    },

    courseType: {
        type: String,
        required: true,
    },

    courseName: {
        type: String,
        required: true,
    },

    instructorName: {
        type: String,
        required: true,
    },
    courseEnrollment: {
        type: String,
        required: true,
    },
    TAQuota: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

const CourseQ = mongoose.model<ICourseQ>("CourseQ", CourseQSchema);

export default CourseQ;

