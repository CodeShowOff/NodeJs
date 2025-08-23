export default async function getWeather(address){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(address)}&appid=308111ac0516c2961282b1ce6d2141e9&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Unable to find location. Try aother search.`);
        }

        const data = await response.json();
        return {
            location: `${data.name}, ${data.sys.country}`,
            temperature: data.main.temp,
            condition: data.weather[0].description
        };
    } catch (err) {
        return { error: err.message };
    }
}