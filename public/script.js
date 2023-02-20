import { createActuatorModule } from "./createActuatorModule.js"

const socket = io()

socket.on("config", (data)=>{
    console.log(data)

    data.Actuators.forEach(actuator => {
        createActuatorModule(actuator, document)
    });
    

})

const teste = 0
