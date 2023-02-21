const MIN_NUMBER_FOR_INPUT_NUMBER = 7

export default class controlExternals {
    constructor({range, father, document, emitChange, id}) {
        const ICONS_DIR = "./assets/icons/"
        
        let element;

        if (range <= 2) {

            element = document.createElement("button");
            const powerIcon = document.createElement("img")
            powerIcon.setAttribute("src", `${ICONS_DIR}power_ico.svg`)
            console.log(powerIcon)
            element.appendChild(powerIcon)

            element.addEventListener("click", ()=>{
                emitChange({id, data: -1})
            })

        } else {
            element = document.createElement("input");
            element.setAttribute("type", "range");
            element.setAttribute("min", "0");
            element.setAttribute("max", range);
            element.value = Math.floor(range/2)

            if (range > MIN_NUMBER_FOR_INPUT_NUMBER) {
                const other = document.createElement("input");
                other.setAttribute("type", "number");
                other.setAttribute("min", "0");
                other.setAttribute("max", range);
                other.value = element.value

                father.appendChild(other);

                element.addEventListener("change", ()=>{
                    other.value = element.value
                    emitChange({id, data: element.value})
                })

                other.addEventListener("change", ()=>{
                    element.value = other.value
                    emitChange({id, data: element.value})
                })

            }

        }

        father.appendChild(element);

    }
}
