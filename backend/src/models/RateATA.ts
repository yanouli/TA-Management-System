import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IRateATA extends mongoose.Document {
    course: string
    ta: string,
    score: number,
    comment: string
}

const RateATASchema = new mongoose.Schema({

    course: {
        type: String,
        required: true,
        ref: "Course"
    },

    ta: {
        type: String,
        required: true,
        ref: "User"
    },

    score: {
        type: Number,
        required: true
    },

    comment: {
        type: String,
        required: false,
    }

}, {
    timestamps: true
})

const RateATA = mongoose.model<IRateATA>("RateATA", RateATASchema);

export default RateATA;