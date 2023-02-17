import johnny_five from "johnny-five"

class boardController {
    board; actuators = new Map;

    constructor(config_file){
        try{
            this.board = new johnny_five.Board()
            console.log("Board connected")
        }catch{
            console.log("Board not connected")
        }
        

        this.board.on("ready", ()=>{
            console.log("Board ready")
            this.actuators['led'] = new johnny_five.Led(13)

        })

    }

    ledInversion(){
        this.actuators.led.toggle()

    }
    
}

export default board_controller;
