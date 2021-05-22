import token from './openWeatherMapToken';

/**
 * Fetch weather data from OpenWeather
 * @returns An object with data about condition, temperature, wind speed
 */
export const getWeatherCondition = async () => {
    // Requests weather data in Stockholm
    const url = 'http://api.openweathermap.org/data/2.5/find?q=hägersten&mode=json&units=metric&appid=';
    return new Promise(async (resolve) => {
        const response = await fetch(url + token);
        const data = await response.json();

        const city = data.list[0];

        const condition = city.weather[0].main;
        const temperature = city.main.feels_like;
        const windSpeed = city.wind.speed;

        const weatherCondition = {
            condition: condition.toLowerCase(),
            temperature: temperature,
            windSpeed: windSpeed,
        };
        resolve(weatherCondition)
    });
}

