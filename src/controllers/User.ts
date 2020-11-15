// Models
import {UserModel} from '../models'
// Utils
import {responseApi, setErrorMongoose} from "../utils"
// Types
import {Response, Request} from 'express'
import {UserType, RegisterReq} from '../types/user-type'
import {CodeStatusType} from '../types/app-type'


export default class User {
    register = async (req: Request, res: Response) => {
        const dataReq = {
            email: req.body.email,
            password: req.body.password,
            full_name: req.body.full_name,
        } as UserType

        const user = new UserModel(dataReq)

        try {
            const data = await user.save()

            res.json(responseApi<UserType>(data, CodeStatusType.success, 'ok'))
        } catch (err) {
            if (err.keyValue?.email) err.keyValue.email = 'This email use'

            const error = setErrorMongoose(err.errors, err.keyValue)

            if (error) res.json(responseApi(error, CodeStatusType.not_valid, 'no valid'))
            else res.json(responseApi({}, CodeStatusType.error, 'Something went wrong'))
        }
    }

    update = async (req: Request<RegisterReq>, res: Response) => {
        const {id, ...updateData} = req.body

        try {
            await UserModel.findByIdAndUpdate(id, updateData, {runValidators: true})

            res.json(responseApi({}, CodeStatusType.success, 'ok'))
        } catch (err) {
            if (err.keyValue?.email) err.keyValue.email = 'This email use'

            const error = setErrorMongoose(err.errors, err.keyValue)

            if (error) res.json(responseApi(error, CodeStatusType.not_valid, 'no valid'))
            else res.json(responseApi({}, CodeStatusType.error, 'Something went wrong'))
        }
    }

    delete = async (req: Request, res: Response) => {
        const id = req.params.id

        try {
            await UserModel.findByIdAndDelete(id)

            res.json(responseApi({}, CodeStatusType.success, 'ok'))
        } catch (err) {
            res.json(responseApi({}, CodeStatusType.error, 'Something went wrong'))
        }
    }

    login = (req: Request, res: Response) => {
        const dataReq = {
            email: req.body.email,
            password: req.body.password,
        } as UserType

    }

    logout = (req: Request, res: Response) => {

    }

    auth = (req: Request, res: Response) => {

    }

    avatar = (req: Request, res: Response) => {

    }

    show = async (req: Request, res: Response) => {
        try {
            const data = await UserModel.find()

            res.json(responseApi<any>({items: [data]}, CodeStatusType.success, 'ok'))
        } catch (error) {
            res.json(responseApi({}, CodeStatusType.error, 'Something went wrong'))
        }
    }

    index = async (req: Request, res: Response) => {
        const id  = req.params.id

        try {
            const data = await UserModel.findById(id)

            res.json(responseApi<any>(data, CodeStatusType.success, 'ok'))
        } catch (error) {
            res.json(responseApi({}, CodeStatusType.error, 'No such user exists'))
        }
    }
}
