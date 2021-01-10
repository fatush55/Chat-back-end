// Core
import {Request, Response, NextFunction} from 'express'
// Models
import {UserModel} from '../models'
// Types
import {RequestUser} from "../types/app-type"


export default async  (
    req: RequestUser,
    res: Response,
    next: NextFunction,
) => {
    if (req.user?.id) {
        await UserModel.findByIdAndUpdate(req.user?.id, {
            last_seen: new Date(),
        }, {
            new: true
        })
    }
    next()
}
