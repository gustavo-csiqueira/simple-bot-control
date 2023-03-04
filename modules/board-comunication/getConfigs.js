import { readFileSync, writeFileSync } from 'fs'
import { v4 as uuid_v4 } from 'uuid';

export default function getConfigs(path){
    const configs = JSON.parse(readFileSync(path, 'utf-8'))

    configs.Actuators.forEach(actuator => {
        if(!actuator.range) actuator.range = 2;

        if(!actuator.id) actuator.id = uuid_v4();

    });

    configs.Sensors.forEach(sensor => {
        if(!sensor.range) sensor.range = 100;

        if(!sensor.id) sensor.id = uuid_v4();

    });

    const newContent = JSON.stringify(configs)

    writeFileSync(path, newContent)

    return configs

}