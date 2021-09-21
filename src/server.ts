import express from 'express'
import http from 'http'
import path from 'path'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

io.on('connection', socket => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    });
})

server.listen(3333, () => console.log('server is running'))