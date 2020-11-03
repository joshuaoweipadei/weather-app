import React, { useState } from 'react'
import WeatherInfo from './WeatherInfo'

import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState(undefined);
  const [country, setCountry] = useState(undefined);
  const [temperature, setTemperature] = useState(undefined);
  const [humidity, setHumidity] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [icon, setIcon] = useState(undefined);
  const [timezone, setTimezone] = useState(undefined);
  const [wind, setWind] = useState(undefined);
  const [seaLevel, setSeaLevel] = useState(undefined);

  const handleWeather = async (e) => {
    e.preventDefault();
    const city = e.currentTarget.elements.city.value;
    const country = e.currentTarget.elements.country.value;
    if(city && country){
      try {
        const apiCall = await fetch(
          `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${process.env.REACT_APP_WEATHER_APIKEY}&units=metric`
        );
        const { main, sys, name, weather, timezone, wind } = await apiCall.json();
        setTemperature(main.temp);
        setCity(name);
        setCountry(sys.country);
        setHumidity(main.humidity);
        setSeaLevel(main.see_level);
        setDescription(weather[0].description);
        setIcon(weather[0].icon);
        setTimezone(timezone)
        setWind(wind)
        setError('');

      } catch (err) {
        console.log(err.message);
      }
    } else {
        setTemperature(undefined);
        setCity(undefined);
        setCountry(undefined);
        setHumidity(undefined);
        setSeaLevel(undefined)
        setDescription(undefined);
        setIcon(undefined);
        setTimezone(undefined)
        setWind(undefined);
        setError("Please enter a valid city and country.");
    }
  }

  return (
    <div className="weather">
      <div className="weather__container">
        <div className="weather__header">
          <h1>Weather App</h1>
          <h3>Find out the weather condition in your location with this awesome weather app finder 😄 </h3>
        </div>
        <form onSubmit={(e) => handleWeather(e)} className="weather__form">
          <div className="input__row">
            <input type="text" name="city" placeholder="City..." />
            <input type="text" name="country" placeholder="Country..." />
            <button className="form-button">Get Weather Report</button>
          </div>
        </form>
        <WeatherInfo
          temperature={temperature}
          city={city}
          country={country}
          humidity={humidity}
          seaLevel={seaLevel}
          description={description}
          icon={icon}
          timezone={timezone}
          wind={wind}
          error={error}
        />
      </div>
    </div>
  )
}

export default Weather;
