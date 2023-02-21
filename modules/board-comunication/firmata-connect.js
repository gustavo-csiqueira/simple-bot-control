import johnny_five from "johnny-five"
import getConfigs from "./getConfigs.js";

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
        const { Actuators, Sensors } = this.config

        console.log(Actuators)

        const createActuator = {
            led: ({id, pin})=>{
                this.externals.actuators[id] = new johnny_five.Led(pin[0])
            },
            servo: ({id, pin})=>{
                this.externals.actuators[id] = new johnny_five.Servo(pin[0])
            }

        }
        
        Actuators.forEach(actuator => {
            createActuator[actuator.type](actuator)
            this.id = actuator.id
        });

    }

    toggle({id, data}){
        const external = this.externals.actuators[this.id]
        let type;

        this.config.Actuators.forEach(({id: ID, type: TYPE}) => {
            if(id === ID){
                type = TYPE
                
            }
        })

        console.log(`ID: ${id} - TYPE: ${type} - DATA: ${data}`)
        this.externals.actuators[this.id].toggle()

        switch(type) {
            case "led":
                console.log("ok")
                // this.externals.actuators[this.id].on()
                break;
        
        } 
    }
    
}
