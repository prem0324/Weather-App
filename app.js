// const cityName=document.querySelector("input");
// const search=document.querySelector("button");
// let weatherIcon=document.querySelector(".weather img")
// const apiKey="630a88d0b00f65ad66a150d4967dd6fb";
// search.addEventListener("click",()=>{
//   const cityValue=cityName.value;
//   fetchApi(cityValue);
// },false)

// async function fetchApi(cityValue){
//     const data=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=630a88d0b00f65ad66a150d4967dd6fb`)  

//     let response=await data.json();
//     console.log(response);
//     console.log(response.cod);
//     if(response.cod==400){
//       document.querySelector("#error").style.display="block"
//       document.querySelector("#error").innerHTML="City Not Found"
//       document.querySelector(".downContent").style.display="none";
//       }
//       else{

//    if(response.weather[0].main==="Rain"){
//           weatherIcon.src="images/rain.png"
//    }
//    else if(response.weather[0].main==="Clouds"){
//        weatherIcon.src="images/clouds.png"
//    }
//    else if(response.weather[0].main==="Drizzle"){
//      weatherIcon.src="images/drizzle.png"
//    }
//    else if(response.weather[0].main==="Mist"){
//      weatherIcon.src="images/mist.png"
//    } 
//    else if(response.weather[0].main==="Clear"){
//      weatherIcon.src="images/clear.png"
//   }
//   else if(response.weather[0].main==="Snow"){
//     weatherIcon.src="images/snow.png"
//  }
//  document.querySelector("#error").style.display="none"

//   document.querySelector(".downContent").style.display="block";
//     document.querySelector(".weather h2").innerHTML=Math.round(response.main.temp - 273.15) + "°C"
//     document.querySelector(".weather h1").innerHTML=response.name;

//     document.querySelector(".humidity h2").innerHTML=`${response.main.humidity} %`
//     document.querySelector(".speed h2").innerHTML=response.wind.speed +" KM/H";
//       }
// }
const cityName = document.querySelector("input");
const search = document.querySelector("button");
let weatherIcon = document.querySelector(".weather img");
const apiKey = "630a88d0b00f65ad66a150d4967dd6fb";

search.addEventListener("click", () => {
    const cityValue = cityName.value;
    fetchApi(cityValue);
}, false);

async function fetchApi(cityValue) {
    try {
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}`);
        const response = await data.json();

        if (response.cod === "400") {
            handleCityNotFoundError();
        } else {
            handleWeatherData(response);
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        handleApiError();
    }
}

function handleCityNotFoundError() {
    document.querySelector("#error").style.display = "block";
    document.querySelector("#error").innerHTML = "City Not Found";
    document.querySelector(".downContent").style.display = "none";
}

function handleWeatherData(response) {
    const weatherMain = response.weather[0].main.toLowerCase();
    setWeatherIcon(weatherMain);

    document.querySelector("#error").style.display = "none";
    document.querySelector(".downContent").style.display = "block";
    document.querySelector(".weather h2").innerHTML = Math.round(response.main.temp - 273.15) + "°C";
    document.querySelector(".weather h1").innerHTML = response.name;
    document.querySelector(".humidity h2").innerHTML = `${response.main.humidity} %`;
    document.querySelector(".speed h2").innerHTML = response.wind.speed + " KM/H";
}

function setWeatherIcon(weatherMain) {
    const iconMap = {
        rain: "images/rain.png",
        clouds: "images/clouds.png",
        drizzle: "images/drizzle.png",
        mist: "images/mist.png",
        clear: "images/clear.png",
        snow: "images/snow.png",
    };

    weatherIcon.src = iconMap[weatherMain] || "images/default.png";
}

function handleApiError() {
    document.querySelector("#error").style.display = "block";
    document.querySelector("#error").innerHTML = "Error fetching weather data";
    document.querySelector(".downContent").style.display = "none";
}
