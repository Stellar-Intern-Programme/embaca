const API_KEY = "7e8889844b730f765a9bb5d4b0a15698"

function searchCity() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Iasi&APPID=" + API_KEY).then(res => res.json()).then(data => console.log(data))


}
let weather;
fetch('./weather.json').then(res => res.json()).then(data => {
    weather = data
    renderWeather();
})
function renderWeather() {
    let divP = document.querySelector(".time")
    divP.innerHTML = ""
    Object.keys(weather).forEach((item) => {
        let p = document.createElement("p")
        p.textContent = item
        divP.appendChild(p)
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
        rainDiv.innerHTML += ` <div class="procent"><img src="src/rain_drop.svg" alt="umidity"><p>${rain}%</p>
</div>` })
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

let cityArray = JSON.parse(localStorage.getItem("city")) || []; //se salveaza in local storeage
let cityList;
let activeCity;
window.addEventListener("load", (event) => {
    //functia asta se apeleaza dupa ce se incarca tot
    cityList = document.getElementById("images");
    redrawCities();
    selectCity(cityArray[0]);
    renderWeather()
});

function openModal() {
    let modal = document.getElementById("modal");
    modal.style.display = "flex";
    const inputPhoto = document.getElementById("photoURLinput");
    inputPhoto.addEventListener("input", onInputChange); // pentru a schimba background-ul dupa ce inserez un URL
}

function submitForm() {
    const cityName = document.getElementById("searchInput");
    const photo = document.getElementById("photoURLinput");
    cityArray.push({ photo: photo.value, cityName: cityName.value });
    localStorage.setItem("city", JSON.stringify(cityArray)); //adaug valorile in array
    closeModal(); //inchid modalul
    redrawCities(); //adaug un oras nou
    cityName.value = "";
    photo.value = "";
    let background = document.getElementById("background_image");
    background.style.background = "none";
    imgContent.style.display = "flex";
}

function redrawCities() {
    const cityList = document.getElementById("images");
    cityList.removeChild = ".another_city"; // sterg ultimul copil (div), ca sa nu imi mai dubleze
    const addCard = document.querySelector(".add");
    cityList.innerHTML = "";
    cityList.appendChild(addCard); //adaug un copil la add
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
    console.log(event);
}

function deleteCity() {
    cityArray = cityArray.filter((city) => city.cityName !== activeCity.cityName);
    console.log(cityArray, activeCity);
    localStorage.setItem("city", JSON.stringify(cityArray));
    redrawCities();
    selectCity(cityArray[0]);
    cityList.children[0].className = "selected_city";
}

function openRecomends() {
    let recomends = document.getElementById("recomends");
    recomends.style.display = "flex";
}

function selectedCityInput(element) {
    const cityName = document.getElementById("menuSearchInput");
    console.log(cityName);
    cityName.value = element.innerText;
    console.log(element.innerText);
    removeRecommend();
    search(cityName);
}
function removeRecommend() {
    let recomends = document.getElementById("recomends");
    recomends.style.display = "none";
}

function recommend(e) {
    if (e.value === "") {
        redrawCities();
        removeRecommend();
        return;
    }
    console.log(e.value);
    let v = cityArray.filter((q) => q.cityName.toLowerCase().includes(e.value));
    console.log(v);
    let recomends = document.getElementById("recomends");
    recomends.innerHTML = "";
    v.forEach((w) => {
        recomends.innerHTML += `<p onclick="selectedCityInput(this)">${w.cityName}</p>`;
    });
}

function search(e) {
    let remain = cityArray.filter((f) => f.cityName.includes(e.value));
    console.log(remain);
    cityList.innerHTML = "";

    remain.forEach((e) => cityMap(e));
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
function openPopUs() {
    const img = document.getElementById("popus");
    img.style.maxHeight = "100vh";
    setTimeout(() => { img.style.maxHeight = 0 }, 7000)
    play();
}
function play() {
    var audio = document.getElementById("audio");
    audio.play();
}