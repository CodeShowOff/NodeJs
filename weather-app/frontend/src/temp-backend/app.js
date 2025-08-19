export default async function getWeather(city){
    if (!city) {
        return { error: "Please provide a city name." };
    } else {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=308111ac0516c2961282b1ce6d2141e9&units=metric`;

        async function getWeather() {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                return {
                    location: `${data.name}, ${data.sys.country}`,
                    temperature: data.main.temp,
                    condition: data.weather[0].description
                };
            } catch (err) {
                return { error: 'Error fetching weather data: ' + err.message };
            }
        }

        const data = await getWeather();
        return data;
    }
}