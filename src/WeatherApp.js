// src/App.js
import React, { useState } from 'react';
import './Weather.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'fd453e05fcc64b5786e04442232411';

  const handleSearch = async () => {
    if (!city) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );

      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
        setError(null); // Clear any previous error on successful response
      } else {
        throw new Error('Failed to fetch weather data');
      }
    } catch (error) {
      setError('Failed to fetch weather data');
      alert('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };


  return (
    <div>
      <div className="search-container">
        <input
         type="text"
         placeholder="Enter city name"
         value={city}
         onChange={(e) => setCity(e.target.value)}
         onKeyPress={handleKeyPress}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {loading && <p>Loading data...</p>}

      {weatherData && (
        <div className="center-container">
          <div className="weather-container">
          
              <div  className="weather-card"><b>Temperature<br/></b> {weatherData.current.temp_c}°C</div>
              <div  className="weather-card"><b>Humidity<br/></b> {weatherData.current.humidity}%</div>
              <div  className="weather-card"><b>Condition<br/></b> {weatherData.current.condition.text}</div>
              <div  className="weather-card"><b>Wind Speed<br/></b>  {weatherData.current.wind_kph} km/h</div>
          
          </div>
        </div>  
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default WeatherApp;
