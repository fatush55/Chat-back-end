// Core
import {Schema, Document} from "mongoose"


export interface DialogType extends Document {
    _id: Schema.Types.ObjectId
    admin: Schema.Types.ObjectId
    users: Array<Schema.Types.ObjectId>
    last_message: Schema.Types.ObjectId
    __v: number,
}

export interface ShowReq {
    user_id: Schema.Types.ObjectId
}

export interface DeleteReq {
    dialog_id: Schema.Types.ObjectId
}