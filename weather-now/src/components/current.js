import {useEffect, useState} from 'react';
import Cold from '../images/cold.jpg';
import Cloudy from '../images/cloudy.png';
import Sunny from '../images/sunny.png';
import '../styles/current.css';
import Quote from '../qoute.js';

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
        

    }, [latitude, longitude]);

    return (
    <div>
        <div className="container">
            <div className="image">
            {weather.temperature < 5 &&
                <img src={Cold} width="100" height="100" alt="cold" />
            }
            {weather.temperature >= 5  && weather.temperature < 10 &&
                <img src={Cloudy} width="100" height="100" alt="cloudy" />
            }
            {weather.temperature >= 10  && weather.temperature < 35 &&
                <img src={Sunny} width="100" height="100" alt="cloudy" />
            }
            </div>
            <div className="text">
                <h1>Hello there!</h1>
                <h3>Accurate weather for your location is</h3>
                <h3 className="temperature">Temperature: {weather.temperature} °C</h3>
                <h3 className="wind-speed">Wind speed: {weather.windspeed} Km/h</h3>
                <h4>{Quote}</h4>
            </div>
        </div>
    </div>
    );
}

export default Current;