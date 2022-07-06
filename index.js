//import
let weather
fetch('./weather.json').then(res => res.json()).then(data => {
    weather = data
    renderWeather();
})

const weekDays = ['Sun', 'Mon', "Tue", "Wed","Thu", "Fri", "Sat"]
const yearMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] 


const API_KEY = "db94f9a8947af9eaed69ffec96319ded"

//variabile globale
let cityArray = JSON.parse(localStorage.getItem("city")) || []; //se salveaza in local storeage
let cityList;
let activeCity;
//window functions
window.addEventListener("load", (event) => {
    //functia asta se apeleaza dupa ce se incarca tot
    cityList = document.getElementById("images");
    redrawCities();
    selectCity(cityArray[0]);
    // renderWeatherData(Object.keys(weather)[0])
    document.getElementById("menuSearchInput").addEventListener("keyup", searchCity)
    const date = new Date()
    let day = date.getDay()
    let pDate = document.getElementById("date")
    let dateNr = date.getDate()
    let month = date.getMonth()
pDate.innerText = `${weekDays[day]}, ${dateNr} ${yearMonth[month]} `

    
});
//click function
function submitForm(name) {
    const cityName = name;
    const photo = "https://cdn.pixabay.com/photo/2015/03/11/12/31/buildings-668616_960_720.jpg";
    cityArray.push({ photo: photo, cityName: cityName });
    localStorage.setItem("city", JSON.stringify(cityArray)); //adaug valorile in array
    closeModal(); //inchid modalul
    redrawCities(); //adaug un oras nou
    cityName.value = "";
    photo.value = "";
    let background = document.getElementById("background_image");
    background.style.background = "none";
    imgContent.style.display = "flex";
}
function openModal() {
    let modal = document.getElementById("modal");
    modal.style.display = "flex";
    const inputPhoto = document.getElementById("photoURLinput");
    inputPhoto.addEventListener("input", onInputChange); // pentru a schimba background-ul dupa ce inserez un URL
}
function openPopUs() {
    const img = document.getElementById("popus");
    img.style.maxHeight = "100vh";
    setTimeout(() => { img.style.maxHeight = 0 }, 3000)
    play();
}
function deleteCity() {
    cityArray = cityArray.filter((city) => city.cityName !== activeCity.cityName);
    localStorage.setItem("city", JSON.stringify(cityArray));
    redrawCities();
    selectCity(cityArray[0]);
    cityList.children[0].className = "selected_city";
}
//render functions


function search(e) {
    let remain = cityArray.filter((f) => f.cityName.includes(e.value));
    cityList.innerHTML = "";
    remain.forEach((e) => cityMap(e));
}


function renderWeather() {
    let divP = document.querySelector(".time")
    divP.innerHTML = ""
    Object.keys(weather).forEach((item, key) => {
        let p = document.createElement("p")
        p.textContent = item
        divP.appendChild(p)
        if (key === 0) {
            p.classList = "active"
        }
        p.addEventListener("click", () => {

            renderWeatherData(item)
            const children = divP.children
            for (let i = 0; i < children.length; i++) {
                children[i].className = ""
            }
            p.className = "active"



        })
    })

}


function renderWeatherData(click) {
    const daysCharts = document.getElementById("charts")
    daysCharts.innerHTML = ""
    const data = weather[click]

    const days = data.map(element => element.day)
    const daysDiv = document.createElement("div")
    daysDiv.innerHTML = ""
    days.forEach(daysString => daysDiv.innerHTML += `<p>${daysString}</p>`)
    daysDiv.className = "days_chart"
    daysCharts.appendChild(daysDiv)

    const rainChance = data.map(element => element.rainChance)
    const rainDiv = document.createElement("div")
    rainDiv.innerHTML = ""
    rainChance.forEach(rain => {
        rainDiv.innerHTML += ` <p>${rain}%</p>`
    })
    rainDiv.className = "umidity"
    daysCharts.appendChild(rainDiv)

    const storm = data.map(element => element.day)
    const stormDiv = document.createElement("div")
    stormDiv.innerHTML = ""
    storm.forEach(daysString => {
        const img = document.createElement("img")
        img.src = "src/storm.svg"
        img.alt = "storm"
        stormDiv.appendChild(img)
    })
    stormDiv.className = "storm"
    daysCharts.appendChild(stormDiv)

    const minDegrees = data.map(element => element.minDegrees)
    const minDiv = document.createElement("div")
    minDiv.innerHTML = ""
    minDegrees.forEach(minDegreesString => minDiv.innerHTML += `<p>${minDegreesString}</p>`)
    minDiv.className = "chart_bars"
    daysCharts.appendChild(minDiv)


    const charts = data.map(e => e.minDegrees)
    const chartBar = document.createElement("div")
    chartBar.innerHTML = "";
    charts.forEach(minDegreesString => {
        const chartDiv = document.createElement("div")

        chartDiv.style.paddingBottom = "3px"
        const chartBar1 = document.createElement("div")
        chartBar1.className = "chart_bar"
        const filledChartBar = document.createElement("div")
        filledChartBar.className = "filled_chart_bar";
        filledChartBar.style.width = `${minDegreesString * 3 + 6}%`
        chartDiv.appendChild(chartBar1)
        chartBar1.appendChild(filledChartBar)
        chartBar.appendChild(chartDiv)

    })
    daysCharts.appendChild(chartBar)
    chartBar.className = "chart_bars"

    const maxDegrees = data.map(element => element.maxDegrees)
    const maxDiv = document.createElement("div")
    maxDiv.innerHTML = ""
    maxDegrees.forEach(maxDegreesString => maxDiv.innerHTML += `<p>${maxDegreesString}</p>`)
    maxDiv.className = "chart_bars"
    daysCharts.appendChild(maxDiv)





}


