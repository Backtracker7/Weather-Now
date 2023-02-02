import {useEffect, useState} from 'react';

function Current() {

    const [weather, setWeather] = useState([]);

    useEffect(() => {
        fetch('https://api.open-meteo.com/v1/meteofrance?latitude=44.80&longitude=20.47&current_weather=true')
            .then(response => response.json())
            .then((data) => {
            setWeather(data.current_weather);
            })
            .catch((err) => {
                console.log(err.message);
             });
    }, []);

    return (
    <div>
        <div>
            <img src="" alt="" />
            <div className="weather-card">
                <h3>Weather for Belgrade</h3>
                <h3 className="temperature">Temperature: {weather.temperature} °C</h3>
                <h3 className="wind-speed">Wind speed: {weather.windspeed} Km/h</h3>
            </div>
        </div>
    </div>
    );
}

export default Current;