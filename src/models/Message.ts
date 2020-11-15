// Core
import {Schema, model} from 'mongoose'
import validator from 'validator'
// Types
import {MessageType} from '../types/message-type'


const MessageSchema = new Schema({
    read: {
        type: Boolean,
        default: false,
    },
    text: {
        type: String,
        required: true
    },
    users_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    dialog_id: {
        type: Schema.Types.ObjectId,
        ref: "Dialog",
    },
}, {
    timestamps: true,
})

export default model<MessageType>('Message', MessageSchema)
