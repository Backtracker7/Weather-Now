import {useEffect, useState} from 'react';
import Cold from '../images/cold.jpg';
import '../styles/current.css';

function Current() {

    const [weather, setWeather] = useState([]);
    const [latitude, setLatitude] = useState(44.80);
    const [longitude, setLongitude] = useState(20.47);

    useEffect(() => {
        //get location
        navigator.geolocation.getCurrentPosition(function(position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });

        const link = 'https://api.open-meteo.com/v1/meteofrance?latitude=' + latitude + '&longitude=' + longitude + '&current_weather=true';

        fetch(link)
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
        <div className="container">
            <div className="image">
            {weather.temperature < 5 &&
                <img src={Cold} width="100" height="100" alt="cold" />
            }
            </div>
            <div className="text">
                <h3>Weather for Belgrade</h3>
                <h3 className="temperature">Temperature: {weather.temperature} °C</h3>
                <h3 className="wind-speed">Wind speed: {weather.windspeed} Km/h</h3>
            </div>
        </div>
    </div>
    );
}

export default Current;