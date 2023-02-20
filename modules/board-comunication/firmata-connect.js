import johnny_five from "johnny-five"
import getConfigs from "./getConfigs.js";
import {v4 as uuidV4} from "uuid"

export default class boardController {
    board; externals={ actuators: new Map, sensors: new Map };config;

    constructor(config_filepath){
        try{
            this.board = new johnny_five.Board()
            console.log("Board connected")
            
        }catch{
            console.log("Board not connected")
        }
        
        this.config = getConfigs(config_filepath)

        this.board.on("ready", ()=>{
            this.configureAll()
            console.log("Board ready")
            

        })

    }

    configureAll(){
        const { Actuators: actuators, sensors } = this.config

        console.log(actuators)

        const createActuator = {
            led: ({id, pin})=>{
                this.externals.actuators[id] = new johnny_five.Led(pin[0])
            },
            servo: ({id, pin})=>{
                this.externals.actuators[id] = new johnny_five.Servo(pin[0])
            }

        }
        
        actuators.forEach(actuator => {
            createActuator[actuator.type](actuator)
            this.id = actuator.id
        });

    }

    toggleLed(){
        this.externals.actuators[this.id].toggle()
    }
    
}
