const cityArray = JSON.parse(localStorage.getItem("city")) || []; //se salveaza in local storeage
let cityList;
window.addEventListener('load', event => { //functia asta se apeleaza dupa ce se incarca tot
    cityList = document.getElementById("images")
    redrawCities();
    selectCity(cityArray[0]);
})

function openModal() {
    let modal = document.getElementById("modal")
    modal.style.display = "flex";
    const inputPhoto = document.getElementById("photoURLinput");
    inputPhoto.addEventListener("input", onInputChange) // pentru a schimba background-ul dupa ce inserez un URL
}

function submitForm() {
    const cityName = document.getElementById("searchInput");
    const photo = document.getElementById("photoURLinput");
    cityArray.push({ photo: photo.value, cityName: cityName.value })
    localStorage.setItem('city', JSON.stringify(cityArray)); //adaug valorile in array
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
    cityList.removeChild = (".another_city") // sterg ultimul copil (div), ca sa nu imi mai dubleze
    const addCard = document.querySelector(".add")
    cityList.innerHTML = "";
    cityList.appendChild(addCard) //adaug un copil la add
    cityArray.forEach(cityMap) // aici e for-ul pentru oameni smecheri, care parcurge array-ul prin / cu functia cityMap
}
//functia cityMap pentru array-ul city, unde fac div-ul pentru oras cu imaginea si textul si ii dau clasa "another_city"
function selectCity(city) {
    const location = document.getElementById("location")
    location.innerHTML = city.cityName;


}

function cityMap(city) {
    const cityList = document.getElementById("images");
    let cityParent = document.createElement("div");
    cityParent.addEventListener("click", () => {
            selectCity(city); //am functia pentru a selecta un oras
            cityParent.className = "selected_city"
        }) //fac un div
    let img = document.createElement("img"); //ii adaug tag-ul de imagine
    let text = document.createElement("p"); //adaug tagul de text
    img.setAttribute("src", city.photo); //adaug atributul de src in tagul de la img cu imaginea salvata in array
    text.innerHTML = city.cityName; // la fel si la text
    cityParent.appendChild(img)
    cityParent.appendChild(text)
    cityParent.className = "another_city" // ii dau clasa "another_city"
    const addCard = document.querySelector(".add")
    cityList.insertBefore(cityParent, addCard) //inserez orasul inaintea butonului de add

}

function closeModal() {
    let modal = document.getElementById("modal")
    modal.style.display = "none";
}

function onInputChange(event) {
    let background = document.getElementById("background_image");
    background.style.backgroundImage = `url("${event.target.value}")`; //modific background image cu valoarea la photoInput
    background.style.backgroundSize = "cover";
    background.style.backgroundRepeat = "none";
    let imgContent = document.getElementById("imgContent");
    imgContent.style.display = "none"; //fac sa dispara imaginea de inceput
    console.log(event)
}