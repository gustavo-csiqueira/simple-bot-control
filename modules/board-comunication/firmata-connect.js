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
            const {Sensors} = this.config
            this.configureAll()
            console.log("Board ready")

            Sensors.forEach(({pin, range, type }) => {
                const sensor = new johnny_five.Sensor.Digital(pin[0])

                    if(type === "digital-sensor")
                        sensor.on("change", ()=>{
                            console.log(sensor.value)
                        })
                    else {
                        sensor.on("change", ()=>{
                            console.log(sensor.scaleTo(0, range))
                        })
                    }
            })
            
        })

    }

    configureAll(){
        const { Actuators, Sensors } = this.config

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

        });

    }

    toggle({id, data}){
        const external = this.externals.actuators[id]
        let type;

        this.config.Actuators.forEach(({id: ID, type: TYPE}) => {
            if(id === ID){
                type = TYPE
                
            }
        })

        console.log(`ID: ${id} - TYPE: ${type} - DATA: ${data}`)

        switch(type) {
            case "led":
                external.toggle()
                break;
            case "servo":
                external.to(data)
                break;
        
        } 
    }

    readAll(cb){
        this.readAllEmit = cb
    }

    emitRead(data){
        //if(this.readAllEmit) this.readAllEmit(data)
        
    }
    
}
