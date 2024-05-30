const request = require('request');

const openWeatherMap = {
    BASE_URL:"https://api.openweathermap.org/data/2.5/weather?q=",
    SECRET_KEY:"b727dd8f1328b3a45bdfc54cd57e10bc",
};

const weatherData = (address,callback) => {
    const url = openWeatherMap.BASE_URL +
     encodeURIComponent(address)+ 
    "&APPID=" +
     openWeatherMap.SECRET_KEY;
    console.log(url);
     request({url,json:true},(error,data)=>{
        if(error){
            callback(true,"unable to fetch data,please try again" + error)
        }
        callback(false,data?.body);
     });
};

module.exports = weatherData;