import * as url from 'url'
import express from "express";
import { createServer } from 'http';
import { Server } from 'socket.io';
import boardController from './modules/board-comunication/firmata-connect.js'
import getConfigs from './modules/board-comunication/getConfigs.js';
import getEthernetAddress from './modules/backend/getEthernetAddress.js';

const address = getEthernetAddress()
const port = 2999

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

const pagesPath = url.fileURLToPath(new URL("./public", import.meta.url))
const configPath = url.fileURLToPath(new URL("config/bots_configs/bot1_config.json", import.meta.url))

const board_controller = new boardController(configPath)

app.use(express.static(pagesPath))

io.on("connection", (socket)=>{
    socket.emit("config", getConfigs(configPath))

    socket.on("change", (data)=>{
        board_controller.toggle(data)
    })

})

httpServer.listen(port, address, ()=>{
    console.log(`Listening on http://${address}:${port}`)
})