function openModal() {
    let modal = document.getElementById("modal");
    modal.style.display = "flex";
    const inputPhoto = document.getElementById("photoURLinput");
    inputPhoto.addEventListener("input", onInputChange); // pentru a schimba background-ul dupa ce inserez un URL
}

function redrawCities() {
    const cityList = document.getElementById("images");
    cityList.removeChild = ".another_city"; // sterg ultimul copil (div), ca sa nu imi mai dubleze
    // const addCard = document.querySelector(".add");
        cityList.innerHTML = "";
    // cityList.appendChild(addCard); //adaug un copil la add
    cityArray.forEach(cityMap); // aici e for-ul pentru oameni smecheri, care parcurge array-ul prin / cu functia cityMap
}
//functia cityMap pentru array-ul city, unde fac div-ul pentru oras cu imaginea si textul si ii dau clasa "another_city"
function selectCity(city) {
    const location = document.getElementById("location");
    if (city && city.hasOwnProperty("cityName")) {
        location.innerHTML = city.cityName;
        activeCity = city;
    }
}

function cityMap(city) {
    const cityList = document.getElementById("images");
    let cityParent = document.createElement("div");
    cityParent.addEventListener("click", () => {
        selectCity(city); //am functia pentru a selecta un oras
        cityParent.className = "selected_city";
    }); //fac un div
    let img = document.createElement("img"); //ii adaug tag-ul de imagine
    let text = document.createElement("p"); //adaug tagul de text
    img.setAttribute("src", city.photo); //adaug atributul de src in tagul de la img cu imaginea salvata in array
    text.innerHTML = city.cityName; // la fel si la text
    cityParent.appendChild(img);
    cityParent.appendChild(text);
    cityParent.className = "another_city"; // ii dau clasa "another_city"
    const addCard = document.querySelector(".add");
    cityList.insertBefore(cityParent, addCard); //inserez orasul inaintea butonului de add
}

function closeModal() {
    let modal = document.getElementById("modal");
    modal.style.display = "none";
}

function onInputChange(event) {
    const inputPhoto = document.getElementById("photoURLinput");
    let background = document.getElementById("background_image");
    background.style.backgroundImage = `url("${event.target.value}")`; //modific background image cu valoarea la photoInput
    background.style.backgroundSize = "cover";
    background.style.backgroundRepeat = "none";
    let imgContent = document.getElementById("imgContent");
    imgContent.style.display = "none"; //fac sa dispara imaginea de inceput
}

function searchCity(event) {
    if (event.keyCode === 13) {
        const value = document.getElementById("menuSearchInput").value
        fetch("https://api.openweathermap.org/data/2.5/find?q=" + value + "&APPID=" + API_KEY).then(res => res.json()).then(data => {
            recommend(data)


        })
    }
}

function deleteCity() {
    cityArray = cityArray.filter((city) => city.cityName !== activeCity.cityName);
    localStorage.setItem("city", JSON.stringify(cityArray));
    redrawCities();
    selectCity(cityArray[0]);
    cityList.children[0].className = "selected_city";
}

function openRecomends(data) {
    const cityName = document.getElementById("menuSearchInput").value;
    let recomends = document.getElementById("recomends");
    recomends.style.display = "flex";
}

function selectedCityInput(coord, name) {
    const cityName = document.getElementById("menuSearchInput");
    const gif = document.getElementById("_gif")
    gif.classList.add("gif-visible")
    const curentTemp = document.getElementById("currentTemp")
    const celsius = document.getElementById("celsius")
    curentTemp.classList.add("invisible")
    celsius.classList.add("invisible")
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&APPID=${API_KEY}`).then(result => result.json()).then(data => {
        gif.classList.remove("gif-visible")
        curentTemp.classList.remove("invisible")
        celsius.classList.remove("invisible")
        console.log(data);
        removeRecommend();
        const currentTemp = document.getElementById("currentTemp");
        currentTemp.innerHTML = ""
        currentTemp.innerText = Math.floor(data.current.temp - 273)
        const feelsLike = document.getElementById("feelsLike")
        feelsLike.innerHTML = "";
        feelsLike.innerText = `${Math.floor(data.current.feels_like - 273)}°C`
        submitForm(name)
        if(data.current.weather[0].main === "Clear"){
            
        let sunny = document.getElementById("sunny")
        sunny.classList.add("sunny-visible")
        rainy.classList.remove("rainy-visible")
        }
        else
        {
            let rainy = document.getElementById("rainy")
            rainy.classList.add("rainy-visible")
            sunny.classList.remove("sunny-visible")
        }
    })

}
function removeRecommend() {
    let recomends = document.getElementById("recomends");
    recomends.style.display = "none"
}

function recommend(data) {
    // if (e.value === "") {
    //     redrawCities();
    //     removeRecommend();
    //     return;
    // }
    // console.log(e.value);

    let v = data.list;
    let recomends = document.getElementById("recomends");
    recomends.innerHTML = "";
    v.forEach((w) => {
        const recommendP = document.createElement("p");
        recommendP.addEventListener("click", () => { selectedCityInput(w.coord, w.name) })
        recommendP.innerText = w.name;
        recomends.appendChild(recommendP)
    });
}

function renderWeatherContent() {
    const leftCharts = document.getElementById("leftCharts");
    const chart1 = document.getElementById("chart1")
    chart1.style.display = "flex";
    const daysCharts = document.getElementById("daysCHarts");
    daysCharts.appendChild(p);
    const p = document.createElement("p");
    p.textContent = item
    const umidity = document.getElementById("umidity");
    const img = createElement("img");
    img.setAttribute("src", "src/rain_drop.svg");
}

function play() {
    var audio = document.getElementById("audio");
    audio.play();
}

