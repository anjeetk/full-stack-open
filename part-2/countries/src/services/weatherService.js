import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const getWeather = (capital) => {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`
    )
    .then(response => response.data)
}

export default { getWeather }