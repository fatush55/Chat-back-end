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