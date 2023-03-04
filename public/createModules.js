import controlExternals from "./controlExternals.js";

function createModule({ id, type, label, range }){
    const new_module = document.createElement("div");
    new_module.classList.add("module");
    new_module.id = id;
    new_module.name = id;
    new_module.innerHTML = `<label for=${id}>${label}</label>`;

    return new_module

}

export function createActuatorModule({ id, type, label, range }, document) {
    const actuatorModulesGroup = document.getElementById("actuators");

    const actuator_module = createModule({ id, type, label, range })

    actuatorModulesGroup.appendChild(actuator_module);
    new controlExternals({range, father: actuator_module, document, emitChange, id});

}

export function createSensorModule(data, document) {
    const sensorModulesGroup = document.getElementById("sensors");
    const {type, range} = data

    const sensor_module = createModule(data)

    const statusIndicator = document.createElement("div")
    statusIndicator.classList.add("status-indicator")

    const statusIndicatorChange = {
        on: ()=>{

        },
        off: ()=>{
            
        }
    }

    sensor_module.appendChild(statusIndicator)

    sensorModulesGroup.appendChild(sensor_module);

}

const listeners = new Set

function emitChange(params){
    listeners.forEach( listener => { listener(params) } )
}

export function listenActiveObjects(cb){
    listeners.add(cb)
}
