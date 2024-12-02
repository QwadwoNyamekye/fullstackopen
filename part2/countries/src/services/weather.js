import axios from 'axios'

const baseUrl = 'http://api.weatherapi.com'
const weather_key = import.meta.env.VITE_WEATHER_KEY

const currentWeather = (city) => { return axios.get(`${baseUrl}/v1/current.json`, { params: { key: weather_key, q: city, aqi: 'no' } }).then(response => response.data) }

export default currentWeather