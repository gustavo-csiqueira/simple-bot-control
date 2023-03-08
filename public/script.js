import { createActuatorModule, createSensorModule, listenActiveObjects } from "./createModules.js"

const socket = io()

socket.on("config", (data)=>{
    document.querySelectorAll(".modules-group").forEach(moduleGroup => { moduleGroup.innerHTML = "" })

    data.Actuators.forEach(actuator => {
        createActuatorModule(actuator, document)
    });

    data.Sensors.forEach(sensor => {
        createSensorModule(sensor, document)
    });
    
    document.querySelectorAll(".module > input").forEach( input => {
        input.addEventListener("change", ()=>{
            console.log(input.value)
        })

    } )

    listenActiveObjects((params)=>{ socket.emit("change", params) })

})

socket.on("change-sensor", ({id, type, value}) => {
    const status = document.getElementById(id).querySelector(".status-indicator")

    const statusIndicatorChange = {
        "digital-sensor": ()=>{
            if(value === 1){
                status.style.backgroundColor = "rgb(0, 196, 0)"
                status.textContent = "ATIVO"

            }else {
                status.style.backgroundColor = "rgb(255, 47, 47)"
                status.textContent = "INATIVO"
            }
        },
        "analog-sensor": ()=>{
            
        }
    }

    statusIndicatorChange[type]()

})
