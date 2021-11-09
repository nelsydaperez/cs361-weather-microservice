'use strict';

// Constant values
const PORT = 44643;
const apiKey = '9bda8824cd664615e2a39e8dceb48926';    // To be modified with your own API key

// Required packages
const express = require("express");
const request = require('request');
const app = express();

app.use(express.urlencoded({
    extended: true
}));

// Get the weather based on location and activity
// city = city name
// country = country code
// outdoorFlag = true/false
app.get('/getWeather', function(req, res){
    res.send(getWeather(req.query.city, req.query.country, req.query.outdoorFlag));
});

function getWeather(cityName, countryCode, outdoorFlag){
	var payload = { cityName:cityName, countryCode:countryCode };
	var jsonResponse = {};
	var url = 'https://pro.openweathermap.org/data/2.5/forecast/climate?q=' + payload.cityName + ',' + payload.countryCode +'&appid=' + apiKey + '&units=imperial';
	var response = request(url, { json: true }, (err, res, body) => {
		if(err) { return console.log(err); }
		return generateResponse(body, outdoorFlag);
	});
	return jsonResponse;
};

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
	console.log(res);
	return res;
};

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
