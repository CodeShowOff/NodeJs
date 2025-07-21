
async function getWeather(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);        
    } catch (err) {
        console.error('Error fetching weather data:', err.message);
    }
}



const url = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=308111ac0516c2961282b1ce6d2141e9`; 
// getWeather(url);  // <- description in default english language
/*
{
    coord: { lon: 77.2167, lat: 28.6667 },
    weather: [
        {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04n'
            }
            ],
            base: 'stations',
            main: {
                temp: 31.37,
                feels_like: 38.37,
                temp_min: 31.37,
                temp_max: 31.37,
                pressure: 1000,
                humidity: 70,
                sea_level: 1000,
                grnd_level: 974
                },
                visibility: 10000,
                wind: { speed: 2.82, deg: 207, gust: 3.59 },
                clouds: { all: 100 },
                dt: 1753041717,
                sys: { country: 'IN', sunrise: 1753056365, sunset: 1753105716 },
                timezone: 19800,
  id: 1273294,
  name: 'Delhi',
  cod: 200
  }
  */


const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=308111ac0516c2961282b1ce6d2141e9&lang=ja`; // <- customised to give in japanese language
getWeather(url2); // <- desciption in japansese language
/*
{
  coord: { lon: 10.99, lat: 44.34 },
  weather: [ { id: 803, main: 'Clouds', description: '曇りがち', icon: '04n' } ],
  base: 'stations',
  main: {
    temp: 296.74,
    feels_like: 297.14,
    temp_min: 296.74,
    temp_max: 296.74,
    pressure: 1008,
    humidity: 76,
    sea_level: 1008,
    grnd_level: 942
  },
  visibility: 10000,
  wind: { speed: 3.94, deg: 210, gust: 6.72 },
  clouds: { all: 65 },
  dt: 1753043771,
  sys: { country: 'IT', sunrise: 1752983429, sunset: 1753037636 },
  timezone: 7200,
  id: 3163858,
  name: 'Zocca',
  cod: 200
}
*/