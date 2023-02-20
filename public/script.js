const socket = io()

const ledButton = document.getElementById("LED")

class controlExternals{
    constructor(range){
        let element

        switch(range){
            case 2:
                element = document.createElement("input")
                element.setAttribute("type", "button")
                element.setAttribute("value", "LIGAR")
                break;
            default:
                element = document.createElement("input")
                element.setAttribute("type", "range")
                element.setAttribute("min", "1")
                element.setAttribute("max", toString(range))
                break;
        }

        return element

    }
}

function createActuatorModule({id, type, label, range}){
    const actuatorModulesGroup = document.getElementById("actuators")

    const actuator_module = document.createElement("div")
    actuator_module.classList.add("module")
    actuator_module.id = id
    actuator_module.name = id
    actuator_module.innerHTML = `<label for=${id}>${label}</label>`

    console.log(range)

    actuatorModulesGroup.appendChild(actuator_module)
    actuator_module.appendChild( new controlExternals(range) )

}

ledButton.addEventListener("click", ()=>{
    console.log("emiting click")
    socket.emit("click", "value")
})

socket.on("config", (data)=>{
    console.log(data)

    createActuatorModule(data.Actuators[0])

})

const teste = 0
