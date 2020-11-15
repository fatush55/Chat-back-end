// Core
import {Schema, Document} from "mongoose"


export interface MessageType extends Document {
    _id: Schema.Types.ObjectId
    user_id: Schema.Types.ObjectId
    dialog_id: Schema.Types.ObjectId
    read: boolean
    text: string
}

export interface ShowReq {
    dialog_id: Schema.Types.ObjectId
}

export interface CreateReq {
    dialog_id: Schema.Types.ObjectId
    user_id: Schema.Types.ObjectId
    text: string
}

export interface DeleteReq {
    message_id: Schema.Types.ObjectId
}

