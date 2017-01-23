$(document).ready(function(){ 

 getLocation();

        $("#button").on("click",function(){
            getLocation();
        });

        $("#posicao").on("click",function(){
            getLocation();
        });

});


var images = {
    "rain" : "http://www.milligazete.com.tr/img/yurtta_hava_durumu_22_eylul_2016_2292016411.jpg",
    "clouds" : "http://1.bp.blogspot.com/-hsMupvyhgY0/UQ-5DDlTaRI/AAAAAAAASUI/CsQ5PC0mN5M/s1600/Sky+Paos+and+Wallpapers+03.jpgg",
    "clear" : "http://maxpixel.freegreatpicture.com/static/photo/1x/Clear-Sky-Cloudscape-Sun-Sunlight-Halo-Blue-Sky-299765.jpg"
    };
var lat = 0;
var long = 0;
var dados = {};
// var dados =
//     { "coord": { "lon": -46.88, "lat": -23.19 }, "weather": [ { "id": 803, "main": "Clouds", "description": "nuvens quebrados", "icon": "04d" } ], "base": "stations", "main": { "temp": 24.46, "pressure": 1019, "humidity": 57, "temp_min": 24, "temp_max": 25 }, "visibility": 10000, "wind": { "speed": 0.17, "deg": 29.5038 }, "clouds": { "all": 75 }, "dt": 1484935200, "sys": { "type": 1, "id": 4521, "message": 0.0343, "country": "BR", "sunrise": 1484901556, "sunset": 1484949493 }, "id": 3459462, "name": "Jundiai", "cod": 200 }
    

function doDesign(forecast){
    dados = forecast;
    console.log(forecast);
    // switch(forecast.weather[0].main.toLowerCase()){
    //     case "rain":
    //         $(".forecast").css("background",'url("' + images.rain + '") no-repeat');
    //         break;
    //     case "clouds":
    //         $(".forecast").css("background",'url("' + images.clouds + '") no-repeat');
    //         break;
    //     case "clear":
    //         $(".forecast").css("background",'url("' + images.rain + '") no-repeat');
    //         break;
    //     case "rain":
    //         $(".forecast").css("background",'url("' + images.rain + '") no-repeat');
    //         break;
    //     case "rain":
    //         $(".forecast").css("background",'url("' + images.rain + '") no-repeat');
    //         break;
    //     default:
    //         $(".forecast").css("background",'url("' + images.rain + '") no-repeat');
    //         break;
    // }
  $(".forecast-weather-main").text(forecast.weather[0].main);
  $(".forecast-weather-description").text("Weather condition: " + forecast.weather[0].description);
  $(".icon").remove();
  $(".forecast-box").append('<img src="http://openweathermap.org/img/w/' + forecast.weather[0].icon + '.png" class="icon">');
  $(".forecast-main-temp").text(forecast.main.temp.toPrecision(3)).append('<span  onclick="changeMetric()"> °C </span>');
  $(".forecast-main-temp-min-max").text( forecast.main.temp_min.toPrecision(3) + " °C Min. / " + forecast.main.temp_max.toPrecision(3) + " °C Max.");
  $(".forecast-main-pressure").text("Atmospheric pressure: " + forecast.main.pressure + " hPa");
  $(".forecast-main-humidity").text("Humidity: " + forecast.main.humidity + "%");
  $(".forecast-wind-speed").text("Wind speed: " + forecast.wind.speed + " meter/sec");
  $(".forecast-wind-deg").text("Wind direction: " + forecast.wind.deg + " degrees");
  $(".forecast-clouds").text("Cloudiness: " + forecast.clouds.all + "%");
  $(".forecast-city-country").text(forecast.name + ", " + forecast.sys.country);
  $(".forecast-name").text();
 }

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLocationByBrowser, getLocationByIPAdress());
    } else { 
        getLocationByIPAdress();
    }
}

function getLocationByIPAdress(){
  
     $.getJSON("http://ip-api.com/json/?callback=?",function(json){
           if(json.length===0){
               alert();
            }
         lat = json.lat;
         long= json.lon;
         getForecast();
       });
}

function getLocationByBrowser(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;   
    getForecast();
}

function getForecast(){

    var key = "aceed1465e2345f7d271628c122b4693";
    var myUrl = "http://api.openweathermap.org/data/2.5/weather?lat={LAT}&lon={LONG}&APPID={APIKEY}&lang=en".replace("{APIKEY}", key);
    myUrl+= "&units=metric";                                                                                              
    myUrl =  myUrl.replace("{LAT}",  lat).replace("{LONG}", long );

    $("#return-position").text(myUrl);
    $.getJSON(myUrl,function(json){
          doDesign(json);
    });
}

function changeMetric(){  
    if( $(".forecast-main-temp").text().match(/C/g)){
        $(".forecast-main-temp").text(fromCelsiusToFahrenheit(dados.main.temp)).append('<span onclick="changeMetric()"> °F </span>');
        $(".forecast-main-temp-min-max").text(fromCelsiusToFahrenheit(dados.main.temp_min) + " °F Min. / " + fromCelsiusToFahrenheit(dados.main.temp_max) + " °F Max.");
    }else{
        $(".forecast-main-temp").text(dados.main.temp).append('<span onclick="changeMetric()"> °C </span>');
        $(".forecast-main-temp-min-max").text( dados.main.temp_min + " °C Min. / " + dados.main.temp_max + " °C Max.");
    }
}

function fromCelsiusToFahrenheit(celsius){
    var result = ((celsius * 9 / 5) + 32).toPrecision(3);
    return result;  
} 
function fromFahrenheitToCelsius(fahrenheit){
    var result = ((fahrenheit - 32) * 5 / 9).toPrecision(3);
    return result; 
} 