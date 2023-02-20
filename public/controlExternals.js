const MIN_NUMBER_FOR_INPUT_NUMBER = 7

export default class controlExternals {
    constructor({range, father, document}) {
        let element;

        if (range <= 2) {
            element = document.createElement("input");
            element.setAttribute("type", "button");
            element.setAttribute("value", "LIGAR");

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
                })

                other.addEventListener("change", ()=>{
                    element.value = other.value
                })

            }

        }

        father.appendChild(element);

    }
}
