const API_KEY = 'de93890d4cd81673696db0e55c46dd05'
window.addEventListener('load', () => {
    const btn = document.querySelector('#button')

    btn.addEventListener('click', (e) => {
        e.preventDefault()
        const inputValue = document.querySelector('.input-weather').value
        if (!inputValue.trim()) {
            alert('City isn`t write')
            return
        }
        searchByCityName(inputValue, 'weather')
    })

    function searchByCityName(cityName, parentClassName) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === '404') {
                    throw new Error(data.message)
                }
                if (data.cod === 200) {
                    const city = data.name
                    const temp = data.main.temp
                    const icon = data.weather[0].icon
                    const descr = data.weather[0].description

                    const weatherEl = document.createElement('div')
                    weatherEl.innerHTML = `
                    <div class="city-name">${city}</div>
                    <div class="temp">${temp.toFixed(1)} &deg</div>
                    <div class="descr">${descr}</div>
                    <img class="icon" src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${descr}">
                    <div class="hr"></div>
                    <img src="img/refresh.png" alt="refresh" class="refresh">
                `
                    weatherEl.querySelector('.refresh').addEventListener('click', () => searchByCityName(cityName, parentClassName))
                    document.querySelector(`.${parentClassName}`).innerHTML = ''
                    document.querySelector(`.${parentClassName}`).append(weatherEl)
                }
                else {
                    throw new Error('Unknown error')
                }

            })
            .catch((error) => {
                document.querySelector(`.${parentClassName}`).innerHTML = error.message
            })
    }
})