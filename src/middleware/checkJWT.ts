// Core
import {Request, Response, NextFunction} from 'express'
import {verify} from 'jsonwebtoken'
import {config} from '../config'
import {responseApi} from "../utils";
import {CodeStatusType} from "../types/app-type";


export default async  (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const {ACCESS_TOKEN_SECRET, EXCEPTION_JWT_PATH} = config
    const accessToken = req.headers.access_token
    const path = req.path
    let payload

    if (!EXCEPTION_JWT_PATH.includes(path)) {
        if (typeof accessToken === 'string') {
            try {
                payload = verify(accessToken, ACCESS_TOKEN_SECRET) as {email: string}

            } catch (err) {
                res.json(responseApi({}, CodeStatusType.not_auth, 'No authorization user!'))
            }
        } else {
            res.json(responseApi({}, CodeStatusType.not_auth, 'No authorization user!'))
        }
    }

    next()
}
