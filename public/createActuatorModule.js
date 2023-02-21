import controlExternals from "./controlExternals.js";

export function createActuatorModule({ id, type, label, range }, document) {
    const actuatorModulesGroup = document.getElementById("actuators");

    const actuator_module = document.createElement("div");
    actuator_module.classList.add("module");
    actuator_module.id = id;
    actuator_module.name = id;
    actuator_module.innerHTML = `<label for=${id}>${label}</label>`;

    actuatorModulesGroup.appendChild(actuator_module);
    new controlExternals({range, father: actuator_module, document, emitChange, id});

}

const listeners = new Set

function emitChange(params){
    listeners.forEach( listener => { listener(params) } )
}

export function listenActiveObjects(cb){
    listeners.add(cb)
}
