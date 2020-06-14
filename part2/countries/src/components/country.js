import React, {useState, useEffect} from 'react'
import Languages from './Languages'
import axios from 'axios'

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)

  const API_KEY = '0b38df675ae5e5f033c268131943605d'

  useEffect(() => {
  axios
    .get('http://api.weatherstack.com/current?access_key='
    + API_KEY + '&query=' + country.capital)
    .then(response => {
      setWeather(response.data)
    })
  }, [])


  const showWeather = () => {
    console.log(weather)
    if (weather !== null) {
      return(
        <div>
          <div>
            <strong> Temperature: {weather.current.temperature} Celcius </strong>
          </div>
          <div>
            <img src={weather.current.weather_icons[0]} style={{ height: 50 }} />
          </div>
          <div>
            <strong> Wind {weather.current.wind_speed} direction {weather.current.wind_dir} </strong>
          </div>
        </div>
      ) 
    }
  }

  return(
    <div>
      <h1>{country.name}</h1>
      <p> Capital {country.capital} </p>
      <p> Population {country.population} </p>
      <h2> Languages </h2>
      <ul> {country.languages.map(lang => 
            <Languages key={lang.iso639_1} lang={lang} />
           )}
      </ul>
      <img src={country.flag} style={{ height: 100 }} alt='flag' />
      <h3> Weather in {country.capital} </h3>
      {showWeather()}
    </div>
  )
}

export default Country