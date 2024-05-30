const map = document.querySelector("#map")
const cityName = document.querySelector("#cityName")
const cityInfo = document.querySelector("#cityInfo")
const Info = document.querySelector("#info")
const cityAbout = document.querySelector("#cityAbout")
let cityData = {}
fetch("korea.json") // json파일 불러오기
    .then(response => response.json()) // json으로 변환
    .then(data => {
        cityData = data.korea.city.reduce((acc,city) => {
            acc[city.id] = city
            return acc
        } , {})
    }) //데이터로 받기
map,addEventListener("load" , () => {
    const doc = map.contentDocument
    const svg = doc.documentElement

    //도시 아이디 즉 json에 있는 id가 alert창으로 출력됨
    svg.addEventListener("click" , event => {
        const target = event.target
        const id = target.id
        // alert(id)
        if(id && cityData[id]) {
            const city =cityData[id]
            // console.log(city)
            cityName.innerHTML = `${city.name_ko} ${city.name_en}`
            cityInfo.innerHTML = `<h3>${city.name_full}</h3>`
            Info.innerHTML = `<p>${city.info}</p>`
            cityAbout.innerHTML = `
            <p>${city.name_en} city area : ${city.area}</p>
            <p>${city.name_en} city people : ${city.population}</p>
            `
        }
    })
})