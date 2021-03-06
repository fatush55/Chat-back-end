// Types
import {Document, Schema} from 'mongoose'
import {CreateUpdateType, MongooseValidatorType} from './app-type'


export interface UserType extends Document, CreateUpdateType {
    _id: Schema.Types.ObjectId
    email: string
    avatar?: string
    full_name: string
    password: string
    confirmed: string
    confirm_hash: string
}

export interface RegisterReq {
    email: string
    password: string
    full_name: string
}

export interface UserErrorTypes {
    errors?: {
        email?: MongooseValidatorType
        avatar?: MongooseValidatorType
        full_name?: MongooseValidatorType
        password?: MongooseValidatorType
        confirmed?: MongooseValidatorType
        confirm_hash?: MongooseValidatorType
    }
    keyValue?: {
        email?: string
        avatar?: string
        full_name?: string
        password?: string
        confirmed?: string
        confirm_hash?: string
    }
}


