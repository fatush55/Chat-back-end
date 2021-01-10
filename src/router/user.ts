// Core
import {Express} from "express"
// Controllers
import {UserController} from "../controllers"
// Validation
import {loginValid, registerValid} from '../validation'


const userRouter =  (app: Express) => {
    const User = new UserController()

    app.post('/user/signup', registerValid, User.signup)
    app.post('/user/signin', loginValid, User.signin)
    app.get('/user/identification', User.identification)
    app.get('/user/logout', User.logout)

    app.put('/user', User.update)
    app.delete('/user/:id', User.delete)
    app.get('/user/:id', User.index)
    app.get('/users', User.show)
}

export default userRouter