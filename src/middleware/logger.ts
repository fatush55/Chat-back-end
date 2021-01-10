// Core
import {NextFunction, Response} from "express"
import { getDate, format } from "date-fns"
// Types
import {RequestUser} from "../types/app-type"


export default async  (
    req: RequestUser,
    res: Response,
    next: NextFunction,
) => {

    console.log('')
    console.log(`*************************   ${format(new Date(), 'MM/dd/yyyy hh:mm:ss')}   **********************`)
    console.log('   BaseUrl: ', req.headers.origin)
    console.log('   Url: ', req.originalUrl)
    console.log('   Host: ', req.headers.host)
    console.log('   Method: ', req.method)
    console.log('   Token: ', req.headers.access_token)
    console.log('   Body: ', req.body)
    console.log('************************************************************************')
    console.log('')

    next()
}