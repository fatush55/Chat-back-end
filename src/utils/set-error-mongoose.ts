// Types
import { MongooseValidatorType } from "../types/app-type"


export default (errors: any , keyValue: any): any => {
    let data = {}

    if (keyValue) {
        data = {...keyValue,}
    }

    if (errors) {
        Object.values(errors as Array<MongooseValidatorType>).forEach((elem) => {
            // @ts-ignore
            data[elem.properties.path as keyof any] = elem.properties.message
        })
    }

    return data
}
