import { Command } from 'commander';
const program = new Command();

program
    .argument('[city]', 'City name to fetch weather for')
    .parse();

const city = program.args[0];

if (!city) {
    console.log("Please provide a city name.");
    process.exit(1);
} else {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=308111ac0516c2961282b1ce6d2141e9&units=metric`;

    async function getWeather() {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(`Weather in ${data.name}, ${data.sys.country}:`);
            console.log(`Temperature: ${data.main.temp}°C`);
            console.log(`Condition: ${data.weather[0].description}`);

        } catch (err) {
            console.error('Error fetching weather data:', err.message);
        }
    }

    getWeather();
}
