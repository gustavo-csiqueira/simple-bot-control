import * as url from 'url'
import express from "express";
import { createServer } from 'http';
import { Server } from 'socket.io';
import boardController from './modules/board-comunication/firmata-connect.js'
import getConfigs from './modules/board-comunication/getConfigs.js';

const app = express()
const port = 2999
const httpServer = createServer(app)
const io = new Server(httpServer)

const pagesPath = url.fileURLToPath(new URL("./public", import.meta.url))
const configPath = url.fileURLToPath(new URL("config/bots_configs/bot1_config.json", import.meta.url))

const board_controller = new boardController(configPath)

app.use(express.static(pagesPath))

io.on("connection", (socket)=>{
    socket.emit("config", getConfigs(configPath))

    socket.on("alter", (value)=>{
        board_controller.toggleLed()
    })

})

httpServer.listen(port, ()=>{
    console.log("Listening on http://localhost:3000")
})
