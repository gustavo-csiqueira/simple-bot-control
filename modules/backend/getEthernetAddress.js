import { readFileSync } from 'fs'
import {networkInterfaces} from 'os'

export default function getEthernetAddress(config_path) {
    const configs = JSON.parse(readFileSync(config_path, 'utf-8'))

    const ETHERNET_INTERFACE_NAME = configs["ethernet-interface"];
    const interfaces = networkInterfaces();
    const ethernetInterface = interfaces[ETHERNET_INTERFACE_NAME];

    if(!ethernetInterface) return "127.0.0.1" 

    for (let e of ethernetInterface) {
        if (e["family"] == "IPv4")
            return e["address"];
    }

}
