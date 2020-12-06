// Types
import {Request} from "express"
import * as core from "express-serve-static-core";


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
}

export type ReqUserType = {
    id: number
    email: string
    iat: number,
    exp: number
}