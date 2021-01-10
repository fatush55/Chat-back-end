// Core
import {Schema, model} from 'mongoose'
// Types
import { BlackListTokenType } from '../types/app-type'


const BlackListToken = new Schema({
    token: {
        type: Schema.Types.String,
    },
    time: {
        type: Schema.Types.Number,
    },
}, {
    timestamps: true,
})

export default model<BlackListTokenType>('BlackListToken', BlackListToken)