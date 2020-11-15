// Core
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
// Controllers
import {UserController, DialogController, MessageController} from './controllers'


// Global const
const app = express()
const port = 8000
// Setting App
app.use(bodyParser.json())
mongoose.connect('mongodb://localhost:27017/socket', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
}).then()

const User = new UserController()
const Dialog = new DialogController()
const Message = new MessageController()

// Users
app.post('/user/register', User.register)
app.post('/user/login', User.login)
app.put('/user', User.update)
app.delete('/user/:id', User.delete)
app.get('/user/:id', User.index)
app.get('/user', User.show)
// Dialog
app.get('/dialogs/:user_id', Dialog.show)
app.post('/dialog/create', Dialog.create)
app.delete('/dialog/delete/:dialog_id', Dialog.delete)
// Message
app.get('/messages/:dialog_id', Message.show)
app.post('/message/create', Message.create)
app.delete('/message/delete/:message_id', Message.delete)

// Log
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
