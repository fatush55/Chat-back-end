// Core
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import {config} from './config'
// Middleware
import {updateLastSeen, checkJWT} from './middleware'
// Router
import {userRoute, dialogRouter, messageRouter} from './router'


const app = express()
const {PORT} = config
// Setting App
app.use(bodyParser.json())
app.use(checkJWT)
app.use(updateLastSeen)
mongoose.connect('mongodb://localhost:27017/socket', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
}).then()
// Router
userRoute(app)
dialogRouter(app)
messageRouter(app)
// Log
app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))
