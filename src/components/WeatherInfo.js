import React from 'react'

const WeatherInfo = ({ city, country, temperature, humidity, seaLevel, description, icon, timezone, error, wind }) => {
  const secondConverter = (seconds) => {
    var hours = Math.floor(seconds / (60*60));
      seconds -= hours   * (60*60);
    var minutes  = Math.floor(seconds / (60));
      seconds -= minutes * (60);
    return "+"+hours+":"+minutes;
  }

  function text(deg) {
    let directions = ['Northerly', 'North Easterly', 'Easterly', 'South Easterly', 'Southerly', 'South Westerly', 'Westerly', 'North Westerly'];
    deg += 22.5;
    if (deg < 0){
      deg = 360 - Math.abs(deg) % 360;
    } else {
      deg = deg % 360;
    }

    let w = parseInt(deg / 45);
    return `${directions[w]}`;
  }

  return (
    <div className="weather__details">
      {city && country && (
        <p className="weather__key">
          Location:{" "} 
          <span className="weather__value">
            {" "}
            {city}, {country}
          </span>
        </p>
      )}

      {timezone && (
        <p className="weather__key">
          Time Zone: <span className="weather__value"> {secondConverter(timezone)} </span>
        </p>
      )}

      {temperature && (
        <p className="weather__key">
          Temperature: <span className="weather__value"> {temperature}</span>
        </p>
      )}

      {humidity && (
        <p className="weather__key">
          Humidity: <span className="weather__value"> {humidity} </span>
        </p>
      )}

      {seaLevel && (
        <p className="weather__key">
          Sea Level: <span className="weather__value"> {seaLevel} </span>
        </p>
      )}

      {description && (
        <p className="weather__key">
          Condition: <span className="weather__value"> {description}</span> <br/>
          <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={icon} />
        </p>
      )}

      {wind && (
        <p className="weather__key">
          Wind: <span className="weather__value"> {`${wind.speed} speed @ ${wind.deg}${String.fromCharCode(0xfeff00b0)} to ${text(wind.deg)}`} </span>
        </p>
      )}

      {error && <p className="weather__error">{error}</p>}
    </div>
  )
}

export default WeatherInfo
