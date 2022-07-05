// constante globale


const API_KEY = "db94f9a8947af9eaed69ffec96319ded"

// window events (load, keypress, etc)


// functii la enter

// functii la onclick
function search() {
    fetch("https://openweathermap.org/data/2.5/find?q="+ input.value + "&appid=" + API_KEY).then((res)=>{
        // request cu textul introdus
        // afisare de sugestii
        // la press pe o sugestie -> add city
    })
   
}

