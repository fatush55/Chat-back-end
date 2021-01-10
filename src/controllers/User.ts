// Models
import {UserModel, BlackListToken} from '../models'
import {hash as setHash, compare} from 'bcryptjs'
import {sign} from 'jsonwebtoken'
// Utils
import {responseApi, setErrorMongoose, setErrors, config} from "../utils"
// Types
import {Response} from 'express'
import {UserType, RegisterReq} from '../types/user-type'
import {BlackListTokenType, CodeStatusType, RequestUser} from '../types/app-type'


export default class User {
    signin = async (req: RequestUser, res: Response) => {
        await setErrors(req, res)

        try {
            const user = await UserModel.findOne({email: req.body.email}, {__v: 0})


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

                        const prepareUser = {
                            _id: user._id,
                            avatar: user.avatar,
                            email: user.email,
                            full_name: user.full_name,
                            createdAt: user.createdAt,
                            updatedAt: user.updatedAt,
                        }

                        res.json(responseApi<any>({token: {access_token: accessToken, refresh_token: refreshToken}, user: prepareUser}, CodeStatusType.success, 'ok'))
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

    signup = async (req: RequestUser, res: Response) => {

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

    identification = async (req: RequestUser, res: Response) => {
        try {
            const user = await UserModel.findOne({_id: req.user?.id}, {__v: 0, password: 0, confirmed: 0})


            res.json(responseApi<any>(user, CodeStatusType.success, 'ok'))
        } catch (err) {
            res.json(responseApi({}, CodeStatusType.error, 'Something went wrong'))
        }
    }

    logout = async (req: RequestUser, res: Response) => {

        if (req.user) {
            const tokenBL = new BlackListToken({
                time: +req.user.exp,
                token: req.token,
            }  as BlackListTokenType)


            try {
                await tokenBL.save()

                res.json(responseApi({}, CodeStatusType.success, 'ok'))
            } catch (err) {
                res.json(responseApi({}, CodeStatusType.error, 'Something went wrong'))
            }
        } else {
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
