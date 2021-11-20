'use strict';

// Constant values
const PORT = 44643;
const apiKey = '9bda8824cd664615e2a39e8dceb48926';    // To be modified with your own API key

// Required packages
const express = require("express");
const request = require('request');
const app = express();

// Database
// var db = require('./database/db-connector')

app.use(express.urlencoded({
    extended: true
}));

// Get the weather based on location and activity
// city = city name
// country = country code
// duration = duration of trip in days
// outdoorFlag = true/false
app.get('/getWeather', function(req, res){
	var cnt = '';
	if (req.query.duration != null) {
		cnt = '&cnt=' + req.query.duration;
	}

    var url = 'https://pro.openweathermap.org/data/2.5/forecast/climate?q=' 
		+ req.query.city + ',' + req.query.country 
		+ cnt 
		+ '&appid=' + apiKey 
		+ '&units=imperial';

    request(url, { json: true }, function (err, response, body){
        if(err) { return console.log(err); }
	    var jsonResponse = generateResponse(body, req.query.outdoorFlag);
	    res.send(jsonResponse);
    });    
});

function generateResponse(weatherData, outdoorFlag){
	var res = {
		cityName: weatherData.city.name,
		countryCode: weatherData.city.country,
		days: {}
	}
	var i = 1;
	for (const element of weatherData.list){
		res.days[i] = {
			temp: element.temp,
			weather: element.weather[0].main,
			description: element.weather[0].description,
			tripFeasibility: true,
			activityFeasible: true
		};

		// Weather check for feasiblity of trip (Extreme weather)

		// Thunderstorm
		if (res.days[i].weather === 'Thunderstorm'){
			res.days[i].tripFeasibility = false;
			res.days[i].activityFeasible = false;
		}

		// Tornado
		if (res.weather === 'Tornado'){
			res.days[i].tripFeasibility = false;
			res.days[i].activityFeasible = false;
		}

		// Volcanic Ash
		if (res.weather === 'Ash'){
			res.days[i].tripFeasibility = false;
			res.days[i].activityFeasible = false;
		}

		// Smoke
		if (res.weather === 'Smoke'){
			res.days[i].tripFeasibility = false;
			res.days[i].activityFeasible = false;
		}

		// Sudden wind speed increases
		if (res.weather === 'Squall'){
			res.days[i].tripFeasibility = false;
			res.days[i].activityFeasible = false;
		}

		// Dust storm
		if (res.weather === 'Dust'){
			res.days[i].tripFeasibility = false;
			res.days[i].activityFeasible = false;
		}

		// Sandstorm
		if (res.weather === 'Sand'){
			res.days[i].tripFeasibility = false;
			res.days[i].activityFeasible = false;
		}

		// Snowfall
		if (res.weather === 'Snow'){
			res.days[i].tripFeasibility = false;
			res.days[i].activityFeasible = false;
		}

		// Extreme rainfall amounts determined using https://water.usgs.gov/edu/activity-howmuchrain-metric.html
		if (res.weather === 'Rain'){
			if (element.rain >= 4){
				res.days[i].tripFeasibility = false;
				res.days[i].activityFeasible = false;
			}
		}

		// Weather condition check for outdoor activities (If trip cannot be made, this is automatically False.)
		if (outdoorFlag == true && res.tripFesibility == true){
			// High temperature
			if (element.temp.max >= 95){
				res.days[i].activityFeasible = false;
			}

			// Low temperature
			if (element.temp.min <= 32){
				res.days[i].activityFeasible = false;
			}

			// High humidity (may be changed to work alongside extreme temperatures)
			if (element.humidity > 70 && res.weather !== 'Rain'){
				res.days[i].activityFeasible = false;
			}

			// Rainfall amounts determined using https://water.usgs.gov/edu/activity-howmuchrain-metric.html
			if (res.weather === 'Rain'){
				if (element.rain >= 2){
					res.days[i].activityFeasible = false;
				}
			}
		}
		i++;
	}
	return res;
};

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
