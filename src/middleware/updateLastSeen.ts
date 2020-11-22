// Core
import {Request, Response, NextFunction} from 'express'
// Models
import {UserModel} from '../models'


export default async  (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    await UserModel.findByIdAndUpdate('5fb009d623cfb918b53ffd25', {
        last_seen: new Date(),
    }, {
        new: true
    })
    next()
}
