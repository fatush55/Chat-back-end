// Core
import {Request, Response, NextFunction} from 'express'
import {verify} from 'jsonwebtoken'
import {config} from '../config'
import {responseApi} from "../utils";
import {CodeStatusType, RequestUser, ReqUserType} from "../types/app-type"



export default async  (
    req: RequestUser,
    res: Response,
    next: NextFunction,
) => {
    const {ACCESS_TOKEN_SECRET, EXCEPTION_JWT_PATH} = config
    const accessToken = req.headers.access_token

    if (!EXCEPTION_JWT_PATH.includes(req.path)) {
        if (typeof accessToken === 'string') {
            try {
                req.user = await verify(accessToken, ACCESS_TOKEN_SECRET, {}) as ReqUserType
            } catch (err) {
                res.json(responseApi({}, CodeStatusType.not_auth, 'No authorization user!'))
            }
        } else {
            res.json(responseApi({}, CodeStatusType.not_auth, 'No authorization user!'))
        }
    }
    next()
}
