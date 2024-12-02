import axios from 'axios'

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api"

const getCountry = (country) => { return axios.get(`${baseUrl}/name/${country}`).then(response => response.data) }

const getAllCountries = () => { return axios.get(`${baseUrl}/all`).then(response => response.data) }

export default { getCountry, getAllCountries }