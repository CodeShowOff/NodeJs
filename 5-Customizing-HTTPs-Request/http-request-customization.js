
async function getWeather(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        console.log(data.weather[0].description);   // <- output
    } catch (err) {
        console.error('Error fetching weather data:', err.message);
    }
}



const url = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=308111ac0516c2961282b1ce6d2141e9`; 
getWeather(url);  
// Output: clear sky


const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=308111ac0516c2961282b1ce6d2141e9&lang=ja`; // <- customised to give in japanese language
getWeather(url2);
// Output: 晴天