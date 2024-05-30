var weatherApi = "/weather";
const weatherForm = document.querySelector("form");
const search = document.querySelector('input');
const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherConditions');
const temperature = document.querySelector('.temperature span');
const locationElement = document.querySelector('.place');
const dateElement = document.querySelector('.date');

const currentDate = new Date();
const options = {month:"long"};
const monthName = currentDate.toLocaleString("en-US",options);

dateElement.textContent = currentDate.getDate() + " " + monthName;


/*if("geolocation" in navigator){
    locationElement.textContent="Loading...";
    navigator.geolocation.getCurrentPosition(
        function (position){
            const lat=position.coords.latitude;
            const lon=position.coords.longitude;
            const apiurl=`https://nominatim.opensteeetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
            fetch(apiurl)
            .then((response) => response.json())
            .then((data) =>{
                if(data && data.address && data.address.city){
                    const city=data.address.city;
                    showData(city);
                }else{
                    console.log("city not found");
                }
            })
            .catch((error) => {
                console.log(error);
            });
        },
        function (error){
            console.log(error.message);
        }
    );
}else{
    console.log("Geolocation is not available");
}*/

weatherForm.addEventListener("submit",(e) =>{
    e.preventDefault();
   // console.log(search.value);
   locationElement.textContent="Loading...";
   weatherIcon.className="";
   temperature.textContent="";
   weatherCondition.textContent="";
   showData(search.value);
});

function showData(city){
    getWeatherData(city,(result) =>{
        //console.log(result);

        if(result.cod==200){
            if(result.weather[0].description=="rain" || 
                result.weather[0].description=="fog"){
                    weatherIcon.className="wi wi-day-" + result.weather[0].description;
                }
            else{
                weatherIcon.className="wi wi-day-cloudy";
            }
            locationElement.textContent=result?.name;
            temperature.textContent=(result?.main?.temp-273.5).toFixed(2) + String.fromCharCode(176);
            weatherCondition.textContent=result?.weather[0]?.description?.toUpperCase();
        }
        else{
            locationElement.textContent="City Not Found";
        }
    });
}

function getWeatherData(city,callback){
    const locationApi = weatherApi + "?address=" + city;
    fetch(locationApi).then((response) =>{
        response.json().then((response) =>{
            callback(response);
        });
    });
}