// Core
import {Express} from "express"
// Controllers
import {DialogController} from "../controllers"


const dialogRouter =  (app: Express) => {
    const Dialog = new DialogController()

    app.get('/dialogs', Dialog.show)
    app.post('/dialog/create', Dialog.create)
    app.delete('/dialog/delete/:dialog_id', Dialog.delete)
}

export default dialogRouter