// Models
import {UserModel} from '../models'
import {hash as setHash, compare} from 'bcryptjs'
import {sign} from 'jsonwebtoken'
import {config} from '../config'
// Utils
import {responseApi, setErrorMongoose, setErrors} from "../utils"
// Types
import {Response} from 'express'
import {UserType, RegisterReq} from '../types/user-type'
import {CodeStatusType, RequestUser} from '../types/app-type'


export default class User {
    register = async (req: RequestUser, res: Response) => {
        console.log('RR')

        await setErrors(req, res)

        const hash = await setHash(req.body.password, 10)

        try {
            const user = await UserModel.findOne({email: req.body.email})

            if (!user) {
                const user = new UserModel({
                    email: req.body.email,
                    password: hash,
                    full_name: req.body.full_name,
                }  as UserType)

                try {
                    const data = await user.save()

                    res.json(responseApi<UserType>(data, CodeStatusType.success, 'ok'))
                } catch (err) {
                    res.json(responseApi({}, CodeStatusType.error, 'Something went wrong'))
                }
            } else {
                res.json(responseApi({email: 'This email use'}, CodeStatusType.not_valid, 'Something went wrong'))
            }

        } catch (err) {
            res.json(responseApi({}, CodeStatusType.error, 'Something went wrong'))
        }
    }

    update = async (req: RequestUser<RegisterReq>, res: Response) => {
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

    delete = async (req: RequestUser, res: Response) => {
        const id = req.params.id

        try {
            await UserModel.findByIdAndDelete(id)

            res.json(responseApi({}, CodeStatusType.success, 'ok'))
        } catch (err) {
            res.json(responseApi({}, CodeStatusType.error, 'Something went wrong'))
        }
    }

    login = async (req: RequestUser, res: Response) => {
        await setErrors(req, res)

        try {
            const user = await UserModel.findOne({email: req.body.email})

            if (user) {
                const pas = await compare(req.body.password, user.password)


                if (pas) {
                    const {ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_LIFE} = config

                    const accessToken = sign( {id: user._id, email: req.body.email}, ACCESS_TOKEN_SECRET, {
                        algorithm: "HS256",
                        expiresIn: ACCESS_TOKEN_LIFE,
                    })

                    const refreshToken = sign({email: req.body.email}, REFRESH_TOKEN_SECRET, {
                        algorithm: "HS256",
                        expiresIn: REFRESH_TOKEN_LIFE,
                    })

                    try {
                        await UserModel.findByIdAndUpdate(user._id, {
                            refresh_token: refreshToken,
                        })

                        res.json(responseApi<any>({access_token: accessToken, refresh_token: refreshToken}, CodeStatusType.success, 'ok'))
                    } catch (err) {
                        res.json(responseApi({}, CodeStatusType.error, 'Something went wrong'))
                    }

                } else {
                    res.json(responseApi<any>({email: 'not valid', password: 'not valid'}, CodeStatusType.not_valid, 'not valid'))
                }

            } else {
                res.json(responseApi<any>({email: 'not valid', password: 'not valid'}, CodeStatusType.not_valid, 'not valid'))
            }

        } catch (err) {
            res.json(responseApi<any>({email: 'not valid', password: 'not valid'}, CodeStatusType.not_valid, 'not valid'))
        }
    }

    logout = (req: RequestUser, res: Response) => {

    }

    auth = (req: RequestUser, res: Response) => {

    }

    avatar = (req: RequestUser, res: Response) => {

    }

    show = async (req: RequestUser, res: Response) => {
        const userId  = req.user?.id

        try {
            const data = await UserModel.find({},{_id: 1, avatar: 1, email: 1, full_name: 1, createdAt: 1, updatedAt: 1})

            res.json(responseApi<any>({items: [...data.filter(elem => elem._id != userId)]}, CodeStatusType.success, 'ok'))
        } catch (error) {
            res.json(responseApi({}, CodeStatusType.error, 'Something went wrong'))
        }
    }

    index = async (req: RequestUser, res: Response) => {
        const id  = req.params.id

        try {
            const data = await UserModel.findById(id)

            res.json(responseApi<any>(data, CodeStatusType.success, 'ok'))
        } catch (error) {
            res.json(responseApi({}, CodeStatusType.error, 'No such user exists'))
        }
    }
}
