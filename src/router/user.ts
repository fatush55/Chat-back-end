// Core
import {Express} from "express"
// Controllers
import {UserController} from "../controllers"


const userRouter =  (app: Express) => {
    const User = new UserController()

    app.post('/user/register', User.register)
    app.post('/user/login', User.login)
    app.put('/user', User.update)
    app.delete('/user/:id', User.delete)
    app.get('/user/:id', User.index)
    app.get('/user', User.show)
}

export default userRouter