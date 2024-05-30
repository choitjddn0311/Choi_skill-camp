const digital = document.querySelector("#digital")
const analog = document.querySelector("#analog")
const weeks = ["일","월","화","수","목","금","토"]

const showDigital = () => {
    let now = new Date()
    let year = now.getFullYear() //연도
    let month = now.getMonth() + 1 //월, 0부터 시작하므로 +1
    let date = now.getDate() //날짜
    let week = now.getDay() //요일(0~6)
    let hour = now.getHours() //시간
    let min = now.getMinutes() //분
    let sec = now.getSeconds() //초
    let mil = now.getMilliseconds() //1000분의 1초, 밀리세컨드
    let week_ko = weeks[week]
    let today = `${year}년 ${month}월 ${date}일(${week_ko}) `
    today += `${hour}:${min}:${sec}.${mil}`
    digital.innerHTML = today
}

analog.width = 500
analog.height = 500
let ctx = analog.getContext("2d")
let r = analog.width/2 //반지름 크기
ctx.translate(r,r) //그리기 시작점을 가운데로 이동
r = r * 0.9

const drawBg = () => {
    let grad //그라데이션 용 변수
    ctx.beginPath() //새로 그리기 시작
    ctx.arc(0, 0, r, 0, 2*Math.PI)
    ctx.fillStyle = "white"
    ctx.fill()
    grad = ctx.createRadialGradient(0,0,r*0.95,0,0,r*1.05)
    grad.addColorStop(0,"#333")
    grad.addColorStop(0.5,"white")
    grad.addColorStop(1,"#333")
    ctx.strokeStyle = grad
    ctx.lineWidth = r*0.1
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(0,0,r*0.1,0,2*Math.PI)
    ctx.fillStyle = "#333"
    ctx.fill()
    let ang
    ctx.beginPath()
    ctx.font = r*0.15 + "px arial"
    ctx.textBaseline = "middle" //위아래 정렬
    ctx.textAlign = "center"//좌우 정렬
    for(num = 1; num<=12; num++) {
        ang = num * Math.PI / 6
        ctx.rotate(ang)
        ctx.translate(0,-r*0.85)
        ctx.rotate(-ang)
        ctx.fillText(num.toString(), 0,0)
        ctx.rotate(ang)
        ctx.translate(0, r*0.85)
        ctx.rotate(-ang)
    }
}

const drawFace = () => {
    drawBg();
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let ms = now.getUTCMilliseconds();
    s += ms/1000;
    h = h % 12; //24시간을 12시간으로 변환
    h = h*Math.PI/6;
    h += m*Math.PI/(6*60);
    h += s*Math.PI/(360*60);
    m = m*Math.PI/30;
    m += s*Math.PI/(30*60);
    s = s*Math.PI/30;
    drawHand(h, r*0.5, r*0.07, "black"); //시침
    drawHand(m, r*0.8, r*0.07 ,"red"); //분침
    drawHand(s, r*0.9, r*0.02, "green"); //초침
}

const drawHand = (pos, l, w, c) => {
    ctx.beginPath()
    ctx.strokeStyle = c
    ctx.lineWidth = w
    ctx.lineCap = "round"
    ctx.moveTo(0,0)
    ctx.rotate(pos)
    ctx.lineTo(0, -l)
    ctx.stroke()
    ctx.rotate(-pos)
}

drawFace()
showDigital()
const timer = setInterval(function(){
    showDigital()
    drawFace()
},1)