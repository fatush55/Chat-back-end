// Core
import {Express} from "express"
import {messageRouter, userRoute, dialogRouter} from "./index"


const rootRouter =  (app: Express) => {
    userRoute(app)
    dialogRouter(app)
    messageRouter(app)
}

export default rootRouter