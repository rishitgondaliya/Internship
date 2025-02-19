// generate a random color

const randomColor = function(){
    const hex = '0123456789ABCDEF'
    let color = '#'
    for(let i = 0; i < 6; i++){
        color += hex[Math.floor(Math.random() * 16)]
    }
    return color
}
let id

const startChangingColor = function() {
    if(!id){
        id = setInterval(change, 1000)
    }
    function change() {
        let color = randomColor()
        document.body.style.backgroundColor = color
        console.log("color : " ,color)
    }
}

const stopChangingColor = function(){
    clearInterval(id)
    id = null
    console.log("STOPPED")
}

document.getElementById('start').addEventListener('click', startChangingColor)

document.getElementById('stop').addEventListener('click', stopChangingColor)