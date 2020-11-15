// Models
import {DialogModel, MessageModel} from '../models'
// Utils
import {responseApi, setErrorMongoose} from "../utils"
// Types
import {Response, Request} from 'express'
import {CodeStatusType} from '../types/app-type'
import {MessageType, ShowReq, CreateReq, DeleteReq} from '../types/message-type'
import {DialogType} from "../types/dialog-type"


export default class Message {
    create = async (req: Request<CreateReq>, res: Response) => {
        const dataReq = {
            dialog_id: req.body.dialog_id,
            user_id: req.body.user_id,
            text: req.body.text,
        } as MessageType

        const message = new MessageModel(dataReq)

        try {
            const messageSave = await message.save()
            // Update Dialog
            const dataReqDialogUpdate = {
                last_message: messageSave._id
            } as DialogType

            try {
                await DialogModel.findByIdAndUpdate(req.body.dialog_id, dataReqDialogUpdate)

                res.json(responseApi<any>(messageSave, CodeStatusType.success, 'ok'))
            } catch (err) {
                await MessageModel.findByIdAndDelete(messageSave._id)

                res.json(responseApi({}, CodeStatusType.error, 'Dialog cannot be update'))
            }

        } catch (err) {
            res.json(responseApi({}, CodeStatusType.error, 'Message cannot be created'))
        }
    }

    update = async (req: Request, res: Response) => {

    }

    delete = async (req: Request<DeleteReq>, res: Response) => {
        const dialogId = req.params.message_id

        try {
            const messageDelete = await MessageModel.findByIdAndDelete(dialogId)

            if (messageDelete) {

                const messages = await MessageModel.find({dialog_id: messageDelete.dialog_id}, {_id: 1}).limit(1).sort({_id: -1})

                const update = {
                    last_message: messages[0]._id
                }

                await DialogModel.findByIdAndUpdate(messageDelete.dialog_id, update)

                res.json(responseApi({}, CodeStatusType.success, 'ok'))
            }

        } catch (err) {
            res.json(responseApi({}, CodeStatusType.error, 'Message cannot be delete'))
        }
    }

    index = async (req: Request, res: Response) => {

    }

    show = async (req: Request<ShowReq>, res: Response) => {
        const dialogId = req.params.dialog_id

        try {
            const data = await MessageModel.find({dialog_id: dialogId})

            res.json(responseApi<any>(data, CodeStatusType.success, 'ok'))
        } catch (err) {
            res.json(responseApi({}, CodeStatusType.error, 'Something went wrong'))
        }
    }
}
