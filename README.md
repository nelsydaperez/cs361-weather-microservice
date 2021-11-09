# Weather Service API
A microservice that will pull weather information for a given location. A JSON file with the weather properties will be served to a client.
# How to Use
In order to use the microservice, you must send a GET request using the following format for the URL: flip3.engr.oregonstate.edu:44643/getWeather?city={cityname}&country={countrycode}&outdoorFlag={true/false} .
# URL Query Options
The query parameters already deployed are as follows:
Option | Type | Default Value | Description | Deployment Status
--- | --- | --- | --- | ---
city | Required | - | Name of the city you would like weather data for. Should be a string. | Deployed
country | Required | - | Name of the country the city resides in. Country naming convention follows the OpenWeatherMap country code convention (ISO 3166). Should be a string. | Deployed
outdoorFlag | Required | - | A flag that states whether a recreational activity you want to check is outdoors or not. Should be a boolean (true/false). | Deployed

Queries that are in development or under consideration are listed below:
Option | Type | Default Value | Description | Deployment Status
--- | --- | --- | --- | ---
startDate | - | - | Provide the start date of the trip. | In development
duration | - | - | Provide the duration of the trip. | In development
userKey | - | - | May provide API key for each user. | In development
