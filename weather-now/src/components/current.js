import {useEffect, useState} from 'react';
import Cold from '../images/cold.jpg';
import Cloudy from '../images/cloudy.png';
import Sunny from '../images/sunny.png';
import '../styles/current.css';

function Current() {

    const [weather, setWeather] = useState([]);
    const [latitude, setLatitude] = useState(44.80);
    const [longitude, setLongitude] = useState(20.47);
    const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
];
    const [day, setDay] = useState(1);
    const [month, setMonth] = useState("January");
    var today = new Date();
    const [currTime, setCurrTime] = useState('');

    const link = (latitude, longitude) => {
        return ('https://api.open-meteo.com/v1/meteofrance?latitude=' + latitude + '&longitude=' + longitude + '&current_weather=true');
    }

    useEffect(() => {
        //get location
        navigator.geolocation.getCurrentPosition(function(position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });

        //set time and date
        setDay(today.toLocaleString("en-US", { day : '2-digit'}));
        setMonth(monthNames[today.getMonth()]);
        setCurrTime((today.getHours() <= 9 ? '0' + today.getHours() : today.getHours()) + ':' + (today.getMinutes() < 9 ? '0' + today.getMinutes() : today.getMinutes()));

        fetch(link(latitude, longitude))
            .then(response => response.json())
            .then((data) => {
            console.log(data);
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
                <h2>{month} {day}</h2>
                <h1>{currTime}</h1>
                <h3 className="temperature">{weather.temperature > 0 ? '+' + weather.temperature : weather.temperature < 0 ? '-' + weather.temperature : weather.temperature} °C</h3>
                <h3 className="wind-speed">Wind speed: {weather.windspeed} Km/h</h3>
            </div>
        </div>
    </div>
    );
}

export default Current;