import { useState } from "react";
import "./App.css";
import { Card } from "./components/day-card/Card";
import search from "./assets/search.svg";
import { getWeather } from "./api/api";

function App() {
  const [weather, setWeather] = useState([{}]);
  const [searchWord, setSearchWord] = useState("");
  const [err, setErr] = useState("");

  const setWeatherFunc = (e) => {
    e.preventDefault();
    let weatherCut = [];

    getWeather(searchWord)
      .then((weather) => {
        if (Number(weather.list[0].dt_txt.slice(11, 13)) > 12) {
          weatherCut.push(weather.list[0]);
        }
        for (let index = 0; index < weather.list.length; index++) {
          if (weather.list[index].dt_txt.slice(11, 13) === "12") {
            weatherCut.push(weather.list[index]);
          }
        }
        setSearchWord("");
        setErr("");
      })
      .then(() => {
        setWeather(weatherCut);
      })
      .catch((err) => {
        setErr(err.message);
        setWeather([{}]);
      });
  };

  return (
    <>
      <h1>Weather Global</h1>

      <div className="search">
        <form action="#">
          <label htmlFor="city">Город</label>
          <input
            type="search"
            placeholder="Поиск"
            name="city"
            id="city"
            onChange={(event) => setSearchWord(event.target.value)}
          />
          <button onClick={setWeatherFunc}>
            <img className="search-logo" src={search} alt="search logo" />
          </button>
        </form>
      </div>
      <div>{err}</div>
      <div className="cards">
        {weather[1]
          ? weather.map((day, index) => <Card day={day} key={index} />)
          : ""}
      </div>
    </>
  );
}

export default App;
