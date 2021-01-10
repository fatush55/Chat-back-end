// Core
import {ValidationError, validationResult} from "express-validator"
import {Request, Response} from "express"
import {responseApi} from "./index"
import {CodeStatusType} from "../types/app-type"


export default async (req: Request, res: Response) => {
    try {
        await validationResult(req).throw()
    } catch (err) {
        let errors = {}

        err.errors[0].nestedErrors.forEach((elem: ValidationError) => errors = {...errors, [elem.param]: elem.msg})

        await res.json(responseApi<any>(errors, CodeStatusType.not_valid, 'not valid'))
    }
}

