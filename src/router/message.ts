// Core
import {Express} from "express"
// Controllers
import {MessageController} from "../controllers"


const messageRouter =  (app: Express) => {
    const Message = new MessageController()

    app.get('/messages/:dialog_id', Message.show)
    app.post('/message/create', Message.create)
    app.delete('/message/delete/:message_id', Message.delete)
}

export default messageRouter