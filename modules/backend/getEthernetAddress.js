import {networkInterfaces} from 'os'

export default function getEthernetAddress() {
    const ETHERNET_INTERFACE_NAME = "enp2s0";
    const interfaces = networkInterfaces();
    const ethernetInterface = interfaces[ETHERNET_INTERFACE_NAME];

    if(!ethernetInterface) return "127.0.0.1"

    for (let e of ethernetInterface) {
        if (e["family"] == "IPv4")
            return e["address"];
    }

}
