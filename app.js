import * as url from 'url'
import express from "express";
import { createServer } from 'http';
import { Server } from 'socket.io';
import boardController from './modules/board-comunication/firmata-connect.js'

const app = express()
const port = 3000
const httpServer = createServer(app)
const io = new Server(httpServer)

const pagesPath = url.fileURLToPath(new URL("./public", import.meta.url))
const configPath = url.fileURLToPath(new URL("config/bots_configs/bot1_config.json", import.meta.url))

const board_controller = new boardController(configPath)

app.use(express.static(pagesPath))

io.on("connection", (socket)=>{
    socket.emit("test")

    socket.on("click", (value)=>{
        board_controller.ledInversion()
    })

})

httpServer.listen(port, ()=>{
    console.log("Listening on http://localhost:3000")
})
