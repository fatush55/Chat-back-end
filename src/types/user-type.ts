// Types
import {Document} from 'mongoose'
import {MongooseValidatorType} from './app-type'


export interface UserType extends Document{
    _id: string
    email: string
    avatar?: string
    full_name: string
    password: string
    confirmed: string
    confirm_hash: string
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


