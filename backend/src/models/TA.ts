import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


export interface ITA extends mongoose.Document {
    Name: string
}

const TASchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

/*
export interface ITARequest extends Request {
    ta?: any
}
*/


const TA = mongoose.model<ITA>("TA", TASchema);

export default TA;

