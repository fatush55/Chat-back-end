// Core
import {Schema, model} from 'mongoose'
import validator from 'validator'
// Types
import { UserType } from '../types/user-type'


const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate:[validator.isEmail, 'It is not email'],
    },
    avatar: {
        type: String || null,
        default: null,
    },
    full_name: {
        type: String,
        required: [true,'Fullname is required']
    },
    password: {
        type: String,
        required: 'Password is required',
        maxlength: [40, 'Max length 40 symbols'],
        minlength: [5, 'Min length 5 symbols'],
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    confirm_hash: String,
    last_time: Date,
}, {
    timestamps: true,
})

export default model<UserType>('User', UserSchema)
