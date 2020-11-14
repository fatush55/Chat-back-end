// Core
import {Schema, model} from 'mongoose'
import validator from 'validator'
// Types


const DialogSchema = new Schema({

}, {
    timestamps: true,
})

export default model<any>('User', DialogSchema)
