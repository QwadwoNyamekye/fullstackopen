import { useState } from "react";
import countryApi from "./services/countries";
import { useEffect } from "react";
import currentWeather from "./services/weather";

const CountryList = ({ country }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
  return (
    <>
      <li>
        {country.name.common}
        <button onClick={handleShow}>show</button>
      </li>
      {show ? <CountryDetail country={country} /> : null}
    </>
  );
};

const CountryDetail = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      capital {country.capital}
      <br />
      area {country.area}
      <br />
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.name.common} height="100px" />
      <div>temperature {country.weather.current.temp_c} Celcius</div>
      <img src={country.weather.current.condition.icon} />
      <div>
        wind {(country.weather.current.wind_kph * (1000 / 3600)).toFixed(2)} m/s
      </div>
    </>
  );
};

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState(null);
  const [country, setCountry] = useState(null);
  const [warning, setWarning] = useState("");

  useEffect(() => {
    countryApi.getAllCountries().then((response) => setAllCountries(response));
  }, []);

  if (!allCountries) {
    return null;
  }

  const handleSetSearch = (e) => {
    setSearch(e.target.value);

    const countryList = allCountries.filter((value) =>
      value.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(countryList);
    if (countryList.length > 10) {
      if (e.target.value != "" && e.target.value != []) {
        setWarning("Too many matches, specify another filter");
      } else {
        setWarning(null);
      }
      setCountries([]);
      setCountry(null);
    } else if (countryList.length === 1) {
      currentWeather(countryList[0].capital[0]).then((response) => {
        console.log("******************");
        console.log(response);
        return setCountry({ ...countryList[0], weather: response });
      });
      setCountries([]);
      setWarning(null);
    } else {
      setCountries(countryList);
      setWarning(null);
      setCountry(null);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearch(search);
        }}
      >
        find countries <input value={search} onChange={handleSetSearch} />
      </form>
      <div>{warning || null}</div>
      <div>
        <ul>
          {countries.map((value) => (
            <CountryList key={value.name.common} country={value} />
          ))}
        </ul>
      </div>
      <div>{country ? <CountryDetail country={country} /> : null}</div>
    </>
  );
};

export default App;
