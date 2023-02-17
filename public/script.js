const socket = io()

const ledButton = document.getElementById("LED")

ledButton.addEventListener("click", ()=>{
    console.log("emiting click")
    socket.emit("click", "value")
})

socket.on("test", ()=>{
    alert("test")
})
