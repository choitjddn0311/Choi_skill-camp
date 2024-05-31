const photo = document.querySelector("#photo")
const canvas = document.querySelector("#myCanvas")
const ctx = canvas.getContext("2d")
photo.addEventListener("change" , () => {
    photoLoad(photo)  //arrow함수는 this 사용 불가
})
const photoLoad = (photo) => {
    if ( ! photo) return
    if ( ! photo.files) return
    let reader = new FileReader()
    reader.onload = (event) => {
        const src = event.target.result
        const img = new Image()
        img.onload = () => {
            ctx.drawImage(img, 0 , 0 , 500 , 500)
        }
        img.src = src
    }
    reader.readAsDataURL(photo.files[0])
}
let drawing = false
let lastX , lastY
let size = 5

const mouseDown = (e) => {
    drawing = true
    lastX = e.clientX
    lastY = e.clientY
    drawLine(lastx , lastY)
}
const mouseMove = (e) => {
    if (! drawing) return
    drawLine(e.clientX , e.clientY)
}
const mouseUp = (e) => {
    drawing = false
    drawLine(e.clientX , e.clientY)
}
const drawLine = (x , y) => {
    ctx.lineWidth = size
    ctx.beginPath()
    ctx.moveTo(lastX , lastY)
    ctx.lineTo(x, y)
    lastX = x
    lastY = y
    ctx.closePath()
    ctx.strokeStyle = "#000000"
    ctx.stroke()
}

window.onmousedown = mouseDown
window.onmousemove = mouseMove
window.onmouseup = mouseUp