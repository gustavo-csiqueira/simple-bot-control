import johnny_five from "johnny-five"
import getConfigs from "./getConfigs.js";

export default class boardController {
    board; externals={ actuators: new Map, sensors: new Map };config; readAllEmit;

    constructor(config_filepath){
        try{
            this.board = new johnny_five.Board()
            console.log("Board connected")
            
        }catch{
            console.log("No board connected.. Please connect device and restart the application")
            process.exit(1)
    
        }
        
        this.config = getConfigs(config_filepath)

        this.board.on("ready", ()=>{
            const {Sensors} = this.config
            this.configureAll()
            console.log("Board ready")

            Sensors.forEach((data) => {
                const {id, pin, range, type } = data
                const sensor = new johnny_five.Sensor.Digital(pin[0])

                    if(type === "digital-sensor")
                        sensor.on("change", ()=>{
                            const {value} = sensor
                            data.value = value
                            this.emitRead(data)

                        })
                    else {
                        sensor.on("change", ()=>{
                            console.log(sensor.scaleTo(0, range))
                        })
                    }

                /* const servo = new johnny_five.Servo(9)
                servo.sweep()  */


            })
            
        })

    }

    configureAll(){
        const { Actuators, Sensors } = this.config

        const createActuator = {
            led: ({id, pin})=>{
                this.externals.actuators[id] = new johnny_five.Led(pin[0])
            },
            servo: ({id, pin, range})=>{
                this.externals.actuators[id] = new johnny_five.Servo({pin:pin[0], range:[0, range]})
            }

        }

        
        Actuators.forEach(actuator => {
            createActuator[actuator.type](actuator)

        });

    }

    toggle({id, data}){
        try{
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
                    external.to(data, 1000)
                    break;
            
            } 
        }catch{ console.log("ERROR") }
    }

    readAll(cb){
        this.readAllEmit = cb
    }

    emitRead(data){
        if(this.readAllEmit) this.readAllEmit(data)
        
    }
    
}
