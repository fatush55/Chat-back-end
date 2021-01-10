// Core
import {Response, NextFunction} from 'express'
import {verify} from 'jsonwebtoken'
import {} from '../utils'
// Model
import {BlackListToken} from '../models'
// Utils
import {responseApi, config} from "../utils"
// Types
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
                const user = await verify(accessToken, ACCESS_TOKEN_SECRET, {}) as ReqUserType

                try {
                    const tokenBL =  await BlackListToken.findOne({token: accessToken})

                    if (!tokenBL) {
                        req.user = user
                        req.token = accessToken
                    } else {
                        res.json(responseApi({}, CodeStatusType.not_auth, 'No authorization user!'))
                    }

                } catch (err) {
                    res.json(responseApi({}, CodeStatusType.error, 'Something went wrong'))
                }


            } catch (err) {
                res.json(responseApi({}, CodeStatusType.not_auth, 'No authorization user!'))
            }
        } else {
            res.json(responseApi({}, CodeStatusType.not_auth, 'No authorization user!'))
        }
    }

    next()
}
