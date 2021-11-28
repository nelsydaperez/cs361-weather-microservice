# Weather Service API
A microservice that will pull weather information for a given location. A JSON file with the weather properties will be served to a client. Hosted on the Oregon State University flip servers.
# How to Use
In order to use the microservice, you must send a GET request using the following format for the URL: flip3.engr.oregonstate.edu:44643/getWeather?city={cityname}&country={countrycode}&duration={tripduration}&outdoorFlag={true/false} .

The server response will be a JSON with notable weather information for 30 days forecast, including today, as well as two feasibility flags, one for the trip and one for the activity itself. Below is a list of the data found in the JSON file:

Parameter | Type | Description | Units
--- | --- | --- | ---
cityName | String | The name of the city whose weather information is displayed. | -
countryCode | String | Name of the country the city resides in. Country naming convention follows the OpenWeatherMap country code convention (ISO 3166). | -
days | Object | Object containing weather information for all days specified for a trip. Number of days can be between 1 and 30. | -
days.temp | Object | Object containing various temperatures for a particular day. | -
days.temp.day | Decimal | Day temperature. | °F
days.temp.min | Decimal | Minimum temperature. for the day | °F
days.temp.max | Decimal | Maximum temperature. for the day | °F
days.temp.night | Decimal | Night temperature. | °F
days.temp.eve | Decimal | Evening temperature. | °F
days.temp.morn | Decimal | Morning temperature. | °F
days.weather | String | Weather condition. Based on OpenWeatherMap weather condition parameters. | -
days.description | String | More specific description of weather condition. Based on OpenWeatherMap weather condition parameters. | -
days.tripFeasibility | Boolean | Flag that states whether a flight trip is feasible under the given weather conditions. (true/false) | -
days.activityFeasible | Boolean | Flag that states whether a recreational activity (can either be outdoor or indoor) is feasible under the given weather conditions. (true/false) | -


# URL Query Options
The query parameters already deployed are as follows:
Option | Type | Default Value | Description | Deployment Status
--- | --- | --- | --- | ---
city | Required | - | Name of the city you would like weather data for. Should be a string. | Deployed
country | Required | - | Name of the country the city resides in. Country naming convention follows the OpenWeatherMap country code convention (ISO 3166). Should be a string. | Deployed
duration | Optional | 30 | Trip duration (in days). Days will be given with the assumption that your start date is today. Cannot be greater than 30 days. | Deployed
outdoorFlag | Required | - | A flag that states whether a recreational activity you want to check is outdoors or not. Should be a boolean (true/false). | Deployed

Queries that are in development or under consideration are listed below:
Option | Type | Default Value | Description | Deployment Status
--- | --- | --- | --- | ---
startDate | - | - | Provide the start date of the trip. | Not deployed
userKey | - | - | May provide API key for each user. | Not deployed
