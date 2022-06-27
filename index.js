const cityArray = [];

function openModal() {
    let modal = document.getElementById("modal")
    modal.style.display = "flex";
    const inputPhoto = document.getElementById("photoURLinput");
    inputPhoto.addEventListener("change", onInputChange)
}

function submitForm() {
    const cityName = document.getElementById("searchInput").value;
    const photo = document.getElementById("photoURLinput").value;
    cityArray.push({ photo, cityName })
    closeModal();
    console.log(cityArray);
    redrawCities();
}

function redrawCities() {
    const cityList = document.getElementById("images")
    cityList.innerHTML = ""
    cityArray.forEach(cityMap)
}

function cityMap(city) {
    const cityList = document.getElementById("images")
    let cityParent = document.createElement("div");
    let img = document.createElement("img");
    let text = document.createElement("p");
    img.setAttribute("src", city.photo);
    text.innerHTML = city.cityName;
    cityParent.appendChild(img)
    cityParent.appendChild(text)
    cityParent.className = "another_city"
    const addCard = document.querySelector(".add")

    cityList.insertBefore(cityParent, addCard)

}

function closeModal() {
    let modal = document.getElementById("modal")
    modal.style.display = "none";
}

function onInputChange(event) {
    let background = document.getElementById("background_image");
    background.style.backgroundImage = `url("${inputPhoto.value}")`;
    background.style.backgroundSize = "cover";
    background.style.backgroundRepeat = "none";
    let imgContent = document.getElementById("imgContent");
    imgContent.style.display = "none";
    console.log(event)
}