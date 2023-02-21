import { createActuatorModule, listenActiveObjects } from "./createActuatorModule.js"

const socket = io()

socket.on("config", (data)=>{
    data.Actuators.forEach(actuator => {
        createActuatorModule(actuator, document)
    });
    
    document.querySelectorAll(".module > input").forEach( input => {
        input.addEventListener("change", ()=>{
            console.log(input.value)
        })

    } )

    listenActiveObjects((params)=>{ socket.emit("change", params) })

})


