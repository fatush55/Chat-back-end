// Core
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
// Controllers
import {UserController, DialogController} from './controllers'


// Global const
const app = express()
const port = 8000
// Setting App
mongoose.connect('mongodb://localhost:27017/socket', {useNewUrlParser: true, useCreateIndex: true}).then()
app.use(bodyParser.json())

const User = new UserController()
const Dialog = new DialogController()

// Users
app.post('/user/register', User.register)
app.post('/user/login', User.login)
app.put('/user', User.update)
app.delete('/user/:id', User.delete)
app.get('/user/:id', User.index)
app.get('/user', User.show)
// Dialog
app.get('/dialog/:id', Dialog.index)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
