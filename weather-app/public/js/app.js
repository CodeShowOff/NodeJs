console.log('client site javascript file is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const errorMessage = document.querySelector('#error');
const weatherMessage = document.querySelector('#weather');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    weatherMessage.textContent = 'loading...';
    errorMessage.textContent = '';

    const url = `http://localhost:3000/weather?address=${location}`;

    async function fetchPuzzle(url) {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            weatherMessage.innerHTML = '';
            errorMessage.textContent = data.error;
        } else {
            errorMessage.textContent = '';
            weatherMessage.innerHTML = `Location:  ${data.location} <br>
                                        Temperature:  ${data.temperature} <br>
                                        Condition:  ${data.condition}`;
                                         
            // console.log(data.location);
            // console.log(data.temperature);
            // console.log(data.condition);
        }
    }

    fetchPuzzle(url);
});