// Types
import {Request} from "express"
import * as core from "express-serve-static-core";
import {Document, Schema} from "mongoose";


export enum CodeStatusType  {
    success = 200,
    not_auth = 401,
    not_valid = 421,
    error = 500,
}

export type CodeResponseType = 200 | 401 | 421 | 412 | 500

export interface MongooseValidatorType {
    properties: {
        message: string
        type: string
        path: string
        value: string
    }
}

export interface RequestUser<P = core.ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = core.Query> extends Request<P, ResBody, ReqBody, ReqQuery> {
    user?: ReqUserType
    token?: string
}

export type ReqUserType = {
    id: Schema.Types.ObjectId
    email: string
    iat: number
    exp: number
}

export interface CreateUpdateType {
    createdAt: Date
    updatedAt: Date
}

export interface BlackListTokenType extends Document {
    _id: Schema.Types.ObjectId
    token: string
    time: number
    __v: number
}