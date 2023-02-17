import { readFileSync } from 'fs'

export default function getConfigs(path){
    const configs = JSON.parse(readFileSync(path, 'utf-8'))

    return configs

}