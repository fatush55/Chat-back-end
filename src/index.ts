// Core
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import {createServer} from 'http'
import socket from 'socket.io'
import cors from 'cors'
import {config} from './config'
// Middleware
import {updateLastSeen, checkJWT} from './middleware'
// Router
import {rootRouter} from './router'


const app = express()
const http = createServer(app)
// @ts-ignore
const io = socket(http)
const {PORT} = config
// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(checkJWT)
app.use(updateLastSeen)
// Db
mongoose.connect('mongodb://localhost:27017/socket', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
}).then()
// Router
rootRouter(app)

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket: any) => {
    // console.log(socket)
    console.log('socket connected');

    socket.on('disconnect', () => {
        console.log('socket disconnected');
    });
});

// Log
http.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`, `http://localhost:${PORT}/index`))
