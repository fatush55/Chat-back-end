// Core
import {Schema, model} from 'mongoose'
import validator from 'validator'
// Types
import {DialogType} from '../types/dialog-type'


const DialogSchema = new Schema({
    admin_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    users_id: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    last_message: {
        type: Schema.Types.ObjectId,
        ref: 'Message',
    }
}, {
    timestamps: true,
})

export default model<DialogType>('Dialog', DialogSchema)
