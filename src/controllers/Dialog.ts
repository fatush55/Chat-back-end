// Models
import {DialogModel, MessageModel} from '../models'
// Utils
import {responseApi, setErrorMongoose} from "../utils"
// Types
import {Response, Request} from 'express'
import {CodeStatusType} from '../types/app-type'
import {DialogType, DeleteReq, ShowReq} from '../types/dialog-type'
import {MessageType} from '../types/message-type'


export default class Dialog {
    create = async (req: Request, res: Response) => {
        // Create Dialog
        const dataReqDialog = {
            admin_id: req.body.admin_id,
            users_id: [req.body.admin_id, req.body.user_id],
        } as DialogType

        const dialog = new DialogModel(dataReqDialog)

        try {
            const dialogSave = await dialog.save()
            // Create Message
            const dataReqMessage = {
                text: req.body.text,
                user_id: req.body.admin_id,
                dialog_id: dialogSave._id,
            } as MessageType

            const message = new MessageModel(dataReqMessage)

            try {
                const messageSave = await message.save()
                // Update Dialog
                const dataReqDialogUpdate = {
                    last_message: messageSave._id
                } as DialogType

                try {
                    const dialogUpdate = await DialogModel
                        .findByIdAndUpdate(dialog._id, dataReqDialogUpdate)
                        .populate(["admin_id", "users_id"])

                    res.json(responseApi<any>(dialogUpdate, CodeStatusType.success, 'ok'))
                } catch (err) {
                    await DialogModel.findByIdAndDelete(dialogSave._id)
                    await MessageModel.findByIdAndDelete(messageSave._id)

                    res.json(responseApi({}, CodeStatusType.error, 'Dialogue cannot be update'))
                }

            } catch (err) {
                await DialogModel.findByIdAndDelete(dialogSave._id)

                res.json(responseApi({}, CodeStatusType.error, 'Message cannot be created'))
            }

        } catch (err) {

            res.json(responseApi({}, CodeStatusType.error, 'Dialogue cannot be created'))
        }
    }

    update = async (req: Request, res: Response) => {

    }

    delete = async (req: Request<DeleteReq>, res: Response) => {
        const dialogId = req.params.dialog_id

        try {
            const dialog = await DialogModel.findByIdAndDelete(dialogId)

            if (dialog) {
                try {
                    await MessageModel.deleteMany({dialog_id: dialog._id})

                    res.json(responseApi({}, CodeStatusType.success, 'ok'))
                } catch (err) {
                    res.json(responseApi({}, CodeStatusType.error, 'Dialogues cannot be delete'))
                }
            }

        } catch (err) {
            res.json(responseApi({}, CodeStatusType.error, 'Dialog not found'))
        }
    }

    index = async (req: Request, res: Response) => {

    }

    show = async (req: Request<ShowReq>, res: Response) => {
        const userId = req.params.user_id
        try {
            const data = await DialogModel
                .find({users_id: {$elemMatch: {$eq: userId}}}, {"users_id]": 0})
                .populate(["admin_id", "users_id", "last_message"])

            res.json(responseApi<any>(data, CodeStatusType.success, 'ok'))
        } catch (err) {
            res.json(responseApi({}, CodeStatusType.error, 'Something went wrong'))
        }
    }
}
