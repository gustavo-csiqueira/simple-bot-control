import johnny_five from "johnny-five"
import getConfigs from "./getConfigs.js";

export default class boardController {
    board; actuators = new Map;

    constructor(config_filepath){
        try{
            this.board = new johnny_five.Board()
            console.log("Board connected")
            
        }catch{
            console.log("Board not connected")
        }
        
        console.log(getConfigs(config_filepath))

        this.board.on("ready", ()=>{
            console.log("Board ready")
            this.actuators['led'] = new johnny_five.Led(13)

        })

    }

    ledInversion(){
        this.actuators.led.toggle()

    }
    
}
