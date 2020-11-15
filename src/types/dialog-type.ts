// Core
import {Schema, Document} from "mongoose"


export interface DialogType extends Document {
    _id: Schema.Types.ObjectId
    admin_id: Schema.Types.ObjectId
    users_id: Array<Schema.Types.ObjectId>
    last_message: Schema.Types.ObjectId
}

export interface ShowReq {
    user_id: Schema.Types.ObjectId
}

export interface DeleteReq {
    dialog_id: Schema.Types.ObjectId
}