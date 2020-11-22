// Core
import {Express} from "express"
// Controllers
import {UserController} from "../controllers"
// Validation
import {loginValid, registerValid} from '../validation'


const userRouter =  (app: Express) => {
    const User = new UserController()
    app.post('/user/register', registerValid, User.register)
    app.post('/user/login', loginValid, User.login)
    app.put('/user', User.update)
    app.delete('/user/:id', User.delete)
    app.get('/user/:id', User.index)
    app.get('/user', User.show)
}

export default userRouter