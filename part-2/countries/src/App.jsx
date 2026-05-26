import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'

import './index.css'

const countriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const weatherApiKey = import.meta.env.VITE_OPENWEATHER_API_KEY || import.meta.env.VITE_SOME_KEY

const Search = ({ search, onSearchChange }) => (
  <label className="search">
    find countries
    <input value={search} onChange={onSearchChange} />
  </label>
)

const CountryList = ({ countries, onShowCountry }) => (
  <ul className="country-list">
    {countries.map(country => (
      <li key={country.cca3}>
        <span>{country.name.common}</span>
        <button type="button" onClick={() => onShowCountry(country.name.common)}>
          show
        </button>
      </li>
    ))}
  </ul>
)

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  const capital = country.capital?.[0]

  useEffect(() => {
    if (!capital || !weatherApiKey) {
      return
    }

    axios
      .get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: capital,
          appid: weatherApiKey,
          units: 'metric',
        },
      })
      .then(response => setWeather(response.data))
      .catch(() => setError('Weather information is not available right now.'))
  }, [capital])

  if (!capital) {
    return null
  }

  if (!weatherApiKey) {
    return (
      <section>
        <h2>Weather in {capital}</h2>
        <p>Set VITE_OPENWEATHER_API_KEY before starting the app to show weather.</p>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <h2>Weather in {capital}</h2>
        <p>{error}</p>
      </section>
    )
  }

  if (!weather) {
    return (
      <section>
        <h2>Weather in {capital}</h2>
        <p>Loading weather...</p>
      </section>
    )
  }

  const icon = weather.weather?.[0]?.icon
  const iconDescription = weather.weather?.[0]?.description

  return (
    <section>
      <h2>Weather in {capital}</h2>
      <p>temperature {weather.main.temp} Celsius</p>
      {icon && (
        <img
          className="weather-icon"
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={iconDescription}
        />
      )}
      <p>wind {weather.wind.speed} m/s</p>
    </section>
  )
}

const CountryDetails = ({ country }) => {
  const languages = Object.values(country.languages ?? {})

  return (
    <article className="country-details">
      <h1>{country.name.common}</h1>
      <p>capital {country.capital?.join(', ')}</p>
      <p>area {country.area}</p>

      <h2>languages</h2>
      <ul className="languages">
        {languages.map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img className="flag" src={country.flags.png} alt={country.flags.alt || `Flag of ${country.name.common}`} />

      <Weather key={country.cca3} country={country} />
    </article>
  )
}

const Countries = ({ countries, onShowCountry }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length > 1) {
    return <CountryList countries={countries} onShowCountry={onShowCountry} />
  }

  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />
  }

  return <p>No matches found</p>
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get(countriesUrl)
      .then(response => setCountries(response.data))
      .catch(() => setError('Could not load countries. Please try again later.'))
  }, [])

  const matchingCountries = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    if (!normalizedSearch) {
      return []
    }

    return countries.filter(country =>
      country.name.common.toLowerCase().includes(normalizedSearch)
    )
  }, [countries, search])

  const handleSearchChange = event => {
    setSearch(event.target.value)
  }

  const handleShowCountry = countryName => {
    setSearch(countryName)
  }

  return (
    <main>
      <Search search={search} onSearchChange={handleSearchChange} />
      {error ? (
        <p>{error}</p>
      ) : (
        <Countries countries={matchingCountries} onShowCountry={handleShowCountry} />
      )}
    </main>
  )
}

export default App
